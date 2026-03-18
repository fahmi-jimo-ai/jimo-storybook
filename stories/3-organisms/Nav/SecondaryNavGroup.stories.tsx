import type { Meta, StoryObj } from '@storybook/react-vite';
import { Book, MessageText, Flash, Setting2 } from 'iconsax-react';
import { SecondaryNavGroup } from '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup';
import { SecondaryNavItem } from '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem';
import '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup.css';
import '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-1663';

const meta: Meta<typeof SecondaryNavGroup> = {
  title: 'Organisms/Nav/SecondaryNavGroup',
  component: SecondaryNavGroup,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryNavGroup>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '256px' }}>
      <SecondaryNavGroup {...args}>
        <SecondaryNavItem
          state="idle"
          label="Knowledge"
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="active"
          label="Chat"
          icon={<MessageText size={20} variant="Linear" color="currentColor" />}
          iconActive={<MessageText size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="idle"
          label="Triggers"
          icon={<Flash size={20} variant="Linear" color="currentColor" />}
          iconActive={<Flash size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="idle"
          label="Actions"
          icon={<Setting2 size={20} variant="Linear" color="currentColor" />}
          iconActive={<Setting2 size={20} variant="Bold" color="currentColor" />}
        />
      </SecondaryNavGroup>
    </div>
  ),
  args: { title: 'Build' },
};

export const WithoutTitle: Story = {
  render: (args) => (
    <div style={{ width: '256px' }}>
      <SecondaryNavGroup {...args}>
        <SecondaryNavItem
          state="idle"
          label="Knowledge"
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="idle"
          label="Chat"
          icon={<MessageText size={20} variant="Linear" color="currentColor" />}
          iconActive={<MessageText size={20} variant="Bold" color="currentColor" />}
        />
      </SecondaryNavGroup>
    </div>
  ),
  args: {},
};

export const TwoItems: Story = {
  render: (args) => (
    <div style={{ width: '256px' }}>
      <SecondaryNavGroup {...args}>
        <SecondaryNavItem
          state="active"
          label="Knowledge"
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="disabled"
          label="Guardrails"
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
      </SecondaryNavGroup>
    </div>
  ),
  args: { title: 'Train' },
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '256px' }}>
      <SecondaryNavGroup {...args}>
        <SecondaryNavItem
          state="idle"
          label="Item one"
          icon={<Book size={20} variant="Linear" color="currentColor" />}
          iconActive={<Book size={20} variant="Bold" color="currentColor" />}
        />
        <SecondaryNavItem
          state="active"
          label="Item two"
          icon={<MessageText size={20} variant="Linear" color="currentColor" />}
          iconActive={<MessageText size={20} variant="Bold" color="currentColor" />}
        />
      </SecondaryNavGroup>
    </div>
  ),
  args: { title: 'Section' },
  parameters: { chromatic: { disableSnapshot: true } },
};
