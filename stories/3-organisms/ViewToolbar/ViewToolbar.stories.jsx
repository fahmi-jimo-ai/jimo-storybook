import React from 'react';
import { Tag, Profile2User, Global, Flag, Element3, ShoppingCart } from 'iconsax-react';
import { ViewToolbar } from '../../../src/components/ui/ViewToolbar/ViewToolbar';
import '../../../src/components/ui/ViewToolbar/ViewToolbar.css';
import '../../../src/components/ui/Input/Input.css';
import '../../../src/components/ui/DropdownFilter/DropdownFilter.css';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';

const FIGMA_URL =
  'https://www.figma.com/design/42KccejbNYeHc3EP5P8vHd/Copilot-Widget?node-id=726-1834';

// ─── Shared demo data ────────────────────────────────────────────────────────

const SEGMENT_ITEMS = [
  { value: 'all', label: 'All segments' },
  { value: 'power-users', label: 'Power users' },
  { value: 'churned', label: 'Churned' },
  { value: 'new', label: 'New users' },
  { value: 'enterprise', label: 'Enterprise' },
];

const OWNER_ITEMS = [
  { value: 'alice', label: 'Alice Martin' },
  { value: 'bob', label: 'Bob Chen' },
  { value: 'carol', label: 'Carol Davis' },
  { value: 'dave', label: 'Dave Kim' },
];

const LANGUAGE_ITEMS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
];

const PLAN_ITEMS = [
  { value: 'free', label: 'Free' },
  { value: 'starter', label: 'Starter' },
  { value: 'growth', label: 'Growth' },
  { value: 'enterprise', label: 'Enterprise' },
];

const COUNTRY_ITEMS = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

const CATEGORY_ITEMS = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'software', label: 'Software' },
  { value: 'services', label: 'Services' },
];

// ─── Default filters (Users context — mirrors Figma) ─────────────────────────

const USER_FILTERS = [
  {
    placeholder: 'Segment',
    icon: <Tag size={20} variant="Linear" color="currentColor" />,
    items: SEGMENT_ITEMS,
    multiSelect: true,
  },
  {
    placeholder: 'Owner',
    icon: <Profile2User size={20} variant="Linear" color="currentColor" />,
    items: OWNER_ITEMS,
  },
  {
    placeholder: 'Language',
    icon: <Global size={20} variant="Linear" color="currentColor" />,
    items: LANGUAGE_ITEMS,
  },
];

const COMPANY_FILTERS = [
  {
    placeholder: 'Plan',
    icon: <Flag size={20} variant="Linear" color="currentColor" />,
    items: PLAN_ITEMS,
  },
  {
    placeholder: 'Country',
    icon: <Global size={20} variant="Linear" color="currentColor" />,
    items: COUNTRY_ITEMS,
  },
];

const SEGMENT_FILTERS = [
  {
    placeholder: 'Type',
    icon: <Element3 size={20} variant="Linear" color="currentColor" />,
    items: [
      { value: 'behavioral', label: 'Behavioral' },
      { value: 'firmographic', label: 'Firmographic' },
      { value: 'technographic', label: 'Technographic' },
    ],
  },
];

// ─── Wrapper for controlled search state ─────────────────────────────────────

function ToolbarDemo({ itemCount, itemLabel, filters }) {
  const [search, setSearch] = React.useState('');
  return (
    <div style={{ width: '100%', padding: 'var(--space-2) var(--space-4)' }}>
      <ViewToolbar
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        itemCount={itemCount}
        itemLabel={itemLabel}
        filters={filters}
      />
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Organisms/ViewToolbar',
  component: ViewToolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Users page toolbar — matches Figma spec exactly */
export const Users = {
  render: () => (
    <ToolbarDemo itemCount={212233} itemLabel="users" filters={USER_FILTERS} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/** Companies page toolbar */
export const Companies = {
  render: () => (
    <ToolbarDemo
      itemCount={8412}
      itemLabel="companies"
      filters={COMPANY_FILTERS}
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/** Segments page toolbar */
export const Segments = {
  render: () => (
    <ToolbarDemo itemCount={47} itemLabel="segments" filters={SEGMENT_FILTERS} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/** Search only — no filters */
export const SearchOnly = {
  render: () => (
    <ToolbarDemo itemCount={1500} itemLabel="items" filters={[]} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/** No count — generic fallback when count is unknown */
export const WithoutCount = {
  render: () => (
    <ToolbarDemo itemCount={null} itemLabel="users" filters={USER_FILTERS} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/** Playground — control itemCount, itemLabel, and filter count */
export const Playground = {
  args: {
    itemCount: 212233,
    itemLabel: 'users',
  },
  render: (args) => {
    const [search, setSearch] = React.useState('');
    return (
      <div style={{ width: '100%', padding: 'var(--space-2) var(--space-4)' }}>
        <ViewToolbar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          itemCount={args.itemCount}
          itemLabel={args.itemLabel}
          filters={USER_FILTERS}
        />
      </div>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
