# DatePicker

**Atomic level:** Organism
**CSS prefix:** `.date-picker`
**Source:** `DatePicker.js` / `DatePicker.css`

## What it does
Calendar-based date and date-range picker. Triggered by an `Input` component (the trigger). Supports quick preset Chip tags (today, last 7 days, last 30 days, etc.) in range mode. Hover preview highlights the date range before confirmation.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `mode` | string | `'single'` `'range'` | `'single'` | Single date or date range |
| `value` | Date | — | — | Selected date (single mode) |
| `startDate` | Date | — | — | Range start (range mode) |
| `endDate` | Date | — | — | Range end (range mode) |
| `onChange` | function | — | — | `(date) => void` (single mode) |
| `onRangeChange` | function | — | — | `({start, end}) => void` (range mode) |
| `minDate` | Date | — | — | Earliest selectable date |
| `maxDate` | Date | — | — | Latest selectable date |
| `withQuickTags` | boolean | — | `false` | Show preset Chip buttons (range mode only) |
| `open` | boolean | — | — | Controlled open state |
| `onOpenChange` | function | — | — | `(open) => void` |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `disabled` | boolean | — | `false` | |
| `placeholder` | string | — | — | Input trigger placeholder |

## Dependencies
- `Input` (calendar trigger)
- `Chip` (quick preset tags)

## Import
```js
import { DatePicker } from '../../../src/components/ui/DatePicker/DatePicker';
import '../../../src/components/ui/DatePicker/DatePicker.css';
```

## Quick example
```jsx
// Single date
<DatePicker mode="single" value={date} onChange={setDate} placeholder="Select date" />

// Date range with presets
<DatePicker mode="range" startDate={start} endDate={end} onRangeChange={({start, end}) => { setStart(start); setEnd(end); }} withQuickTags placeholder="Select range" />
```
