/**
 * Foundations/Spacing — ScaleGrid
 * --space-1 through --space-12 (4px–48px) as labeled squares.
 */
const meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji',
    },
  },
};

export default meta;

const spacings = [
  { token: '--space-1',  px: 4  },
  { token: '--space-2',  px: 8  },
  { token: '--space-3',  px: 12 },
  { token: '--space-4',  px: 16 },
  { token: '--space-5',  px: 20 },
  { token: '--space-6',  px: 24 },
  { token: '--space-7',  px: 28 },
  { token: '--space-8',  px: 32 },
  { token: '--space-9',  px: 36 },
  { token: '--space-10', px: 40 },
  { token: '--space-11', px: 44 },
  { token: '--space-12', px: 48 },
];

export const ScaleGrid = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Spacing Scale
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {spacings.map(({ token, px }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            {/* Visual bar — width = actual token value */}
            <div
              style={{
                width: `var(${token})`,
                height: `var(${token})`,
                backgroundColor: 'var(--color-brand-default)',
                borderRadius: 'var(--radius-sm)',
                flexShrink: 0,
              }}
            />
            {/* Horizontal rule showing the full width */}
            <div
              style={{
                flex: 1,
                height: 2,
                backgroundColor: 'var(--color-bg-muted)',
                borderRadius: 'var(--radius-full)',
                position: 'relative',
                maxWidth: `${px * 2}px`,
              }}
            />
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', minWidth: 240 }}>
              <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>{`var(${token})`}</code>
              <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>{px}px</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
