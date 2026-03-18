import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownSelector } from '../../../src/components/ui/DropdownSelector/DropdownSelector';
import type { DropdownSelectorSize } from '../../../src/components/ui/DropdownSelector/DropdownSelector';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1177:8683';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

type SelectorStoryArgs = React.ComponentProps<typeof DropdownSelector> & {
  iconName?: string;
};

function resolveIcon(name: string | undefined): React.ReactElement | undefined {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={24} /> : undefined;
}

const meta: Meta<SelectorStoryArgs> = {
  title: 'Molecules/Dropdown/DropdownSelector',
  component: DropdownSelector,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['big', 'small'] satisfies DropdownSelectorSize[],
      table: { defaultValue: { summary: 'big' } },
    },
    text: { control: 'text' },
    withIcon: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    withText: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    isOpen: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    hasValue: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    icon: { control: false },
    iconName: {
      name: 'icon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon shown on the left when withIcon is true',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
    onClick: { control: false },
  },
  render: ({ iconName, ...args }) => (
    <div style={{ width: '240px' }}>
      <DropdownSelector {...args} icon={resolveIcon(iconName)} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<SelectorStoryArgs>;

export const Default: Story = {
  args: { size: 'big', text: 'Select an option' },
};

export const Placeholder: Story = {
  args: { size: 'big' },
};

export const WithIcon: Story = {
  args: { size: 'big', text: 'With icon', withIcon: true },
};

export const IconOnly: Story = {
  args: { size: 'big', withIcon: true, withText: false, iconName: 'Layer' },
};

export const Selected: Story = {
  args: { size: 'big', text: 'Selected value', hasValue: true },
};

export const Opened: Story = {
  args: { size: 'big', text: 'Opened state', isOpen: true },
};

export const Small: Story = {
  args: { size: 'small', text: 'Small selector' },
};

export const Disabled: Story = {
  args: { size: 'big', text: 'Disabled', disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        width: '260px',
      }}
    >
      {[
        { label: 'Placeholder', props: {} },
        { label: 'Default', props: { text: 'Select an option' } },
        { label: 'Selected', props: { text: 'Selected value', hasValue: true } },
        { label: 'Opened', props: { text: 'Opened state', isOpen: true } },
        {
          label: 'Small',
          props: { text: 'Small selector', size: 'small' as DropdownSelectorSize },
        },
        { label: 'Disabled', props: { text: 'Disabled', disabled: true } },
      ].map(({ label, props }) => (
        <div
          key={label}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
        >
          <span
            style={{
              font: 'var(--text-body-4)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {label}
          </span>
          <DropdownSelector {...props} />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: {
    size: 'big',
    text: 'Select an option',
    withIcon: false,
    withText: true,
    isOpen: false,
    hasValue: false,
    disabled: false,
    iconName: 'none',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
