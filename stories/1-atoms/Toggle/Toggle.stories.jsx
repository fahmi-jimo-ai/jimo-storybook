import { useState } from 'react';
import { Toggle } from '../../../src/components/ui/Toggle/Toggle';

import '../../../src/components/ui/Toggle/Toggle.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=604-1467';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
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

export const Default = {
  args: { label: 'Enable notifications', checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Toggle {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const On = {
  args: { label: 'Enable notifications', checked: true },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <Toggle {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Toggle label="Off disabled" disabled checked={false} onChange={() => {}} />
      <Toggle label="On disabled" disabled checked onChange={() => {}} />
    </div>
  ),
};

export const WithoutLabel = {
  args: { checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Toggle {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Playground = {
  args: { label: 'Toggle label', checked: false, disabled: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Toggle {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
