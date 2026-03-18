import React from 'react';
import './Button.css';

export type ButtonLevel = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'big' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual level: primary (filled), secondary (outlined), tertiary (text-only) */
  level?: ButtonLevel;
  /** Size variant */
  size?: ButtonSize;
  /** Danger/destructive style */
  danger?: boolean;
  /**
   * Render as icon-only (square) button.
   * When true, `children` is ignored and the icon is centred with equal padding.
   * Pass the icon via `leftIcon`.
   */
  iconOnly?: boolean;
  /**
   * Icon rendered to the left of the label.
   * In icon-only mode this is the sole content — pass the icon here.
   * Recommended sizes: 20px for `size="big"`, 16px for `size="small"`.
   */
  leftIcon?: React.ReactNode;
  /** Icon rendered to the right of the label */
  rightIcon?: React.ReactNode;
  /** Button label text */
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      level = 'primary',
      size = 'big',
      danger = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'btn',
      `btn--${level}`,
      `btn--${size}`,
      danger ? 'btn--danger' : '',
      iconOnly ? 'btn--icon-only' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {leftIcon && (
          <span className="btn__icon btn__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {!iconOnly && children && <span className="btn__label">{children}</span>}
        {rightIcon && (
          <span className="btn__icon btn__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
