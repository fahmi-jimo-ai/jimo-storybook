import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceTags } from '../../../src/components/ui/ExperienceTags/ExperienceTags';
import '../../../src/components/ui/ExperienceTags/ExperienceTags.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3644';

const meta: Meta<typeof ExperienceTags> = {
  title: 'Molecules/ExperienceTags',
  component: ExperienceTags,
  tags: ['autodocs'],
  argTypes: {
    maxVisible: { control: { type: 'number', min: 1 } },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};
export default meta;
type Story = StoryObj<typeof ExperienceTags>;

export const Default: Story = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
      { label: 'Retention', color: 'purple' },
    ],
  },
};

export const SingleTag: Story = {
  args: {
    tags: [{ label: 'Onboarding', color: 'blue' }],
  },
};

export const TwoTags: Story = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
    ],
  },
};

export const WithOverflow: Story = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
      { label: 'Retention', color: 'purple' },
      { label: 'Activation', color: 'blue' },
      { label: 'Upsell', color: 'orange' },
    ],
    maxVisible: 3,
  },
};

export const Playground: Story = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
      { label: 'Retention', color: 'purple' },
    ],
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
