import React from 'react';
import { HambergerMenu, ArrowDown2 } from 'iconsax-react';
import './DropdownSelector.css';

export type DropdownSelectorSize = 'big' | 'small';
export type DropdownSelectorState =
  | 'default'
  | 'hover'
  | 'active'
  | 'opened'
  | 'selected'
  | 'placeholder';

export interface DropdownSelectorProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Size variant */
  size?: DropdownSelectorSize;
  /** Current state (useful for styling when controlled externally) */
  state?: DropdownSelectorState;
  /** Selected / placeholder text */
  text?: string;
  /** Show the left icon slot */
  withIcon?: boolean;
  /** Icon to display on the left */
  icon?: React.ReactNode;
  /** Show text and chevron (false = icon-only mode) */
  withText?: boolean;
  /** Whether the dropdown is open (controls open indicator) */
  isOpen?: boolean;
  /** Whether a value has been selected (blue text treatment) */
  hasValue?: boolean;
  className?: string;
}

export const DropdownSelector = React.forwardRef<HTMLButtonElement, DropdownSelectorProps>(
  (
    {
      size = 'big',
      text,
      withIcon = false,
      icon,
      withText = true,
      isOpen = false,
      hasValue = false,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'dropdown-selector',
      `dropdown-selector--${size}`,
      isOpen ? 'dropdown-selector--open' : '',
      hasValue ? 'dropdown-selector--selected' : '',
      disabled ? 'dropdown-selector--disabled' : '',
      withText && !text ? 'dropdown-selector--placeholder' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...rest}
      >
        {withIcon && (
          <span className="dropdown-selector__icon">
            {icon ?? <HambergerMenu size={20} variant="Linear" />}
          </span>
        )}
        {withText && (
          <span className="dropdown-selector__text">
            {text ?? <span className="dropdown-selector__placeholder">Select…</span>}
          </span>
        )}
        {withText && (
          <span className={`dropdown-selector__chevron${isOpen ? ' dropdown-selector__chevron--up' : ''}`} aria-hidden="true">
            <ArrowDown2 size={20} variant="Linear" />
          </span>
        )}
      </button>
    );
  }
);

DropdownSelector.displayName = 'DropdownSelector';
