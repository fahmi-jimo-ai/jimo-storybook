/**
 * Foundations/Colors — NeutralScale
 * neutral-white through neutral-800 with contrast ratio annotations.
 */
const meta = {
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

// Contrast ratios against white (#fff) — approximate WCAG-rounded values
const neutrals = [
  { token: '--color-neutral-white', label: 'White',      hex: '#ffffff', contrastOnWhite: '1.0 : 1' },
  { token: '--color-neutral-50',    label: 'Neutral 50', hex: '#fbfbfb', contrastOnWhite: '1.02 : 1' },
  { token: '--color-neutral-100',   label: 'Neutral 100',hex: '#f0f2f4', contrastOnWhite: '1.1 : 1' },
  { token: '--color-neutral-200',   label: 'Neutral 200',hex: '#ececec', contrastOnWhite: '1.16 : 1' },
  { token: '--color-neutral-300',   label: 'Neutral 300',hex: '#e5e5e5', contrastOnWhite: '1.26 : 1' },
  { token: '--color-neutral-400',   label: 'Neutral 400',hex: '#cccccc', contrastOnWhite: '1.6 : 1' },
  { token: '--color-neutral-500',   label: 'Neutral 500',hex: '#9ca1ad', contrastOnWhite: '2.87 : 1' },
  { token: '--color-neutral-600',   label: 'Neutral 600',hex: '#7c8a99', contrastOnWhite: '3.97 : 1' },
  { token: '--color-neutral-700',   label: 'Neutral 700',hex: '#4d637b', contrastOnWhite: '7.12 : 1' },
  { token: '--color-neutral-800',   label: 'Neutral 800',hex: '#071331', contrastOnWhite: '17.5 : 1' },
];

function NeutralRow({
  token, label, hex, contrastOnWhite,
}) {
  const isLight = ['--color-neutral-white', '--color-neutral-50', '--color-neutral-100', '--color-neutral-200', '--color-neutral-300'].includes(token);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
      <div
        style={{
          width: 'var(--space-12)',
          height: 'var(--space-10)',
          backgroundColor: `var(${token})`,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-default)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ font: 'var(--text-body-4)', color: isLight ? 'var(--color-neutral-600)' : 'var(--color-neutral-white)' }}>
          Aa
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-primary)' }}>{label}</span>
        <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>{`var(${token})`} — {hex}</code>
      </div>
      <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap' }}>
        {contrastOnWhite} on white
      </span>
    </div>
  );
}

export const NeutralScale = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Neutral Scale
      </h2>
      {neutrals.map((n) => (
        <NeutralRow key={n.token} {...n} />
      ))}
    </div>
  ),
};
