import { ExperienceCard } from '../../../src/components/ui/ExperienceCard/ExperienceCard';
import '../../../src/components/ui/ExperienceCard/ExperienceCard.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1240-6718';

const SAMPLE_TAGS = [
  { label: 'Onboarding', color: 'blue' },
  { label: 'Feature', color: 'orange' },
  { label: 'Retention', color: 'purple' },
];

const meta = {
  title: 'Organisms/ExperienceCard',
  component: ExperienceCard,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['draft', 'live', 'paused', 'expired'] },
    layout: { control: 'select', options: ['grid', 'line', 'compact'] },
    hover: { control: 'boolean' },
    thumbnailContent: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};
export default meta;

export const GridDefault = {
  args: {
    layout: 'grid',
    title: 'Product Tour — Welcome Flow',
    createdAt: '5 days ago',
    status: 'live',
    tags: SAMPLE_TAGS,
    targeting: 'All users',
    environment: 'All Environments',
  },
};

export const GridHover = {
  args: {
    ...GridDefault.args,
    hover: true,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const GridDraft = {
  args: {
    ...GridDefault.args,
    status: 'draft',
  },
};

export const GridPaused = {
  args: {
    ...GridDefault.args,
    status: 'paused',
  },
};

export const LineDefault = {
  args: {
    layout: 'line',
    title: 'Feature Announcement Banner',
    createdAt: '2 days ago',
    status: 'live',
    tags: SAMPLE_TAGS,
    targeting: 'All users',
    environment: 'All Environments',
  },
  parameters: { layout: 'padded' },
};

export const LineHover = {
  args: {
    ...LineDefault.args,
    hover: true,
  },
  parameters: { layout: 'padded', chromatic: { disableSnapshot: true } },
};

export const CompactDefault = {
  args: {
    layout: 'compact',
    title: 'Checklist — Getting Started',
    createdAt: '1 week ago',
    status: 'paused',
    tags: [{ label: 'Onboarding', color: 'blue' }],
    targeting: 'New users',
    environment: 'Production',
  },
  parameters: { layout: 'padded' },
};

export const CompactHover = {
  args: {
    ...CompactDefault.args,
    hover: true,
  },
  parameters: { layout: 'padded', chromatic: { disableSnapshot: true } },
};

export const Playground = {
  args: {
    layout: 'grid',
    title: 'My Experience',
    createdAt: '3 days ago',
    status: 'live',
    tags: SAMPLE_TAGS,
    targeting: 'All users',
    environment: 'All Environments',
    hover: false,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
