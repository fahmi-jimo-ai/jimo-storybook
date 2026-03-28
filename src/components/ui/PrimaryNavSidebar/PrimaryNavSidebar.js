import React from 'react';
import {
  Flag2,
  MagicStar,
  Routing2,
  Notepad2,
  Notification1,
  Notification,
  TaskSquare,
  Story,
  DirectboxNotif,
  Element3,
  Chart2,
  Profile2User,
  Setting2,
  MessageQuestion,
  Profile,
  ArrowDown2,
  SliderVertical,
  Like1,
  Book,
  Flash,
} from 'iconsax-react';
import { BannerIcon, AgentIcon } from '../Icon/Icon';
import { PrimaryNavItem } from '../PrimaryNavItem/PrimaryNavItem';
import { PrimaryNavGroup } from '../PrimaryNavGroup/PrimaryNavGroup';
import { TertiaryNavGroup } from '../TertiaryNavGroup/TertiaryNavGroup';
import '../PrimaryNavItem/PrimaryNavItem.css';
import '../PrimaryNavGroup/PrimaryNavGroup.css';
import '../TertiaryNavGroup/TertiaryNavGroup.css';
import '../TertiaryNavItem/TertiaryNavItem.css';
import './PrimaryNavSidebar.css';

const ICON_SIZE = 20;

const NAV_ITEMS_TOP = [
  {
    label: 'Get Started',
    icon: <Flag2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Flag2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_ENGAGEMENT = [
  {
    label: 'Tours',
    icon: <Routing2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Routing2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Surveys',
    icon: <Notepad2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Notepad2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Banners',
    icon: <BannerIcon size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <BannerIcon size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Hints',
    icon: <Notification1 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Notification1 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_CONTENT = [
  {
    label: 'Checklists',
    icon: <TaskSquare size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <TaskSquare size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
    {
    label: 'Agent',
    icon: <AgentIcon size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <AgentIcon size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Resource Center',
    icon: <DirectboxNotif size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <DirectboxNotif size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
    {
    label: 'Changelog Posts',
    icon: <SliderVertical size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <SliderVertical size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_SPACES = [
  {
    label: 'Spaces',
    icon: <Element3 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Element3 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_ANALYTICS = [
  {
    label: 'Success Trackers',
    icon: <Chart2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Chart2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
      {
    label: 'Actions',
    icon: <Flash size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Flash size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Users & Segments',
    icon: <Profile2User size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Profile2User size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_SETTINGS = [
  {
    label: 'Settings',
    icon: <Setting2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Setting2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

function NavSection({
  items,
  activeItem,
  collapsed,
  onItemClick,
}) {
  return (
    <PrimaryNavGroup type={collapsed ? 'collapsed' : 'expanded'}>
      {items.map((item) => (
        <PrimaryNavItem
          key={item.label}
          state={item.label === activeItem ? 'active' : 'idle'}
          type={collapsed ? 'collapsed' : 'default'}
          label={item.label}
          icon={item.icon}
          iconActive={item.iconActive}
          chip={item.chip}
          onClick={() => onItemClick?.(item.label)}
        />
      ))}
    </PrimaryNavGroup>
  );
}

export const PrimaryNavSidebar = ({
  collapsed = false,
  activeItem,
  onItemClick,
  projectName = 'Jimo',
  projectImage,
  className,
  ...rest
}) => {
  const classes = [
    'nav-sidebar-primary',
    collapsed ? 'nav-sidebar-primary--collapsed' : 'nav-sidebar-primary--expanded',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {/* Scrollable body */}
      <div className="nav-sidebar-primary__body">
        {/* Project selector */}
        <div className="nav-sidebar-primary__project-section">
          {collapsed ? (
            <div className="nav-sidebar-primary__project-item nav-sidebar-primary__project-item--collapsed">
              {projectImage ? (
                <img className="nav-sidebar-primary__project-avatar" src={projectImage} alt={projectName} />
              ) : (
                <div className="nav-sidebar-primary__project-avatar" />
              )}
            </div>
          ) : (
            <div className="nav-sidebar-primary__project-item">
              {projectImage ? (
                <img className="nav-sidebar-primary__project-avatar" src={projectImage} alt={projectName} />
              ) : (
                <div className="nav-sidebar-primary__project-avatar" />
              )}
              <span className="nav-sidebar-primary__project-name">{projectName}</span>
              <ArrowDown2 size={16} variant="Linear" color="currentColor" />
            </div>
          )}
        </div>

        <div className="nav-sidebar-primary__separator" />

        {/* Get Started Nav Item
        <NavSection items={NAV_ITEMS_TOP} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" /> */}

        <NavSection items={NAV_ITEMS_ENGAGEMENT} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
                <div className="nav-sidebar-primary__separator" />
        <NavSection items={NAV_ITEMS_CONTENT} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_SPACES} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_ANALYTICS} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />
                <NavSection items={NAV_ITEMS_SETTINGS} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />


      </div>

      {/* Footer — only shown in expanded mode */}
      {!collapsed && (
        <TertiaryNavGroup
          items={[
            { icon: <Like1 size={16} variant="Linear" color="currentColor" />, label: 'Give Feedback', tooltipArrowPosition: 'bottom-left' },
            { icon: <Notification size={16} variant="Linear" color="currentColor" />, label: "What's new?" },
            { icon: <Book size={16} variant="Linear" color="currentColor" />, label: 'Documentation' },
            { icon: <MessageQuestion size={16} variant="Linear" color="currentColor" />, label: 'Get Started' },
          ]}
        />
      )}
    </div>
  );
};
