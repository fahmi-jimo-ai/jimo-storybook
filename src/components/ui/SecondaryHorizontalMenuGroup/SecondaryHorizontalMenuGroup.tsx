import React, { useEffect, useRef, useState } from 'react';
import {
  SecondaryHorizontalMenuItem,
  SecondaryHorizontalMenuItemSize,
} from '../SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem';
import '../SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.css';
import './SecondaryHorizontalMenuGroup.css';

export interface SecondaryHorizontalMenuTab {
  id: string;
  tabName: string;
  icon?: React.ReactNode;
}

export interface SecondaryHorizontalMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab definitions */
  tabs: SecondaryHorizontalMenuTab[];
  /** ID of the currently active tab */
  activeItem?: string;
  /** Called when a tab is clicked */
  onTabClick?: (id: string) => void;
  /** Size applied to all items */
  size?: SecondaryHorizontalMenuItemSize;
  /** Whether to show label text on all items */
  withText?: boolean;
}

interface PillStyle {
  width: number;
  translateX: number;
  ready: boolean;
}

export const SecondaryHorizontalMenuGroup: React.FC<SecondaryHorizontalMenuGroupProps> = ({
  tabs,
  activeItem,
  onTabClick,
  size = 'small',
  withText = true,
  className,
  ...rest
}) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pill, setPill] = useState<PillStyle>({
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

    setPill({
      width: itemRect.width,
      translateX: itemRect.left - groupRect.left,
      ready: true,
    });
  }, [activeItem, tabs]);

  const classes = ['tab-secondary-group', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tablist" ref={groupRef} {...rest}>
      <div
        className="tab-secondary-group__pill"
        aria-hidden="true"
        style={{
          width: pill.width,
          transform: `translateX(${pill.translateX}px)`,
          opacity: pill.ready ? 1 : 0,
        }}
      />
      {tabs.map((tab, index) => (
        <SecondaryHorizontalMenuItem
          key={tab.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          tabName={tab.tabName}
          state={activeItem === tab.id ? 'active' : 'inactive'}
          size={size}
          icon={tab.icon}
          withText={withText}
          onClick={() => onTabClick?.(tab.id)}
          className="tab-secondary-group__item"
        />
      ))}
    </div>
  );
};
