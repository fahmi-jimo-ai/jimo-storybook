import React from 'react';
import { Input } from '../../../src/components/ui/Input/Input';
import '../../../src/components/ui/Input/Input.css';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1259-51560';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

function resolveIcon(name) {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={24} /> : undefined;
}

const meta = {
  title: 'Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    // FR-3: inputType → 'type' label remap
    inputType: {
      name: 'type',
      control: 'select',
      options: ['text', 'textarea', 'dropdown', 'dropdown-search'],
      description: 'Input variant — maps to `inputType` prop in code',
      table: { defaultValue: { summary: 'text' } },
    },
    // FR-3: status → 'state' label remap
    status: {
      name: 'state',
      control: 'select',
      options: ['none', 'loading', 'positive', 'warning', 'negative'],
      description: 'Status indicator — maps to `status` prop in code',
      table: { defaultValue: { summary: 'none' } },
    },
    size: {
      control: 'select',
      options: ['regular', 'small'],
      table: { defaultValue: { summary: 'regular' } },
    },
    // HTML input type — governs browser keyboard/validation behaviour
    type: {
      name: 'htmlType',
      control: 'select',
      options: ['text', 'number', 'email', 'tel', 'url', 'password', 'search'],
      description: 'HTML input type — governs keyboard/validation behaviour',
      table: { defaultValue: { summary: 'text' } },
    },
    label: { control: 'text' },
    supportiveText: { control: 'text' },
    placeholder: { control: 'text' },
    trailingText: { control: 'text' },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    leftIcon: { control: false },
    rightIcon: { control: false },
    cta: { control: false },
    secondarySlot: { control: false },
    onChange: { control: false },
    leftIconName: {
      name: 'leftIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon on the left inside the input',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
    rightIconName: {
      name: 'rightIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon on the right inside the input',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
  },
  render: ({ leftIconName, rightIconName, ...args }) => (
    <div style={{ width: 320 }}>
      <Input
        {...args}
        leftIcon={resolveIcon(leftIconName)}
        rightIcon={resolveIcon(rightIconName)}
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: { placeholder: 'Placeholder text' },
};

export const WithLabel = {
  args: { label: 'Display name', placeholder: 'Enter your name' },
};

export const WithSupportiveText = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    supportiveText: 'We will never share your email.',
  },
};

export const Statuses = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: 320 }}>
      <Input
        status="positive"
        label="Positive"
        placeholder="Status: positive"
        supportiveText="Looks good!"
      />
      <Input
        status="warning"
        label="Warning"
        placeholder="Status: warning"
        supportiveText="Double-check this value."
      />
      <Input
        status="negative"
        label="Negative"
        placeholder="Status: negative"
        supportiveText="This field has an error."
      />
      <Input
        status="loading"
        label="Loading"
        placeholder="Status: loading"
        supportiveText="Saving…"
      />
    </div>
  ),
};

export const Textarea = {
  args: {
    inputType: 'textarea',
    label: 'Description',
    placeholder: 'Write something…',
  },
};

export const Dropdown = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 320 }}>
      <Input inputType="dropdown" label="Dropdown" placeholder="Select an option" />
      <Input inputType="dropdown-search" label="Dropdown search" placeholder="Search or select" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 320 }}>
      <Input size="regular" label="Regular" placeholder="Regular size" />
      <Input size="small" label="Small" placeholder="Small size" />
    </div>
  ),
};

export const WithIcons = {
  render: () => {
    const SearchIcon = getIcon('SearchNormal1');
    const EyeIcon = getIcon('Eye');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 320 }}>
        <Input
          label="Search"
          placeholder="Search…"
          leftIcon={SearchIcon ? <SearchIcon size={24} /> : undefined}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          rightIcon={EyeIcon ? <EyeIcon size={24} /> : undefined}
        />
      </div>
    );
  },
};

export const WithTrailingText = {
  args: {
    label: 'Duration',
    placeholder: '30',
    trailingText: 'Days',
    type: 'number',
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 320 }}>
      <Input disabled label="Disabled" placeholder="Cannot edit" />
      <Input disabled label="Disabled with value" value="Existing value" onChange={() => {}} />
    </div>
  ),
};

export const Playground = {
  args: {
    inputType: 'text',
    type: 'text',
    size: 'regular',
    status: 'none',
    label: 'Label',
    placeholder: 'Placeholder',
    supportiveText: '',
    trailingText: '',
    disabled: false,
    leftIconName: 'none',
    rightIconName: 'none',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
