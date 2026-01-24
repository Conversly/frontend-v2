## Backend changes needed for competitor-style Custom Actions

This UI now collects two fields that your backend/docs currently don’t persist:

- **`triggerExamples`** (example user queries)
- **`apiConfig.dataAccess`** (`full | limited`)

### 1) Persist `triggerExamples`

**Why:** competitor-style “When to use” includes example queries; UI collects them under `triggerExamples`.

**Storage options:**
- **Preferred (simple):** add a `trigger_examples text[]` column on `custom_actions`
- **Alternative:** store inside a JSON field (e.g. `metadata` jsonb) to avoid schema migrations

**API contract:**
- Create: accept `trigger_examples` (array of strings)
- Update: accept `trigger_examples`
- Get/List: return `trigger_examples`

**Tool/LLM usage (runtime):**
- These examples can be injected into the system prompt / tool description, but they’re primarily UX + training hints.

### 2) Persist `apiConfig.dataAccess`

**Why:** competitor has “Full data access” vs “Limited data access”.

**Storage:** keep it inside existing `api_config` JSON (recommended).

```json
{
  "method": "GET",
  "base_url": "https://api.example.com",
  "endpoint": "/v1/thing",
  "data_access": "limited",
  "response_mapping": "$.data.price"
}
```

**Runtime behavior:**
- `data_access = full`: return full response (formatted JSON) like today.
- `data_access = limited`: apply `response_mapping` and return extracted value.
  - If mapping is empty/invalid/returns empty: **fallback to full response** (matches current server behavior described in `docs/Actions.md`).

### 3) Enforce the 20KB tool output limit

Competitor and your UI both warn about a **20KB maximum**. Enforce it server-side where the tool result is returned to the agent.

**Recommendation:**
- After `handleResponse()` (or equivalent), check `len(result)`:
  - If > 20KB, either:
    - return a clear error like `response too large (>20KB)`, or
    - truncate and return `result[:20000]` with a suffix marker (less ideal because it can cut JSON).

### 4) Keep `responseMapping` semantics aligned with execution

Your backend docs use gjson with `$.` stripped (`$.a.b` → `a.b`). If you validate mapping strings:
- Accept both `$.a.b` and `a.b`
- Support array indexing like `items.0.price` or `items[0].price` (your tool can normalize)

### 5) Update docs (optional but recommended)

Update `client_v2/docs/Actions.md` to include:
- `trigger_examples` on create/update/get
- `data_access` inside `api_config`
- explicit 20KB enforcement behavior (error vs truncate)

