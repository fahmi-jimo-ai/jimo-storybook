import React from 'react';
import { DropdownSelector } from '../DropdownSelector/DropdownSelector';
import { DropdownMenuGroup } from '../DropdownMenuGroup/DropdownMenuGroup';
import { DropdownMenuList } from '../DropdownMenuList/DropdownMenuList';
import { useSmartMenuAlign } from '../../../hooks/useSmartPopupOffset';
import './DropdownFilter.css';

export const DropdownFilter = ({
  placeholder,
  selectorIcon,
  withSelectorIcon = false,
  size = 'big',
  items,
  multiSelect = false,
  showItemIcons = true,
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
  const exitTimerRef = React.useRef(null);

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useSmartMenuAlign(menuRef, isOpen);

  const [internalValue, setInternalValue] = React.useState([]);
  const selectedValues =
    value === undefined ? internalValue : Array.isArray(value) ? value : value ? [value] : [];

  const setOpen = React.useCallback(
    (next) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

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

  React.useEffect(() => {
    if (isOpen) {
      clearTimeout(exitTimerRef.current);
      setIsVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)));
    } else {
      setIsAnimating(false);
      exitTimerRef.current = setTimeout(() => setIsVisible(false), 150);
    }
    return () => clearTimeout(exitTimerRef.current);
  }, [isOpen]);

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

  const selectorText = (() => {
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
      {isVisible && (
        <div
          ref={menuRef}
          className={[
            'dropdown-filter__menu',
            isAnimating ? 'dropdown-filter__menu--open' : '',
            menuAlign === 'right' ? 'dropdown-filter__menu--right' : '',
          ].filter(Boolean).join(' ')}
        >
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
