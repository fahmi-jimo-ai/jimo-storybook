import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../../../src/components/ui/Tooltip/Tooltip';
import type { TooltipArrowPosition } from '../../../src/components/ui/Tooltip/Tooltip';
import '../../../src/components/ui/Tooltip/Tooltip.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1438-1729';

/**
 * Returns the absolute-positioning style for the tooltip wrapper relative to the trigger.
 *
 * arrowPosition describes WHERE the arrow sits on the tooltip bubble:
 *  - "up" / "up-left" / "up-right"  → arrow at top, trigger is above → tooltip floats BELOW
 *  - "bottom" / "bottom-*"          → arrow at bottom, trigger is below → tooltip floats ABOVE
 *  - "left"                         → arrow at left, trigger is left → tooltip floats RIGHT
 *  - "right"                        → arrow at right, trigger is right → tooltip floats LEFT
 */
function getFloatStyle(arrowPosition: TooltipArrowPosition): React.CSSProperties {
  const gap = 'var(--space-2)';
  switch (arrowPosition) {
    // Arrow at top → tooltip is BELOW the trigger
    case 'up':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: gap };
    case 'up-left':
      return { top: '100%', left: 0, marginTop: gap };
    case 'up-right':
      return { top: '100%', right: 0, marginTop: gap };
    // Arrow at bottom → tooltip is ABOVE the trigger
    case 'bottom':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: gap };
    case 'bottom-left':
      return { bottom: '100%', left: 0, marginBottom: gap };
    case 'bottom-right':
      return { bottom: '100%', right: 0, marginBottom: gap };
    // Arrow at left → tooltip is to the RIGHT of the trigger
    case 'left':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: gap };
    // Arrow at right → tooltip is to the LEFT of the trigger
    case 'right':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: gap };
    case 'none':
    default:
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: gap };
  }
}

/**
 * Returns the CSS transform-origin so the tooltip scales in/out from the
 * direction of the trigger element (i.e. where the arrow points).
 */
function getTransformOrigin(arrowPosition: TooltipArrowPosition): string {
  switch (arrowPosition) {
    case 'up':          return '50% 0%';    // center top
    case 'up-left':     return '0% 0%';     // left top
    case 'up-right':    return '100% 0%';   // right top
    case 'bottom':      return '50% 100%';  // center bottom
    case 'bottom-left': return '0% 100%';   // left bottom
    case 'bottom-right':return '100% 100%'; // right bottom
    case 'left':        return '0% 50%';    // left center
    case 'right':       return '100% 50%';  // right center
    default:            return '50% 50%';
  }
}

interface HoverWrapperProps {
  arrowPosition?: TooltipArrowPosition;
  children: string;
}

/** Blank trigger div — tooltip scales in on hover, mirroring real-world usage. */
function HoverWrapper({ arrowPosition = 'up-left', children }: HoverWrapperProps) {
  const [visible, setVisible] = useState(false);
  const floatStyle = getFloatStyle(arrowPosition);
  const origin = getTransformOrigin(arrowPosition);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        style={{
          width: 80,
          height: 40,
          background: 'var(--color-bg-muted)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-default)',
          cursor: 'default',
        }}
      />
      {/* Always rendered so the CSS transition plays on both enter and exit */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          pointerEvents: 'none',
          ...floatStyle,
          opacity: visible ? 1 : 0,
          transform: `${floatStyle.transform ? floatStyle.transform + ' ' : ''}scale(${visible ? 1 : 0.85})`,
          transformOrigin: origin,
          transition: 'opacity var(--transition-base), transform var(--transition-base)',
        }}
      >
        <Tooltip arrowPosition={arrowPosition}>{children}</Tooltip>
      </div>
    </div>
  );
}

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

/** Hover the blank div to reveal the tooltip with a scale-in animation. */
export const Default: Story = {
  render: (args) => (
    <HoverWrapper arrowPosition={args.arrowPosition} children={String(args.children ?? 'This is a tooltip')} />
  ),
  args: { arrowPosition: 'up-left', children: 'This is a tooltip' },
  parameters: { chromatic: { disableSnapshot: true } },
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
