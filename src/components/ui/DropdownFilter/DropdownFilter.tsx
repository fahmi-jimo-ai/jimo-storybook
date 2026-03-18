import React from 'react';
import { DropdownSelector } from '../DropdownSelector/DropdownSelector';
import type { DropdownSelectorSize } from '../DropdownSelector/DropdownSelector';
import { DropdownMenuGroup } from '../DropdownMenuGroup/DropdownMenuGroup';
import { DropdownMenuList } from '../DropdownMenuList/DropdownMenuList';
import './DropdownFilter.css';

export interface DropdownFilterItem {
  /** Unique identifier for this item */
  value: string;
  /** Display label shown in menu and selector */
  label: string;
  /** Optional icon shown on the left of the menu item */
  icon?: React.ReactNode;
  /** Optional description sub-text shown below the label */
  description?: string;
}

export interface DropdownFilterProps {
  /** Placeholder shown in selector when nothing is selected */
  placeholder?: string;
  /** Icon shown on the left of the selector button */
  selectorIcon?: React.ReactNode;
  /** Whether to show the icon slot on the selector button */
  withSelectorIcon?: boolean;
  /** Selector size variant */
  size?: DropdownSelectorSize;
  /** Items rendered in the dropdown menu */
  items: DropdownFilterItem[];
  /** Multi-select mode — shows checkboxes, keeps menu open after each pick */
  multiSelect?: boolean;
  /** Show icons in menu items (ignored in multiSelect mode) */
  showItemIcons?: boolean;
  /** Max height for the menu list — enables scrolling (e.g. "220px") */
  maxMenuHeight?: string;
  /** Controlled selected value (single-select) or values (multi-select) */
  value?: string | string[];
  /** Called when selection changes — string for single, string[] for multi */
  onChange?: (value: string | string[]) => void;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state should change */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const DropdownFilter = ({
  placeholder,
  selectorIcon,
  withSelectorIcon = false,
  size = 'big',
  items,
  multiSelect = false,
  showItemIcons = true,
  maxMenuHeight,
  value,
  onChange,
  open,
  onOpenChange,
  className,
}: DropdownFilterProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const selectedValues: string[] =
    value === undefined ? internalValue : Array.isArray(value) ? value : value ? [value] : [];

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

  const handleSelect = (itemValue: string) => {
    let next: string[];
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

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  const selectorText: string | undefined = (() => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      return items.find((i) => i.value === selectedValues[0])?.label ?? selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  })();

  return (
    <div
      ref={wrapperRef}
      className={['dropdown-filter', className ?? ''].filter(Boolean).join(' ')}
    >
      <DropdownSelector
        size={size}
        text={selectorText}
        isOpen={isOpen}
        hasValue={selectedValues.length > 0}
        withIcon={withSelectorIcon}
        icon={selectorIcon}
        onClick={() => setOpen(!isOpen)}
      />
      {isOpen && (
        <div className="dropdown-filter__menu">
          <DropdownMenuGroup maxHeight={maxMenuHeight}>
            {items.map((item) => {
              const isSelected = selectedValues.includes(item.value);
              return (
                <DropdownMenuList
                  key={item.value}
                  text={item.label}
                  icon={item.icon}
                  showIcon={showItemIcons && !multiSelect}
                  showDescription={!!item.description}
                  description={item.description}
                  multiSelect={multiSelect}
                  state={isSelected ? 'selected' : 'default'}
                  onClick={() => handleSelect(item.value)}
                />
              );
            })}
          </DropdownMenuGroup>
        </div>
      )}
    </div>
  );
};

DropdownFilter.displayName = 'DropdownFilter';
