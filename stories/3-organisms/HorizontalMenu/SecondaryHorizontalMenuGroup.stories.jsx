import { useState } from 'react';
import { Home, Chart, Setting2, User } from 'iconsax-react';
import { SecondaryHorizontalMenuGroup } from '../../../src/components/ui/SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup';
import '../../../src/components/ui/SecondaryHorizontalMenuGroup/SecondaryHorizontalMenuGroup.css';
import '../../../src/components/ui/SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=611-1630';

const TABS_2 = [
  { id: 'home', tabName: 'Report', icon: <Home size={16} color="currentColor" /> },
  { id: 'analytics', tabName: 'Analytics', icon: <Chart size={16} color="currentColor" /> },
];

const TABS_3 = [
  { id: 'home', tabName: 'Report', icon: <Home size={16} color="currentColor" /> },
  { id: 'analytics', tabName: 'Analytics', icon: <Chart size={16} color="currentColor" /> },
  { id: 'settings', tabName: 'Settings', icon: <Setting2 size={16} color="currentColor" /> },
];

const TABS_4 = [
  { id: 'home', tabName: 'Report', icon: <Home size={16} color="currentColor" /> },
  { id: 'analytics', tabName: 'Analytics', icon: <Chart size={16} color="currentColor" /> },
  { id: 'settings', tabName: 'Settings', icon: <Setting2 size={16} color="currentColor" /> },
  { id: 'users', tabName: 'Users', icon: <User size={16} color="currentColor" /> },
];

const TABS_2_BIG = [
  { id: 'home', tabName: 'Report', icon: <Home size={20} color="currentColor" /> },
  { id: 'analytics', tabName: 'Analytics', icon: <Chart size={20} color="currentColor" /> },
];

const meta = {
  title: 'Organisms/HorizontalMenu/SecondaryGroup',
  component: SecondaryHorizontalMenuGroup,
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      control: 'select',
      options: ['home', 'analytics', 'settings', 'users'],
    },
    size: {
      control: 'select',
      options: ['small', 'big'],
    },
    withText: { control: 'boolean' },
    tabs: { control: false },
    onTabClick: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: {
    tabs: TABS_2,
    activeItem: 'home',
    size: 'small',
    withText: true,
  },
};

export const ThreeTabs = {
  args: {
    tabs: TABS_3,
    activeItem: 'home',
    size: 'small',
    withText: true,
  },
};

export const FourTabs = {
  args: {
    tabs: TABS_4,
    activeItem: 'home',
    size: 'small',
    withText: true,
  },
};

export const BigSize = {
  args: {
    tabs: TABS_2_BIG,
    activeItem: 'home',
    size: 'big',
    withText: true,
  },
};

export const IconOnly = {
  args: {
    tabs: TABS_3,
    activeItem: 'home',
    size: 'small',
    withText: false,
  },
};

export const Playground = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState('home');
    return (
      <SecondaryHorizontalMenuGroup
        {...args}
        activeItem={activeItem}
        onTabClick={setActiveItem}
      />
    );
  },
  args: {
    tabs: TABS_3,
    size: 'small',
    withText: true,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
