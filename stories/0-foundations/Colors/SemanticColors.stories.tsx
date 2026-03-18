import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Foundations/Colors — SemanticColors
 * All semantic aliases grouped by role: text, background, border, brand, status.
 */
const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=2902-4465',
    },
  },
};

export default meta;
type Story = StoryObj;

type SwatchDef = { token: string; label: string; resolves: string };

const groups: Array<{ group: string; items: SwatchDef[] }> = [
  {
    group: 'Text',
    items: [
      { token: '--color-text-primary',   label: 'Text Primary',   resolves: 'neutral-800' },
      { token: '--color-text-secondary', label: 'Text Secondary', resolves: 'neutral-700' },
      { token: '--color-text-tertiary',  label: 'Text Tertiary',  resolves: 'neutral-500' },
      { token: '--color-text-disabled',  label: 'Text Disabled',  resolves: 'neutral-400' },
      { token: '--color-text-inverse',   label: 'Text Inverse',   resolves: 'neutral-white' },
    ],
  },
  {
    group: 'Backgrounds',
    items: [
      { token: '--color-bg-default',  label: 'Bg Default',  resolves: 'neutral-white' },
      { token: '--color-bg-subtle',   label: 'Bg Subtle',   resolves: 'neutral-50' },
      { token: '--color-bg-muted',    label: 'Bg Muted',    resolves: 'neutral-100' },
      { token: '--color-bg-emphasis', label: 'Bg Emphasis', resolves: 'neutral-200' },
    ],
  },
  {
    group: 'Borders',
    items: [
      { token: '--color-border-default', label: 'Border Default', resolves: 'neutral-300' },
      { token: '--color-border-strong',  label: 'Border Strong',  resolves: 'neutral-400' },
      { token: '--color-border-focus',   label: 'Border Focus',   resolves: 'blue-400' },
    ],
  },
  {
    group: 'Brand',
    items: [
      { token: '--color-brand-default', label: 'Brand Default', resolves: 'blue-400' },
      { token: '--color-brand-hover',   label: 'Brand Hover',   resolves: 'blue-500' },
      { token: '--color-brand-subtle',  label: 'Brand Subtle',  resolves: 'blue-100' },
      { token: '--color-brand-light',   label: 'Brand Light',   resolves: 'blue-200' },
    ],
  },
  {
    group: 'Status',
    items: [
      { token: '--color-success-default', label: 'Success Default', resolves: 'green-400' },
      { token: '--color-success-subtle',  label: 'Success Subtle',  resolves: 'green-100' },
      { token: '--color-warning-default', label: 'Warning Default', resolves: 'orange-500' },
      { token: '--color-warning-subtle',  label: 'Warning Subtle',  resolves: 'orange-100' },
      { token: '--color-danger-default',  label: 'Danger Default',  resolves: 'red-400' },
      { token: '--color-danger-subtle',   label: 'Danger Subtle',   resolves: 'red-100' },
    ],
  },
];

function SemanticSwatch({ token, label, resolves }: SwatchDef) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
      <div
        style={{
          width: 'var(--space-10)',
          height: 'var(--space-8)',
          backgroundColor: `var(${token})`,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border-default)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <span style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-primary)' }}>{label} </span>
        <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>var({token})</code>
      </div>
      <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)' }}>→ {resolves}</span>
    </div>
  );
}

export const SemanticColors: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Semantic Aliases
      </h2>
      {groups.map(({ group, items }) => (
        <div key={group} style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {group}
          </h3>
          {items.map((item) => (
            <SemanticSwatch key={item.token} {...item} />
          ))}
        </div>
      ))}
    </div>
  ),
};
