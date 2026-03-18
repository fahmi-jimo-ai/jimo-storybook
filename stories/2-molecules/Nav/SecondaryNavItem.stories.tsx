import type { Meta, StoryObj } from '@storybook/react-vite';
import { Book } from 'iconsax-react';
import { SecondaryNavItem } from '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem';
import '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2950-712';

const meta: Meta<typeof SecondaryNavItem> = {
  title: 'Molecules/Nav/SecondaryNavItem',
  component: SecondaryNavItem,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'hover', 'active', 'disabled'],
      table: { defaultValue: { summary: 'idle' } },
    },
    label: { control: 'text' },
    icon: { control: false },
    iconActive: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryNavItem>;

export const Default: Story = {
  args: {
    state: 'idle',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Active: Story = {
  args: {
    state: 'active',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    label: 'Guardrails',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '248px' }}>
      {(['idle', 'hover', 'active', 'disabled'] as const).map((state) => (
        <SecondaryNavItem
          key={state}
          state={state}
          label={`${state.charAt(0).toUpperCase()}${state.slice(1)} item`}
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: {
    state: 'idle',
    label: 'Nav item',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
