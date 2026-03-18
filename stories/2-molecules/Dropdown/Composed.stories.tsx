import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownSelector } from '../../../src/components/ui/DropdownSelector/DropdownSelector';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
import { DropdownMenuGroup } from '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
import { DropdownMenuList } from '../../../src/components/ui/DropdownMenuList/DropdownMenuList';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1177:8683';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

function SingleSelectDropdown({
  placeholder = 'Select a fruit',
  items = FRUITS,
}: {
  placeholder?: string;
  items?: string[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | undefined>();

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '260px' }}>
      <DropdownSelector
        text={selected}
        isOpen={isOpen}
        hasValue={!!selected}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={placeholder}
      />
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--space-1))',
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <DropdownMenuGroup>
            {items.map((item) => (
              <DropdownMenuList
                key={item}
                text={item}
                state={item === selected ? 'selected' : 'default'}
                showIcon={false}
                onClick={() => handleSelect(item)}
              />
            ))}
          </DropdownMenuGroup>
        </div>
      )}
    </div>
  );
}

function MultiSelectDropdown({
  placeholder = 'Select fruits',
  items = FRUITS,
}: {
  placeholder?: string;
  items?: string[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const label =
    selected.size === 0
      ? undefined
      : selected.size === 1
        ? [...selected][0]
        : `${selected.size} selected`;

  return (
    <div style={{ position: 'relative', width: '260px' }}>
      <DropdownSelector
        text={label}
        isOpen={isOpen}
        hasValue={selected.size > 0}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={placeholder}
      />
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--space-1))',
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <DropdownMenuGroup maxHeight="220px">
            {items.map((item) => (
              <DropdownMenuList
                key={item}
                text={item}
                multiSelect
                state={selected.has(item) ? 'selected' : 'default'}
                onClick={() => toggle(item)}
              />
            ))}
          </DropdownMenuGroup>
        </div>
      )}
    </div>
  );
}

const meta: Meta = {
  title: 'Molecules/Dropdown/Composed',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj;

export const SingleSelect: Story = {
  render: () => <SingleSelectDropdown />,
};

export const MultiSelect: Story = {
  render: () => <MultiSelectDropdown />,
};

export const WithGroupedSections: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | undefined>();

    const handleSelect = (item: string) => {
      setSelected(item);
      setIsOpen(false);
    };

    return (
      <div style={{ position: 'relative', width: '260px' }}>
        <DropdownSelector
          text={selected}
          isOpen={isOpen}
          hasValue={!!selected}
          onClick={() => setIsOpen((o) => !o)}
        />
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + var(--space-1))',
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <DropdownMenuGroup>
              <DropdownMenuList state="list-header" text="Fruits" />
              {['Apple', 'Banana', 'Cherry'].map((item) => (
                <DropdownMenuList
                  key={item}
                  text={item}
                  showIcon={false}
                  state={item === selected ? 'selected' : 'default'}
                  onClick={() => handleSelect(item)}
                />
              ))}
              <DropdownMenuList state="list-header" text="Vegetables" />
              {['Carrot', 'Broccoli'].map((item) => (
                <DropdownMenuList
                  key={item}
                  text={item}
                  showIcon={false}
                  state={item === selected ? 'selected' : 'default'}
                  onClick={() => handleSelect(item)}
                />
              ))}
              <DropdownMenuList
                text="Clear selection"
                danger
                showIcon={false}
                onClick={() => {
                  setSelected(undefined);
                  setIsOpen(false);
                }}
              />
            </DropdownMenuGroup>
          </div>
        )}
      </div>
    );
  },
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>
          Single select
        </span>
        <SingleSelectDropdown />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>
          Multi select
        </span>
        <MultiSelectDropdown />
      </div>
    </div>
  ),
};
