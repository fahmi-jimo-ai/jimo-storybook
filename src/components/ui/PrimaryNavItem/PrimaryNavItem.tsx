import React from 'react';
import { Chip } from '../Chip/Chip';
import { Tooltip } from '../Tooltip/Tooltip';
import '../Chip/Chip.css';
import '../Tooltip/Tooltip.css';
import './PrimaryNavItem.css';

export type PrimaryNavItemState = 'idle' | 'hover' | 'active';
export type PrimaryNavItemType = 'default' | 'collapsed';

export interface PrimaryNavItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual state */
  state?: PrimaryNavItemState;
  /** Layout type — default shows icon + label; collapsed is icon-only */
  type?: PrimaryNavItemType;
  /** Label text (required for type='default'; used as tooltip text for type='collapsed') */
  label?: string;
  /** Linear icon rendered in idle and hover states */
  icon: React.ReactNode;
  /** Bold/filled icon rendered in active state */
  iconActive?: React.ReactNode;
  /** Badge text rendered as a Chip on the right (default type only) */
  chip?: string;
  /** Navigation URL — when provided the item renders as an anchor tag */
  href?: string;
}

export const PrimaryNavItem: React.FC<PrimaryNavItemProps> = ({
  state = 'idle',
  type = 'default',
  label,
  icon,
  iconActive,
  chip,
  href,
  className,
  ...rest
}) => {
  const classes = [
    'nav-item-primary',
    `nav-item-primary--${type}`,
    `nav-item-primary--${state}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = state === 'active' && iconActive ? iconActive : icon;

  const content = (
    <>
      <span className="nav-item-primary__icon" aria-hidden="true">
        {resolvedIcon}
      </span>
      {type === 'default' && label && (
        <span className="nav-item-primary__label">{label}</span>
      )}
      {type === 'default' && chip && (
        <Chip type="brand" variant="primary" size="xx-small">
          {chip}
        </Chip>
      )}
      {type === 'collapsed' && label && (
        <span className="nav-item-primary__tooltip-wrap">
          <Tooltip arrowPosition="left">{label}</Tooltip>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes} role="button" tabIndex={0} {...rest}>
      {content}
    </div>
  );
};
