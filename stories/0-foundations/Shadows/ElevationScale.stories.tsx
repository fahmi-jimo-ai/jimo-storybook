import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Foundations/Shadows — ElevationScale
 * --shadow-sm through --shadow-xl as white cards on a gray background.
 */
const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji',
    },
  },
};

export default meta;
type Story = StoryObj;

const shadows: Array<{ token: string; label: string; value: string; usage: string }> = [
  {
    token: '--shadow-sm',
    label: 'Shadow sm',
    value: '0 1px 3px rgba(7,19,49,0.08), 0 1px 2px rgba(7,19,49,0.06)',
    usage: 'Buttons, inputs — subtle lift',
  },
  {
    token: '--shadow-md',
    label: 'Shadow md',
    value: '0 4px 6px rgba(7,19,49,0.07), 0 2px 4px rgba(7,19,49,0.06)',
    usage: 'Dropdown panels, cards',
  },
  {
    token: '--shadow-lg',
    label: 'Shadow lg',
    value: '0 10px 15px rgba(7,19,49,0.1), 0 4px 6px rgba(7,19,49,0.05)',
    usage: 'Modals, sheets',
  },
  {
    token: '--shadow-xl',
    label: 'Shadow xl',
    value: '0 20px 25px rgba(7,19,49,0.1), 0 10px 10px rgba(7,19,49,0.04)',
    usage: 'Popovers, floating panels',
  },
];

export const ElevationScale: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--color-bg-muted)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        maxWidth: 720,
      }}
    >
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Elevation Scale
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
        {shadows.map(({ token, label, value, usage }) => (
          <div
            key={token}
            style={{
              backgroundColor: 'var(--color-bg-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              boxShadow: `var(${token})`,
              minWidth: 280,
              flex: 1,
            }}
          >
            <p style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-primary)', margin: 0, marginBottom: 'var(--space-2)' }}>
              {label}
            </p>
            <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              {`var(${token})`}
            </code>
            <p style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', margin: 0, marginBottom: 'var(--space-3)' }}>
              {usage}
            </p>
            <p style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', margin: 0, fontFamily: 'monospace', wordBreak: 'break-word' }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};
