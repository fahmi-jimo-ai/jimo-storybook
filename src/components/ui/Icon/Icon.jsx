import React from 'react';

export const Icon = ({
  icon: IconComponent,
  size = 24,
  color = 'currentColor',
  variant = 'Linear',
  className,
  style,
}) => (
  <IconComponent
    size={size}
    color={color}
    variant={variant}
    className={className}
    style={style}
  />
);

Icon.displayName = 'Icon';

// ─── Built-in custom icons ────────────────────────────────────────────────────
// These fill gaps where iconsax-react doesn't have the exact shape we need.
// They follow the same CustomIconComponent interface.

/** Simple × close icon — used in chip remove and toast dismiss. */
export const CloseIcon = ({
  size = 24,
  color = 'currentColor',
  className,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
CloseIcon.displayName = 'CloseIcon';

/** Spinning loader circle — used for loading states. */
export const SpinnerIcon = ({
  size = 24,
  color = 'currentColor',
  className,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <circle
      cx="12"
      cy="12"
      r="8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="14 38"
    />
  </svg>
);
SpinnerIcon.displayName = 'SpinnerIcon';
