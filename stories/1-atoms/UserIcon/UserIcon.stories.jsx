import React from 'react';
import { UserIcon } from '../../../src/components/ui/UserIcon/UserIcon';
import '../../../src/components/ui/UserIcon/UserIcon.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3199-1265';

const VARIANT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const meta = {
  title: 'Atoms/UserIcon',
  component: UserIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS,
      description: 'Which avatar illustration to display (1–9)',
      table: { defaultValue: { summary: '1' } },
    },
    size: {
      control: 'number',
      description: 'Width and height in px',
      table: { defaultValue: { summary: '24' } },
    },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: { variant: 1, size: 24 },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <UserIcon variant={v} size={40} />
          <span style={{ font: 'var(--text-body-5)', color: 'var(--color-text-tertiary)' }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-end' }}>
      {[16, 24, 32, 40].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <UserIcon variant={1} size={s} />
          <span style={{ font: 'var(--text-body-5)', color: 'var(--color-text-tertiary)' }}>
            {s}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Playground = {
  args: { variant: 1, size: 24 },
  parameters: { chromatic: { disableSnapshot: true } },
};
