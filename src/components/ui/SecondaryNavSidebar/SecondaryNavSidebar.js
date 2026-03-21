import React from 'react';
import {
  Book,
  ShieldSecurity,
  MessageText,
  Flash,
  Setting2,
  MessageQuestion,
  Eye,
  Chart,
} from 'iconsax-react';
import { SecondaryNavItem } from '../SecondaryNavItem/SecondaryNavItem';
import { SecondaryNavGroup } from '../SecondaryNavGroup/SecondaryNavGroup';
import '../SecondaryNavItem/SecondaryNavItem.css';
import '../SecondaryNavGroup/SecondaryNavGroup.css';
import './SecondaryNavSidebar.css';

const ICON_SIZE = 20;

const SECTIONS = [
  {
    title: 'Train',
    items: [
      {
        label: 'Knowledge',
        icon: <Book size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <Book size={ICON_SIZE} variant="Bold" color="currentColor" />,
      },
      {
        label: 'Guardrails',
        icon: <ShieldSecurity size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <ShieldSecurity size={ICON_SIZE} variant="Bold" color="currentColor" />,
        disabled: true,
      },
    ],
  },
  {
    title: 'Build',
    items: [
      {
        label: 'Chat',
        icon: <MessageText size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <MessageText size={ICON_SIZE} variant="Bold" color="currentColor" />,
      },
      {
        label: 'Triggers',
        icon: <Flash size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <Flash size={ICON_SIZE} variant="Bold" color="currentColor" />,
      },
      {
        label: 'Actions',
        icon: <Setting2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <Setting2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
      },
    ],
  },
  {
    title: 'Evaluate',
    disabled: true,
    items: [
      {
        label: 'Conversations',
        icon: <MessageQuestion size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <MessageQuestion size={ICON_SIZE} variant="Bold" color="currentColor" />,
        disabled: true,
      },
      {
        label: 'Observe',
        icon: <Eye size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <Eye size={ICON_SIZE} variant="Bold" color="currentColor" />,
        disabled: true,
      },
      {
        label: 'Analyze',
        icon: <Chart size={ICON_SIZE} variant="Linear" color="currentColor" />,
        iconActive: <Chart size={ICON_SIZE} variant="Bold" color="currentColor" />,
        disabled: true,
      },
    ],
  },
];

export const SecondaryNavSidebar = ({
  activeItem,
  onItemClick,
  className,
  ...rest
}) => {
  const classes = ['nav-sidebar-secondary', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {SECTIONS.map((section, idx) => (
        <React.Fragment key={section.title ?? idx}>
          {idx > 0 && <div className="nav-sidebar-secondary__divider" />}
          <SecondaryNavGroup
            title={
              section.disabled && section.title
                ? `${section.title} (Coming Soon)`
                : section.title
            }
          >
            {section.items.map((item) => {
              const state = item.disabled
                ? 'disabled'
                : item.label === activeItem
                ? 'active'
                : 'idle';
              return (
                <SecondaryNavItem
                  key={item.label}
                  state={state}
                  label={item.label}
                  icon={item.icon}
                  iconActive={item.iconActive}
                  onClick={state !== 'disabled' ? () => onItemClick?.(item.label) : undefined}
                />
              );
            })}
          </SecondaryNavGroup>
        </React.Fragment>
      ))}
    </div>
  );
};
