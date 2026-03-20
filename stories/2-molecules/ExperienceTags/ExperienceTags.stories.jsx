import { ExperienceTags } from '../../../src/components/ui/ExperienceTags/ExperienceTags';
import '../../../src/components/ui/ExperienceTags/ExperienceTags.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3644';

const meta = {
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

export const Default = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
      { label: 'Retention', color: 'purple' },
    ],
  },
};

export const SingleTag = {
  args: {
    tags: [{ label: 'Onboarding', color: 'blue' }],
  },
};

export const TwoTags = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
    ],
  },
};

export const WithOverflow = {
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

export const Playground = {
  args: {
    tags: [
      { label: 'Onboarding', color: 'blue' },
      { label: 'Feature', color: 'orange' },
      { label: 'Retention', color: 'purple' },
    ],
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
