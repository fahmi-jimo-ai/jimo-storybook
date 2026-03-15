import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from '../../../../jimo-component-library/src/components/ui/Radio/Radio';

import '../../../../jimo-component-library/src/components/ui/Radio/Radio.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=604-1379';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: 'Option A', checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Selected: Story = {
  args: { label: 'Option A', checked: true },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState('b');
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            label={opt.label}
            name="radio-group"
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Radio label="Unselected disabled" disabled checked={false} onChange={() => {}} />
      <Radio label="Selected disabled" disabled checked onChange={() => {}} />
    </div>
  ),
};

export const Playground: Story = {
  args: { label: 'Radio label', checked: false, disabled: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
