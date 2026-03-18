import type { Meta, StoryObj } from '@storybook/react-vite';
import { Setting2, MessageQuestion, Profile, Notification, Book } from 'iconsax-react';
import { TertiaryNavGroup } from '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup';
import { TertiaryNavItem } from '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem';
import '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup.css';
import '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-2967';

const meta: Meta<typeof TertiaryNavGroup> = {
  title: 'Organisms/Nav/TertiaryNavGroup',
  component: TertiaryNavGroup,
  tags: ['autodocs'],
  argTypes: {
    start: { control: false },
    end: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof TertiaryNavGroup>;

export const Default: Story = {
  render: () => (
    <TertiaryNavGroup
      start={
        <>
          <TertiaryNavItem
            icon={<Setting2 size={16} variant="Linear" color="currentColor" />}
            label="Settings"
          />
          <TertiaryNavItem
            icon={<MessageQuestion size={16} variant="Linear" color="currentColor" />}
            label="Help"
          />
        </>
      }
      end={
        <TertiaryNavItem
          icon={<Profile size={16} variant="Linear" color="currentColor" />}
          label="Profile"
        />
      }
    />
  ),
};

export const ThreeStart: Story = {
  render: () => (
    <TertiaryNavGroup
      start={
        <>
          <TertiaryNavItem
            icon={<Notification size={16} variant="Linear" color="currentColor" />}
            label="Notifications"
          />
          <TertiaryNavItem
            icon={<Book size={16} variant="Linear" color="currentColor" />}
            label="Docs"
          />
          <TertiaryNavItem
            icon={<MessageQuestion size={16} variant="Linear" color="currentColor" />}
            label="Help"
          />
        </>
      }
      end={
        <TertiaryNavItem
          icon={<Profile size={16} variant="Linear" color="currentColor" />}
          label="Profile"
        />
      }
    />
  ),
};

export const Playground: Story = {
  render: () => (
    <TertiaryNavGroup
      start={
        <>
          <TertiaryNavItem
            icon={<Setting2 size={16} variant="Linear" color="currentColor" />}
            label="Settings"
          />
          <TertiaryNavItem
            icon={<MessageQuestion size={16} variant="Linear" color="currentColor" />}
            label="Help"
          />
        </>
      }
      end={
        <TertiaryNavItem
          icon={<Profile size={16} variant="Linear" color="currentColor" />}
          label="Profile"
        />
      }
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};
