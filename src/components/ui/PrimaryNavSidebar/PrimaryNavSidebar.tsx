import React from 'react';
import {
  Flag2,
  MagicStar,
  RouteSquare,
  ClipboardText,
  Note,
  InfoCircle,
  TaskSquare,
  Story,
  Book,
  Global,
  Chart,
  People,
  Setting2,
  MessageQuestion,
  Profile,
  ArrowDown2,
} from 'iconsax-react';
import { PrimaryNavItem } from '../PrimaryNavItem/PrimaryNavItem';
import { PrimaryNavGroup } from '../PrimaryNavGroup/PrimaryNavGroup';
import { TertiaryNavGroup } from '../TertiaryNavGroup/TertiaryNavGroup';
import { TertiaryNavItem } from '../TertiaryNavItem/TertiaryNavItem';
import '../PrimaryNavItem/PrimaryNavItem.css';
import '../PrimaryNavGroup/PrimaryNavGroup.css';
import '../TertiaryNavGroup/TertiaryNavGroup.css';
import '../TertiaryNavItem/TertiaryNavItem.css';
import './PrimaryNavSidebar.css';

export interface PrimaryNavSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Collapsed (icon-only) mode — default: false */
  collapsed?: boolean;
  /** Label of the currently active nav item */
  activeItem?: string;
  /** Called when a nav item is clicked, with the item label */
  onItemClick?: (label: string) => void;
}

interface NavItemDef {
  label: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  chip?: string;
}

const ICON_SIZE = 20;

const NAV_ITEMS_TOP: NavItemDef[] = [
  {
    label: 'Get Started',
    icon: <Flag2 size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Flag2 size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_COPILOT: NavItemDef[] = [
  {
    label: 'Copilot',
    icon: <MagicStar size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <MagicStar size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_ENGAGEMENT: NavItemDef[] = [
  {
    label: 'Tours',
    icon: <RouteSquare size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Surveys',
    icon: <ClipboardText size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <ClipboardText size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Banners',
    icon: <Note size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Note size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Hints',
    icon: <InfoCircle size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <InfoCircle size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_CONTENT: NavItemDef[] = [
  {
    label: 'Checklists',
    icon: <TaskSquare size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <TaskSquare size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Changelog Posts',
    icon: <Story size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Story size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Resource Center',
    icon: <Book size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Book size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_SPACES: NavItemDef[] = [
  {
    label: 'Spaces',
    icon: <Global size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Global size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

const NAV_ITEMS_ANALYTICS: NavItemDef[] = [
  {
    label: 'Success Trackers',
    icon: <Chart size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <Chart size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
  {
    label: 'Users & Segments',
    icon: <People size={ICON_SIZE} variant="Linear" color="currentColor" />,
    iconActive: <People size={ICON_SIZE} variant="Bold" color="currentColor" />,
  },
];

function NavSection({
  items,
  activeItem,
  collapsed,
  onItemClick,
}: {
  items: NavItemDef[];
  activeItem?: string;
  collapsed: boolean;
  onItemClick?: (label: string) => void;
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

export const PrimaryNavSidebar: React.FC<PrimaryNavSidebarProps> = ({
  collapsed = false,
  activeItem,
  onItemClick,
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
              <div className="nav-sidebar-primary__project-avatar" />
            </div>
          ) : (
            <div className="nav-sidebar-primary__project-item">
              <div className="nav-sidebar-primary__project-avatar" />
              <span className="nav-sidebar-primary__project-name">Jimo</span>
              <ArrowDown2 size={16} variant="Linear" color="currentColor" />
            </div>
          )}
        </div>

        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_TOP} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_COPILOT} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_ENGAGEMENT} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <NavSection items={NAV_ITEMS_CONTENT} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_SPACES} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
        <div className="nav-sidebar-primary__separator" />

        <NavSection items={NAV_ITEMS_ANALYTICS} activeItem={activeItem} collapsed={collapsed} onItemClick={onItemClick} />
      </div>

      {/* Footer — only shown in expanded mode */}
      {!collapsed && (
        <TertiaryNavGroup
          start={
            <>
              <TertiaryNavItem
                icon={<Setting2 size={16} variant="Linear" color="currentColor" />}
                label="Settings"
              />
              <TertiaryNavItem
                icon={<MessageQuestion size={16} variant="Linear" color="currentColor" />}
                label="Help"
              />
            </>
          }
          end={
            <TertiaryNavItem
              icon={<Profile size={16} variant="Linear" color="currentColor" />}
              label="Profile"
            />
          }
        />
      )}
    </div>
  );
};
