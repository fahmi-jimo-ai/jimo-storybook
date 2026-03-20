/**
 * Foundations/Radius — ScaleGrid
 * --radius-sm through --radius-full showing corner rounding progression.
 */
const meta = {
  title: 'Foundations/Radius',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji',
    },
  },
};

export default meta;

const radii = [
  { token: '--radius-sm',   value: '4px',    usage: 'Checkbox, small chips, tag inputs' },
  { token: '--radius-md',   value: '8px',    usage: 'Input, DropdownSelector, cards' },
  { token: '--radius-lg',   value: '12px',   usage: 'Button, modals, panels' },
  { token: '--radius-xl',   value: '16px',   usage: 'Large cards, sheet dialogs' },
  { token: '--radius-xxl',  value: '20px',   usage: 'Extra-large surfaces' },
  { token: '--radius-full', value: '9999px', usage: 'Chip, Toggle track, Tooltip bubble' },
];

export const ScaleGrid = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Border Radius Scale
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
        {radii.map(({ token, value, usage }) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-3)', minWidth: 160 }}>
            <div
              style={{
                width: 'var(--space-12)',
                height: 'var(--space-12)',
                backgroundColor: 'var(--color-brand-subtle)',
                border: '2px solid var(--color-brand-default)',
                borderRadius: `var(${token})`,
              }}
            />
            <div>
              <code style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-primary)', display: 'block' }}>{`var(${token})`}</code>
              <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', display: 'block' }}>{value}</span>
              <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', display: 'block', marginTop: 'var(--space-1)' }}>{usage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
