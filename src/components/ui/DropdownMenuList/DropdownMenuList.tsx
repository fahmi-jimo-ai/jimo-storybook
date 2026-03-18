import React from 'react';
import { HambergerMenu } from 'iconsax-react';
import './DropdownMenuList.css';

export type DropdownMenuListState =
  | 'default'
  | 'hover'
  | 'hover-selected'
  | 'selected'
  | 'list-header'
  | 'disabled';

export interface DropdownMenuListProps {
  /** Visual/interactive state */
  state?: DropdownMenuListState;
  /** Danger/destructive styling — red text */
  danger?: boolean;
  /** Show a checkbox (multi-select mode) */
  multiSelect?: boolean;
  /** Whether the icon slot is shown (non-multiSelect mode only) */
  showIcon?: boolean;
  /** Custom icon to display on the left — accepts any iconsax-react or CustomIconComponent */
  icon?: React.ReactNode;
  /** Show the secondary description sub-text */
  showDescription?: boolean;
  /** Main label text */
  text?: string;
  /** Secondary description text */
  description?: string;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const CheckboxUnchecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect
      x="0.75"
      y="0.75"
      width="14.5"
      height="14.5"
      rx="3.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckboxChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect width="16" height="16" rx="4" fill="currentColor" />
    <path
      d="M3.5 8L6.5 11L12.5 5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DropdownMenuList = ({
  state = 'default',
  danger = false,
  multiSelect = false,
  showIcon = true,
  icon,
  showDescription = false,
  text = 'Text',
  description,
  onClick,
  className,
}: DropdownMenuListProps) => {
  const isSelected = state === 'selected' || state === 'hover-selected';
  const isDisabled = state === 'disabled';
  const isHeader = state === 'list-header';
  const isHover = state === 'hover' || state === 'hover-selected';

  const classes = [
    'menu-list-item',
    isHeader ? 'menu-list-item--list-header' : '',
    isDisabled ? 'menu-list-item--disabled' : '',
    isHover ? 'menu-list-item--hover' : '',
    isSelected ? 'menu-list-item--selected' : '',
    danger ? 'menu-list-item--danger' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (isHeader) {
    return (
      <div className={classes} role="presentation">
        <span className="menu-list-item__text menu-list-item__text--header">{text}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      {multiSelect && (
        <span
          className={`menu-list-item__checkbox${isSelected ? ' menu-list-item__checkbox--checked' : ''}`}
          aria-hidden="true"
        >
          {isSelected ? <CheckboxChecked /> : <CheckboxUnchecked />}
        </span>
      )}
      {!multiSelect && showIcon && (
        <span className="menu-list-item__icon" aria-hidden="true">
          {icon ?? <HambergerMenu size={16} variant="Linear" />}
        </span>
      )}
      <span className="menu-list-item__content">
        <span className="menu-list-item__text">{text}</span>
        {showDescription && description && (
          <span className="menu-list-item__description">{description}</span>
        )}
      </span>
    </button>
  );
};

DropdownMenuList.displayName = 'DropdownMenuList';
