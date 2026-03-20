import React from 'react';
import { Like1, Notification, Book, MessageQuestion, Setting2, Profile } from 'iconsax-react';
import { TertiaryNavGroup } from '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup';
import '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup.css';
import '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-2907';

const meta = {
  title: 'Organisms/Nav/TertiaryNavGroup',
  component: TertiaryNavGroup,
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  render: () => (
    <TertiaryNavGroup
      items={[
        { icon: <Like1 size={16} variant="Linear" color="currentColor" />, label: 'Give Feedback' },
        { icon: <Notification size={16} variant="Linear" color="currentColor" />, label: "What's new?" },
        { icon: <Book size={16} variant="Linear" color="currentColor" />, label: 'Documentation' },
        { icon: <MessageQuestion size={16} variant="Linear" color="currentColor" />, label: 'Get Started' },
      ]}
    />
  ),
};

export const Playground = {
  render: () => (
    <TertiaryNavGroup
      items={[
        { icon: <Like1 size={16} variant="Linear" color="currentColor" />, label: 'Give Feedback' },
        { icon: <Notification size={16} variant="Linear" color="currentColor" />, label: "What's new?" },
        { icon: <Book size={16} variant="Linear" color="currentColor" />, label: 'Documentation' },
        { icon: <MessageQuestion size={16} variant="Linear" color="currentColor" />, label: 'Get Started' },
      ]}
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};
