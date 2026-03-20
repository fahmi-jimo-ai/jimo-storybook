import React from 'react';
import { Home } from 'iconsax-react';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';
import { SecondaryHorizontalMenuItem } from '../../../src/components/ui/SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem';
import '../../../src/components/ui/SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=611-1617';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

function resolveIcon(name, size) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={size} color="currentColor" /> : undefined;
}

const meta = {
  title: 'Molecules/HorizontalMenu/SecondaryItem',
  component: SecondaryHorizontalMenuItem,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['active', 'hover', 'inactive'],
    },
    size: {
      control: 'select',
      options: ['small', 'big'],
    },
    tabName: { control: 'text' },
    withText: { control: 'boolean' },
    iconName: {
      name: 'icon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered inside the tab item',
    },
    icon: { control: false },
    onClick: { control: false },
  },
  render: ({ iconName, size, ...args }) => {
    const iconSize = size === 'big' ? 20 : 16;
    return (
      <SecondaryHorizontalMenuItem
        {...args}
        size={size}
        icon={resolveIcon(iconName, iconSize)}
      />
    );
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: {
    tabName: 'Report',
    state: 'inactive',
    size: 'small',
    withText: true,
    iconName: 'Home',
  },
};

export const Active = {
  args: {
    tabName: 'Report',
    state: 'active',
    size: 'small',
    withText: true,
    iconName: 'Home',
  },
};

export const Hover = {
  args: {
    tabName: 'Report',
    state: 'hover',
    size: 'small',
    withText: true,
    iconName: 'Home',
  },
};

export const BigActive = {
  args: {
    tabName: 'Report',
    state: 'active',
    size: 'big',
    withText: true,
    iconName: 'Home',
  },
};

export const IconOnly = {
  args: {
    tabName: 'Report',
    state: 'active',
    size: 'small',
    withText: false,
    iconName: 'Home',
  },
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <SecondaryHorizontalMenuItem
        tabName="Active"
        state="active"
        icon={<Home size={16} color="currentColor" />}
      />
      <SecondaryHorizontalMenuItem
        tabName="Hover"
        state="hover"
        icon={<Home size={16} color="currentColor" />}
      />
      <SecondaryHorizontalMenuItem
        tabName="Inactive"
        state="inactive"
        icon={<Home size={16} color="currentColor" />}
      />
    </div>
  ),
};

export const Playground = {
  args: {
    tabName: 'Report',
    state: 'inactive',
    size: 'small',
    withText: true,
    iconName: 'Home',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
