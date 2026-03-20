import React from 'react';
import { Element4 } from 'iconsax-react';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';
import { PrimaryHorizontalMenuItem } from '../../../src/components/ui/PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem';
import '../../../src/components/ui/PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3047-2154';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

function resolveIcon(name, size) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={size} color="currentColor" /> : undefined;
}

const meta = {
  title: 'Molecules/HorizontalMenu/PrimaryItem',
  component: PrimaryHorizontalMenuItem,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'active'],
    },
    size: {
      control: 'select',
      options: ['regular', 'small'],
    },
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    iconName: {
      name: 'icon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered inside the tab item',
    },
    icon: { control: false },
    showCounter: { control: 'boolean' },
    counter: { control: 'number' },
    showChip: { control: 'boolean' },
    chipLabel: { control: 'text' },
    onClick: { control: false },
  },
  render: ({ iconName, size, ...args }) => {
    const iconSize = size === 'small' ? 14 : 20;
    return (
      <PrimaryHorizontalMenuItem
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
    label: 'Menu',
    state: 'default',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    counter: 3,
    showChip: false,
    chipLabel: 'Chip',
  },
};

export const Active = {
  args: {
    label: 'Menu',
    state: 'active',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    showChip: false,
  },
};

export const Hover = {
  args: {
    label: 'Menu',
    state: 'hover',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    showChip: false,
  },
};

export const SmallDefault = {
  args: {
    label: 'Menu',
    state: 'default',
    size: 'small',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    showChip: false,
  },
};

export const SmallActive = {
  args: {
    label: 'Menu',
    state: 'active',
    size: 'small',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    showChip: false,
  },
};

export const WithCounter = {
  args: {
    label: 'Menu',
    state: 'active',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: true,
    counter: 12,
    showChip: false,
  },
};

export const WithChip = {
  args: {
    label: 'Menu',
    state: 'active',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    showChip: true,
    chipLabel: 'New',
  },
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
      <PrimaryHorizontalMenuItem
        label="Default"
        state="default"
        showIcon
        icon={<Element4 size={20} color="currentColor" />}
      />
      <PrimaryHorizontalMenuItem
        label="Hover"
        state="hover"
        showIcon
        icon={<Element4 size={20} color="currentColor" />}
      />
      <PrimaryHorizontalMenuItem
        label="Active"
        state="active"
        showIcon
        icon={<Element4 size={20} color="currentColor" />}
      />
    </div>
  ),
};

export const Playground = {
  args: {
    label: 'Menu',
    state: 'default',
    size: 'regular',
    showIcon: true,
    iconName: 'Element4',
    showCounter: false,
    counter: 3,
    showChip: false,
    chipLabel: 'Chip',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
