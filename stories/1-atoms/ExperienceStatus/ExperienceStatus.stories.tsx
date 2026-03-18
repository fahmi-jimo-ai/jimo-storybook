import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceStatus } from '../../../src/components/ui/ExperienceStatus/ExperienceStatus';
import '../../../src/components/ui/ExperienceStatus/ExperienceStatus.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3517';

const meta: Meta<typeof ExperienceStatus> = {
  title: 'Atoms/ExperienceStatus',
  component: ExperienceStatus,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['draft', 'live', 'paused', 'expired'] },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};
export default meta;
type Story = StoryObj<typeof ExperienceStatus>;

export const Default: Story = {
  args: { status: 'live' },
};

export const Draft: Story = {
  args: { status: 'draft' },
};

export const Paused: Story = {
  args: { status: 'paused' },
};

export const Expired: Story = {
  args: { status: 'expired' },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <ExperienceStatus status="live" />
      <ExperienceStatus status="draft" />
      <ExperienceStatus status="paused" />
      <ExperienceStatus status="expired" />
    </div>
  ),
};

export const Playground: Story = {
  args: { status: 'live' },
  parameters: { chromatic: { disableSnapshot: true } },
};
