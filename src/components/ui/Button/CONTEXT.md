# Button

**Atomic level:** Atom
**CSS prefix:** `.btn`
**Source:** `Button.js` / `Button.css`

## What it does

Primary action trigger. Supports two visual levels (primary / secondary), two sizes, danger state, icon-only mode, and left/right icon slots.

## Props

| Prop        | Type         | Options                   | Default     | Notes                   |
| ----------- | ------------ | ------------------------- | ----------- | ----------------------- |
| `level`     | string       | `'primary'` `'secondary'` | `'primary'` | Visual weight           |
| `size`      | string       | `'big'` `'small'`         | `'big'`     | Layout size             |
| `danger`    | boolean      | —                         | `false`     | Red destructive style   |
| `iconOnly`  | boolean      | —                         | `false`     | Square icon-only button |
| `leftIcon`  | ReactElement | —                         | —           | Icon before label       |
| `rightIcon` | ReactElement | —                         | —           | Icon after label        |
| `disabled`  | boolean      | —                         | `false`     |                         |
| `children`  | node         | —                         | —           | Button label            |

## States

idle → hover → active → disabled (controlled via CSS `:hover`, `:active`, `disabled` attribute)

## Dependencies

None — standalone atom.

## Import

```JavaScript
import { Button } from '../../../src/components/ui/Button/Button';
import '../../../src/components/ui/Button/Button.css';
```

## Quick example

```JSX
<Button level="primary" size="big">Save</Button>
<Button level="secondary" size="small" leftIcon={<Add size={16} />}>Add item</Button>
<Button level="primary" danger>Delete</Button>
<Button level="secondary" iconOnly leftIcon={<Edit size={16} />} />
```

