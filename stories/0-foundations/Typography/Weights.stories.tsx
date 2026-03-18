import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Foundations/Typography — Weights
 * The three typeface / weight pairings side by side with the same sample sentence.
 */
const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2906-4970',
    },
  },
};

export default meta;
type Story = StoryObj;

const SAMPLE = 'Designing with purpose';

const weights = [
  {
    token: '--text-heading-3',
    label: 'Montserrat Bold 700',
    role: 'Headings',
    extra: { letterSpacing: 'var(--text-heading-tracking)' },
  },
  {
    token: '--text-subtitle-2',
    label: 'Montserrat SemiBold 600',
    role: 'Subtitles',
    extra: {},
  },
  {
    token: '--text-body-2',
    label: 'Inter Medium 500',
    role: 'Body',
    extra: {},
  },
];

export const Weights: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-8)' }}>
        Typeface &amp; Weight Pairings
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {weights.map(({ token, label, role, extra }) => (
          <div
            key={token}
            style={{
              paddingBottom: 'var(--space-8)',
              borderBottom: '1px solid var(--color-border-default)',
            }}
          >
            <p
              style={{
                font: `var(${token})`,
                color: 'var(--color-text-primary)',
                margin: 0,
                marginBottom: 'var(--space-3)',
                ...extra,
              }}
            >
              {SAMPLE}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
              <span style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-secondary)' }}>{role}</span>
              <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>{label}</span>
              <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>{`var(${token})`}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
