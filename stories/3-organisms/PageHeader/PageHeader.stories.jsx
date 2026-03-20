import { useState } from 'react';
import { Add, Setting2, ArrowLeft2 } from 'iconsax-react';
import { PageHeader } from '../../../src/components/ui/PageHeader/PageHeader';
import '../../../src/components/ui/PageHeader/PageHeader.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1317-2115';

const DEFAULT_TABS = [
  { id: 'overview', label: 'Overview', showIcon: true },
  { id: 'analytics', label: 'Analytics', showIcon: true },
  { id: 'settings', label: 'Settings', showIcon: true },
  { id: 'team', label: 'Team', showIcon: true },
  { id: 'billing', label: 'Billing', showIcon: true },
];

const DEFAULT_BUTTONS = [
  {
    label: 'Export',
    level: 'secondary',
    leftIcon: <Setting2 size={20} color="currentColor" />,
  },
  {
    label: 'Import',
    level: 'secondary',
    leftIcon: <Add size={20} color="currentColor" />,
  },
  {
    label: 'Create new',
    level: 'primary',
    leftIcon: <Add size={20} color="currentColor" />,
  },
];

const meta = {
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

export const Default = {
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

export const MainPageNoTabs = {
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

export const MainPageNoButtons = {
  args: {
    type: 'main',
    title: 'Page Title',
    showButtonGroup: false,
    showTabs: true,
    tabs: DEFAULT_TABS,
    activeTab: 'overview',
  },
};

export const SubPage = {
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

export const SubPageNoTabs = {
  args: {
    type: 'sub',
    title: 'Page Title',
    showButtonGroup: true,
    showTabs: false,
    buttons: DEFAULT_BUTTONS,
    backIcon: <ArrowLeft2 size={20} color="currentColor" />,
  },
};

export const BothTypes = {
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
export const Playground = {
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
