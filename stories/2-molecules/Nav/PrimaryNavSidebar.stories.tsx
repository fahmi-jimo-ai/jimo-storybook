import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PrimaryNavSidebar } from '../../../src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar';
import '../../../src/components/ui/PrimaryNavSidebar/PrimaryNavSidebar.css';
import '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem.css';
import '../../../src/components/ui/PrimaryNavGroup/PrimaryNavGroup.css';
import '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem.css';
import '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup.css';
import '../../../src/components/ui/Chip/Chip.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-2969';

const meta: Meta<typeof PrimaryNavSidebar> = {
  title: 'Molecules/Nav/PrimaryNavSidebar',
  component: PrimaryNavSidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    activeItem: {
      control: 'select',
      options: [
        'none',
        'Get Started',
        'Copilot',
        'Tours',
        'Surveys',
        'Banners',
        'Hints',
        'Checklists',
        'Changelog Posts',
        'Resource Center',
        'Spaces',
        'Success Trackers',
        'Users & Segments',
      ],
    },
    onItemClick: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryNavSidebar>;

export const Expanded: Story = {
  args: {
    collapsed: false,
    activeItem: 'Tours',
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeItem: 'Tours',
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const Playground: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState(args.activeItem ?? 'Tours');
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <PrimaryNavSidebar
          {...args}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
      </div>
    );
  },
  args: {
    collapsed: false,
    activeItem: 'Tours',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
