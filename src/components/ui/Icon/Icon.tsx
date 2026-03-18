import React from 'react';

export type IconVariant = 'Linear' | 'Bold';

/**
 * Props shared between iconsax-react icons and custom Moji icons.
 * When building a custom icon, accept these props and apply them to your SVG.
 */
export interface IconProps {
  size?: number | string;
  color?: string;
  variant?: IconVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Type for a custom icon component — accepts the same props as iconsax-react icons.
 * Use this type when registering custom icons in the Moji icon set.
 *
 * @example
 * export const MyCustomIcon: CustomIconComponent = ({ size = 24, color = 'currentColor', ...rest }) => (
 *   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
 *     <path d="..." stroke={color} strokeWidth="1.5" strokeLinecap="round" />
 *   </svg>
 * );
 */
export type CustomIconComponent = React.FC<IconProps>;

/**
 * Thin wrapper that normalises size + color onto a custom SVG icon so it
 * behaves identically to an iconsax-react icon.
 *
 * Usage:
 *   <Icon icon={MyCustomIcon} size={20} color="currentColor" />
 */
export interface IconWrapperProps extends IconProps {
  icon: CustomIconComponent;
}

export const Icon: React.FC<IconWrapperProps> = ({
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
export const CloseIcon: CustomIconComponent = ({
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
export const SpinnerIcon: CustomIconComponent = ({
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
