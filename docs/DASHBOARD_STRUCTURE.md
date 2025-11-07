# Dashboard Structure Documentation

## Overview
This document describes the complete dashboard structure for the Conversly chatbot application, including routing, components, and navigation patterns.

## Route Structure

### Main Dashboard Routes
```
/app/(dashboard)/
├── layout.tsx                  → Dashboard layout with header
└── chatbot/
    ├── page.tsx               → List all chatbots
    └── [botId]/
        ├── page.tsx           → Redirects to /playground
        ├── layout.tsx         → Chatbot layout with sidebar
├── playground/
│   └── page.tsx               → Chatbot testing interface
├── activity/
│   ├── chat-logs/
│   │   └── page.tsx          → View all chat conversations
│   └── leads/
│       └── page.tsx          → Manage generated leads
├── analytics/
│   ├── chats/
│   │   └── page.tsx          → Chat volume & engagement metrics
│   ├── topics/
│   │   └── page.tsx          → Topic analysis & trends
│   └── sentiment/
│       └── page.tsx          → Sentiment tracking
├── sources/
│   ├── text/
│   │   └── page.tsx          → Add text content
│   ├── files/
│   │   └── page.tsx          → Upload documents
│   ├── website/
│   │   └── page.tsx          → Website crawler
│   ├── qa/
│   │   └── page.tsx          → Q&A pairs
│   └── notion/
│       └── page.tsx          → Notion integration
├── actions/
│   └── page.tsx              → Automated actions & integrations
├── contacts/
│   └── page.tsx              → Contact management
├── deploy/
│   └── page.tsx              → Deployment options
└── settings/
    └── page.tsx              → Chatbot settings
```

## Component Structure

### Dashboard Components
```
/components/dashboard/
├── index.ts                   → Export barrel
├── chatbot-sidebar.tsx        → Main navigation sidebar
├── workspace-sidebar.tsx      → Workspace-level sidebar
└── workspace-header.tsx       → Top navigation header
```

### Feature Components
```
/components/
├── chatbot/                   → Chatbot-specific components
│   ├── playground-panel.tsx
│   ├── chat-interface.tsx
│   ├── chat-message.tsx
│   └── settings-panel.tsx
├── sources/                   → Source management components
│   ├── text-source-form.tsx
│   ├── file-upload.tsx
│   ├── website-crawler.tsx
│   └── qa-form.tsx
├── analytics/                 → Analytics components
│   ├── chat-chart.tsx
│   ├── sentiment-chart.tsx
│   └── topic-chart.tsx
└── ui/                        → Shared UI components (shadcn)
```

## Navigation Configuration

### Location
`/lib/constants/navigation.ts`

### Features
- Type-safe navigation items
- Icon associations
- Descriptions for tooltips
- Collapsible section support
- Dynamic route generation

### Usage
```tsx
import { getChatbotNavItems } from "@/lib/constants/navigation";

const navItems = getChatbotNavItems(botId);
```

## Key Features

### 1. Collapsible Navigation
- Activity section (Chat Logs, Leads)
- Analytics section (Chats, Topics, Sentiment)
- Sources section (Text, Files, Website, Q&A, Notion)

### 2. Active State Indication
- Highlights current route
- Visual feedback for user location

### 3. Responsive Design
- Mobile-friendly sidebar
- Proper spacing and touch targets
- Scroll support for long lists

### 4. Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader support

## URL Pattern

### Examples
```
/chatbot                          → List all chatbots
/chatbot/bot-123                  → Redirect to playground
/chatbot/bot-123/playground       → Chatbot testing interface
/chatbot/bot-123/activity/chat-logs
/chatbot/bot-123/analytics/sentiment
/chatbot/bot-123/sources/files
/chatbot/bot-123/deploy
```

### Dynamic Parameters
- `[botId]` - The unique identifier for the chatbot
- Accessible via `useParams()` in client components
- Accessible via `params` prop in server components

## Sidebar Navigation Items

| Section | Icon | Description |
|---------|------|-------------|
| **Playground** | MessageSquare | Test and interact with chatbot |
| **Activity** | Activity | View activity and leads |
| → Chat Logs | MessageCircle | All chat conversations |
| → Leads | UserPlus | Generated leads |
| **Analytics** | BarChart3 | Performance insights |
| → Chats | TrendingUp | Chat metrics |
| → Topics | Hash | Topic analysis |
| → Sentiment | Smile | Sentiment tracking |
| **Sources** | Database | Knowledge base sources |
| → Text | FileText | Text content |
| → Files | Upload | Document uploads |
| → Website | Globe | Website crawler |
| → Q&A | HelpCircle | Q&A pairs |
| → Notion | Bell | Notion integration |
| **Actions** | Zap | Automated actions |
| **Contacts** | Users | Contact management |
| **Deploy** | Rocket | Deployment options |
| **Settings** | Settings | Chatbot configuration |

## State Management

### Open/Closed Sections
```tsx
const [openSections, setOpenSections] = useState<Record<string, boolean>>({
  activity: true,
  analytics: true,
  sources: true,
});
```

### Persistence (Optional)
Consider using localStorage to persist sidebar state:
```tsx
useEffect(() => {
  const saved = localStorage.getItem('sidebar-state');
  if (saved) setOpenSections(JSON.parse(saved));
}, []);
```

## Styling

### Tailwind Classes
- `bg-accent` - Active state background
- `text-accent-foreground` - Active state text
- `hover:bg-accent` - Hover state
- `text-muted-foreground` - Secondary text

### Custom Utilities
```tsx
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  isActive && "active-classes",
  level > 0 && "nested-classes"
)}
```

## Next Steps

### To Implement
1. **Authentication** - Protect routes, verify bot ownership
2. **Data Fetching** - Connect to API endpoints
3. **Real-time Updates** - WebSocket for live data
4. **Error Boundaries** - Add error.tsx files
5. **Loading States** - Add loading.tsx files
6. **Breadcrumbs** - Add breadcrumb navigation
7. **Search** - Add global search functionality
8. **Notifications** - Toast notifications for actions
9. **Keyboard Shortcuts** - Add keyboard navigation
10. **Mobile Menu** - Collapsible sidebar for mobile

### Feature Components to Build
- Playground chat interface
- Analytics charts and graphs
- File upload with drag-and-drop
- Website crawler form
- Deployment configuration
- Settings panels

## Related Documentation
- [Dashboard Best Practices](./DASHBOARD_BEST_PRACTICES.md)
- [Zustand Best Practices](./ZUSTAND_BEST_PRACTICES.md)

## API Integration

### Expected Endpoints
```typescript
GET    /api/chatbot/:botId
GET    /api/chatbot/:botId/chats
GET    /api/chatbot/:botId/analytics
GET    /api/chatbot/:botId/sources
POST   /api/chatbot/:botId/sources
DELETE /api/chatbot/:botId/sources/:sourceId
// ... etc
```

### Using Existing API Utilities
```typescript
import { chatbotAPI } from "@/lib/api/chatbot";

// Fetch chatbot details
const chatbot = await chatbotAPI.getChatbot(botId);

// Fetch analytics
const analytics = await chatbotAPI.getAnalytics(botId);
```
