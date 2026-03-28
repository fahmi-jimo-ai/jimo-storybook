import React from 'react';
import { UserAvatar, getAvatarProps } from '../../../src/components/ui/UserAvatar/UserAvatar';
import '../../../src/components/ui/UserAvatar/UserAvatar.css';
import '../../../src/components/ui/UserIcon/UserIcon.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3199-1338';

const COLOR_OPTIONS = ['blue', 'green', 'orange', 'yellow', 'purple', 'red'];
const VARIANT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const meta = {
  title: 'Atoms/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs'],
  argTypes: {
    iconVariant: {
      control: 'select',
      options: VARIANT_OPTIONS,
      description: 'Which user illustration to display (1–9)',
      table: { defaultValue: { summary: '1' } },
    },
    colorVariant: {
      control: 'select',
      options: COLOR_OPTIONS,
      description: 'Background color of the circular frame',
      table: { defaultValue: { summary: 'blue' } },
    },
    size: {
      control: 'number',
      description: 'Total frame size in px (icon scales proportionally)',
      table: { defaultValue: { summary: '20' } },
    },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: { iconVariant: 1, colorVariant: 'blue', size: 20 },
};

export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      {['blue', 'green', 'orange', 'yellow', 'purple', 'red'].map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <UserAvatar iconVariant={1} colorVariant={color} size={32} />
          <span style={{ font: 'var(--text-body-5)', color: 'var(--color-text-tertiary)' }}>
            {color}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <UserAvatar iconVariant={v} colorVariant="blue" size={32} />
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
      {[20, 24, 32, 40].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <UserAvatar iconVariant={1} colorVariant="blue" size={s} />
          <span style={{ font: 'var(--text-body-5)', color: 'var(--color-text-tertiary)' }}>
            {s}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const DeterministicExample = {
  render: () => {
    const sampleIds = ['user-001', 'user-002', 'user-003', 'user-004', 'user-005', 'user-006'];
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        {sampleIds.map((id) => {
          const { iconVariant, colorVariant } = getAvatarProps(id);
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <UserAvatar iconVariant={iconVariant} colorVariant={colorVariant} size={32} />
              <span style={{ font: 'var(--text-body-5)', color: 'var(--color-text-tertiary)', fontSize: 10 }}>
                {id}
              </span>
            </div>
          );
        })}
      </div>
    );
  },
};

export const Playground = {
  args: { iconVariant: 1, colorVariant: 'blue', size: 32 },
  parameters: { chromatic: { disableSnapshot: true } },
};
