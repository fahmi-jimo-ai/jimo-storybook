import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3104-4642',
    },
  },
};

export default meta;
type Story = StoryObj;

const shadows: Array<{ token: string; label: string; value: string; usage: string }> = [
  {
    token: '--shadow-elevation-01',
    label: 'Elevation 01',
    value: '0px 2px 2px rgba(0,0,0,0.04)',
    usage: 'Buttons, inputs, selectors — subtle lift',
  },
  {
    token: '--shadow-elevation-02',
    label: 'Elevation 02',
    value: '0px 5px 15px rgba(0,0,0,0.07)',
    usage: 'Dropdown panels, tab pills, cards',
  },
  {
    token: '--shadow-elevation-03',
    label: 'Elevation 03',
    value: '0px 5px 28px rgba(0,0,0,0.09)',
    usage: 'Modals, sheets',
  },
  {
    token: '--shadow-elevation-04',
    label: 'Elevation 04',
    value: '0px 12px 38px rgba(0,0,0,0.15)',
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
