import type { Meta, StoryObj } from '@storybook/react';

/**
 * Foundations/Typography — Scale
 * All 13 composite tokens rendered with their CSS variable name,
 * computed values, and a sample sentence.
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

type TypeToken = {
  token: string;
  label: string;
  computed: string;
  isHeading?: boolean;
};

const tokens: TypeToken[] = [
  // Headings — Montserrat Bold 700
  { token: '--text-heading-1', label: 'Heading 1', computed: 'Montserrat 700 · 48px / 1.2', isHeading: true },
  { token: '--text-heading-2', label: 'Heading 2', computed: 'Montserrat 700 · 40px / 1.2', isHeading: true },
  { token: '--text-heading-3', label: 'Heading 3', computed: 'Montserrat 700 · 32px / 1.2', isHeading: true },
  { token: '--text-heading-4', label: 'Heading 4', computed: 'Montserrat 700 · 24px / 1.2', isHeading: true },
  { token: '--text-heading-5', label: 'Heading 5', computed: 'Montserrat 700 · 20px / 1.2', isHeading: true },
  // Subtitles — Montserrat SemiBold 600
  { token: '--text-subtitle-1', label: 'Subtitle 1', computed: 'Montserrat 600 · 24px / 1.25' },
  { token: '--text-subtitle-2', label: 'Subtitle 2', computed: 'Montserrat 600 · 20px / 1.25' },
  { token: '--text-subtitle-3', label: 'Subtitle 3', computed: 'Montserrat 600 · 16px / 1.25' },
  { token: '--text-subtitle-4', label: 'Subtitle 4', computed: 'Montserrat 600 · 14px / 1.25' },
  // Body — Inter Medium 500
  { token: '--text-body-1', label: 'Body 1', computed: 'Inter 500 · 20px / 1.5' },
  { token: '--text-body-2', label: 'Body 2', computed: 'Inter 500 · 16px / 1.5' },
  { token: '--text-body-3', label: 'Body 3', computed: 'Inter 500 · 14px / 1.5' },
  { token: '--text-body-4', label: 'Body 4', computed: 'Inter 500 · 12px / 1.5' },
];

const SAMPLE = 'The quick brown fox jumps over the lazy dog';

export const Scale: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-8)' }}>
        Typography Scale
      </h2>
      {tokens.map(({ token, label, computed, isHeading }) => (
        <div
          key={token}
          style={{
            borderBottom: '1px solid var(--color-border-default)',
            paddingBottom: 'var(--space-5)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {/* Sample text */}
          <p
            style={{
              font: `var(${token})`,
              letterSpacing: isHeading ? 'var(--text-heading-tracking)' : undefined,
              color: 'var(--color-text-primary)',
              margin: 0,
              marginBottom: 'var(--space-2)',
            }}
          >
            {SAMPLE}
          </p>
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-secondary)' }}>{label}</span>
            <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>{`var(${token})`}</code>
            <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>{computed}</span>
          </div>
          {isHeading && (
            <div style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-1)' }}>
              + <code>letter-spacing: var(--text-heading-tracking)</code>
            </div>
          )}
        </div>
      ))}
    </div>
  ),
};
