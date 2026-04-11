---
title: Website Integration
description: Add the Verly chatbot widget to your website with one simple code snippet.
canonical_doc_path: /Users/shashanktyagi/Documents/conversly/docs/content/6.Channels/2.integration.md
---

# Website Integration

Want your chatbot live on your website without building anything custom? Copy one snippet from Verly, paste it into your website, and publish the change.

## Copy This Snippet

```html
<script
  src="https://widget.verlyai.xyz/embed.js"
  data-chatbot-id="YOUR_CHATBOT_ID"
  data-position="bottom-right"
  data-primary-color="#4F46E5"
></script>
```

## Where Do I Get This Code?

1. Open your chatbot in Verly.
2. Go to **Customization**.
3. Open the **Integration** section.
4. Copy the embed code shown there.

## Install It On Your Website

1. Open your website editor.
2. Paste the script before the closing `</body>` tag.
3. Save and publish your website.
4. Open your website and test it in a new tab or incognito window.

## Common Places To Paste It

- **WordPress**: Footer code area or header/footer injection plugin
- **Shopify**: `theme.liquid` right before `</body>`
- **Webflow**: **Site settings -> Custom code -> Footer code**
- **Wix / Framer / Squarespace**: Custom code or footer code section
- **Next.js**: `app/layout.tsx` inside `<body>`
- **React / Vite**: `index.html` before `</body>`

## Notes

- `data-chatbot-id` should match your chatbot.
- `data-position` controls where the widget appears.
- `data-primary-color` controls the widget brand color.
- Do not paste the same script twice.

## Troubleshooting

- If the widget does not show, confirm the chatbot ID is correct.
- Make sure you published the website after adding the snippet.
- Search for `widget.verlyai.xyz/embed.js` if the widget appears twice.
