# Chatbot custom actions API parameter mapping
_Exported on 18/01/2026 at 17:46:28 GMT+5:30 from Cursor (2.3.41)_

---

**User**

i am adding custom actions funcitonaltiy in my chatbot provider platform,


the schema i created for it : 

// Custom Actions Table
export const customActions = pgTable('custom_actions', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  chatbotId: text('chatbot_id').notNull(),
  branch: branchType('branch').notNull().default('DEV'),
  logicalId: uuid('logical_id').notNull().$defaultFn(() => crypto.randomUUID()),
  // Metadata
  name: varchar('name', { length: 100 }).notNull(),
  displayName: varchar('display_name', { length: 200 }).notNull(),
  description: text('description').notNull(),
  isEnabled: boolean('is_enabled').default(true).notNull(),

  // API Configuration (JSONB for flexibility)
  apiConfig: json('api_config').notNull(), // Contains method, base_url, endpoint, headers, etc.

  // Tool Schema (for LLM consumption)
  toolSchema: json('tool_schema').notNull(), // JSON Schema format for parameters

  // Metadata
  version: integer('version').default(1).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 6 }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 }).defaultNow(),
  createdBy: text('created_by'),
  lastTestedAt: timestamp('last_tested_at', { mode: 'date', precision: 6 }),
  testStatus: testStatus('test_status').default('not_tested'),
  testResult: json('test_result'),
}, (table) => [
  unique('custom_actions_chatbot_branch_logical_unique').on(table.chatbotId, table.branch, table.logicalId),
  // Foreign keys
  foreignKey({
    columns: [table.chatbotId],
    foreignColumns: [chatBots.id],
    name: 'custom_actions_chatbot_id_fkey',
  })
    .onUpdate('cascade')
    .onDelete('cascade'),
  foreignKey({
    columns: [table.createdBy],
    foreignColumns: [user.id],
    name: 'custom_actions_created_by_fkey',
  })
    .onUpdate('cascade')
    .onDelete('set null'),

  // Unique constraint (action name unique per chatbot per branch)
  unique('unique_action_per_chatbot_branch').on(table.chatbotId, table.name, table.branch),

  // Indexes
  index('custom_actions_chatbot_enabled_idx').on(table.chatbotId).where(sql${table.isEnabled} = true),
  index('custom_actions_chatbot_name_idx').on(table.chatbotId, table.name),
  index('custom_actions_branch_idx').on(table.chatbotId, table.branch),
  index('custom_actions_updated_idx').on(table.updatedAt.desc()),
]);



and this is actually what i am trying to make : 

https://www.chatbase.co/docs/user-guides/chatbot/actions/custom-action


but now i am thinking how should i store req.body, req.headers, req.params, req.query or url params. 

so on backend my chatbot ( if he have data ) should be able to build the api request. 



You’re actually thinking about this in exactly the right way — the hard part isn’t “calling the API,” it’s how to model an action so your system + LLM can reliably construct requests later.

I’ll propose a clean, practical design that works well for chatbot providers (including your use case similar to Chatbase).

✅ How you should model this (recommended approach)

Right now you already have a good starting point:

apiConfig: json('api_config').notNull(),
toolSchema: json('tool_schema').notNull(),


Instead of trying to add reqBody, reqHeaders, reqParams columns directly to your table, put them INSIDE apiConfig in a structured way.

Here is a battle-tested structure you can store in apiConfig:

✅ Suggested apiConfig shape (store in JSON)
{
  "method": "POST",
  "baseUrl": "https://api.example.com",
  "endpoint": "/users/{userId}/orders",

  "headers": {
    "Authorization": "Bearer {{API_KEY}}",
    "Content-Type": "application/json"
  },

  "pathParams": [
    {
      "key": "userId",
      "required": true,
      "source": "tool_input"
    }
  ],

  "queryParams": [
    {
      "key": "status",
      "required": false,
      "default": "active",
      "source": "tool_input"
    }
  ],

  "body": {
    "type": "json",
    "schema": {
      "amount": {
        "source": "tool_input",
        "required": true
      },
      "currency": {
        "default": "INR"
      }
    }
  }
}

How your backend will use this

When your chatbot decides to call this action, your flow becomes:

Step 1 — LLM chooses action using toolSchema

Your toolSchema (which you already have) is what you pass to the LLM so it knows:

What inputs it can provide

What parameters are needed

Example tool schema:

{
  "name": "create_order",
  "description": "Create a new order",
  "parameters": {
    "type": "object",
    "properties": {
      "userId": { "type": "string" },
      "amount": { "type": "number" },
      "status": { "type": "string" }
    },
    "required": ["userId", "amount"]
  }
}


LLM might return:

{
  "name": "create_order",
  "arguments": {
    "userId": "123",
    "amount": 500,
    "status": "active"
  }
}

Step 2 — Your backend builds the real HTTP request

You take:

apiConfig

LLM arguments

And construct:

Final URL:
https://api.example.com/users/123/orders?status=active

Final Body:
{
  "amount": 500,
  "currency": "INR"
}

Final Headers:
Authorization: Bearer XYZ
Content-Type: application/json


Then you send it with fetch or axios.

How this maps to your DB table (no schema change needed)

Your table stays almost the same:

apiConfig: json('api_config').notNull(),
toolSchema: json('tool_schema').notNull(),


You DO NOT need new columns like:

❌ reqBody
❌ reqHeaders
❌ reqParams
❌ reqQuery

Everything lives cleanly inside apiConfig.

Bonus: Example row in your DB

Your custom_actions row might look like:

column	value
name	create_order
apiConfig	(JSON above)
toolSchema	(LLM schema above)
This matches Chatbase conceptually

What Chatbase does under the hood is very similar:

They store API details in JSON

LLM only sees a tool schema

Backend translates tool call → real HTTP request

You are basically rebuilding the same pattern — just in your own SaaS.

If you want, I can:

design this for Drizzle types

design a Zod schema

show a Node.js function that builds the request automatically

or show how to integrate this with OpenAI / Gemini tool calling

Just tell me 🙂

package tools

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/cloudwego/eino/components/tool"
	"github.com/cloudwego/eino/schema"
	"go.uber.org/zap"

	"github.com/Conversly/lightning-response/internal/types"
	"github.com/Conversly/lightning-response/internal/utils"
)

// CustomActionTool implements the Eino InvokableTool interface for custom HTTP actions
type CustomActionTool struct {
	action     *types.CustomAction
	httpClient *http.Client
}

// NewCustomActionTool creates a new custom action tool instance
func NewCustomActionTool(action *types.CustomAction) (*CustomActionTool, error) {
	// Validate action configuration
	if action == nil {
		return nil, fmt.Errorf("action cannot be nil")
	}
	if action.Name == "" {
		return nil, fmt.Errorf("action name cannot be empty")
	}
	if action.APIConfig.BaseURL == "" {
		return nil, fmt.Errorf("action base URL cannot be empty")
	}

	// Set default timeout if not specified
	timeout := 30
	if action.APIConfig.TimeoutSeconds > 0 {
		timeout = action.APIConfig.TimeoutSeconds
	}

	// Create HTTP client with timeout
	httpClient := &http.Client{
		Timeout: time.Duration(timeout) * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if !action.APIConfig.FollowRedirects && len(via) > 0 {
				return http.ErrUseLastResponse
			}
			return nil
		},
	}

	return &CustomActionTool{
		action:     action,
		httpClient: httpClient,
	}, nil
}

// Info returns the tool's metadata for the LLM
func (t *CustomActionTool) Info(ctx context.Context) (*schema.ToolInfo, error) {
	// Convert tool schema properties to Eino ParameterInfo format
	params := make(map[string]*schema.ParameterInfo)

	properties := t.action.ToolSchema.Properties
	if properties == nil {
		return nil, fmt.Errorf("tool schema properties cannot be nil")
	}

	for paramName, paramDefRaw := range properties {
		paramDef, ok := paramDefRaw.(map[string]interface{})
		if !ok {
			continue
		}

		paramInfo := &schema.ParameterInfo{
			Desc: getStringField(paramDef, "description"),
		}

		// Convert type
		paramType := getStringField(paramDef, "type")
		switch paramType {
		case "string":
			paramInfo.Type = schema.String
		case "number", "integer":
			paramInfo.Type = schema.Number
		case "boolean":
			paramInfo.Type = schema.Boolean
		case "array":
			paramInfo.Type = schema.Array
		case "object":
			paramInfo.Type = schema.Object
		default:
			paramInfo.Type = schema.String
		}

		// Check if required
		paramInfo.Required = contains(t.action.ToolSchema.Required, paramName)

		params[paramName] = paramInfo
	}

	return &schema.ToolInfo{
		Name:        t.action.Name,
		Desc:        t.action.Description,
		ParamsOneOf: schema.NewParamsOneOfByParams(params),
	}, nil
}

// InvokableRun executes the HTTP request
func (t *CustomActionTool) InvokableRun(ctx context.Context, argumentsInJSON string, opts ...tool.Option) (string, error) {
	startTime := time.Now()

	// Parse input arguments
	var params map[string]interface{}
	if err := json.Unmarshal([]byte(argumentsInJSON), &params); err != nil {
		utils.Zlog.Error("Failed to parse custom action arguments",
			zap.String("action_name", t.action.Name),
			zap.Error(err))
		return "", fmt.Errorf("invalid arguments: %w", err)
	}

	utils.Zlog.Info("Custom action tool invoked",
		zap.String("action_name", t.action.Name),
		zap.String("chatbot_id", t.action.ChatbotID),
		zap.Any("params", params))

	// Execute with retry logic
	maxRetries := 1
	if t.action.APIConfig.RetryCount > 0 {
		maxRetries = t.action.APIConfig.RetryCount + 1
	}

	var lastErr error
	for attempt := 0; attempt < maxRetries; attempt++ {
		if attempt > 0 {
			// Exponential backoff: 1s, 2s, 4s...
			backoff := time.Duration(1<<uint(attempt-1)) * time.Second
			utils.Zlog.Info("Retrying custom action",
				zap.String("action_name", t.action.Name),
				zap.Int("attempt", attempt+1),
				zap.Duration("backoff", backoff))
			time.Sleep(backoff)
		}

		result, err := t.executeRequest(ctx, params)
		if err == nil {
			duration := time.Since(startTime)
			utils.Zlog.Info("Custom action completed successfully",
				zap.String("action_name", t.action.Name),
				zap.Duration("duration", duration),
				zap.Int("attempt", attempt+1))
			return result, nil
		}

		lastErr = err
		utils.Zlog.Warn("Custom action attempt failed",
			zap.String("action_name", t.action.Name),
			zap.Int("attempt", attempt+1),
			zap.Error(err))
	}

	utils.Zlog.Error("Custom action failed after all retries",
		zap.String("action_name", t.action.Name),
		zap.Int("max_retries", maxRetries),
		zap.Error(lastErr))

	return "", fmt.Errorf("action failed after %d attempts: %w", maxRetries, lastErr)
}

// executeRequest performs the actual HTTP request
func (t *CustomActionTool) executeRequest(ctx context.Context, params map[string]interface{}) (string, error) {
	// Build URL with parameter interpolation
	url := t.buildURL(params)

	// Build request body if needed
	var body io.Reader
	if t.action.APIConfig.Method != types.MethodGET && t.action.APIConfig.BodyTemplate != "" {
		bodyStr := t.interpolateParams(t.action.APIConfig.BodyTemplate, params)
		body = bytes.NewBufferString(bodyStr)
	}

	// Create HTTP request
	req, err := http.NewRequestWithContext(ctx, string(t.action.APIConfig.Method), url, body)
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	// Add headers
	t.addHeaders(req, params)

	// Add authentication
	t.addAuthentication(req)

	// Execute request
	utils.Zlog.Debug("Executing HTTP request",
		zap.String("action_name", t.action.Name),
		zap.String("method", string(t.action.APIConfig.Method)),
		zap.String("url", url))

	resp, err := t.httpClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	// Read response body
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	// Check if status code is successful
	if !t.isSuccessStatusCode(resp.StatusCode) {
		return "", fmt.Errorf("request failed with status %d: %s", resp.StatusCode, string(responseBody))
	}

	// Apply response mapping if configured
	result := string(responseBody)
	if t.action.APIConfig.ResponseMapping != "" {
		mapped, err := t.applyResponseMapping(responseBody, t.action.APIConfig.ResponseMapping)
		if err != nil {
			utils.Zlog.Warn("Failed to apply response mapping, returning raw response",
				zap.String("action_name", t.action.Name),
				zap.Error(err))
		} else {
			result = mapped
		}
	}

	utils.Zlog.Debug("HTTP request completed",
		zap.String("action_name", t.action.Name),
		zap.Int("status_code", resp.StatusCode),
		zap.Int("response_length", len(result)))

	return result, nil
}

// buildURL constructs the full URL with parameter interpolation
func (t *CustomActionTool) buildURL(params map[string]interface{}) string {
	// Start with base URL + endpoint
	url := strings.TrimSuffix(t.action.APIConfig.BaseURL, "/")
	endpoint := t.interpolateParams(t.action.APIConfig.Endpoint, params)
	if !strings.HasPrefix(endpoint, "/") {
		endpoint = "/" + endpoint
	}
	url = url + endpoint

	// Add query parameters
	if len(t.action.APIConfig.QueryParams) > 0 {
		queryParts := make([]string, 0, len(t.action.APIConfig.QueryParams))
		for key, value := range t.action.APIConfig.QueryParams {
			interpolatedValue := t.interpolateParams(value, params)
			queryParts = append(queryParts, fmt.Sprintf("%s=%s", key, interpolatedValue))
		}
		url = url + "?" + strings.Join(queryParts, "&")
	}

	return url
}

// interpolateParams replaces {{param_name}} placeholders with actual values
func (t *CustomActionTool) interpolateParams(template string, params map[string]interface{}) string {
	result := template
	for key, value := range params {
		placeholder := "{{" + key + "}}"
		replacement := fmt.Sprint(value)
		result = strings.ReplaceAll(result, placeholder, replacement)
	}
	return result
}

// addHeaders adds configured headers to the request
func (t *CustomActionTool) addHeaders(req *http.Request, params map[string]interface{}) {
	// Add default content type for POST/PUT/PATCH
	if t.action.APIConfig.Method == types.MethodPOST ||
		t.action.APIConfig.Method == types.MethodPUT ||
		t.action.APIConfig.Method == types.MethodPATCH {
		req.Header.Set("Content-Type", "application/json")
	}

	// Add configured headers
	for key, value := range t.action.APIConfig.Headers {
		interpolatedValue := t.interpolateParams(value, params)
		req.Header.Set(key, interpolatedValue)
	}
}

// addAuthentication adds authentication to the request
func (t *CustomActionTool) addAuthentication(req *http.Request) {
	if t.action.APIConfig.AuthType == types.AuthNone || t.action.APIConfig.AuthValue == "" {
		return
	}

	switch t.action.APIConfig.AuthType {
	case types.AuthBearer:
		req.Header.Set("Authorization", "Bearer "+t.action.APIConfig.AuthValue)
	case types.AuthAPIKey:
		// Default to X-API-Key header, but can be overridden in headers config
		if req.Header.Get("X-API-Key") == "" {
			req.Header.Set("X-API-Key", t.action.APIConfig.AuthValue)
		}
	case types.AuthBasic:
		// AuthValue should be in format "username:password"
		req.Header.Set("Authorization", "Basic "+t.action.APIConfig.AuthValue)
	}
}

// isSuccessStatusCode checks if the status code is considered successful
func (t *CustomActionTool) isSuccessStatusCode(statusCode int) bool {
	// If success codes are specified, use them
	if len(t.action.APIConfig.SuccessCodes) > 0 {
		for _, code := range t.action.APIConfig.SuccessCodes {
			if code == statusCode {
				return true
			}
		}
		return false
	}

	// Default: 2xx status codes are successful
	return statusCode >= 200 && statusCode < 300
}

// applyResponseMapping extracts specific fields from JSON response
func (t *CustomActionTool) applyResponseMapping(responseBody []byte, mapping string) (string, error) {
	// Parse response as JSON
	var responseData interface{}
	if err := json.Unmarshal(responseBody, &responseData); err != nil {
		return "", fmt.Errorf("response is not valid JSON: %w", err)
	}

	// mapping can be a JSONPath-like expression, e.g., "data.result"
	// For simplicity, we'll support dot notation for nested objects
	parts := strings.Split(mapping, ".")
	current := responseData

	for _, part := range parts {
		switch v := current.(type) {
		case map[string]interface{}:
			var ok bool
			current, ok = v[part]
			if !ok {
				return "", fmt.Errorf("field '%s' not found in response", part)
			}
		default:
			return "", fmt.Errorf("cannot traverse '%s' in non-object value", part)
		}
	}

	// Convert result to JSON string
	result, err := json.Marshal(current)
	if err != nil {
		return "", fmt.Errorf("failed to marshal mapped result: %w", err)
	}

	return string(result), nil
}

// Helper functions

func getStringField(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}



my current tool parser on backend which helps llm call these tools. 

but i think it will be unable to properly add req.body json in request, url params. 

am i wrong?

Short answer first:

👉 You are partially right — your current implementation will work for simple cases, but it will break for many real-world APIs.
Not because your code is bad (it’s actually quite clean), but because the model you’re using is too template-string based and not structured enough.

I’ll explain exactly what will break, why, and how to fix it in a way that fits your existing Go code.

✅ What your code WILL work for

Your current approach will work fine for cases like:

Example API
POST https://api.example.com/orders/{{userId}}


Body template:

{
  "amount": "{{amount}}",
  "currency": "{{currency}}"
}


Query params config:

{
  "status": "{{status}}"
}


And your code will correctly build:

POST /orders/123?status=active
Body: {"amount":"500","currency":"INR"}


So for basic template-based APIs, your system is OK.

🚨 Where your system will FAIL

Here are the real problems.

❌ Problem 1 — You don’t actually support JSON bodies properly

Right now you do:

bodyStr := t.interpolateParams(t.action.APIConfig.BodyTemplate, params)
body = bytes.NewBufferString(bodyStr)


This means:

👉 Your body is always treated as a string template, not structured JSON.

This will break for cases like:

If LLM sends:

{
  "items": [
    {"name": "laptop", "price": 1000},
    {"name": "mouse", "price": 50}
  ]
}


You cannot express this cleanly in a string template.

You would need something like:

{
  "items": {{items}}
}


But {{items}} would stringify into:

map[name:laptop price:1000]


➡️ That is not valid JSON, so your request breaks.

✅ Better approach (what you should do)

Instead of BodyTemplate: string, you should have:

BodySchema json.RawMessage   // <- structured JSON template


Then build body like this:

func (t *CustomActionTool) buildJSONBody(params map[string]interface{}) ([]byte, error) {
    // Start from template
    var body map[string]interface{}
    if err := json.Unmarshal(t.action.APIConfig.BodySchema, &body); err != nil {
        return nil, err
    }

    // Replace fields dynamically
    for key, value := range body {
        if str, ok := value.(string); ok && strings.HasPrefix(str, "{{") {
            paramName := strings.Trim(str, "{}")
            if v, exists := params[paramName]; exists {
                body[key] = v   // <-- keeps arrays, objects, numbers intact
            }
        }
    }

    return json.Marshal(body)
}


Then in executeRequest():

bodyBytes, _ := t.buildJSONBody(params)
body = bytes.NewBuffer(bodyBytes)


👉 Now nested JSON works properly.

❌ Problem 2 — Your query params are too static

You currently store:

QueryParams map[string]string


This means every query param must be a string template.

But real APIs often need:

?filter[status]=active
?sort=-createdAt
?limit=10
?ids=1,2,3


Your model cannot represent this well.

✅ Better Query Param Model

Instead of:

QueryParams map[string]string


Use:

QueryParams []struct {
   Key string `json:"key"`
   Value string `json:"value"`
   Source string `json:"source"` // "tool_input" or "static"
}


Example stored config:

[
  {"key":"status", "value":"{{status}}", "source":"tool_input"},
  {"key":"limit", "value":"10", "source":"static"}
]


Then build URL like:

q := req.URL.Query()
for _, qp := range t.action.APIConfig.QueryParams {
    val := t.interpolateParams(qp.Value, params)
    q.Add(qp.Key, val)
}
req.URL.RawQuery = q.Encode()


This avoids your manual string concatenation and edge cases.

❌ Problem 3 — Path params are brittle

You are doing:

endpoint := t.interpolateParams(t.action.APIConfig.Endpoint, params)


So endpoint must look like:

"/users/{{userId}}/orders"


This is okay, but you don’t validate required path params.

If LLM forgets userId, you’ll call:

/users//orders

✅ Fix: Explicit Path Params

Change API config to:

{
  "endpoint": "/users/{userId}/orders",
  "pathParams": ["userId"]
}


And in Go:

for _, p := range t.action.APIConfig.PathParams {
   if _, ok := params[p]; !ok {
      return "", fmt.Errorf("missing required path param: %s", p)
   }
}

Biggest Missing Piece: Your LLM ↔ API gap

Right now your LLM only sees:

toolSchema


But your LLM has NO IDEA about:

Which fields go in body

Which go in query

Which go in path

It just sends arguments.

You need a mapping layer, like this:

LLM arguments
      ↓
Map to API locations
(body / query / path / headers)
      ↓
Build HTTP request

What I’d recommend for your platform (final design)

Your apiConfig should look like this in DB:

{
  "method": "POST",
  "baseUrl": "https://api.example.com",
  "endpoint": "/users/{userId}/orders",

  "pathParams": ["userId"],

  "queryParams": [
    {"key":"status", "value":"{{status}}", "source":"tool_input"}
  ],

  "headers": {
    "X-Custom": "{{tenant}}"
  },

  "bodySchema": {
    "amount": "{{amount}}",
    "currency": "INR",
    "items": "{{items}}"
  }
}


Then your Go tool just:

Validates path params

Builds JSON body safely

Encodes query params properly

Adds headers

Direct answer to your question

“Do you think it will be unable to properly add req.body json in request, url params?”

👉 Yes — for real-world APIs, your current approach will struggle with:

Nested JSON bodies

Arrays in body

Complex query params

Optional params

Missing params

Special characters in URLs

Encoded query strings

But your architecture is very close — you mainly need to move from:

string templates → structured JSON

If you want, I can:

rewrite your executeRequest cleanly

refactor your Go structs

design the exact APIConfig struct in Go

or make this work perfectly with Eino + tool calling

Just tell me how deep you want to go 🙂

{
  "method": "POST",
  "baseUrl": "https://api.example.com",
  "endpoint": "/users/{userId}/orders",

  "pathParams": ["userId"],

  "queryParams": [
    {"key":"status", "value":"{{status}}", "source":"tool_input"}
  ],

  "headers": {
    "X-Custom": "{{tenant}}"
  },

  "bodySchema": {
    "amount": "{{amount}}",
    "currency": "INR",
    "items": "{{items}}"
  }
}


i think there should be a some description attatched with each field. no? 

also : 

this is how i am storing it as of now : 

{
    "chatbotId": "g2qq9wiocg17lyd5hse821bf",
    "name": "get_product_price",
    "displayName": "Get Product Price",
    "description": "💡\nExample of a good description:\n\"Use this action when the user asks about product prices, availability, or inventory. It fetches real-time pricing data from our e-commerce API. Requires a product ID or product name.\"\n\n",
    "apiConfig": {
        "method": "POST",
        "baseUrl": "https://terminal.apps.verlyai.xyz",
        "endpoint": "/api/v1/deploy/widget",
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "Cookie": "ext_name=ojplmecpdpgccookcobabopnaifgidhf; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTc3MTI0MDc3OH0.RXLErVVzGwgbtNcrPT8xUp-3_tGQWMPo1V6KKitwhKI; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTgwMDIwNjM3OH0.ZyJ6HhyNEIviuACxstcDXW2n8ZjmrCQNrGUlwhpnBbo"
        },
        "queryParams": {},
        "bodyTemplate": "{\"chatbotId\":\"g2qq9wiocg17lyd5hse821bf\",\"partial\":{\"styles\":{\"appearance\":\"light\",\"displayName\":\"VerlyAI General AI Agent\",\"primaryColor\":\"#062c59\",\"widgetBubbleColour\":\"#062c59\",\"PrimaryIcon\":\"https://verlyai.xyz/verly_logo.png\",\"widgeticon\":\"chat\",\"alignChatButton\":\"right\",\"showButtonText\":false,\"buttonText\":\"Chat with us\",\"messagePlaceholder\":\"Message...\",\"footerText\":\"\",\"dismissableNoticeText\":\"\",\"chatWidth\":\"350px\",\"chatHeight\":\"500px\",\"autoShowInitial\":false,\"autoShowDelaySec\":3,\"collectUserFeedback\":false,\"regenerateMessages\":true,\"continueShowingSuggestedMessages\":false},\"onlyAllowOnAddedDomains\":false,\"initialMessage\":\"Hi\\u0021 👋 How can I help you with VerlyAI General AI Agent today?\",\"suggestedMessages\":[\"How can VerlyAI automate my customer support?\",\"What channels can VerlyAI agents deploy on?\",\"Can VerlyAI broadcast promotional messages on WhatsApp?\",\"How does VerlyAI connect to my existing data?\"]},\"mode\":\"dev\"}",
        "responseMapping": "",
        "successCodes": [
            200
        ],
        "timeoutSeconds": 30,
        "retryCount": 0,
        "authType": "none",
        "authValue": "",
        "followRedirects": true,
        "verifySsl": true
    },
    "parameters": [],
    "triggerExamples": [],
    "mode": "dev"
}


which i know is wrong. 



You’re right — and your instinct here is very good. 👍

Your current stored config is *not just “a bit messy” — it actually fights both your backend and the LLM. But the good news is: you’re extremely close, and I’ll show you a clean model that fits your platform and your Go tool.

1️⃣ First: YES — every field should have a description

In practice, you need three different kinds of descriptions, not just one.

You should attach descriptions at three layers:

Layer	Who uses it?	Purpose
Action description	LLM	When to use the tool
Parameter description	LLM	What each input means
API field description	Backend + UI + future-you	What goes where in the request

Right now, you only really have layer #1.

2️⃣ What your API config should look like (clean version)

Here is a MUCH better version of your first JSON — notice how every field carries meaning.

{
  "method": "POST",
  "baseUrl": "https://api.example.com",
  "endpoint": "/users/{userId}/orders",

  "pathParams": [
    {
      "key": "userId",
      "description": "The unique identifier of the user placing the order",
      "source": "tool_input",
      "required": true
    }
  ],

  "queryParams": [
    {
      "key": "status",
      "description": "Filter order status (active, pending, cancelled)",
      "value": "{{status}}",
      "source": "tool_input",
      "required": false,
      "default": "active"
    }
  ],

  "headers": {
    "X-Custom": {
      "value": "{{tenant}}",
      "description": "Tenant identifier for multi-tenant routing",
      "source": "tool_input"
    }
  },

  "bodySchema": {
    "amount": {
      "value": "{{amount}}",
      "description": "Total order amount in smallest currency unit",
      "required": true
    },
    "currency": {
      "value": "INR",
      "description": "Three-letter ISO currency code",
      "required": false
    },
    "items": {
      "value": "{{items}}",
      "description": "List of items in the order",
      "required": true
    }
  }
}


Now you can:

validate inputs

show good UI in your dashboard

generate better LLM tools

debug later without going insane

3️⃣ Why your current stored action is “wrong”

Let’s look at your stored example.

You currently have this:

"bodyTemplate": "{\"chatbotId\":\"g2qq9wiocg17lyd5hse821bf\", ... }"


Problems with this:

❌ It is a giant escaped JSON string
❌ No field-level meaning
❌ No way for LLM to modify anything safely
❌ Impossible to validate
❌ Impossible to map parameters

You basically froze a real request body instead of defining a template for future requests.

4️⃣ How your SAME example should be stored instead

Here is how I would model your exact action properly.

✅ New apiConfig (conceptually correct version)
{
  "method": "POST",
  "baseUrl": "https://terminal.apps.verlyai.xyz",
  "endpoint": "/api/v1/deploy/widget",

  "headers": {
    "content-type": {
      "value": "application/json",
      "description": "Request content type",
      "source": "static"
    }
  },

  "bodySchema": {
    "chatbotId": {
      "value": "{{chatbotId}}",
      "description": "ID of the chatbot being deployed",
      "required": true
    },

    "mode": {
      "value": "dev",
      "description": "Deployment mode: dev or prod",
      "required": true
    },

    "partial": {
      "value": "{{widgetConfig}}",
      "description": "Widget UI configuration object",
      "required": true
    }
  }
}


Then your LLM tool schema would expose only meaningful inputs like:

{
  "name": "deploy_widget",
  "description": "Deploy or update a chatbot widget configuration",
  "parameters": {
    "type": "object",
    "properties": {
      "chatbotId": {
        "type": "string",
        "description": "ID of chatbot to deploy"
      },
      "widgetConfig": {
        "type": "object",
        "description": "UI appearance and behavior settings for the widget"
      }
    },
    "required": ["chatbotId", "widgetConfig"]
  }
}


Then your actual request body becomes (dynamically built):

{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "mode": "dev",
  "partial": {
    "styles": {
      "appearance": "light"
    }
  }
}


Instead of hardcoding the entire blob.

5️⃣ How this fits your Go tool

You would replace this part:

bodyStr := t.interpolateParams(t.action.APIConfig.BodyTemplate, params)
body = bytes.NewBufferString(bodyStr)


With something like:

bodyBytes, err := t.buildJSONBody(params)
if err != nil {
    return "", err
}
body = bytes.NewBuffer(bodyBytes)


And your builder:

func (t *CustomActionTool) buildJSONBody(params map[string]interface{}) ([]byte, error) {
    var body map[string]interface{}
    if err := json.Unmarshal(t.action.APIConfig.BodySchema, &body); err != nil {
        return nil, err
    }

    for key, field := range body {
        if str, ok := field.(string); ok && strings.HasPrefix(str, "{{") {
            param := strings.Trim(str, "{}")
            if val, exists := params[param]; exists {
                body[key] = val
            }
        }
    }

    return json.Marshal(body)
}


Now arrays, objects, numbers, booleans all work.

6️⃣ What you should change in your DB schema

Your table can stay mostly the same, but conceptually:

Instead of:

apiConfig: json('api_config')


Think of it as containing:

type APIConfig = {
  method: string;
  baseUrl: string;
  endpoint: string;
  pathParams: Param[];
  queryParams: Param[];
  headers: Record<string, HeaderConfig>;
  bodySchema: Record<string, BodyField>;
}

7️⃣ Direct answer to your question

“I think there should be some description attached with each field, no?”

👉 Yes — absolutely — and that’s actually what separates a toy system from a real chatbot platform.

You should attach descriptions to:

Path params

Query params

Headers

Body fields

Tool parameters

Otherwise:

your LLM will be dumb

your UI will be confusing

debugging will be hell

8️⃣ If you want, I can:

I can rewrite your exact Go structs properly, for example:

type APIConfig struct {
   Method string `json:"method"`
   BaseURL string `json:"baseUrl"`
   Endpoint string `json:"endpoint"`
   PathParams []Param `json:"pathParams"`
   QueryParams []Param `json:"queryParams"`
   Headers map[string]HeaderConfig `json:"headers"`
   BodySchema map[string]BodyField `json:"bodySchema"`
}


and make your entire CustomActionTool clean, safe, and production-ready.

If you want, say:

👉 “Refactor my Go structs + request builder properly.”

how will this method support nested req.bodies? 

also, is it like : if users wants to get some field from his user during chat, he needs to wrap that in {{}}?

Great questions — these are exactly the right things to be thinking about if you want this to be a real, usable platform rather than a demo. I’ll answer both clearly and concretely.

1️⃣ How to support nested req.body properly

The short answer is:

👉 You should NOT rely on {{}} replacement inside deeply nested JSON.
Instead, you should treat the body as structured JSON + a mapping layer, not a text template.

I’ll show you the pattern that works in production.

❌ What you should NOT do (string templates)

This approach breaks for nesting:

{
  "bodySchema": {
    "order": {
      "items": "{{items}}"
    }
  }
}


Because {{items}} is just a string placeholder — it cannot cleanly represent arrays, objects, or nested structures coming from the LLM.

✅ Recommended approach — Hybrid JSON + variable markers
Store something like this instead:
{
  "bodySchema": {
    "chatbotId": "{{chatbotId}}",

    "mode": "dev",

    "partial": {
      "styles": {
        "appearance": "light",
        "primaryColor": "#062c59"
      },
      "initialMessage": "{{initialMessage}}",
      "suggestedMessages": "{{suggestedMessages}}"
    }
  }
}


Here the only things in {{}} are VALUES that come from the LLM.

Everything else is static structure.

How your Go builder should handle nesting

Instead of simple string replace, you recursively walk the JSON and replace variables:

Concept (pseudocode):
func replaceVars(value interface{}, params map[string]interface{}) interface{} {
    switch v := value.(type) {

    case string:
        // If it's exactly a variable like "{{items}}"
        if strings.HasPrefix(v, "{{") && strings.HasSuffix(v, "}}") {
            key := strings.Trim(v, "{}")
            if val, ok := params[key]; ok {
                return val // <-- keeps nested objects intact
            }
        }
        return v

    case map[string]interface{}:
        for k, child := range v {
            v[k] = replaceVars(child, params)
        }
        return v

    case []interface{}:
        for i, item := range v {
            v[i] = replaceVars(item, params)
        }
        return v

    default:
        return v
    }
}


Then your final body builder is simply:

var body map[string]interface{}
json.Unmarshal(apiConfig.BodySchema, &body)

finalBody := replaceVars(body, params)

jsonBytes, _ := json.Marshal(finalBody)

✅ Example end-to-end
Stored template:
{
  "bodySchema": {
    "chatbotId": "{{chatbotId}}",
    "mode": "dev",
    "partial": {
      "styles": {
        "appearance": "light"
      },
      "suggestedMessages": "{{suggestedMessages}}"
    }
  }
}

LLM sends:
{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "suggestedMessages": [
    "How does pricing work?",
    "Can I integrate WhatsApp?"
  ]
}

Final request body becomes:
{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "mode": "dev",
  "partial": {
    "styles": {
      "appearance": "light"
    },
    "suggestedMessages": [
      "How does pricing work?",
      "Can I integrate WhatsApp?"
    ]
  }
}


👉 This supports arbitrary nesting, arrays, and objects safely.

2️⃣ Does the user need to wrap things in {{ }}?

Short answer:

👉 NO — your end user should never type {{ }}.
Only your action designer (you / admin UI) uses {{}} in stored templates.

Here’s how roles should work:

Person	Uses {{}}?	Why
You (platform builder)	✅ Yes	In stored templates
LLM	❌ No	It just sends JSON values
End user in chat	❌ No	They just say things in plain English
How it works in practice
Step 1 — You define action (in dashboard)

You store:

{
  "bodySchema": {
    "chatbotId": "{{chatbotId}}",
    "partial": "{{widgetConfig}}"
  }
}

Step 2 — You define tool schema for LLM
{
  "name": "deploy_widget",
  "parameters": {
    "type": "object",
    "properties": {
      "chatbotId": {
        "type": "string",
        "description": "ID of the chatbot"
      },
      "widgetConfig": {
        "type": "object",
        "description": "Widget UI settings"
      }
    },
    "required": ["chatbotId", "widgetConfig"]
  }
}

Step 3 — User chats normally

User says:

“Deploy my widget with dark theme and show suggested messages.”

Step 4 — LLM returns structured args (no braces)
{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "widgetConfig": {
    "styles": {
      "appearance": "dark"
    },
    "suggestedMessages": [
      "How can I automate support?",
      "Can I connect WhatsApp?"
    ]
  }
}

Step 5 — Your backend merges into template

Final body:

{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "partial": {
    "styles": { "appearance": "dark" },
    "suggestedMessages": [
      "How can I automate support?",
      "Can I connect WhatsApp?"
    ]
  }
}

3️⃣ Mental model (important)

Think of {{}} as:

“Plug LLM value here”

Not as something users type.

It’s like a variable in code:

const body = {
  chatbotId: args.chatbotId,
  partial: args.widgetConfig
}


Your JSON template is just a declarative version of that.

4️⃣ How this maps to your current system

Right now you have:

bodyStr := t.interpolateParams(template, params)


👉 You should replace that with:

bodyBytes, _ := t.buildStructuredBody(params)


Because string interpolation = fragile, structured replacement = robust.

5️⃣ If you want, I can give you:

I can give you:

✅ Exact Go function to handle nested bodies

✅ New APIConfig struct

✅ Updated executeRequest()

✅ How to map LLM args → body/query/path cleanly

If you want that, say:

👉 “Give me the final Go refactor.”


this is my chat with someone. 

i am pondering about how should i take information about custom actions from user, 

and how will LLM be able to call this custom action properly with proper body json cunstruction, headers, url query params. 



---

**Cursor**

Let me look at your current implementation to give you specific guidance.

Now I see the full picture. Here's the core problem and the solution:

## The Real Problem

Your current flow is:

```
LLM sends: { "userId": "123", "amount": 500, "status": "active" }
                    ↓
Your code tries: interpolateParams(bodyTemplate, params)
                    ↓
Problem: You don't know WHERE each param should go
         (body? query? path? header?)
```

You have **two separate configs** that don't talk to each other:
1. `ToolSchema` - what LLM sees (just parameter names + types)
2. `APIConfig` - how to build HTTP request (templates with `{{}}`)

**There's no mapping between them.**

## The Solution: Parameter Binding

Each parameter the LLM can send needs to know **where it goes** in the request.

### Recommended Schema Design

```go
// Where a parameter value should be placed in the request
type ParamLocation string

const (
    LocationPath   ParamLocation = "path"    // /users/{userId}
    LocationQuery  ParamLocation = "query"   // ?status=active
    LocationHeader ParamLocation = "header"  // X-Tenant: abc
    LocationBody   ParamLocation = "body"    // {"amount": 500}
)

// ActionParameter - the SINGLE source of truth for each parameter
type ActionParameter struct {
    Name        string        `json:"name"`
    Type        ParameterType `json:"type"`
    Description string        `json:"description"`       // For LLM + UI
    Required    bool          `json:"required"`
    Default     interface{}   `json:"default,omitempty"`
    
    // WHERE this param goes in the request
    Location    ParamLocation `json:"location"`          
    
    // For body params: JSONPath to where it lands (e.g., "order.items")
    BodyPath    string        `json:"body_path,omitempty"`
    
    // For query/header: the actual key name if different from Name
    Key         string        `json:"key,omitempty"`      // defaults to Name
}
```

### New APIConfig

```go
type CustomActionConfig struct {
    Method   HttpMethod `json:"method"`
    BaseURL  string     `json:"base_url"`
    Endpoint string     `json:"endpoint"`    // "/users/{userId}/orders"
    
    // Static headers (auth, content-type, etc.)
    StaticHeaders map[string]string `json:"static_headers,omitempty"`
    
    // Static body fields that never change
    StaticBody map[string]interface{} `json:"static_body,omitempty"`
    
    // Auth config
    AuthType  AuthType `json:"auth_type,omitempty"`
    AuthValue string   `json:"auth_value,omitempty"`
    
    // ... other fields
}

type CustomAction struct {
    // ... existing fields ...
    
    // THE KEY CHANGE: unified parameters with bindings
    Parameters []ActionParameter `json:"parameters"`
    
    APIConfig CustomActionConfig `json:"api_config"`
    
    // ToolSchema is now DERIVED from Parameters, not stored separately
}
```

## How the Flow Works

### 1. User Creates Action (in your dashboard)

User fills out:
```json
{
  "name": "create_order",
  "description": "Create a new order for a user",
  
  "apiConfig": {
    "method": "POST",
    "baseUrl": "https://api.example.com",
    "endpoint": "/users/{userId}/orders",
    "staticBody": {
      "source": "chatbot",
      "apiVersion": "v2"
    }
  },
  
  "parameters": [
    {
      "name": "userId",
      "type": "string",
      "description": "The user's unique ID",
      "required": true,
      "location": "path"
    },
    {
      "name": "status",
      "type": "string",
      "description": "Order status filter",
      "required": false,
      "default": "active",
      "location": "query"
    },
    {
      "name": "amount",
      "type": "number",
      "description": "Order total in cents",
      "required": true,
      "location": "body",
      "bodyPath": "order.amount"
    },
    {
      "name": "items",
      "type": "array",
      "description": "List of items in the order",
      "required": true,
      "location": "body",
      "bodyPath": "order.items"
    }
  ]
}
```

### 2. Generate ToolSchema for LLM (derived, not stored)

```go
func (a *CustomAction) GenerateToolSchema() ToolSchema {
    properties := make(map[string]interface{})
    required := []string{}
    
    for _, p := range a.Parameters {
        properties[p.Name] = map[string]interface{}{
            "type":        string(p.Type),
            "description": p.Description,
        }
        if p.Required {
            required = append(required, p.Name)
        }
    }
    
    return ToolSchema{
        Type:       "object",
        Properties: properties,
        Required:   required,
    }
}
```

### 3. LLM Calls the Tool

LLM sends:
```json
{
  "userId": "user_123",
  "amount": 5000,
  "items": [{"sku": "ABC", "qty": 2}]
}
```

### 4. Your Backend Builds the Request

```go
func (t *CustomActionTool) buildRequest(ctx context.Context, params map[string]interface{}) (*http.Request, error) {
    cfg := t.action.APIConfig
    
    // 1. Build URL with path params
    url := cfg.BaseURL + cfg.Endpoint
    
    // 2. Build query string
    query := neturl.Values{}
    
    // 3. Build body (start with static)
    body := deepCopy(cfg.StaticBody)
    
    // 4. Route each param to its location
    for _, p := range t.action.Parameters {
        val, exists := params[p.Name]
        if !exists {
            if p.Required {
                return nil, fmt.Errorf("missing required param: %s", p.Name)
            }
            if p.Default != nil {
                val = p.Default
            } else {
                continue
            }
        }
        
        key := p.Key
        if key == "" {
            key = p.Name
        }
        
        switch p.Location {
        case LocationPath:
            url = strings.ReplaceAll(url, "{"+p.Name+"}", fmt.Sprint(val))
            
        case LocationQuery:
            query.Set(key, fmt.Sprint(val))
            
        case LocationHeader:
            // handled separately
            
        case LocationBody:
            setNestedValue(body, p.BodyPath, val) // handles "order.items" → body["order"]["items"]
        }
    }
    
    // 5. Construct final request
    if len(query) > 0 {
        url += "?" + query.Encode()
    }
    
    bodyBytes, _ := json.Marshal(body)
    req, _ := http.NewRequestWithContext(ctx, string(cfg.Method), url, bytes.NewReader(bodyBytes))
    
    return req, nil
}
```

### 5. Final HTTP Request

```
POST /users/user_123/orders?status=active HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "source": "chatbot",
  "apiVersion": "v2",
  "order": {
    "amount": 5000,
    "items": [{"sku": "ABC", "qty": 2}]
  }
}
```

## Helper for Nested Body Paths

```go
// setNestedValue sets a value at a dot-notation path like "order.items"
func setNestedValue(obj map[string]interface{}, path string, value interface{}) {
    if path == "" {
        // Top-level, merge if value is a map
        return
    }
    
    parts := strings.Split(path, ".")
    current := obj
    
    for i, part := range parts {
        if i == len(parts)-1 {
            current[part] = value
        } else {
            if _, exists := current[part]; !exists {
                current[part] = make(map[string]interface{})
            }
            current = current[part].(map[string]interface{})
        }
    }
}
```

## Summary

| What | Before | After |
|------|--------|-------|
| Body | String template with `{{}}` | Structured JSON + `bodyPath` |
| Param locations | Implicit (guessing) | Explicit `location` field |
| Schema for LLM | Separate, manually synced | Derived from `parameters` |
| Nested objects | Breaks | Works via `bodyPath: "order.items"` |
| User input | Just fills `{{}}` | Clear: "this goes to body at path X" |

The key insight: **`{{}}` is for the user creating the action, NOT for the LLM calling it.** The LLM just sends plain JSON values, and your backend routes them based on `location` + `bodyPath`.

---

**User**

if i want to create a tool to fetch widget config for user's chatbot. 
how will that work? 



here is the curl. : 

curl 'https://terminal.apps.verlyai.xyz/api/v1/deploy/widget/external?chatbotId=a7zzrm5gpn4pax804olp52tp' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -b 'ext_name=ojplmecpdpgccookcobabopnaifgidhf; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTc3MTI0MDc3OH0.RXLErVVzGwgbtNcrPT8xUp-3_tGQWMPo1V6KKitwhKI; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTgwMDIwNjM3OH0.ZyJ6HhyNEIviuACxstcDXW2n8ZjmrCQNrGUlwhpnBbo' \
  -H 'if-none-match: W/"3f9-ODWdVZ2C5wKDWLDssPMyeDB1J2o"' \
  -H 'origin: https://verlyai.xyz' \
  -H 'priority: u=1, i' \
  -H 'referer: https://verlyai.xyz/' \
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'



what should be stored in db? for this tool

---

**Cursor**

Good example. Let me break this down:

## What the LLM needs to know

For this action, the LLM only needs ONE input: `chatbotId`

Everything else (auth, headers) is static config that the user sets up once.

## What to Store in DB

```json
{
  "name": "get_widget_config",
  "displayName": "Get Widget Configuration",
  "description": "Fetch the current widget configuration for a chatbot. Use this when the user asks about their widget settings, appearance, or wants to see their current config.",
  
  "apiConfig": {
    "method": "GET",
    "baseUrl": "https://terminal.apps.verlyai.xyz",
    "endpoint": "/api/v1/deploy/widget/external",
    
    "staticHeaders": {
      "accept": "application/json"
    },
    
    "authType": "bearer",
    "authValue": "{{AUTH_TOKEN}}"
  },
  
  "parameters": [
    {
      "name": "chatbotId",
      "type": "string",
      "description": "The unique identifier of the chatbot to fetch widget config for",
      "required": true,
      "location": "query",
      "key": "chatbotId"
    }
  ]
}
```

## How Each Piece Gets Used

| Stored Config | What Happens |
|---------------|--------------|
| `method: GET` | → `GET` request |
| `endpoint: /api/v1/deploy/widget/external` | → URL path |
| `parameters[0].location: "query"` | → `chatbotId` goes to query string |
| `authType: bearer` | → Adds `Authorization: Bearer <token>` header |

## The Flow

**1. User in chat says:**
> "What's my widget config?"

**2. LLM decides to call the tool with:**
```json
{
  "name": "get_widget_config",
  "arguments": {
    "chatbotId": "a7zzrm5gpn4pax804olp52tp"
  }
}
```

**3. Your backend builds:**
```
GET /api/v1/deploy/widget/external?chatbotId=a7zzrm5gpn4pax804olp52tp
Host: terminal.apps.verlyai.xyz
Authorization: Bearer eyJhbGci...
Accept: application/json
```

**4. Response goes back to LLM, LLM summarizes for user.**

## About the Auth Token

You have a choice here:

| Option | Stored As | Notes |
|--------|-----------|-------|
| **Hardcoded** | `"authValue": "eyJhbGci..."` | Simple but token expires |
| **Per-chatbot secret** | `"authValue": "{{CHATBOT_AUTH}}"` | Resolve from chatbot's stored secrets |
| **User's session** | Inject at runtime | Most flexible, token comes from current user session |

For internal APIs (your own services), I'd recommend storing a **service account token** or using a **secret reference** like `{{secrets.TERMINAL_API_KEY}}` that you resolve at runtime.

## Minimal Go Code Change

In your `executeRequest`, you'd do:

```go
// Build query params from parameters with location=query
query := url.Values{}
for _, p := range t.action.Parameters {
    if p.Location == "query" {
        if val, ok := params[p.Name]; ok {
            key := p.Key
            if key == "" {
                key = p.Name
            }
            query.Set(key, fmt.Sprint(val))
        }
    }
}

finalURL := baseURL + endpoint
if len(query) > 0 {
    finalURL += "?" + query.Encode()
}
```

## What the ToolSchema for LLM Looks Like (auto-generated)

```json
{
  "name": "get_widget_config",
  "description": "Fetch the current widget configuration for a chatbot...",
  "parameters": {
    "type": "object",
    "properties": {
      "chatbotId": {
        "type": "string",
        "description": "The unique identifier of the chatbot to fetch widget config for"
      }
    },
    "required": ["chatbotId"]
  }
}
```

The LLM sees this clean schema. It doesn't know or care that it's a GET with query params — your backend handles that routing.

---

**User**

curl 'https://terminal.apps.verlyai.xyz/api/v1/deploy/widget' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'content-type: application/json' \
  -b 'ext_name=ojplmecpdpgccookcobabopnaifgidhf; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTc3MTI0MDc3OH0.RXLErVVzGwgbtNcrPT8xUp-3_tGQWMPo1V6KKitwhKI; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTk4YjdiMy0zYTQyLTQ3NDAtYTg1Yy0xNTAzMGIzZjNkYjciLCJsYXN0TG9naW4iOiIyMDI2LTAxLTE3VDExOjE5OjM4Ljg2OFoiLCJpYXQiOjE3Njg2NDg3NzgsImV4cCI6MTgwMDIwNjM3OH0.ZyJ6HhyNEIviuACxstcDXW2n8ZjmrCQNrGUlwhpnBbo' \
  -H 'origin: https://verlyai.xyz' \
  -H 'priority: u=1, i' \
  -H 'referer: https://verlyai.xyz/' \
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' \
  --data-raw $'{"chatbotId":"g2qq9wiocg17lyd5hse821bf","partial":{"styles":{"appearance":"light","displayName":"VerlyAI General AI Agent","primaryColor":"#062c59","widgetBubbleColour":"#062c59","PrimaryIcon":"https://verlyai.xyz/verly_logo.png","widgeticon":"chat","alignChatButton":"right","showButtonText":false,"buttonText":"Chat with us","messagePlaceholder":"Message...","footerText":"","dismissableNoticeText":"","chatWidth":"350px","chatHeight":"500px","autoShowInitial":false,"autoShowDelaySec":3,"collectUserFeedback":false,"regenerateMessages":true,"continueShowingSuggestedMessages":false},"onlyAllowOnAddedDomains":false,"initialMessage":"Hi\u0021 👋 How can I help you with VerlyAI General AI Agent today?","suggestedMessages":["How can VerlyAI automate my customer support?","What channels can VerlyAI agents deploy on?","Can VerlyAI broadcast promotional messages on WhatsApp?","How does VerlyAI connect to my existing data?"]},"mode":"dev"}'


for this?

---

**Cursor**

This is more interesting — it's a POST with a nested body. The question is: **what should the LLM be able to change?**

## Realistic User Requests

- "Change my widget color to blue"
- "Update the welcome message to say 'Hello!'"
- "Add 'How do I get started?' to suggested messages"
- "Make the chat window bigger"
- "Change the display name to 'Support Bot'"

## What to Store

```json
{
  "name": "update_widget_config",
  "displayName": "Update Widget Configuration",
  "description": "Update the widget appearance or behavior settings. Use when user wants to change colors, messages, size, or other widget settings.",
  
  "apiConfig": {
    "method": "POST",
    "baseUrl": "https://terminal.apps.verlyai.xyz",
    "endpoint": "/api/v1/deploy/widget",
    
    "staticHeaders": {
      "content-type": "application/json"
    },
    
    "staticBody": {
      "mode": "dev"
    },
    
    "authType": "bearer",
    "authValue": "{{AUTH_TOKEN}}"
  },
  
  "parameters": [
    {
      "name": "chatbotId",
      "type": "string",
      "description": "The chatbot ID to update",
      "required": true,
      "location": "body",
      "bodyPath": "chatbotId"
    },
    {
      "name": "displayName",
      "type": "string",
      "description": "The name shown in the widget header",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.displayName"
    },
    {
      "name": "primaryColor",
      "type": "string",
      "description": "Main color in hex format (e.g., #3B82F6 for blue)",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.primaryColor"
    },
    {
      "name": "widgetBubbleColour",
      "type": "string",
      "description": "Chat bubble button color in hex",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.widgetBubbleColour"
    },
    {
      "name": "chatWidth",
      "type": "string",
      "description": "Widget width (e.g., '400px')",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.chatWidth"
    },
    {
      "name": "chatHeight",
      "type": "string",
      "description": "Widget height (e.g., '600px')",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.chatHeight"
    },
    {
      "name": "initialMessage",
      "type": "string",
      "description": "The welcome message shown when chat opens",
      "required": false,
      "location": "body",
      "bodyPath": "partial.initialMessage"
    },
    {
      "name": "suggestedMessages",
      "type": "array",
      "description": "List of suggested question buttons to show",
      "required": false,
      "location": "body",
      "bodyPath": "partial.suggestedMessages"
    },
    {
      "name": "messagePlaceholder",
      "type": "string",
      "description": "Placeholder text in the input field",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.messagePlaceholder"
    },
    {
      "name": "alignChatButton",
      "type": "string",
      "description": "Position of chat button: 'left' or 'right'",
      "required": false,
      "location": "body",
      "bodyPath": "partial.styles.alignChatButton"
    }
  ]
}
```

## How It Works

**User says:** "Change my widget color to blue and update the welcome message"

**LLM calls:**
```json
{
  "name": "update_widget_config",
  "arguments": {
    "chatbotId": "g2qq9wiocg17lyd5hse821bf",
    "primaryColor": "#3B82F6",
    "widgetBubbleColour": "#3B82F6",
    "initialMessage": "Hi! 👋 How can I help you today?"
  }
}
```

**Your backend builds this body:**
```json
{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "mode": "dev",
  "partial": {
    "styles": {
      "primaryColor": "#3B82F6",
      "widgetBubbleColour": "#3B82F6"
    },
    "initialMessage": "Hi! 👋 How can I help you today?"
  }
}
```

## The Key: `bodyPath` Builds Nested Structure

| Parameter | bodyPath | Results In |
|-----------|----------|------------|
| `chatbotId` | `"chatbotId"` | `body.chatbotId = "..."` |
| `primaryColor` | `"partial.styles.primaryColor"` | `body.partial.styles.primaryColor = "#..."` |
| `initialMessage` | `"partial.initialMessage"` | `body.partial.initialMessage = "..."` |
| `suggestedMessages` | `"partial.suggestedMessages"` | `body.partial.suggestedMessages = [...]` |

## Body Builder Logic (Go)

```go
func buildBody(staticBody map[string]interface{}, params []ActionParameter, args map[string]interface{}) map[string]interface{} {
    body := deepCopy(staticBody) // start with {"mode": "dev"}
    
    for _, p := range params {
        if p.Location != "body" {
            continue
        }
        
        val, exists := args[p.Name]
        if !exists {
            continue // skip optional params not provided
        }
        
        setNestedValue(body, p.BodyPath, val)
    }
    
    return body
}

// setNestedValue handles "partial.styles.primaryColor" → nested map
func setNestedValue(obj map[string]interface{}, path string, value interface{}) {
    parts := strings.Split(path, ".")
    current := obj
    
    for i, part := range parts {
        if i == len(parts)-1 {
            current[part] = value
            return
        }
        
        if _, exists := current[part]; !exists {
            current[part] = make(map[string]interface{})
        }
        current = current[part].(map[string]interface{})
    }
}
```

## What LLM Sees (Generated ToolSchema)

```json
{
  "name": "update_widget_config",
  "description": "Update the widget appearance or behavior settings...",
  "parameters": {
    "type": "object",
    "properties": {
      "chatbotId": {"type": "string", "description": "The chatbot ID to update"},
      "displayName": {"type": "string", "description": "The name shown in the widget header"},
      "primaryColor": {"type": "string", "description": "Main color in hex format (e.g., #3B82F6 for blue)"},
      "initialMessage": {"type": "string", "description": "The welcome message shown when chat opens"},
      "suggestedMessages": {"type": "array", "description": "List of suggested question buttons"}
    },
    "required": ["chatbotId"]
  }
}
```

LLM has no idea about `partial.styles.whatever` — it just knows "send `primaryColor`" and your backend handles the rest.

## Design Choice: Expose Everything vs. Curated Fields

You could expose ALL fields in the original body, but I'd recommend **curating** what the LLM can touch:

| Approach | Pros | Cons |
|----------|------|------|
| **Curated** (shown above) | Safer, better UX, cleaner prompts | More work to set up |
| **Pass-through** (entire `partial` object) | Flexible | LLM might send garbage, harder to validate |

For a chatbot platform, curated is almost always better — you control what users can change via chat.

---

**User**

ok...understood. 

but suppose the body json was nested one. 

then how will you store it and restore it in curl while sending actual request? 

the above curl which i gave, it have nested json. no?

---

**Cursor**

Yes, the body is nested:

```json
{
  "chatbotId": "...",
  "partial": {
    "styles": {
      "appearance": "light",
      "primaryColor": "#062c59",
      ...
    },
    "initialMessage": "...",
    "suggestedMessages": [...]
  },
  "mode": "dev"
}
```

The question is: **if LLM only sends `primaryColor`, how do you build the nested structure?**

## Answer: `bodyPath` Creates the Nesting Automatically

You DON'T store the nested JSON. You store **flat parameters with paths**, and your code builds the nesting.

### What's Stored (flat)

```json
{
  "parameters": [
    { "name": "chatbotId", "bodyPath": "chatbotId" },
    { "name": "primaryColor", "bodyPath": "partial.styles.primaryColor" },
    { "name": "initialMessage", "bodyPath": "partial.initialMessage" }
  ],
  "staticBody": {
    "mode": "dev"
  }
}
```

### What LLM Sends (flat)

```json
{
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "primaryColor": "#3B82F6"
}
```

### How `setNestedValue` Builds the Nesting

```go
func setNestedValue(obj map[string]interface{}, path string, value interface{}) {
    parts := strings.Split(path, ".")
    current := obj
    
    for i, part := range parts {
        if i == len(parts)-1 {
            // Last part: set the value
            current[part] = value
            return
        }
        
        // Not last: create nested map if doesn't exist
        if _, exists := current[part]; !exists {
            current[part] = make(map[string]interface{})
        }
        current = current[part].(map[string]interface{})
    }
}
```

### Step-by-Step Execution

```
Start with: {"mode": "dev"}

1. setNestedValue(body, "chatbotId", "g2qq...")
   → {"mode": "dev", "chatbotId": "g2qq..."}

2. setNestedValue(body, "partial.styles.primaryColor", "#3B82F6")
   
   parts = ["partial", "styles", "primaryColor"]
   
   i=0: "partial" doesn't exist → create empty map
        body = {"mode": "dev", "chatbotId": "...", "partial": {}}
   
   i=1: "styles" doesn't exist in partial → create empty map
        body = {"mode": "dev", "chatbotId": "...", "partial": {"styles": {}}}
   
   i=2: last part → set value
        body = {"mode": "dev", "chatbotId": "...", "partial": {"styles": {"primaryColor": "#3B82F6"}}}
```

### Final Body Sent

```json
{
  "mode": "dev",
  "chatbotId": "g2qq9wiocg17lyd5hse821bf",
  "partial": {
    "styles": {
      "primaryColor": "#3B82F6"
    }
  }
}
```

## But Wait — What About Other Fields?

Your API might expect **all** fields in `partial.styles`, not just `primaryColor`.

Two approaches:

### Option A: API Supports Partial Updates (PATCH-like)

If your API merges with existing config, you're done. Just send what changed.

### Option B: You Need Full Object → Fetch-Merge-Send

```go
func (t *CustomActionTool) executeRequest(ctx context.Context, args map[string]interface{}) (string, error) {
    // 1. First fetch current config
    currentConfig, err := t.fetchCurrentConfig(args["chatbotId"].(string))
    if err != nil {
        return "", err
    }
    
    // 2. Deep merge LLM changes into current config
    for _, p := range t.action.Parameters {
        if p.Location != "body" {
            continue
        }
        if val, exists := args[p.Name]; exists {
            setNestedValue(currentConfig, p.BodyPath, val)
        }
    }
    
    // 3. Send merged config
    bodyBytes, _ := json.Marshal(currentConfig)
    // ... send request
}
```

This way:
- Fetch: `{"partial": {"styles": {"appearance": "light", "primaryColor": "#062c59", ...}}}`
- LLM says: change `primaryColor` to `#3B82F6`
- Merge: `{"partial": {"styles": {"appearance": "light", "primaryColor": "#3B82F6", ...}}}`
- Send full object

## Visual Summary

```
┌─────────────────────────────────────────────────────────┐
│ STORED IN DB (flat)                                     │
├─────────────────────────────────────────────────────────┤
│ parameters:                                             │
│   - name: "primaryColor"                                │
│     bodyPath: "partial.styles.primaryColor"             │
│   - name: "initialMessage"                              │
│     bodyPath: "partial.initialMessage"                  │
│                                                         │
│ staticBody: {"mode": "dev"}                             │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ LLM SENDS (flat)                                        │
├─────────────────────────────────────────────────────────┤
│ { "primaryColor": "#3B82F6" }                           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ setNestedValue() BUILDS NESTING                         │
├─────────────────────────────────────────────────────────┤
│ "partial.styles.primaryColor" = "#3B82F6"               │
│                                                         │
│ Creates: partial → styles → primaryColor                │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ FINAL HTTP BODY (nested)                                │
├─────────────────────────────────────────────────────────┤
│ {                                                       │
│   "mode": "dev",                                        │
│   "partial": {                                          │
│     "styles": {                                         │
│       "primaryColor": "#3B82F6"                         │
│     }                                                   │
│   }                                                     │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
```

The nesting is **reconstructed at runtime** from the flat `bodyPath` — you never store the nested structure.

---

**User**

// Custom Actions Table export const customActions = pgTable('custom_actions', { id: text('id').primaryKey().notNull().$defaultFn(() => createId()), chatbotId: text('chatbot_id').notNull(), branch: branchType('branch').notNull().default('DEV'), logicalId: uuid('logical_id').notNull().$defaultFn(() => crypto.randomUUID()), // Metadata name: varchar('name', { length: 100 }).notNull(), displayName: varchar('display_name', { length: 200 }).notNull(), description: text('description').notNull(), isEnabled: boolean('is_enabled').default(true).notNull(), // API Configuration (JSONB for flexibility) apiConfig: json('api_config').notNull(), // Contains method, base_url, endpoint, headers, etc. // Tool Schema (for LLM consumption) toolSchema: json('tool_schema').notNull(), // JSON Schema format for parameters // Metadata version: integer('version').default(1).notNull(), createdAt: timestamp('created_at', { mode: 'date', precision: 6 }).defaultNow(), updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 }).defaultNow(), createdBy: text('created_by'), lastTestedAt: timestamp('last_tested_at', { mode: 'date', precision: 6 }), testStatus: testStatus('test_status').default('not_tested'), testResult: json('test_result'), }, (table) => [ unique('custom_actions_chatbot_branch_logical_unique').on(table.chatbotId, table.branch, table.logicalId), // Foreign keys foreignKey({ columns: [table.chatbotId], foreignColumns: [chatBots.id], name: 'custom_actions_chatbot_id_fkey', }) .onUpdate('cascade') .onDelete('cascade'), foreignKey({ columns: [table.createdBy], foreignColumns: [user.id], name: 'custom_actions_created_by_fkey', }) .onUpdate('cascade') .onDelete('set null'), // Unique constraint (action name unique per chatbot per branch) unique('unique_action_per_chatbot_branch').on(table.chatbotId, table.name, table.branch), // Indexes index('custom_actions_chatbot_enabled_idx').on(table.chatbotId).where(sql${table.isEnabled} = true), index('custom_actions_chatbot_name_idx').on(table.chatbotId, table.name), index('custom_actions_branch_idx').on(table.chatbotId, table.branch), index('custom_actions_updated_idx').on(table.updatedAt.desc()), ]);



are there any changes needed in schema for storing in db?

---

**Cursor**

Your schema is close, but I'd recommend one key change: **add a `parameters` column and make `toolSchema` optional/derived**.

## Current Schema Issue

You have:
- `apiConfig` → HTTP config (method, url, etc.)
- `toolSchema` → what LLM sees

**Missing:** The mapping layer (where each param goes: body/query/path/header + bodyPath)

## Recommended Changes

```typescript
// Custom Actions Table
export const customActions = pgTable('custom_actions', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  chatbotId: text('chatbot_id').notNull(),
  branch: branchType('branch').notNull().default('DEV'),
  logicalId: uuid('logical_id').notNull().$defaultFn(() => crypto.randomUUID()),
  
  // Metadata
  name: varchar('name', { length: 100 }).notNull(),
  displayName: varchar('display_name', { length: 200 }).notNull(),
  description: text('description').notNull(),
  isEnabled: boolean('is_enabled').default(true).notNull(),

  // API Configuration (JSONB)
  apiConfig: json('api_config').notNull(),
  // Contains: method, baseUrl, endpoint, staticHeaders, staticBody, authType, authValue, etc.

  // ⬇️ NEW: Parameter bindings with locations
  parameters: json('parameters').notNull().default([]),
  // Array of: { name, type, description, required, location, bodyPath, key, default }

  // ⬇️ CHANGE: Make toolSchema optional (can be derived from parameters)
  toolSchema: json('tool_schema'),  // Optional override, otherwise derived
  
  // ... rest stays the same
});
```

## What Goes Where

### `apiConfig` (HTTP config)

```typescript
type ApiConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  baseUrl: string;
  endpoint: string;                    // "/users/{userId}/orders"
  staticHeaders?: Record<string, string>;
  staticBody?: Record<string, any>;    // Fields that never change
  authType?: 'none' | 'bearer' | 'api_key' | 'basic';
  authValue?: string;
  responseMapping?: string;
  successCodes?: number[];
  timeoutSeconds?: number;
  retryCount?: number;
};
```

### `parameters` (NEW - the binding layer)

```typescript
type ActionParameter = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  default?: any;
  
  // WHERE it goes in the request
  location: 'path' | 'query' | 'header' | 'body';
  
  // For body params: dot-notation path
  bodyPath?: string;  // e.g., "partial.styles.primaryColor"
  
  // For query/header: actual key name if different from `name`
  key?: string;
  
  // Validation (optional)
  enum?: string[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
};

// Stored as: parameters: ActionParameter[]
```

### `toolSchema` (optional/derived)

```typescript
// Option A: Don't store, derive at runtime
function deriveToolSchema(params: ActionParameter[]): ToolSchema {
  return {
    type: 'object',
    properties: Object.fromEntries(
      params.map(p => [p.name, { type: p.type, description: p.description }])
    ),
    required: params.filter(p => p.required).map(p => p.name),
  };
}

// Option B: Store as optional override for special cases
toolSchema: json('tool_schema'),  // null = derive from parameters
```

## Migration

If you want to keep backwards compatibility:

```typescript
// In your Go/TS code:
func (a *CustomAction) GetToolSchema() ToolSchema {
    // If explicitly set, use it
    if a.ToolSchema != nil {
        return *a.ToolSchema
    }
    // Otherwise derive from parameters
    return deriveFromParameters(a.Parameters)
}
```

## Final Schema

```typescript
export const customActions = pgTable('custom_actions', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  chatbotId: text('chatbot_id').notNull(),
  branch: branchType('branch').notNull().default('DEV'),
  logicalId: uuid('logical_id').notNull().$defaultFn(() => crypto.randomUUID()),
  
  name: varchar('name', { length: 100 }).notNull(),
  displayName: varchar('display_name', { length: 200 }).notNull(),
  description: text('description').notNull(),
  isEnabled: boolean('is_enabled').default(true).notNull(),

  // HTTP configuration
  apiConfig: json('api_config').$type<ApiConfig>().notNull(),
  
  // Parameter bindings (name → location in request)
  parameters: json('parameters').$type<ActionParameter[]>().notNull().default([]),
  
  // Optional: explicit tool schema override (null = derive from parameters)
  toolSchema: json('tool_schema').$type<ToolSchema>(),

  version: integer('version').default(1).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 6 }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 }).defaultNow(),
  createdBy: text('created_by'),
  lastTestedAt: timestamp('last_tested_at', { mode: 'date', precision: 6 }),
  testStatus: testStatus('test_status').default('not_tested'),
  testResult: json('test_result'),
}, (table) => [
  // ... same constraints/indexes
]);
```

## Summary of Changes

| Column | Before | After |
|--------|--------|-------|
| `apiConfig` | Has `bodyTemplate` string | Has `staticBody` object, no templates |
| `parameters` | ❌ Didn't exist | ✅ Array with `location` + `bodyPath` |
| `toolSchema` | Required, stored | Optional, can derive from `parameters` |

The key addition is `parameters` — that's where the magic happens. Everything else is cleanup.

---

**User**

in static body, there can be nesting also. no? 

---

**Cursor**

Yes, exactly. `staticBody` can be arbitrarily nested — it's just a JSON object that gets deep-merged with the dynamic params.

## Example

```typescript
{
  "apiConfig": {
    "method": "POST",
    "baseUrl": "https://api.example.com",
    "endpoint": "/api/v1/deploy/widget",
    
    "staticBody": {
      "mode": "dev",
      "partial": {
        "styles": {
          "appearance": "light",
          "showButtonText": false,
          "collectUserFeedback": false,
          "regenerateMessages": true
        },
        "onlyAllowOnAddedDomains": false
      }
    }
  },
  
  "parameters": [
    { "name": "chatbotId", "location": "body", "bodyPath": "chatbotId" },
    { "name": "primaryColor", "location": "body", "bodyPath": "partial.styles.primaryColor" },
    { "name": "initialMessage", "location": "body", "bodyPath": "partial.initialMessage" }
  ]
}
```

## What Happens at Runtime

**LLM sends:**
```json
{
  "chatbotId": "abc123",
  "primaryColor": "#3B82F6",
  "initialMessage": "Hello!"
}
```

**Start with staticBody:**
```json
{
  "mode": "dev",
  "partial": {
    "styles": {
      "appearance": "light",
      "showButtonText": false,
      "collectUserFeedback": false,
      "regenerateMessages": true
    },
    "onlyAllowOnAddedDomains": false
  }
}
```

**Apply dynamic params via bodyPath:**
```json
{
  "mode": "dev",
  "chatbotId": "abc123",                          // ← added
  "partial": {
    "styles": {
      "appearance": "light",
      "showButtonText": false,
      "collectUserFeedback": false,
      "regenerateMessages": true,
      "primaryColor": "#3B82F6"                   // ← added (merged into existing styles)
    },
    "onlyAllowOnAddedDomains": false,
    "initialMessage": "Hello!"                    // ← added
  }
}
```

## The Build Logic

```go
func buildBody(staticBody map[string]interface{}, params []ActionParameter, args map[string]interface{}) map[string]interface{} {
    // 1. Deep copy static body (preserves all nesting)
    body := deepCopy(staticBody)
    
    // 2. Set each dynamic param at its bodyPath
    for _, p := range params {
        if p.Location != "body" {
            continue
        }
        if val, exists := args[p.Name]; exists {
            setNestedValue(body, p.BodyPath, val)  // merges into existing structure
        }
    }
    
    return body
}
```

The key insight: `setNestedValue` doesn't replace the whole `partial.styles` object — it only sets the specific leaf node (`primaryColor`), leaving the rest of `styles` intact.

## So Yes

`staticBody` = any nested JSON structure with fields that **never change**

`parameters` with `bodyPath` = fields that the **LLM controls**

They merge together at runtime.

