import React from 'react';
import { DropdownMenuList } from '../../../src/components/ui/DropdownMenuList/DropdownMenuList';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=683:508';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

function resolveIcon(name) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={16} /> : undefined;
}

const meta = {
  title: 'Molecules/Dropdown/DropdownMenuList',
  component: DropdownMenuList,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: [
        'default',
        'hover',
        'hover-selected',
        'selected',
        'list-header',
        'disabled',
      ],
      table: { defaultValue: { summary: 'default' } },
    },
    danger: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    multiSelect: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    showIcon: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showDescription: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    text: { control: 'text', table: { defaultValue: { summary: 'Text' } } },
    description: { control: 'text' },
    icon: { control: false },
    iconName: {
      name: 'icon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon shown on the left (when showIcon is true and multiSelect is false)',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
    onClick: { control: false },
  },
  render: ({ iconName, ...args }) => (
    <DropdownMenuList {...args} icon={resolveIcon(iconName)} />
  ),
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: { state: 'default', text: 'Menu item' },
};

export const Header = {
  args: { state: 'list-header', text: 'Section header' },
};

export const Hover = {
  args: { state: 'hover', text: 'Hovered item' },
};

export const Selected = {
  args: { state: 'selected', text: 'Selected item' },
};

export const HoverSelected = {
  args: { state: 'hover-selected', text: 'Hovered + selected item' },
};

export const Disabled = {
  args: { state: 'disabled', text: 'Disabled item' },
};

export const Danger = {
  args: { state: 'default', danger: true, text: 'Delete item' },
};

export const WithDescription = {
  args: {
    state: 'default',
    text: 'Menu item',
    showDescription: true,
    description: 'Supporting description text',
  },
};

export const MultiSelect = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DropdownMenuList multiSelect state="default" text="Unchecked option" />
      <DropdownMenuList multiSelect state="selected" text="Checked option" />
      <DropdownMenuList multiSelect state="hover" text="Hovered option" />
      <DropdownMenuList multiSelect state="hover-selected" text="Hovered + checked" />
      <DropdownMenuList multiSelect state="disabled" text="Disabled option" />
    </div>
  ),
};

export const AllStates = {
  render: () => {
    const states = [
      'default',
      'hover',
      'selected',
      'hover-selected',
      'list-header',
      'disabled',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {states.map((state) => (
          <DropdownMenuList key={state} state={state} text={state} />
        ))}
        <DropdownMenuList state="default" danger text="Danger item" />
      </div>
    );
  },
};

export const Playground = {
  args: {
    state: 'default',
    text: 'Menu item',
    danger: false,
    multiSelect: false,
    showIcon: true,
    showDescription: false,
    description: 'Supporting description',
    iconName: 'none',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
