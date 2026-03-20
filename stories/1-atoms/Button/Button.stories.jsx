import React from 'react';
import { Trash } from 'iconsax-react';
import { Button } from '../../../src/components/ui/Button/Button';
import '../../../src/components/ui/Button/Button.css';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2906-5218';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

function resolveIcon(name) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={20} /> : undefined;
}

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // FR-3: level → variant label remap
    level: {
      name: 'variant',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual style variant — maps to `level` prop in code',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['big', 'small'],
      table: { defaultValue: { summary: 'big' } },
    },
    danger: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    iconOnly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
    children: { control: 'text' },
    leftIconName: {
      name: 'leftIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered on the left side of the button (or sole content in icon-only mode)',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
    rightIconName: {
      name: 'rightIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered on the right side of the button',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
  },
  // Meta-level render: maps leftIconName/rightIconName strings → React elements for all stories
  render: ({ leftIconName, rightIconName, ...args }) => (
    <Button
      {...args}
      leftIcon={resolveIcon(leftIconName)}
      rightIcon={resolveIcon(rightIconName)}
    />
  ),
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: { level: 'primary', size: 'big', children: 'Button' },
};

export const Secondary = {
  args: { level: 'secondary', size: 'big', children: 'Button' },
};

export const Tertiary = {
  args: { level: 'tertiary', size: 'big', children: 'Button' },
};

export const Danger = {
  args: { level: 'primary', size: 'big', danger: true, children: 'Delete' },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
        <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>Big</span>
        <Button level="primary" size="big">Primary</Button>
        <Button level="secondary" size="big">Secondary</Button>
        <Button level="tertiary" size="big">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
        <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>Small</span>
        <Button level="primary" size="small">Primary</Button>
        <Button level="secondary" size="small">Secondary</Button>
        <Button level="tertiary" size="small">Tertiary</Button>
      </div>
    </div>
  ),
};

export const WithLeadingIcon = {
  args: {
    level: 'primary',
    size: 'big',
    children: 'Add item',
    leftIconName: 'Add',
  },
};

export const WithTrailingIcon = {
  args: {
    level: 'secondary',
    size: 'big',
    children: 'Continue',
    rightIconName: 'ArrowRight',
  },
};

export const IconOnly = {
  args: {
    level: 'primary',
    size: 'big',
    iconOnly: true,
    leftIconName: 'Add',
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button level="primary" size="big" disabled>Primary</Button>
      <Button level="secondary" size="big" disabled>Secondary</Button>
      <Button level="tertiary" size="big" disabled>Tertiary</Button>
    </div>
  ),
};

export const DangerVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button level="primary" danger size="big" leftIcon={<Trash size={20} />}>Delete</Button>
      <Button level="secondary" danger size="big" leftIcon={<Trash size={20} />}>Delete</Button>
      <Button level="tertiary" danger size="big">Delete</Button>
    </div>
  ),
};

export const Playground = {
  args: {
    level: 'primary',
    size: 'big',
    danger: false,
    iconOnly: false,
    disabled: false,
    children: 'Button',
    leftIconName: 'none',
    rightIconName: 'none',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
