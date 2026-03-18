import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Home2, MagicStar, RouteSquare } from 'iconsax-react';
import { PrimaryNavItem } from '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem';
import '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem.css';
import '../../../src/components/ui/Chip/Chip.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2950-613';

const meta: Meta<typeof PrimaryNavItem> = {
  title: 'Molecules/Nav/PrimaryNavItem',
  component: PrimaryNavItem,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'hover', 'active'],
      table: { defaultValue: { summary: 'idle' } },
    },
    type: {
      control: 'select',
      options: ['default', 'collapsed'],
      table: { defaultValue: { summary: 'default' } },
    },
    label: { control: 'text' },
    chip: { control: 'text' },
    icon: { control: false },
    iconActive: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryNavItem>;

export const Default: Story = {
  args: {
    state: 'idle',
    type: 'default',
    label: 'Tours',
    icon: <RouteSquare size={20} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={20} variant="Bold" color="currentColor" />,
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
    type: 'default',
    label: 'Tours',
    icon: <RouteSquare size={20} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={20} variant="Bold" color="currentColor" />,
  },
};

export const Active: Story = {
  args: {
    state: 'active',
    type: 'default',
    label: 'Tours',
    icon: <RouteSquare size={20} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={20} variant="Bold" color="currentColor" />,
    chip: 'New',
  },
};

export const Collapsed: Story = {
  args: {
    state: 'idle',
    type: 'collapsed',
    label: 'Tours',
    icon: <RouteSquare size={20} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={20} variant="Bold" color="currentColor" />,
  },
};

export const CollapsedActive: Story = {
  args: {
    state: 'active',
    type: 'collapsed',
    label: 'Tours',
    icon: <RouteSquare size={20} variant="Linear" color="currentColor" />,
    iconActive: <RouteSquare size={20} variant="Bold" color="currentColor" />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>
        Default type
      </span>
      {(['idle', 'hover', 'active'] as const).map((state) => (
        <PrimaryNavItem
          key={state}
          state={state}
          type="default"
          label={`${state.charAt(0).toUpperCase()}${state.slice(1)} item`}
          icon={<Home size={20} variant="Linear" color="currentColor" />}
          iconActive={<Home2 size={20} variant="Bold" color="currentColor" />}
          chip={state === 'active' ? 'New' : undefined}
        />
      ))}
      <span
        style={{
          font: 'var(--text-body-4)',
          color: 'var(--color-text-tertiary)',
          marginTop: 'var(--space-3)',
        }}
      >
        Collapsed type
      </span>
      {(['idle', 'hover', 'active'] as const).map((state) => (
        <PrimaryNavItem
          key={`collapsed-${state}`}
          state={state}
          type="collapsed"
          label="Home"
          icon={<Home size={20} variant="Linear" color="currentColor" />}
          iconActive={<Home2 size={20} variant="Bold" color="currentColor" />}
        />
      ))}
    </div>
  ),
};

export const WithChip: Story = {
  args: {
    state: 'idle',
    type: 'default',
    label: 'Copilot',
    icon: <MagicStar size={20} variant="Linear" color="currentColor" />,
    iconActive: <MagicStar size={20} variant="Bold" color="currentColor" />,
    chip: 'Beta',
  },
};

export const Playground: Story = {
  args: {
    state: 'idle',
    type: 'default',
    label: 'Nav item',
    icon: <Home size={20} variant="Linear" color="currentColor" />,
    iconActive: <Home2 size={20} variant="Bold" color="currentColor" />,
    chip: '',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
