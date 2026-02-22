# PostHog Analytics Guide

This document outlines how PostHog analytics is integrated into the Conversly application, how to use it for tracking, and a comprehensive list of all events currently being tracked.

## Environment Variables

To enable PostHog tracking, the following environment variables must be set in your `.env` file:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com # Or your specific PostHog host
```

## How to Use PostHog in the App

PostHog is provided globally via the `PostHogProvider` client component, which is wrapped around the root layout (`app/layout.tsx`).

To capture events in any client component, simply import `posthog` from the `posthog-js` library:

```tsx
import posthog from 'posthog-js';

// ... inside your component
const handleSomeAction = () => {
  posthog.capture("your_custom_event_name", {
    property_key: "property_value",
  });
};
```

**Key Guidelines for Tracking New Events:**
- Event names should be consistent, lowercase, and use snake_case (e.g., `user_signed_up`, `chatbot_created`).
- Always try to include contextual properties (like `chatbot_id`, `method`, or `plan_name`) so events can be easily filtered and analyzed in the PostHog dashboard.
- Page view events should typically be triggered within a `useEffect` hook on mount.

## Tracked Events

Here is a list of all custom events currently tracked in the application and why they are being tracked:

### Authentication Events
- **`user_signed_up`**: Tracked when a new user registers.
  - *Why*: To measure conversion rates and acquisition channels.
  - *Properties*: `method` ("google_oauth" or "email_password").
- **`user_logged_in`**: Tracked when a user successfully logs in.
  - *Why*: To measure user retention and active usage.
  - *Properties*: `method` ("google_oauth" or "email_password").

### Core Chatbot Events
- **`chatbot_created`**: Tracked when a user finishes the setup wizard step 7.
  - *Why*: Represents successful core activation of the product.
  - *Properties*: `chatbot_id`, `website_url`, `use_case`.
- **`action_created`**: Tracked when a user creates a new custom API action for their bot.
  - *Why*: To see how often advanced webhook/API features are utilized.
  - *Properties*: `chatbot_id`, `action_name`.
- **`action_step_completed`**: Tracked when a user completes a setup step within the custom action creation form.
  - *Why*: To measure user drop-off in the complicated action creation funnel.
  - *Properties*: `chatbot_id`, `step` (1 to 5), `step_name`.
- **`embed_script_copied`**: Tracked when a user copies the embed script or Cursor prompt from the integration tab.
  - *Why*: Indicates intent to deploy the chatbot on an external site.
  - *Properties*: `chatbot_id`, `copy_method` ("manual" or "cursor_prompt").

### Integrations and Upgrades
- **`whatsapp_connected`**: Tracked when a user connects their WhatsApp Business account.
  - *Why*: To measure adoption of the WhatsApp channel integration.
  - *Properties*: `chatbot_id`, `method` ("manual" or "facebook_oauth"), `phone_number_id`, `waba_id`.
- **`integration_setup_clicked`**: Tracked when a user clicks on an integration card to initiate setup.
  - *Why*: To understand which integrations have the highest attempt/intent rate.
  - *Properties*: `chatbot_id`, `integration_id`.
- **`integration_connected`**: Tracked when an integration setup completes successfully.
  - *Why*: To measure successful integration usage.
  - *Properties*: `chatbot_id`, `integration_id`.
- **`integration_disconnected`**: Tracked when a user disconnects an integration.
  - *Why*: To analyze churn rates for specific integrations.
  - *Properties*: `chatbot_id`, `integration_id`.
- **`integration_request_submit_clicked`**: Tracked when a user clicks the "Submit Request" button in the Integrations waitlist modal.
  - *Why*: To measure intent to request an integration, even if the user drops off.
  - *Properties*: `chatbot_id`.
- **`review_and_publish_clicked`**: Tracked when a user clicks "Review & Publish" on the Deploy to Live page.
  - *Why*: To measure how many users attempt to deploy their drafts to the live environment.
  - *Properties*: `chatbot_id`.
- **`integration_requested`**: Tracked when a user successfully submits a request for a new platform integration.
  - *Why*: To prioritize which platform integrations to build next based on user demand.
  - *Properties*: `chatbot_id`, `integration_name`, `email`.
- **`voice_agent_submit_clicked`**: Tracked when a user clicks the "Submit Request" button in the Voice Agent waitlist modal.
  - *Why*: To measure intent to join the waitlist, even if the user encounters validation errors or drops off.
  - *Properties*: `chatbot_id`.
- **`voice_agent_requested`**: Tracked when a user successfully submits the waitlist request form for Voice capabilities.
  - *Why*: Measures demand for voice features to prioritize development.
  - *Properties*: `email`, `use_case`.
- **`subscription_page_viewed`**: Tracked when a user opens the billing/plans page.
  - *Why*: Tracks interest in premium features.
- **`upgrade_clicked`**: Tracked when a user clicks to upgrade/purchase a plan and opens checkout.
  - *Why*: Crucial for conversion funnel tracking from intent to purchase.
  - *Properties*: `plan_name`, `plan_id`, `interval`, `price`.

### Dashboard & Analytics Page Views
*These events track navigation to specific sections of the dashboard to help understand which features users engage with the most.*
- **`playground_page_viewed`**: User visits the bot testing playground.
- **`customize_page_viewed`**: User visits the bot appearance customization page.
- **`behavior_page_viewed`**: User visits the bot behavior/identity configuration page.
- **`behavior_tab_clicked`**: User clicks between "Identity", "Lead Generation", and "Human Handoff" tabs within the Behavior page.
  - *Why*: To measure engagement for specific behavior configuration domains.
  - *Properties*: `chatbot_id`, `tab_id`, `tab_name`.
- **`deploy_page_viewed`**: User visits the deployment instructions page.
- **`data_sources_page_viewed`**: User visits the knowledge base/sources tab.
- **`save_system_prompt_clicked`**: Tracked when a user clicks the "Save System Prompt" button in the Playground page.
  - *Why*: To measure how frequently users tweak and save their bot's core prompt.
  - *Properties*: `chatbot_id`.
- **`embed_script_copied`**: Tracked when a user copies the embed script from the Integration tab in the Customization page.
  - *Why*: To measure successful intent to deploy the widget to a website.
  - *Properties*: `chatbot_id`, `copy_method` ("manual" or "cursor_prompt").
- **`whatsapp_connect_facebook_clicked`**: Tracked when a user clicks the "Connect with Facebook" button during WhatsApp integration.
- **`whatsapp_form_started`**: Tracked when a user starts filling manually the WhatsApp configuration form (first input change).
- **`whatsapp_generate_token_clicked`**: Tracked when a user clicks to generate a verification token.
- **`whatsapp_connect_clicked`**: Tracked when a user clicks the "Connect WhatsApp" button to submit manual credentials.
- **`whatsapp_connected`**: Tracked when a user successfully connects WhatsApp either via Facebook OAuth or manually.
  - *Properties*: `chatbot_id`, `method` ("facebook_oauth" or "manual"), `phone_number_id`, `waba_id`.
- **`subscription_page_viewed`**: User visits the Plans & Billing page.
- **`billing_interval_toggled`**: Tracked when a user switches between the "Monthly" and "Annual" toggle on the pricing page.
  - *Why*: To measure pricing interest and willingness to commit.
  - *Properties*: `interval` ("month" or "year").
- **`upgrade_clicked`**: Tracked when a user clicks a specific plan to upgrade.
  - *Why*: To measure plan selection intent before the checkout starts.
  - *Properties*: `plan_name`, `plan_id`, `interval`, `price`.
- **`checkout_closed`**: Tracked when a user closes the DodoPayments checkout modal without successfully completing the upgrade.
  - *Why*: To measure drop-off or hesitation at the final checkout step.
- **`add_knowledge_clicked`**: Tracked when a user clicks the "Add Knowledge" button on the Data Sources page.
  - *Why*: To measure intent to expand the bot's knowledge base.
  - *Properties*: `chatbot_id`.
- **`data_source_request_integration_clicked`**: Tracked when a user clicks "Request Integration" from the Data Sources sidebar.
  - *Why*: To measure how many users want an automated knowledge sync integration (like Notion, Google Drive) instead of manual uploads.
- **`data_source_integration_submit_clicked`**: Tracked when a user tries to submit the request form from the Data Sources sidebar.
- **`data_source_integration_requested`**: Tracked when a user successfully requests a new data source integration.
  - *Why*: To prioritize building new integrations for the knowledge base.
  - *Properties*: `integration_name`, `email`.
- **`statistics_page_viewed`**: User views the high-level bot statistics.
- **`topics_page_viewed`**: User views the conversation topics breakdown.
- **`chats_page_viewed`**: User views the chat logs history.
- **`leads_page_viewed`**: User views the captured leads table.
- **`live_inbox_page_viewed`**: User opens the real-time agent inbox.
- **`escalation_analytics_page_viewed`**: User views analytics specifically related to human handoff.

### Inbox & Activity Events
- **`data_source_added`**: Tracked when a pending document, website, or text snippet is successfully uploaded/processed.
  - *Why*: Tracks engagement with the knowledge base functionality.
  - *Properties*: `chatbot_id`, `source_type` ("Website", "Document", "QandA", "CSV").
- **`escalation_claimed`**: Tracked in the Live Inbox when a human agent clicks to claim a waiting user.
  - *Why*: To analyze agent responsiveness and inbox usage.
  - *Properties*: `chatbot_id`, `conversation_id`, `escalation_id`.
- **`conversation_closed`**: Tracked when an agent resolves and closes a chat.
  - *Why*: Measures resolution volume.
  - *Properties*: `chatbot_id`, `conversation_id`.
