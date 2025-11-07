# Dashboard Flow Best Practices

## Directory Structure

### App Router Organization
```
/app
  /(dashboard)          # Route group - doesn't affect URL
    /chatbot
      /[botId]          # Dynamic route parameter
        page.tsx        # Redirects to playground
        layout.tsx      # Chatbot layout with sidebar
        /playground     # Nested route
        /activity
          /chat-logs
          /leads
        /analytics
          /chats
          /topics
          /sentiment
        /sources
          /text
          /files
          /website
          /qa
          /notion
        /actions
        /contacts
        /deploy
        /settings
```

## Best Practices

### 1. Route Groups `(dashboard)`
- Use parentheses to group routes without affecting the URL
- Shared layouts for multiple route segments
- Better code organization

### 2. Dynamic Routes `[botId]`
- Access via `useParams()` in client components
- Access via `params` prop in server components
- Type-safe parameter handling

### 3. Layouts
```tsx
// layout.tsx
export default function ChatbotLayout({ children, params }) {
  return (
    <div className="flex">
      <Sidebar botId={params.botId} />
      <main>{children}</main>
    </div>
  );
}
```

### 4. Navigation Pattern
```tsx
// Use Link for client-side navigation
import Link from "next/link";

<Link href={`/chatbot/${botId}/playground`}>
  Playground
</Link>
```

### 5. Active State Detection
```tsx
const pathname = usePathname();
const isActive = pathname === href;
```

### 6. Collapsible Sections
- Use state management for open/closed sections
- Persist state across navigation (optional - use localStorage)
- Smooth transitions with CSS

### 7. Component Organization
```
/components
  /dashboard          # Dashboard-specific components
    chatbot-sidebar.tsx
    workspace-sidebar.tsx
    workspace-header.tsx
  /chatbot           # Feature-specific components
    playground-panel.tsx
    chat-interface.tsx
  /sources           # Source management components
  /analytics         # Analytics components
  /ui               # Shared UI components (shadcn)
```

### 8. Constants & Configuration
```typescript
// /lib/constants/navigation.ts
export const getChatbotNavItems = (botId: string) => [
  // Navigation items with icons, hrefs, descriptions
];
```

### 9. State Management
- Use Zustand for global state (existing pattern)
- React Context for component-tree state
- Local state for UI-only concerns

### 10. Data Fetching
```tsx
// Server Component (default)
async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Component (interactive)
"use client";
function InteractiveComponent() {
  const { data } = useQuery();
  return <div>{data}</div>;
}
```

### 11. Error Handling
```tsx
// error.tsx in route segment
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 12. Loading States
```tsx
// loading.tsx in route segment
export default function Loading() {
  return <Skeleton />;
}
```

### 13. Metadata
```tsx
// page.tsx or layout.tsx
export const metadata = {
  title: 'Playground',
  description: 'Test your chatbot',
};
```

### 14. TypeScript Best Practices
- Define interfaces for props
- Use type-safe route parameters
- Export shared types from `/types` directory

### 15. Styling
- Use Tailwind utility classes
- Use `cn()` utility for conditional classes
- Follow shadcn/ui component patterns
- Maintain consistent spacing and sizing

### 16. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly

### 17. Performance
- Use React.memo for expensive components
- Lazy load heavy components
- Optimize images with next/image
- Code splitting with dynamic imports

### 18. File Naming
- `page.tsx` - Route page
- `layout.tsx` - Route layout
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 UI

## Common Patterns

### Redirect Pattern
```tsx
import { redirect } from "next/navigation";

export default function Page({ params }) {
  redirect(`/chatbot/${params.botId}/playground`);
}
```

### Sidebar with Nested Navigation
```tsx
<Collapsible>
  <CollapsibleTrigger>
    <Icon /> Section Name <ChevronRight />
  </CollapsibleTrigger>
  <CollapsibleContent>
    {children.map(child => (
      <Link href={child.href}>{child.title}</Link>
    ))}
  </CollapsibleContent>
</Collapsible>
```

### Protected Routes
```tsx
// middleware.ts or layout.tsx
export default function ProtectedLayout({ children }) {
  const { user } = useAuth();
  if (!user) redirect('/login');
  return children;
}
```

## Security Considerations
1. Validate `botId` parameter
2. Check user permissions
3. Sanitize user inputs
4. Use environment variables for secrets
5. Implement rate limiting

## Testing
1. Test navigation flows
2. Test dynamic route parameters
3. Test loading and error states
4. Test responsive design
5. Test accessibility features
