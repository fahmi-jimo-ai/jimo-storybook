import React, { useEffect, useRef, useState } from 'react';
import { PrimaryHorizontalMenuItem } from '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem';
import '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';
import './PrimaryHorizontalMenuGroup.css';

export const PrimaryHorizontalMenuGroup = ({
  tabs,
  activeItem,
  onTabClick,
  size = 'regular',
  showIcon,
  showCounter,
  showChip,
  chipLabel,
  className,
  ...rest
}) => {
  const groupRef = useRef(null);
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({
    width: 0,
    translateX: 0,
    ready: false,
  });

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeItem);
    if (activeIndex === -1 || !groupRef.current) return;
    const itemEl = itemRefs.current[activeIndex];
    if (!itemEl) return;

    const groupRect = groupRef.current.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();

    setIndicator({
      width: itemRect.width,
      translateX: itemRect.left - groupRect.left,
      ready: true,
    });
  }, [activeItem, tabs]);

  const classes = ['tab-primary-group', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tablist" ref={groupRef} {...rest}>
      {tabs.map((tab, index) => (
        <PrimaryHorizontalMenuItem
          key={tab.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          label={tab.label}
          state={activeItem === tab.id ? 'active' : 'default'}
          size={size}
          icon={tab.icon}
          showIcon={showIcon ?? (tab.showIcon ?? !!tab.icon)}
          showCounter={showCounter ?? tab.showCounter}
          counter={tab.counter}
          showChip={showChip ?? tab.showChip}
          chipLabel={chipLabel ?? tab.chipLabel}
          onClick={() => onTabClick?.(tab.id)}
        />
      ))}
      <div
        className="tab-primary-group__indicator"
        aria-hidden="true"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.translateX}px)`,
          opacity: indicator.ready ? 1 : 0,
        }}
      />
    </div>
  );
};
