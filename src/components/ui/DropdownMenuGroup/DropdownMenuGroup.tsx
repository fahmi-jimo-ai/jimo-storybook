import React from 'react';
import './DropdownMenuGroup.css';

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Children: DropdownMenuList items */
  children?: React.ReactNode;
  /** CSS max-height value that enables scrollable overflow (e.g. "240px", 240) */
  maxHeight?: string | number;
  className?: string;
}

export const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ children, maxHeight, className, style, ...rest }, ref) => {
    const classes = [
      'menu-group',
      maxHeight ? 'menu-group--scrollable' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(maxHeight
        ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
        : {}),
    };

    return (
      <div ref={ref} className={classes} style={inlineStyle} role="listbox" {...rest}>
        {children}
      </div>
    );
  }
);

DropdownMenuGroup.displayName = 'DropdownMenuGroup';
