import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Element4, Chart, Setting2 } from 'iconsax-react';
import { PrimaryHorizontalMenuGroup } from '../../../src/components/ui/PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup';
import '../../../src/components/ui/PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.css';
import '../../../src/components/ui/PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=611-1523';

const TABS_2 = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
];

const TABS_3 = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
];

const TABS_4 = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
  { id: 'reports', label: 'Reports' },
];

const TABS_5 = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
  { id: 'reports', label: 'Reports' },
  { id: 'users', label: 'Users' },
];

const TABS_WITH_ICONS = [
  { id: 'overview', label: 'Overview', icon: <Element4 size={20} color="currentColor" />, showIcon: true },
  { id: 'analytics', label: 'Analytics', icon: <Chart size={20} color="currentColor" />, showIcon: true },
  { id: 'settings', label: 'Settings', icon: <Setting2 size={20} color="currentColor" />, showIcon: true },
];

const meta: Meta<typeof PrimaryHorizontalMenuGroup> = {
  title: 'Organisms/HorizontalMenu/PrimaryGroup',
  component: PrimaryHorizontalMenuGroup,
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      control: 'select',
      options: ['overview', 'analytics', 'settings', 'reports', 'users'],
    },
    size: {
      control: 'select',
      options: ['regular', 'small'],
    },
    showIcon: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    showChip: { control: 'boolean' },
    chipLabel: { control: 'text' },
    tabs: { control: false },
    onTabClick: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: TABS_2,
    activeItem: 'overview',
    size: 'regular',
  },
};

export const ThreeTabs: Story = {
  args: {
    tabs: TABS_3,
    activeItem: 'overview',
    size: 'regular',
  },
};

export const FourTabs: Story = {
  args: {
    tabs: TABS_4,
    activeItem: 'overview',
    size: 'regular',
  },
};

export const FiveTabs: Story = {
  args: {
    tabs: TABS_5,
    activeItem: 'overview',
    size: 'regular',
  },
};

export const SmallSize: Story = {
  args: {
    tabs: TABS_3,
    activeItem: 'analytics',
    size: 'small',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: TABS_WITH_ICONS,
    activeItem: 'overview',
    size: 'regular',
  },
};

export const Playground: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState('overview');
    return (
      <PrimaryHorizontalMenuGroup
        {...args}
        activeItem={activeItem}
        onTabClick={setActiveItem}
      />
    );
  },
  args: {
    tabs: TABS_3,
    size: 'regular',
    showIcon: false,
    showCounter: false,
    showChip: false,
    chipLabel: 'New',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
