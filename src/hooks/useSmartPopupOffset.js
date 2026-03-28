import { useLayoutEffect } from 'react';

/**
 * FLOATING ELEMENT RULE — Moji Design System
 *
 * Any element rendered via absolute/fixed positioning that is centered or
 * anchored to a trigger must be clamped to the viewport after it renders.
 *
 * For inline popups (position: absolute, centered with translateX(-50%)):
 *   - Import useSmartPopupOffset and attach ref to the popup element.
 *   - Pass the visible boolean so the hook re-runs when the popup appears.
 *   - The hook fires after mount, corrects the transform imperatively, no re-render.
 *   - Works on top of any existing CSS transform — result: translateX(calc(-50% + Npx))
 *
 * For portal elements (position: fixed, rendered to document.body):
 *   - Use usePortalDropdown (app/src/components/filter/usePortalDropdown.js)
 *     which includes rAF-based right-edge clamping built-in.
 *   - Never compute `left` from rect.left alone without the clamp step.
 *
 * For inline menus (position: absolute, left-aligned to parent):
 *   - Use useSmartMenuAlign and attach ref to the menu element.
 *   - Pass the isOpen boolean so the hook re-runs when the menu appears.
 *   - The hook auto-flips to right-aligned if left-aligned would overflow.
 *
 * Do NOT add CSS `transition` on `left`/`top`/`transform` to portal or
 * absolute-positioned floating elements unless the rAF pattern is replaced
 * with a single-pass measure — otherwise a visible shift will occur.
 *
 * Do NOT install Radix, Floating UI, or Popper — the above hooks cover all cases.
 */

/**
 * Clamps a centered popup (translateX(-50%)) to the viewport.
 * Attach ref to the popup element. Pass visible so the hook re-fires each time
 * the popup appears. Imperative style mutation — no re-render.
 *
 * @param {React.RefObject} ref     - Ref attached to the popup element
 * @param {boolean}         visible - Whether the popup is currently shown
 * @param {number}          padding - Minimum gap from viewport edge in px (default 8)
 */
export function useSmartPopupOffset(ref, visible, padding = 8) {
  useLayoutEffect(() => {
    if (!visible) return;
    // Defer one rAF so any internal useEffect sizing (e.g. Tooltip binary-search)
    // has already settled the element's final dimensions before we measure.
    const id = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // clientWidth excludes scrollbar — gives true visible content boundary
      const vw = document.documentElement.clientWidth;
      let dx = 0;
      if (rect.right > vw - padding) dx = vw - padding - rect.right;
      if (rect.left + dx < padding) dx = padding - rect.left;
      if (dx !== 0) {
        el.style.transform = `translateX(calc(-50% + ${dx}px))`;
      }
    });
    return () => cancelAnimationFrame(id);
  }, [visible]); // re-run every time the popup becomes visible
}

/**
 * Auto-aligns a left-anchored dropdown menu to the right if it would overflow.
 * Attach ref to the menu element. Pass isOpen so the hook re-fires each time
 * the menu opens. Imperative style mutation — no re-render.
 *
 * @param {React.RefObject} ref     - Ref attached to the menu element
 * @param {boolean}         isOpen  - Whether the menu is currently open
 * @param {number}          padding - Minimum gap from viewport edge in px (default 8)
 */
export function useSmartMenuAlign(ref, isOpen, padding = 8) {
  useLayoutEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      if (rect.right > vw - padding) {
        el.style.left = 'auto';
        el.style.right = '0';
      }
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]); // re-run every time the menu opens
}
