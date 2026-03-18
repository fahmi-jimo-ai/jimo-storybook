import React from 'react';
import { CloseCircle } from 'iconsax-react';
import './Chip.css';

export type ChipSize = 'regular' | 'small' | 'x-small' | 'xx-small';
export type ChipType = 'neutral' | 'positive' | 'negative' | 'alert' | 'brand';
export type ChipVariant = 'primary' | 'secondary';

export interface ChipProps {
  /** Visual type / semantic color */
  type?: ChipType;
  /** Filled (primary) or outlined (secondary) */
  variant?: ChipVariant;
  /** Size variant */
  size?: ChipSize;
  /** Chip label text */
  children?: React.ReactNode;
  /** Icon to show on the left */
  leftIcon?: React.ReactNode;
  /** Icon to show on the right */
  rightIcon?: React.ReactNode;
  /** Show only the icon (no text) */
  iconOnly?: boolean;
  /** Called when the remove × icon is clicked */
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  type = 'neutral',
  variant = 'secondary',
  size = 'regular',
  children,
  leftIcon,
  rightIcon,
  iconOnly = false,
  onRemove,
  className,
}) => {
  const classes = [
    'chip',
    `chip--${type}`,
    `chip--${variant}`,
    `chip--${size}`,
    iconOnly ? 'chip--icon-only' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {iconOnly ? (
        leftIcon ?? rightIcon
      ) : (
        <>
          {leftIcon && <span className="chip__icon">{leftIcon}</span>}
          {children && <span className="chip__label">{children}</span>}
          {rightIcon && !onRemove && <span className="chip__icon">{rightIcon}</span>}
        </>
      )}
      {onRemove && (
        <button
          type="button"
          className="chip__remove"
          onClick={onRemove}
          aria-label="Remove"
        >
          <CloseCircle size={16} variant="Bold" color="currentColor" />
        </button>
      )}
    </span>
  );
};
