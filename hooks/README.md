# Custom Hooks Guide

Complete documentation for all custom hooks used in the application.

## Overview

All custom hooks follow a standardized pattern for consistency and predictability:
- **data/content**: The actual fetched data (varies by hook)
- **isLoading**: `true` while fetching data
- **error**: `Error | null` - error object if fetch failed, null on success
- **refetch?**: Optional function to manually re-fetch data

This consistency allows AI assistants and developers to understand hook behavior at a glance.

## Standard Hook Pattern

### Basic Data Fetching Hook

```typescript
/**
 * Fetch data for a specific resource
 *
 * @param id - The resource ID to fetch
 * @returns Object containing:
 *   - data: The fetched resource data
 *   - isLoading: true while fetching
 *   - error: Error object if fetch failed
 *   - refetch: Function to manually refetch
 *
 * @example
 * const { data, isLoading, error } = useResource('resource-123');
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (isLoading) return <LoadingSpinner />;
 * return <ResourceView data={data} />;
 */
export function useResource(id: string): UseResourceReturn {
  const [data, setData] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getResource(id);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
```

## Hook Categories

### Data Fetching Hooks (22 total)

These hooks fetch data from Supabase or external APIs.

#### Mind-Related Hooks

- **useMind(id)** - Fetch single mind profile
- **useMinds()** - Fetch list of minds
- **usePublicMinds()** - Fetch publicly available minds
- **useMindContents(mindId)** - Fetch content for a mind
- **useMindHistory(mindId)** - Fetch historical data
- **useMindArtifacts(mindId)** - Fetch generated artifacts
- **useMindAvatarUpload()** - Handle avatar file upload
- **useMindPsychometrics(mindId)** - Fetch psychometric profile

**Pattern:**
```typescript
const { mind, isLoading, error } = useMind('mind-id');
const { minds, isLoading, error, refetch } = useMinds();
```

#### Course-Related Hooks

- **useCourse(id)** - Fetch single course
- **useCourses()** - Fetch list of courses
- **useCourseContents(courseId)** - Fetch course modules/lessons
- **useLesson(id)** - Fetch single lesson

**Pattern:**
```typescript
const { course, isLoading, error } = useCourse('course-id');
const { courses, isLoading, error } = useCourses();
```

#### Content Hooks

- **useContentFrameworks()** - Fetch available frameworks/templates
- **useAudienceProfiles()** - Fetch audience data

**Pattern:**
```typescript
const { frameworks, isLoading, error } = useContentFrameworks();
```

#### Debate Hooks

- **useDebates(id)** - Fetch debate list or single debate

**Pattern:**
```typescript
const { debates, isLoading, error } = useDebates('id');
```

#### Activity Hooks

- **useRecentActivities()** - Fetch activity log

**Pattern:**
```typescript
const { activities, isLoading, error } = useRecentActivities();
```

#### PRD Hooks

- **usePRDProjects()** - Fetch PRD projects list
- **usePRDProject(id)** - Fetch single PRD project
- **usePRDAI(prompt)** - Generate PRD using AI

**Pattern:**
```typescript
const { projects, isLoading, error } = usePRDProjects();
const { isGenerating, result, error } = usePRDAI(prompt);
```

### State Management Hooks

These hooks manage local UI state rather than fetch data.

#### Arena Hook

**useArena()** - Manage mind selection for comparison/debate

```typescript
const {
  selectedMinds,
  addMind,
  removeMind,
  clearSelection,
  isLoading,
  error,
} = useArena();

// Add/remove minds
addMind('mind-id');
removeMind('mind-id');
clearSelection();
```

### Utility Hooks

These hooks provide utility functions.

#### Toast Notifications

**useToast()** - Show temporary notifications

```typescript
const { toast, dismiss } = useToast();

toast({
  title: 'Success',
  description: 'Item created',
  duration: 3000,
  variant: 'default',
});

// Dismiss specific toast or all
dismiss('toast-id');
dismiss(); // dismiss all
```

#### Clipboard

**useClipboard()** - Copy text to clipboard

```typescript
const { isCopied, copyToClipboard } = useClipboard();

const handleCopy = async () => {
  await copyToClipboard('Text to copy');
  // isCopied will be true temporarily
};
```

## Error Handling Patterns

### Basic Error Handling

```typescript
const { data, isLoading, error } = useResource('id');

if (error) {
  return <ErrorAlert message={error.message} />;
}

if (isLoading) {
  return <LoadingSpinner />;
}

return <DataView data={data} />;
```

### With Refetch Button

```typescript
const { data, isLoading, error, refetch } = useResource('id');

const handleRetry = async () => {
  await refetch?.();
};

return (
  <div>
    {error && (
      <div className="error">
        <p>{error.message}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    )}
    {isLoading && <LoadingSpinner />}
    {data && <DataView data={data} />}
  </div>
);
```

### With User Feedback

```typescript
const { data, isLoading, error } = useResource('id');
const { toast } = useToast();

useEffect(() => {
  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  }
}, [error, toast]);

return (
  <div>
    {isLoading && <LoadingSpinner />}
    {data && <DataView data={data} />}
  </div>
);
```

## Loading State UI Patterns

### Skeleton Loading

```typescript
const { data, isLoading } = useResource('id');

if (isLoading) {
  return (
    <div className="space-y-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

return <DataView data={data} />;
```

### Progressive Loading

```typescript
const { data, isLoading } = useResource('id');

return (
  <div>
    {isLoading && <ProgressBar />}
    {data && <DataView data={data} />}
  </div>
);
```

## Type Safety

### Using Hook Return Types

All hook return types are defined in `types/hooks.ts`:

```typescript
import type { UseMindReturn, UseCoursesReturn } from '../types/hooks';

// Function with explicit return types
function MindProfile(): React.FC {
  const { mind, isLoading, error }: UseMindReturn = useMind('id');

  // Type-safe - mind is correctly typed as MindProfile | null
  if (mind) {
    console.log(mind.name); // ✓ IDE autocomplete works
  }

  return <div>{mind?.name}</div>;
}
```

### Defining New Hooks

When creating a new hook, always:

1. Define return type in `types/hooks.ts`
2. Add JSDoc comment to the hook function
3. Use standardized naming (`isLoading`, `error`)
4. Include refetch callback if data fetching

```typescript
// types/hooks.ts
export interface UseNewHookReturn {
  data: DataType[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// hooks/useNewHook.ts
/**
 * Fetch and manage data for new feature
 *
 * @returns Hook return object with data, loading, and error states
 */
export function useNewHook(): UseNewHookReturn {
  // Implementation following standard pattern
}
```

## Common Mistakes to Avoid

### ❌ Don't

```typescript
// Different loading names across hooks
const { data, loading } = useHook1(); // ← Wrong: use isLoading
const { data, isLoading } = useHook2(); // ← Right

// Different error naming
const { data, err } = useHook1(); // ← Wrong: use error
const { data, error } = useHook2(); // ← Right

// Missing JSDoc
export function useHook(id) {
  // No documentation
}

// Inline types instead of centralized
export interface UseHookReturn {
  data: Type;
}

// Using fetch without try/catch
const result = await api.get(url); // ← No error handling
```

### ✅ Do

```typescript
// Consistent naming
const { data, isLoading, error } = useHook();

// Always include JSDoc
/**
 * Clear description of what the hook does
 * @param id - Parameter description
 * @returns Documented return type
 */
export function useHook(id: string): UseHookReturn {
  // ...
}

// Centralized types
import type { UseHookReturn } from '../types/hooks';

// Proper error handling
try {
  const result = await api.get(url);
} catch (err) {
  setError(err instanceof Error ? err : new Error(String(err)));
}
```

## Debugging Tips

### Check Hook State

```typescript
const { data, isLoading, error } = useResource('id');

// Log state for debugging
useEffect(() => {
  console.log('Hook state:', { data, isLoading, error });
}, [data, isLoading, error]);
```

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Select component using the hook
4. View hook state in the "Hooks" section

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Infinite refetch | Missing dependency | Add dependencies to useEffect |
| stale data | Dependency not included | Update dependency array |
| Memory leak | No cleanup | Add return cleanup function |
| Lost error | Not preserved | Store error in state |

## Performance Optimization

### Memoization

```typescript
const { data } = useResource('id');

// Avoid re-renders when data hasn't changed
const memoizedData = useMemo(() => processData(data), [data]);

return <DataView data={memoizedData} />;
```

### Callback Optimization

```typescript
const { refetch } = useResource('id');

// Memoize callback to prevent child re-renders
const handleRefresh = useCallback(() => {
  refetch?.();
}, [refetch]);

return <RefreshButton onClick={handleRefresh} />;
```

## Related Documentation

- **Type Definitions**: See `types/hooks.ts` for all hook return types
- **Supabase Integration**: See `lib/supabase.ts`
- **Error Handling**: See components/shared/ErrorBoundary
- **Loading States**: See components/shared/LoadingSpinner
