import React from 'react';
import './Tooltip.css';

const TooltipArrow = () => (
  <svg
    className="tooltip__arrow-svg"
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3.73495 0.999999C4.50475 -0.333334 6.42925 -0.333333 7.19905 1L10.6631 7C11.4329 8.33334 10.4707 10 8.9311 10L2.00289 10C0.463291 10 -0.498957 8.33333 0.270843 7L3.73495 0.999999Z"
      fill="var(--color-neutral-800)"
    />
  </svg>
);

export const Tooltip = ({
  children,
  arrowPosition = 'up-left',
  className,
}) => {
  const classes = [
    'tooltip',
    `tooltip--arrow-${arrowPosition}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {arrowPosition !== 'none' && (
        <div className="tooltip__arrow">
          <TooltipArrow />
        </div>
      )}
      <div className="tooltip__bubble">{children}</div>
    </div>
  );
};
