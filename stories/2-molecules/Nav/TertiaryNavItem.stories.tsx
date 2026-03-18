import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification, Setting2, MessageQuestion, Profile } from 'iconsax-react';
import { TertiaryNavItem } from '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem';
import '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-2967';

const meta: Meta<typeof TertiaryNavItem> = {
  title: 'Molecules/Nav/TertiaryNavItem',
  component: TertiaryNavItem,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'hover'],
      table: { defaultValue: { summary: 'idle' } },
    },
    label: { control: 'text' },
    icon: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof TertiaryNavItem>;

export const Default: Story = {
  args: {
    state: 'idle',
    label: 'Notifications',
    icon: <Notification size={16} variant="Linear" color="currentColor" />,
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
    label: 'Notifications',
    icon: <Notification size={16} variant="Linear" color="currentColor" />,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-6)' }}>
      <TertiaryNavItem
        state="idle"
        label="Settings"
        icon={<Setting2 size={16} variant="Linear" color="currentColor" />}
      />
      <TertiaryNavItem
        state="idle"
        label="Help"
        icon={<MessageQuestion size={16} variant="Linear" color="currentColor" />}
      />
      <TertiaryNavItem
        state="idle"
        label="Profile"
        icon={<Profile size={16} variant="Linear" color="currentColor" />}
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    state: 'idle',
    label: 'Label',
    icon: <Notification size={16} variant="Linear" color="currentColor" />,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
