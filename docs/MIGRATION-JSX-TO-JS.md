# Migration Plan: Rename Component Source Files `.jsx` → `.js`

## Goal

Rename all 30 component source files in `src/components/ui/` from `.jsx` to `.js`.
Story files (`*.stories.jsx`) are **not** affected — only component source files.

---

## Pre-migration Audit

### Files to rename (30 total)

| Component | Current | After |
|-----------|---------|-------|
| Button | `Button/Button.jsx` | `Button/Button.js` |
| Checkbox | `Checkbox/Checkbox.jsx` | `Checkbox/Checkbox.js` |
| Chip | `Chip/Chip.jsx` | `Chip/Chip.js` |
| DropdownFilter | `DropdownFilter/DropdownFilter.jsx` | `DropdownFilter/DropdownFilter.js` |
| DropdownMenuGroup | `DropdownMenuGroup/DropdownMenuGroup.jsx` | `DropdownMenuGroup/DropdownMenuGroup.js` |
| DropdownMenuList | `DropdownMenuList/DropdownMenuList.jsx` | `DropdownMenuList/DropdownMenuList.js` |
| DropdownSelector | `DropdownSelector/DropdownSelector.jsx` | `DropdownSelector/DropdownSelector.js` |
| ExperienceCard | `ExperienceCard/ExperienceCard.jsx` | `ExperienceCard/ExperienceCard.js` |
| ExperienceStatus | `ExperienceStatus/ExperienceStatus.jsx` | `ExperienceStatus/ExperienceStatus.js` |
| ExperienceTags | `ExperienceTags/ExperienceTags.jsx` | `ExperienceTags/ExperienceTags.js` |
| Icon | `Icon/Icon.jsx` | `Icon/Icon.js` |
| Infobox | `Infobox/Infobox.jsx` | `Infobox/Infobox.js` |
| Input | `Input/Input.jsx` | `Input/Input.js` |
| PageHeader | `PageHeader/PageHeader.jsx` | `PageHeader/PageHeader.js` |
| PrimaryHorizontalMenuGroup | `PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.jsx` | `PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.js` |
| PrimaryHorizontalMenuItem | `PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.jsx` | `PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.js` |
| PrimaryNavGroup | `PrimaryNavGroup/PrimaryNavGroup.jsx` | `PrimaryNavGroup/PrimaryNavGroup.js` |
| PrimaryNavItem | `PrimaryNavItem/PrimaryNavItem.jsx` | `PrimaryNavItem/PrimaryNavItem.js` |
| PrimaryNavSidebar | `PrimaryNavSidebar/PrimaryNavSidebar.jsx` | `PrimaryNavSidebar/PrimaryNavSidebar.js` |
| Radio | `Radio/Radio.jsx` | `Radio/Radio.js` |
| SecondaryHorizontalMenuGroup | `SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup.jsx` | `SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup.js` |
| SecondaryHorizontalMenuItem | `SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.jsx` | `SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.js` |
| SecondaryNavGroup | `SecondaryNavGroup/SecondaryNavGroup.jsx` | `SecondaryNavGroup/SecondaryNavGroup.js` |
| SecondaryNavItem | `SecondaryNavItem/SecondaryNavItem.jsx` | `SecondaryNavItem/SecondaryNavItem.js` |
| SecondaryNavSidebar | `SecondaryNavSidebar/SecondaryNavSidebar.jsx` | `SecondaryNavSidebar/SecondaryNavSidebar.js` |
| TertiaryNavGroup | `TertiaryNavGroup/TertiaryNavGroup.jsx` | `TertiaryNavGroup/TertiaryNavGroup.js` |
| TertiaryNavItem | `TertiaryNavItem/TertiaryNavItem.jsx` | `TertiaryNavItem/TertiaryNavItem.js` |
| Toast | `Toast/Toast.jsx` | `Toast/Toast.js` |
| Toggle | `Toggle/Toggle.jsx` | `Toggle/Toggle.js` |
| Tooltip | `Tooltip/Tooltip.jsx` | `Tooltip/Tooltip.js` |

---

## Import Impact Analysis

### Imports are extensionless — no updates required

All three import layers use bare (extensionless) specifiers:

```js
// Component-level index.js barrel files
export { Button } from './Button';             // resolves Button.jsx → Button.js ✓

// Top-level barrel (src/components/ui/index.js)
export * from './Button';                      // resolves index.js ✓ (unchanged)

// Story files
import { Button } from '../../../src/components/ui/Button/Button';   // resolves → .js ✓
import '../../../src/components/ui/Button/Button.css';                // CSS, unaffected
```

**Grep result:** No `.jsx` string appears in any `import` statement inside `src/`. All imports are extensionless. Zero import edits needed.

### Vite extension resolution order

Vite resolves `['mjs', 'js', 'mts', 'ts', 'jsx', 'tsx', 'json']` by default. `.js` comes **before** `.jsx`, so after the rename, all extensionless imports resolve to the `.js` files automatically.

---

## Storybook Config Impact

| File | Change needed? | Why |
|------|---------------|-----|
| `.storybook/main.js` | **No** | Stories glob is `*.stories.@(js\|jsx)` — story files stay `.stories.jsx` |
| `.storybook/preview.js` | **No** | Only imports CSS files |
| `vite.config.js` | **No** | React plugin handles JSX in `.js` files by default |
| `src/components/ui/index.js` | **No** | Extensionless barrel exports |
| Component `index.js` files | **No** | All use extensionless imports |

### One Storybook consideration: Vite + JSX in `.js` files

`@vitejs/plugin-react` enables JSX transform for `.jsx` files by default. When files are renamed to `.js`, Vite may not apply the JSX transform to them.

**Fix required in `vite.config.js`:** Add an `include` override to the React plugin so it processes `.js` files with JSX content:

```js
// vite.config.js — updated
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx)$/,   // ← extend JSX transform to .js files
    }),
  ],
  resolve: {
    alias: {
      '@lib': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
    },
  },
});
```

The same override must be applied in `.storybook/main.js` inside `viteFinal`:

```js
// .storybook/main.js — viteFinal section updated
viteFinal: async (config) => {
  config.resolve = config.resolve ?? {};
  config.resolve.alias = {
    ...(config.resolve.alias ?? {}),
    '@lib': resolve(__dirname, '../src'),
    '@': resolve(__dirname, '../src'),
  };

  // Ensure JSX is transformed in .js files
  const reactPlugin = config.plugins?.find(
    (p) => p && (Array.isArray(p) ? false : p.name === 'vite:react-babel' || p.name === 'vite:react-refresh')
  );
  // Simpler: re-configure via overriding includes on the react plugin options
  // The react() plugin in viteFinal is already configured — just patch the include filter:
  config.plugins = config.plugins?.map((plugin) => {
    if (plugin && !Array.isArray(plugin) && plugin.name?.startsWith('vite:react')) {
      return { ...plugin };
    }
    return plugin;
  });

  return config;
},
```

> **Simpler alternative:** Instead of patching viteFinal, add a top-level Vite `optimizeDeps.extensions` or use the Vite `esbuild.include` option. The cleanest solution is the `react({ include: /\.(js|jsx)$/ })` in `vite.config.js` — Storybook's `viteFinal` merges into this config, so the plugin option is inherited.

**Verdict:** Update `vite.config.js` only (single source of truth). Storybook picks it up via `viteFinal` merging. If the build still fails, also patch `viteFinal` in `main.js`.

---

## CLAUDE.md Update

The `CLAUDE.md` file table currently reads:

```
| Component source files (with JSX) | `.jsx` | e.g. `Button.jsx`, `Input.jsx` |
```

After migration, update to:

```
| Component source files (with JSX) | `.js`  | e.g. `Button.js`, `Input.js`   |
```

Also update the story file template section imports to show `.js` paths.

---

## Implementation Steps (in order)

1. **Update `vite.config.js`** — add `include: /\.(js|jsx)$/` to the React plugin
2. **Rename all 30 files** — `git mv` each `.jsx` → `.js` (preserves history)
3. **Run `npm run build-storybook`** — must pass with zero errors
4. **Update `CLAUDE.md`** — change the extension reference in the file type table
5. **Commit** — `feat: rename component source files from .jsx to .js`

---

## Rollback

If the build fails after step 2, revert with:

```bash
git checkout -- src/components/ui/
```

Then investigate the specific error before re-attempting.

---

## Definition of Done

- [ ] `npm run build-storybook` exits with code 0, zero errors
- [ ] No `.jsx` files remain in `src/components/ui/`
- [ ] All 30 renamed files resolve correctly (no "module not found" errors)
- [ ] CLAUDE.md reflects `.js` as the component source extension
- [ ] Story files (`.stories.jsx`) are untouched
