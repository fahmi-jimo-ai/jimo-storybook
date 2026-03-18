import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageText, Flash, Setting2 } from 'iconsax-react';
import { SecondaryNavSidebar } from '../../../src/components/ui/SecondaryNavSidebar/SecondaryNavSidebar';
import { SecondaryNavGroup } from '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup';
import { SecondaryNavItem } from '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem';
import '../../../src/components/ui/SecondaryNavSidebar/SecondaryNavSidebar.css';
import '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem.css';
import '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2950-1489';

const meta: Meta<typeof SecondaryNavSidebar> = {
  title: 'Molecules/Nav/SecondaryNavSidebar',
  component: SecondaryNavSidebar,
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      control: 'select',
      options: [
        'none',
        'Knowledge',
        'Guardrails',
        'Chat',
        'Triggers',
        'Actions',
        'Conversations',
        'Observe',
        'Analyze',
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
type Story = StoryObj<typeof SecondaryNavSidebar>;

export const Default: Story = {
  args: {
    activeItem: 'Knowledge',
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

/** One group, no section title — e.g. a contextual sub-nav for a single feature area */
export const SingleGroup: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Chat');
    const items = [
      { label: 'Chat', icon: <MessageText size={20} variant="Linear" color="currentColor" />, iconActive: <MessageText size={20} variant="Bold" color="currentColor" /> },
      { label: 'Triggers', icon: <Flash size={20} variant="Linear" color="currentColor" />, iconActive: <Flash size={20} variant="Bold" color="currentColor" /> },
      { label: 'Actions', icon: <Setting2 size={20} variant="Linear" color="currentColor" />, iconActive: <Setting2 size={20} variant="Bold" color="currentColor" /> },
    ];
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div className="nav-sidebar-secondary">
          <SecondaryNavGroup>
            {items.map((item) => (
              <SecondaryNavItem
                key={item.label}
                state={item.label === activeItem ? 'active' : 'idle'}
                label={item.label}
                icon={item.icon}
                iconActive={item.iconActive}
                onClick={() => setActiveItem(item.label)}
              />
            ))}
          </SecondaryNavGroup>
        </div>
      </div>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Playground: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState(args.activeItem ?? 'Chat');
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <SecondaryNavSidebar
          {...args}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
      </div>
    );
  },
  args: {
    activeItem: 'Chat',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
