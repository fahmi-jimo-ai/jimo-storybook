import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Foundations/Colors — BrandPalette
 * Blue scale (50–500) with hex values and CSS variable names.
 * No component — purely visual token documentation.
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

const swatches: Array<{ token: string; label: string }> = [
  { token: '--color-blue-50',  label: 'Blue 50' },
  { token: '--color-blue-100', label: 'Blue 100' },
  { token: '--color-blue-150', label: 'Blue 150' },
  { token: '--color-blue-200', label: 'Blue 200' },
  { token: '--color-blue-300', label: 'Blue 300' },
  { token: '--color-blue-400', label: 'Blue 400' },
  { token: '--color-blue-500', label: 'Blue 500' },
];

function SwatchRow({ token, label }: { token: string; label: string }) {
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
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span style={{ font: 'var(--text-subtitle-4)', color: 'var(--color-text-primary)' }}>{label}</span>
        <code style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>{`var(${token})`}</code>
      </div>
    </div>
  );
}

export const BrandPalette: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <h2 style={{ font: 'var(--text-heading-5)', letterSpacing: 'var(--text-heading-tracking)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
        Brand — Blue Scale
      </h2>
      {swatches.map((s) => (
        <SwatchRow key={s.token} {...s} />
      ))}
    </div>
  ),
};
