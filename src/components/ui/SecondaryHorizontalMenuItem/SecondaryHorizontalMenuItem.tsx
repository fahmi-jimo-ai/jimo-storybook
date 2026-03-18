import React from 'react';
import './SecondaryHorizontalMenuItem.css';

export type SecondaryHorizontalMenuItemState = 'active' | 'hover' | 'inactive';
export type SecondaryHorizontalMenuItemSize = 'small' | 'big';

export interface SecondaryHorizontalMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab name */
  tabName?: string;
  /** Visual state */
  state?: SecondaryHorizontalMenuItemState;
  /** Size variant */
  size?: SecondaryHorizontalMenuItemSize;
  /** Whether to show the label text alongside the icon */
  withText?: boolean;
  /** Icon element (iconsax or any ReactNode) */
  icon?: React.ReactNode;
  /** Called when the item is clicked */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const SecondaryHorizontalMenuItem = React.forwardRef<
  HTMLDivElement,
  SecondaryHorizontalMenuItemProps
>(
  (
    {
      tabName = 'Report',
      state = 'inactive',
      size = 'small',
      withText = true,
      icon,
      onClick,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'tab-secondary-item',
      `tab-secondary-item--${state}`,
      `tab-secondary-item--${size}`,
      withText ? 'tab-secondary-item--text-icon' : 'tab-secondary-item--icon-only',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="tab"
        aria-selected={state === 'active'}
        tabIndex={0}
        onClick={onClick}
        {...rest}
      >
        <div className="tab-secondary-item__content">
          {icon && (
            <span className="tab-secondary-item__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          {withText && <span className="tab-secondary-item__label">{tabName}</span>}
        </div>
      </div>
    );
  }
);

SecondaryHorizontalMenuItem.displayName = 'SecondaryHorizontalMenuItem';
