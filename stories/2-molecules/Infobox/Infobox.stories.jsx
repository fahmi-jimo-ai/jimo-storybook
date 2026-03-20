import { Infobox } from '../../../src/components/ui/Infobox/Infobox';
import '../../../src/components/ui/Infobox/Infobox.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1796-1900';

const meta = {
  title: 'Molecules/Infobox',
  component: Infobox,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'positive', 'warning', 'danger', 'brand'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    title: { control: 'text' },
    body: { control: 'text' },
    showIcon: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    ctaLabel: { control: 'text' },
    icon: { control: false },
    onCta: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  args: {
    type: 'neutral',
    title: 'Tip',
    body: 'You can customise this widget by clicking the settings icon.',
  },
};

export const SemanticTypes = {
  render: () => {
    const variants = [
      { type: 'neutral', title: 'Note', body: 'This setting applies to all users in your workspace.' },
      { type: 'brand', title: 'Info', body: 'Learn more about this feature in the documentation.' },
      { type: 'positive', title: 'Success', body: 'Your configuration has been validated and is ready to publish.' },
      { type: 'warning', title: 'Warning', body: 'Changing this setting will affect all active campaigns.' },
      { type: 'danger', title: 'Danger', body: 'This action cannot be undone. Proceed with caution.' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 480 }}>
        {variants.map(({ type, title, body }) => (
          <Infobox key={type} type={type} title={title} body={body} />
        ))}
      </div>
    );
  },
};

export const WithCta = {
  args: {
    type: 'brand',
    title: 'New feature available',
    body: 'Explore our redesigned analytics dashboard for better insights.',
    ctaLabel: 'Learn more',
    onCta: () => {},
  },
};

export const TitleOnly = {
  args: {
    type: 'brand',
    title: 'Your free trial expires in 3 days.',
  },
};

export const NoIcon = {
  args: {
    type: 'neutral',
    title: 'No icon variant',
    body: 'This infobox is shown without the leading icon.',
    showIcon: false,
  },
};

export const Playground = {
  args: {
    type: 'neutral',
    title: 'Infobox title',
    body: 'Optional body text with more detail.',
    showIcon: true,
    ctaLabel: '',
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
