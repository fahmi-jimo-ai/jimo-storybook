import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from '../../../src/components/ui/Checkbox/Checkbox';

import '../../../src/components/ui/Checkbox/Checkbox.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=604-1424';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions', checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Checked: Story = {
  args: { label: 'Accept terms and conditions', checked: true },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Checkbox label="Unchecked disabled" disabled />
      <Checkbox label="Checked disabled" checked disabled onChange={() => {}} />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: { checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Playground: Story = {
  args: { label: 'Checkbox label', checked: false, indeterminate: false, disabled: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
