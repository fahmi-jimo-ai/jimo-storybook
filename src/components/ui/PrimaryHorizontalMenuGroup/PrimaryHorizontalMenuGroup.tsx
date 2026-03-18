import React, { useEffect, useRef, useState } from 'react';
import {
  PrimaryHorizontalMenuItem,
  PrimaryHorizontalMenuItemSize,
} from '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem';
import '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';
import './PrimaryHorizontalMenuGroup.css';

export interface PrimaryHorizontalMenuTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  showCounter?: boolean;
  counter?: number;
  showChip?: boolean;
  chipLabel?: string;
}

export interface PrimaryHorizontalMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab definitions */
  tabs: PrimaryHorizontalMenuTab[];
  /** ID of the currently active tab */
  activeItem?: string;
  /** Called when a tab is clicked */
  onTabClick?: (id: string) => void;
  /** Size applied to all items */
  size?: PrimaryHorizontalMenuItemSize;
  /** Show icon on all items (overrides per-tab showIcon) */
  showIcon?: boolean;
  /** Show counter on all items (overrides per-tab showCounter) */
  showCounter?: boolean;
  /** Show chip badge on all items (overrides per-tab showChip) */
  showChip?: boolean;
  /** Chip label applied to all items (overrides per-tab chipLabel) */
  chipLabel?: string;
}

interface IndicatorStyle {
  width: number;
  translateX: number;
  ready: boolean;
}

export const PrimaryHorizontalMenuGroup: React.FC<PrimaryHorizontalMenuGroupProps> = ({
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
  const groupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [indicator, setIndicator] = useState<IndicatorStyle>({
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
