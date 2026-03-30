import {
  DropdownFilterNested,
} from '../../../src/components/ui/DropdownFilterNested/DropdownFilterNested';
import '../../../src/components/ui/DropdownFilterNested/DropdownFilterNested.css';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';
import { Filter, Chart, Layer, Flash, Hierarchy, Status } from 'iconsax-react';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3110-1617';

// ── 2-level: flat list with one submenu tier ──────────────────────────────────

const FILTER_2_LEVEL = [
  {
    value: 'stage',
    label: 'Stage',
    icon: <Layer size={16} variant="Linear" color="currentColor" />,
    children: [
      { value: 'discovery', label: 'Discovery' },
      { value: 'consideration', label: 'Consideration' },
      { value: 'activation', label: 'Activation' },
      { value: 'retention', label: 'Retention' },
      { value: 'expansion', label: 'Expansion' },
    ],
  },
  {
    value: 'adoption',
    label: 'Adoption',
    icon: <Chart size={16} variant="Linear" color="currentColor" />,
    children: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    value: 'status',
    label: 'Status',
    icon: <Status size={16} variant="Linear" color="currentColor" />,
    children: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
      { value: 'churned', label: 'Churned' },
    ],
  },
];

// ── 3-level: filter group → subgroup → value ──────────────────────────────────

const FILTER_3_LEVEL = [
  {
    value: 'company',
    label: 'Company',
    icon: <Hierarchy size={16} variant="Linear" color="currentColor" />,
    children: [
      {
        value: 'segment',
        label: 'Segment',
        children: [
          { value: 'enterprise', label: 'Enterprise', description: '500+ seats' },
          { value: 'mid-market', label: 'Mid-market', description: '50–499 seats' },
          { value: 'smb', label: 'SMB', description: '<50 seats' },
        ],
      },
      {
        value: 'industry',
        label: 'Industry',
        children: [
          { value: 'saas', label: 'SaaS' },
          { value: 'fintech', label: 'Fintech' },
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'healthcare', label: 'Healthcare' },
        ],
      },
    ],
  },
  {
    value: 'user',
    label: 'User',
    icon: <Filter size={16} variant="Linear" color="currentColor" />,
    children: [
      {
        value: 'role',
        label: 'Role',
        children: [
          { value: 'admin', label: 'Admin' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' },
        ],
      },
      {
        value: 'plan',
        label: 'Plan',
        children: [
          { value: 'free', label: 'Free' },
          { value: 'growth', label: 'Growth' },
          { value: 'enterprise-plan', label: 'Enterprise' },
        ],
      },
    ],
  },
];

// ── 4-level: maximum depth stress test ───────────────────────────────────────

const FILTER_4_LEVEL = [
  {
    value: 'analytics',
    label: 'Analytics',
    children: [
      {
        value: 'engagement',
        label: 'Engagement',
        children: [
          {
            value: 'session',
            label: 'Session',
            children: [
              { value: 'under-1m', label: 'Under 1 min' },
              { value: '1-5m', label: '1–5 min' },
              { value: 'over-5m', label: 'Over 5 min' },
            ],
          },
          {
            value: 'frequency',
            label: 'Frequency',
            children: [
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ],
          },
        ],
      },
    ],
  },
];

const meta = {
  title: 'Organisms/Dropdown/DropdownFilterNested',
  component: DropdownFilterNested,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    multiSelect: { control: 'boolean' },
    showItemIcons: { control: 'boolean' },
    withSelectorIcon: { control: 'boolean' },
    size: { control: 'select', options: ['big', 'small'] },
    maxMenuHeight: {
      control: 'text',
      description: 'CSS max-height for scrollable menu (e.g. "220px")',
    },
    items: { control: false },
    value: { control: false },
    onChange: { control: false },
    open: { control: false },
    onOpenChange: { control: false },
    selectorIcon: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

// ── Closed state — static Chromatic snapshot ──────────────────────────────────

export const Default = {
  args: {
    placeholder: 'Filter',
    items: FILTER_2_LEVEL,
    showItemIcons: true,
  },
};

// ── Root panel open — static Chromatic snapshot ───────────────────────────────

export const RootOpen = {
  args: {
    placeholder: 'Filter',
    items: FILTER_2_LEVEL,
    showItemIcons: true,
    open: true,
  },
  parameters: { layout: 'padded' },
};

// ── 2-level interactive ───────────────────────────────────────────────────────

export const TwoLevel = {
  args: {
    placeholder: 'Filter by',
    items: FILTER_2_LEVEL,
    showItemIcons: true,
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};

// ── 3-level: filter group → subgroup → value ──────────────────────────────────

export const ThreeLevel = {
  args: {
    placeholder: 'Add filter',
    items: FILTER_3_LEVEL,
    showItemIcons: true,
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};

// ── 4-level depth stress test ─────────────────────────────────────────────────

export const FourLevel = {
  args: {
    placeholder: 'Analytics',
    items: FILTER_4_LEVEL,
    showItemIcons: false,
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};

// ── Multi-select on leaf items ────────────────────────────────────────────────

export const MultiSelect = {
  args: {
    placeholder: 'Filter by',
    items: FILTER_2_LEVEL,
    multiSelect: true,
    showItemIcons: true,
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};

// ── Playground — all controls ─────────────────────────────────────────────────

export const Playground = {
  args: {
    placeholder: 'Filter',
    items: FILTER_3_LEVEL,
    multiSelect: false,
    showItemIcons: true,
    withSelectorIcon: false,
    size: 'big',
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};
