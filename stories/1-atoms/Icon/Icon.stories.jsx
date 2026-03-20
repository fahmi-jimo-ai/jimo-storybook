import { Add, Heart, Star1, Setting2, SearchNormal, Notification, Edit2, Copy, Trash } from 'iconsax-react';
import { Icon, CloseIcon, SpinnerIcon } from '../../../src/components/ui/Icon/Icon';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji';

const meta = {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Icon icon={CloseIcon} size={24} color="var(--color-neutral-800)" />
      <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>
        CloseIcon — Linear, 24px
      </span>
    </div>
  ),
};

export const SpinnerIconStory = {
  name: 'SpinnerIcon',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Icon icon={SpinnerIcon} size={24} color="var(--color-blue-400)" />
      <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>
        SpinnerIcon — shared loading indicator
      </span>
    </div>
  ),
};

/** Same icon across all 4 sizes in both Linear and Bold variants */
export const IcosahedronVariants = {
  render: () => {
    const sizes = [16, 20, 24, 32];
    const variants = ['Linear', 'Bold'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <div style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
              {variant}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
              {sizes.map((size) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Star1 size={size} variant={variant} color="var(--color-neutral-800)" />
                  <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)' }}>
                    {size}px
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/** Browsable gallery of common iconsax icons — browse the full set at iconsax-icon-list.netlify.app */
export const IconGallery = {
  render: () => {
    const icons = [
      { name: 'Add', Icn: Add },
      { name: 'Heart', Icn: Heart },
      { name: 'Star1', Icn: Star1 },
      { name: 'Setting2', Icn: Setting2 },
      { name: 'SearchNormal', Icn: SearchNormal },
      { name: 'Notification', Icn: Notification },
      { name: 'Edit2', Icn: Edit2 },
      { name: 'Copy', Icn: Copy },
      { name: 'Trash', Icn: Trash },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <p style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Icons from iconsax-react — browse the full set at iconsax-icon-list.netlify.app
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {icons.map(({ name, Icn }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                width: 'var(--space-12)',
              }}
            >
              <Icn size={24} color="var(--color-neutral-800)" />
              <span style={{ font: 'var(--text-body-4)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
