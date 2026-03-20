import {
  DropdownFilter,
} from '../../../src/components/ui/DropdownFilter/DropdownFilter';
import '../../../src/components/ui/DropdownFilter/DropdownFilter.css';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';
import { Filter, Chart, Layer, Flash, Status, Hierarchy } from 'iconsax-react';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3110-1617';

const STAGE_ITEMS = [
  { value: 'discovery', label: 'Discovery' },
  { value: 'consideration', label: 'Consideration' },
  { value: 'activation', label: 'Activation' },
  { value: 'retention', label: 'Retention' },
  { value: 'expansion', label: 'Expansion' },
];

const ADOPTION_ITEMS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const STATUS_ITEMS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'churned', label: 'Churned' },
];

const SEGMENT_ITEMS = [
  {
    value: 'enterprise',
    label: 'Enterprise',
    icon: <Hierarchy size={16} variant="Linear" color="currentColor" />,
    description: 'Accounts with 500+ seats',
  },
  {
    value: 'mid-market',
    label: 'Mid-market',
    icon: <Chart size={16} variant="Linear" color="currentColor" />,
    description: 'Accounts with 50–499 seats',
  },
  {
    value: 'smb',
    label: 'SMB',
    icon: <Flash size={16} variant="Linear" color="currentColor" />,
    description: 'Accounts with fewer than 50 seats',
  },
];

const meta = {
  title: 'Organisms/Dropdown/DropdownFilter',
  component: DropdownFilter,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    multiSelect: { control: 'boolean' },
    showItemIcons: { control: 'boolean' },
    withSelectorIcon: { control: 'boolean' },
    size: { control: 'select', options: ['big', 'small'] },
    maxMenuHeight: { control: 'text', description: 'CSS max-height for scrollable menu (e.g. "220px")' },
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
    placeholder: 'Stage',
    items: STAGE_ITEMS,
    showItemIcons: false,
  },
};

// ── Open state — static Chromatic snapshot ────────────────────────────────────

export const Open = {
  args: {
    placeholder: 'Stage',
    items: STAGE_ITEMS,
    showItemIcons: false,
    open: true,
  },
  parameters: { layout: 'padded' },
};

export const MultiSelectOpen = {
  args: {
    placeholder: 'Adoption',
    items: ADOPTION_ITEMS,
    multiSelect: true,
    showItemIcons: false,
    open: true,
  },
  parameters: { layout: 'padded' },
};

// ── With description and icons ────────────────────────────────────────────────

export const WithDescriptions = {
  args: {
    placeholder: 'Segment',
    items: SEGMENT_ITEMS,
    showItemIcons: true,
    open: true,
  },
  parameters: { layout: 'padded' },
};

// ── Scrollable menu ────────────────────────────────────────────────────────────

export const ScrollableMenu = {
  args: {
    placeholder: 'Stage',
    items: STAGE_ITEMS,
    showItemIcons: false,
    maxMenuHeight: '160px',
    open: true,
  },
  parameters: { layout: 'padded' },
};

// ── Filter bar — multiple dropdowns side by side (matches Figma section) ──────

export const FilterBar = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
      <DropdownFilter
        placeholder="Stage"
        items={STAGE_ITEMS}
        showItemIcons={false}
        selectorIcon={<Layer size={20} variant="Linear" color="currentColor" />}
        withSelectorIcon
      />
      <DropdownFilter
        placeholder="Adoption"
        items={ADOPTION_ITEMS}
        multiSelect
        showItemIcons={false}
        selectorIcon={<Filter size={20} variant="Linear" color="currentColor" />}
        withSelectorIcon
      />
      <DropdownFilter
        placeholder="Status"
        items={STATUS_ITEMS}
        showItemIcons={false}
        selectorIcon={<Status size={20} variant="Linear" color="currentColor" />}
        withSelectorIcon
      />
      <DropdownFilter
        placeholder="Segment"
        items={SEGMENT_ITEMS}
        showItemIcons={false}
      />
    </div>
  ),
};

// ── Playground — all controls, no Chromatic snapshot ─────────────────────────

export const Playground = {
  args: {
    placeholder: 'Filter',
    items: STAGE_ITEMS,
    multiSelect: false,
    showItemIcons: false,
    withSelectorIcon: false,
    size: 'big',
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};
