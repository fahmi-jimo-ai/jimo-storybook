import { Book } from 'iconsax-react';
import { SecondaryNavItem } from '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem';
import '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2950-712';

const meta = {
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

export const Default = {
  args: {
    state: 'idle',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Hover = {
  args: {
    state: 'hover',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Active = {
  args: {
    state: 'active',
    label: 'Knowledge',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const Disabled = {
  args: {
    state: 'disabled',
    label: 'Guardrails',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '248px' }}>
      {['idle', 'hover', 'active', 'disabled'].map((state) => (
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

export const Playground = {
  args: {
    state: 'idle',
    label: 'Nav item',
    icon: <Book size={20} variant="Linear" color="currentColor" />,
    iconActive: <Book size={20} variant="Bold" color="currentColor" />,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
