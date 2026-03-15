import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../../../jimo-component-library/src/components/ui/Tooltip/Tooltip';
import type { TooltipArrowPosition } from '../../../../jimo-component-library/src/components/ui/Tooltip/Tooltip';

import '../../../../jimo-component-library/src/components/ui/Tooltip/Tooltip.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1438-1729';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    arrowPosition: {
      control: 'select',
      options: [
        'up',
        'up-left',
        'up-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'right',
        'none',
      ] satisfies TooltipArrowPosition[],
      table: { defaultValue: { summary: 'up-left' } },
    },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: { arrowPosition: 'up-left', children: 'This is a tooltip' },
};

/** All 9 arrow positions shown in a 3×3 grid */
export const ArrowPositions: Story = {
  render: () => {
    const positions: TooltipArrowPosition[] = [
      'up-left', 'up', 'up-right',
      'left',    'none', 'right',
      'bottom-left', 'bottom', 'bottom-right',
    ];
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-8)',
          padding: 'var(--space-6)',
        }}
      >
        {positions.map((pos) => (
          <div
            key={pos}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}
          >
            <Tooltip arrowPosition={pos}>Tooltip</Tooltip>
            <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>
              {pos}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    arrowPosition: 'up-left',
    children: 'This tooltip contains a longer description to verify text wrapping behavior at maximum width.',
  },
};

export const Playground: Story = {
  args: { arrowPosition: 'up-left', children: 'Tooltip content' },
  parameters: { chromatic: { disableSnapshot: true } },
};
