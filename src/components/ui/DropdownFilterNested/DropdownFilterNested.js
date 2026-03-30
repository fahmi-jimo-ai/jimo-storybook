import React from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { DropdownSelector } from '../DropdownSelector/DropdownSelector';
import { DropdownMenuGroup } from '../DropdownMenuGroup/DropdownMenuGroup';
import { DropdownMenuList } from '../DropdownMenuList/DropdownMenuList';
import { useSmartMenuAlign } from '../../../hooks/useSmartPopupOffset';
import './DropdownFilterNested.css';

const PANEL_TRANSITION_MS = 200;

// Item with `children` navigates to a submenu panel.
// Item without `children` is a selectable leaf.

const NavItem = ({ label, icon, description, showIcon, onClick }) => (
  <button type="button" className="dropdown-nested__nav-item" onClick={onClick}>
    {showIcon && (
      <span className="dropdown-nested__nav-item__icon" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="dropdown-nested__nav-item__content">
      <span className="dropdown-nested__nav-item__text">{label}</span>
      {description && (
        <span className="dropdown-nested__nav-item__description">{description}</span>
      )}
    </span>
    <ArrowRight2
      size={16}
      variant="Linear"
      color="currentColor"
      className="dropdown-nested__nav-item__chevron"
      aria-hidden="true"
    />
  </button>
);

export const DropdownFilterNested = ({
  placeholder,
  selectorIcon,
  withSelectorIcon = false,
  size = 'big',
  items,
  multiSelect = false,
  showItemIcons = true,
  showSelectedStyle = true,
  menuAlign = 'left',
  maxMenuHeight,
  value,
  onChange,
  open,
  onOpenChange,
  className,
}) => {
  const wrapperRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const openTimerRef = React.useRef(null);
  const stackResetTimerRef = React.useRef(null);
  const panelTimerRef = React.useRef(null);

  // ── Open / close ────────────────────────────────────────────────────────────
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useSmartMenuAlign(menuRef, isOpen);

  // ── Value ───────────────────────────────────────────────────────────────────
  const [internalValue, setInternalValue] = React.useState([]);
  const selectedValues =
    value === undefined
      ? internalValue
      : Array.isArray(value)
      ? value
      : value
      ? [value]
      : [];

  // ── Navigation stack ────────────────────────────────────────────────────────
  // Each entry: { items: Item[], label: string | null }
  // label = the label shown in the back button when this panel is active.
  // Root panel always has label: null (no back button).
  const [stack, setStack] = React.useState([{ items, label: null }]);

  // outgoing = panel currently animating out: { items, label, direction: 'forward'|'back' }
  const [outgoing, setOutgoing] = React.useState(null);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const setOpen = React.useCallback(
    (next) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

  const navigate = React.useCallback(
    (childItems, childLabel) => {
      const current = stack[stack.length - 1];
      setOutgoing({ items: current.items, label: current.label, direction: 'forward' });
      setStack((s) => [...s, { items: childItems, label: childLabel }]);
      clearTimeout(panelTimerRef.current);
      panelTimerRef.current = setTimeout(() => setOutgoing(null), PANEL_TRANSITION_MS);
    },
    [stack]
  );

  const goBack = React.useCallback(() => {
    if (stack.length <= 1) return;
    const current = stack[stack.length - 1];
    setOutgoing({ items: current.items, label: current.label, direction: 'back' });
    setStack((s) => s.slice(0, -1));
    clearTimeout(panelTimerRef.current);
    panelTimerRef.current = setTimeout(() => setOutgoing(null), PANEL_TRANSITION_MS);
  }, [stack]);

  const handleSelect = (itemValue) => {
    let next;
    if (multiSelect) {
      next = selectedValues.includes(itemValue)
        ? selectedValues.filter((v) => v !== itemValue)
        : [...selectedValues, itemValue];
    } else {
      next = [itemValue];
      setOpen(false);
    }
    if (value === undefined) setInternalValue(next);
    onChange?.(multiSelect ? next : next[0] ?? '');
  };

  // ── Effects ─────────────────────────────────────────────────────────────────

  // Open/close panel animation — double RAF ensures the browser paints the
  // initial opacity:0 state before the --open class triggers the transition.
  React.useEffect(() => {
    if (isOpen) {
      clearTimeout(openTimerRef.current);
      setIsVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)));
    } else {
      setIsAnimating(false);
      openTimerRef.current = setTimeout(() => setIsVisible(false), 150);
      // Reset navigation stack after outer close animation finishes
      stackResetTimerRef.current = setTimeout(() => {
        setStack([{ items, label: null }]);
        setOutgoing(null);
      }, 150);
    }
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(stackResetTimerRef.current);
    };
  }, [isOpen, items]);

  // Click outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // ── Selector label ──────────────────────────────────────────────────────────
  const findLabelInTree = (nodeItems, targetValue) => {
    for (const item of nodeItems) {
      if (item.value === targetValue) return item.label;
      if (item.children) {
        const found = findLabelInTree(item.children, targetValue);
        if (found) return found;
      }
    }
    return null;
  };

  const selectorText = (() => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1)
      return findLabelInTree(items, selectedValues[0]) ?? selectedValues[0];
    return `${selectedValues.length} selected`;
  })();

  // ── Panel renderer ──────────────────────────────────────────────────────────
  const renderPanelContent = (panelItems, panelLabel, onBack) => (
    <>
      {panelLabel !== null && (
        <button type="button" className="dropdown-nested__back" onClick={onBack}>
          <ArrowLeft2 size={16} variant="Linear" color="currentColor" aria-hidden="true" />
          <span>{panelLabel}</span>
        </button>
      )}
      {panelItems.map((item) => {
        const isSelected = showSelectedStyle && selectedValues.includes(item.value);
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;

        if (hasChildren) {
          return (
            <NavItem
              key={item.value}
              label={item.label}
              icon={item.icon}
              description={item.description}
              showIcon={showItemIcons}
              onClick={() => navigate(item.children, item.label)}
            />
          );
        }

        return (
          <DropdownMenuList
            key={item.value}
            text={item.label}
            icon={item.icon}
            showIcon={showItemIcons}
            showDescription={!!item.description}
            description={item.description}
            multiSelect={multiSelect}
            state={isSelected ? 'selected' : 'default'}
            onClick={() => handleSelect(item.value)}
          />
        );
      })}
    </>
  );

  const currentPanel = stack[stack.length - 1];

  const outgoingAnimClass = outgoing
    ? outgoing.direction === 'forward'
      ? 'dropdown-nested__panel--exit-forward'
      : 'dropdown-nested__panel--exit-back'
    : null;

  const enteringAnimClass = outgoing
    ? outgoing.direction === 'forward'
      ? 'dropdown-nested__panel--enter-forward'
      : 'dropdown-nested__panel--enter-back'
    : null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      className={['dropdown-filter-nested', className ?? ''].filter(Boolean).join(' ')}
    >
      <DropdownSelector
        size={size}
        text={selectorText}
        isOpen={isOpen}
        hasValue={showSelectedStyle && selectedValues.length > 0}
        withIcon={withSelectorIcon}
        icon={selectorIcon}
        onClick={() => setOpen(!isOpen)}
      />

      {isVisible && (
        <div
          ref={menuRef}
          className={[
            'dropdown-filter-nested__menu',
            isAnimating ? 'dropdown-filter-nested__menu--open' : '',
            menuAlign === 'right' ? 'dropdown-filter-nested__menu--right' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Viewport clips panel slide animations */}
          <div className="dropdown-nested__viewport">
            {/* Outgoing panel — absolute, animates out */}
            {outgoing && (
              <div className={`dropdown-nested__panel ${outgoingAnimClass}`}>
                <DropdownMenuGroup maxHeight={maxMenuHeight}>
                  {renderPanelContent(outgoing.items, outgoing.label, goBack)}
                </DropdownMenuGroup>
              </div>
            )}

            {/* Current panel — normal flow, animates in */}
            <div
              className={[
                'dropdown-nested__panel',
                enteringAnimClass ?? '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <DropdownMenuGroup maxHeight={maxMenuHeight}>
                {renderPanelContent(currentPanel.items, currentPanel.label, goBack)}
              </DropdownMenuGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DropdownFilterNested.displayName = 'DropdownFilterNested';
