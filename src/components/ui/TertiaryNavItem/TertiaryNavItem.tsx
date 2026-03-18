import React from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import '../Tooltip/Tooltip.css';
import './TertiaryNavItem.css';

export type TertiaryNavItemState = 'idle' | 'hover';

export interface TertiaryNavItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon to render — 16px recommended */
  icon: React.ReactNode;
  /** Tooltip text shown on hover */
  label?: string;
  /** Visual state (for static story display) */
  state?: TertiaryNavItemState;
  /** Navigation URL — when provided the item renders as an anchor tag */
  href?: string;
}

export const TertiaryNavItem: React.FC<TertiaryNavItemProps> = ({
  icon,
  label,
  state = 'idle',
  href,
  className,
  ...rest
}) => {
  const classes = [
    'nav-item-tertiary',
    state === 'hover' ? 'nav-item-tertiary--hover' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="nav-item-tertiary__icon" aria-hidden="true">
        {icon}
      </span>
      {label && (
        <span className="nav-item-tertiary__tooltip-wrap">
          <Tooltip arrowPosition="bottom">{label}</Tooltip>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={label}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes} role="button" tabIndex={0} aria-label={label} {...rest}>
      {content}
    </div>
  );
};
