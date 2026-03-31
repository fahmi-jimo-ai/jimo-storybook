# Toast / ToastContainer

**Atomic level:** Molecule (Toast) + Organism (ToastContainer)
**CSS prefix:** `.toast`, `.toast-container`
**Source:** `Toast.js` / `Toast.css`

## What it does
Temporary slide-in notification with phase-based animation (entering → visible → exiting). Auto-dismisses after `duration` ms. Supports primary and secondary action buttons. `ToastContainer` is the fixed bottom-center wrapper that stacks multiple toasts.

## Props — Toast

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `type` | string | `'positive'` `'warning'` `'negative'` `'neutral'` | `'neutral'` | Semantic color + icon |
| `title` | string | — | — | Bold heading |
| `body` | string | — | — | Body text |
| `dismissable` | boolean | — | `true` | Show × close button |
| `onDismiss` | function | — | — | Called on close or auto-dismiss |
| `primaryAction` | string | — | — | Primary CTA label |
| `onPrimaryAction` | function | — | — | |
| `secondaryAction` | string | — | — | Secondary CTA label |
| `onSecondaryAction` | function | — | — | |
| `duration` | number | — | `5000` | Auto-dismiss delay in ms |

## Props — ToastContainer
`children` only — wraps toasts and positions the stack at bottom-center.

## Important: interactive pattern
Toast must be mounted/unmounted from state — never pre-rendered statically:

```jsx
function ToastDemo(props) {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button level="secondary" size="small" onClick={() => setVisible(true)}>Show Toast</Button>
      <ToastContainer>
        {visible && <Toast {...props} onDismiss={() => setVisible(false)} />}
      </ToastContainer>
    </>
  );
}
```

## Dependencies
- `Button` (action buttons)
- `CloseIcon` from `Icon.js` (dismiss button)

## Import
```js
import { Toast, ToastContainer } from '../../../src/components/ui/Toast/Toast';
import '../../../src/components/ui/Toast/Toast.css';
```
