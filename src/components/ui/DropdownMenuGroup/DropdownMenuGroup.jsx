import React from 'react';
import './DropdownMenuGroup.css';

export const DropdownMenuGroup = React.forwardRef(
  ({ children, maxHeight, className, style, ...rest }, ref) => {
    const classes = [
      'menu-group',
      maxHeight ? 'menu-group--scrollable' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const inlineStyle = {
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
