import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Add, Setting2, ArrowLeft2 } from 'iconsax-react';
import { PageHeader } from '../../../src/components/ui/PageHeader/PageHeader';
import '../../../src/components/ui/PageHeader/PageHeader.css';
import type { PrimaryHorizontalMenuTab } from '../../../src/components/ui/PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1317-2115';

const DEFAULT_TABS: PrimaryHorizontalMenuTab[] = [
  { id: 'overview', label: 'Overview', showIcon: true },
  { id: 'analytics', label: 'Analytics', showIcon: true },
  { id: 'settings', label: 'Settings', showIcon: true },
  { id: 'team', label: 'Team', showIcon: true },
  { id: 'billing', label: 'Billing', showIcon: true },
];

const DEFAULT_BUTTONS = [
  {
    label: 'Export',
    level: 'secondary' as const,
    leftIcon: <Setting2 size={20} color="currentColor" />,
  },
  {
    label: 'Import',
    level: 'secondary' as const,
    leftIcon: <Add size={20} color="currentColor" />,
  },
  {
    label: 'Create new',
    level: 'primary' as const,
    leftIcon: <Add size={20} color="currentColor" />,
  },
];

const meta: Meta<typeof PageHeader> = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['main', 'sub'] },
    title: { control: 'text' },
    showButtonGroup: { control: 'boolean' },
    buttonSize: { control: 'radio', options: ['big', 'small'] },
    showTabs: { control: 'boolean' },
    buttons: { control: false },
    tabs: { control: false },
    activeTab: { control: false },
    onTabClick: { control: false },
    onBackClick: { control: false },
    backIcon: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-subtle)', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    type: 'main',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: true,
    buttons: DEFAULT_BUTTONS,
    tabs: DEFAULT_TABS,
    activeTab: 'overview',
  },
};

export const MainPageNoTabs: Story = {
  args: {
    type: 'main',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: false,
    buttons: DEFAULT_BUTTONS,
    tabs: DEFAULT_TABS,
    activeTab: 'overview',
  },
};

export const MainPageNoButtons: Story = {
  args: {
    type: 'main',
    title: 'Page Title',
    showButtonGroup: false,
    showTabs: true,
    tabs: DEFAULT_TABS,
    activeTab: 'overview',
  },
};

export const SubPage: Story = {
  args: {
    type: 'sub',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: true,
    buttons: DEFAULT_BUTTONS,
    tabs: DEFAULT_TABS,
    activeTab: 'overview',
    backIcon: <ArrowLeft2 size={20} color="currentColor" />,
  },
};

export const SubPageNoTabs: Story = {
  args: {
    type: 'sub',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: false,
    buttons: DEFAULT_BUTTONS,
    backIcon: <ArrowLeft2 size={20} color="currentColor" />,
  },
};

export const BothTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <PageHeader
        type="main"
        title="Main Page"
        showButtonGroup
        showTabs
        buttons={DEFAULT_BUTTONS}
        tabs={DEFAULT_TABS}
        activeTab="overview"
      />
      <PageHeader
        type="sub"
        title="Sub Page"
        showButtonGroup
        showTabs
        buttons={DEFAULT_BUTTONS}
        tabs={DEFAULT_TABS}
        activeTab="analytics"
        backIcon={<ArrowLeft2 size={20} color="currentColor" />}
      />
    </div>
  ),
};

// Playground — interactive with active tab state
export const Playground: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('overview');
    return (
      <PageHeader
        {...args}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        backIcon={<ArrowLeft2 size={20} color="currentColor" />}
      />
    );
  },
  args: {
    type: 'main',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: true,
    buttons: DEFAULT_BUTTONS,
    tabs: DEFAULT_TABS,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
