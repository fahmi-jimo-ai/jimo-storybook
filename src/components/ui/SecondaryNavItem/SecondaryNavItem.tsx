import React from 'react';
import './SecondaryNavItem.css';

export type SecondaryNavItemState = 'idle' | 'hover' | 'active' | 'disabled';

export interface SecondaryNavItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual state */
  state?: SecondaryNavItemState;
  /** Label text */
  label: string;
  /** Linear icon rendered in idle, hover, and disabled states */
  icon: React.ReactNode;
  /** Bold/filled icon rendered in active state */
  iconActive?: React.ReactNode;
  /** Navigation URL — when provided the item renders as an anchor tag */
  href?: string;
}

export const SecondaryNavItem: React.FC<SecondaryNavItemProps> = ({
  state = 'idle',
  label,
  icon,
  iconActive,
  href,
  className,
  ...rest
}) => {
  const classes = [
    'nav-item-secondary',
    `nav-item-secondary--${state}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = state === 'active' && iconActive ? iconActive : icon;

  const content = (
    <>
      <span className="nav-item-secondary__icon" aria-hidden="true">
        {resolvedIcon}
      </span>
      <span className="nav-item-secondary__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-disabled={state === 'disabled'}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={classes}
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-disabled={state === 'disabled'}
      {...rest}
    >
      {content}
    </div>
  );
};
