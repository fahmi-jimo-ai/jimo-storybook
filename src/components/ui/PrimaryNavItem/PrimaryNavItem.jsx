import React from 'react';
import { Chip } from '../Chip/Chip';
import { Tooltip } from '../Tooltip/Tooltip';
import '../Chip/Chip.css';
import '../Tooltip/Tooltip.css';
import './PrimaryNavItem.css';

export const PrimaryNavItem = ({
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
        {...rest}
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
