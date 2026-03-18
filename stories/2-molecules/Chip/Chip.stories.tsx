import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '../../../src/components/ui/Chip/Chip';
import type { ChipType, ChipVariant, ChipSize } from '../../../src/components/ui/Chip/Chip';
import '../../../src/components/ui/Chip/Chip.css';
import { ALL_ICON_NAMES, getIcon } from '../../utils/icons';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=666-1652';

const ICON_OPTIONS = ['none', ...ALL_ICON_NAMES];

type ChipStoryArgs = React.ComponentProps<typeof Chip> & {
  leftIconName?: string;
  rightIconName?: string;
};

function resolveIcon(name: string | undefined): React.ReactElement | undefined {
  if (!name || name === 'none') return undefined;
  const Icn = getIcon(name);
  return Icn ? <Icn size={16} /> : undefined;
}

const meta: Meta<ChipStoryArgs> = {
  title: 'Molecules/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'positive', 'negative', 'alert', 'brand'] satisfies ChipType[],
      table: { defaultValue: { summary: 'neutral' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'] satisfies ChipVariant[],
      table: { defaultValue: { summary: 'secondary' } },
    },
    size: {
      control: 'select',
      options: ['regular', 'small', 'x-small', 'xx-small'] satisfies ChipSize[],
      table: { defaultValue: { summary: 'regular' } },
    },
    children: { control: 'text' },
    iconOnly: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    leftIcon: { control: false },
    rightIcon: { control: false },
    onRemove: { control: false },
    leftIconName: {
      name: 'leftIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered on the left side of the chip',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
    rightIconName: {
      name: 'rightIcon',
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Icon rendered on the right side of the chip',
      table: { defaultValue: { summary: 'none' }, category: 'Icons' },
    },
  },
  render: ({ leftIconName, rightIconName, ...args }) => (
    <Chip
      {...args}
      leftIcon={resolveIcon(leftIconName)}
      rightIcon={resolveIcon(rightIconName)}
    />
  ),
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

export const Default: Story = {
  args: { type: 'neutral', variant: 'secondary', size: 'regular', children: 'Label' },
};

export const Primary: Story = {
  args: { type: 'neutral', variant: 'primary', size: 'regular', children: 'Label' },
};

export const SemanticTypes: Story = {
  render: () => {
    const types: ChipType[] = ['neutral', 'positive', 'negative', 'alert', 'brand'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {(['secondary', 'primary'] as ChipVariant[]).map((variant) => (
          <div
            key={variant}
            style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <span
              style={{
                font: 'var(--text-body-4)',
                color: 'var(--color-text-secondary)',
                width: 64,
                flexShrink: 0,
              }}
            >
              {variant}
            </span>
            {types.map((type) => (
              <Chip key={type} type={type} variant={variant}>
                {type}
              </Chip>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes: ChipSize[] = ['regular', 'small', 'x-small', 'xx-small'];
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <Chip key={size} size={size}>
            {size}
          </Chip>
        ))}
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const AddIcon = getIcon('Add');
    const StarIcon = getIcon('Star1');
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Chip leftIcon={AddIcon ? <AddIcon size={16} /> : undefined}>Left icon</Chip>
        <Chip rightIcon={StarIcon ? <StarIcon size={16} /> : undefined}>Right icon</Chip>
        <Chip
          leftIcon={AddIcon ? <AddIcon size={16} /> : undefined}
          rightIcon={StarIcon ? <StarIcon size={16} /> : undefined}
        >
          Both icons
        </Chip>
      </div>
    );
  },
};

export const IconOnly: Story = {
  render: () => {
    const AddIcon = getIcon('Add');
    const sizes: ChipSize[] = ['regular', 'small', 'x-small', 'xx-small'];
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        {sizes.map((size) => (
          <Chip
            key={size}
            size={size}
            iconOnly
            leftIcon={AddIcon ? <AddIcon size={16} /> : undefined}
          />
        ))}
      </div>
    );
  },
};

export const WithRemove: Story = {
  render: () => {
    const types: ChipType[] = ['neutral', 'positive', 'negative', 'alert', 'brand'];
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        {types.map((type) => (
          <Chip key={type} type={type} onRemove={() => {}}>
            {type}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    type: 'neutral',
    variant: 'secondary',
    size: 'regular',
    children: 'Label',
    iconOnly: false,
    leftIconName: 'none',
    rightIconName: 'none',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
