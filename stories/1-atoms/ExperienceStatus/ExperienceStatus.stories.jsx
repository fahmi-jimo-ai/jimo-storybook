import { ExperienceStatus } from '../../../src/components/ui/ExperienceStatus/ExperienceStatus';
import '../../../src/components/ui/ExperienceStatus/ExperienceStatus.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3517';

const meta = {
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

export const Default = {
  args: { status: 'live' },
};

export const Draft = {
  args: { status: 'draft' },
};

export const Paused = {
  args: { status: 'paused' },
};

export const Expired = {
  args: { status: 'expired' },
};

export const AllStatuses = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <ExperienceStatus status="live" />
      <ExperienceStatus status="draft" />
      <ExperienceStatus status="paused" />
      <ExperienceStatus status="expired" />
    </div>
  ),
};

export const Playground = {
  args: { status: 'live' },
  parameters: { chromatic: { disableSnapshot: true } },
};
