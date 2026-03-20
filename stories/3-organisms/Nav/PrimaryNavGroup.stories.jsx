import { Home, Home2, Routing2, MagicStar, Notepad2 } from 'iconsax-react';
import { BannerIcon } from '../../../src/components/ui/Icon/Icon';
import { PrimaryNavGroup } from '../../../src/components/ui/PrimaryNavGroup/PrimaryNavGroup';
import { PrimaryNavItem } from '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem';
import '../../../src/components/ui/PrimaryNavGroup/PrimaryNavGroup.css';
import '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3015-2968';

const meta = {
  title: 'Organisms/Nav/PrimaryNavGroup',
  component: PrimaryNavGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['expanded', 'collapsed'],
      table: { defaultValue: { summary: 'expanded' } },
    },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <PrimaryNavGroup {...args}>
      <PrimaryNavItem
        state="idle"
        type="default"
        label="Tours"
        icon={<Routing2 size={20} variant="Linear" color="currentColor" />}
        iconActive={<Routing2 size={20} variant="Bold" color="currentColor" />}
      />
      <PrimaryNavItem
        state="active"
        type="default"
        label="Surveys"
        icon={<Notepad2 size={20} variant="Linear" color="currentColor" />}
        iconActive={<Notepad2 size={20} variant="Bold" color="currentColor" />}
      />
      <PrimaryNavItem
        state="idle"
        type="default"
        label="Banners"
        icon={<BannerIcon size={20} variant="Linear" color="currentColor" />}
        iconActive={<BannerIcon size={20} variant="Bold" color="currentColor" />}
      />
    </PrimaryNavGroup>
  ),
  args: { type: 'expanded' },
};

export const Collapsed = {
  render: (args) => (
    <PrimaryNavGroup {...args}>
      <PrimaryNavItem
        state="idle"
        type="collapsed"
        icon={<Home size={20} variant="Linear" color="currentColor" />}
        iconActive={<Home2 size={20} variant="Bold" color="currentColor" />}
      />
      <PrimaryNavItem
        state="active"
        type="collapsed"
        icon={<MagicStar size={20} variant="Linear" color="currentColor" />}
        iconActive={<MagicStar size={20} variant="Bold" color="currentColor" />}
      />
    </PrimaryNavGroup>
  ),
  args: { type: 'collapsed' },
};

export const SingleItem = {
  render: (args) => (
    <PrimaryNavGroup {...args}>
      <PrimaryNavItem
        state="idle"
        type="default"
        label="Get Started"
        icon={<Home size={20} variant="Linear" color="currentColor" />}
        iconActive={<Home2 size={20} variant="Bold" color="currentColor" />}
      />
    </PrimaryNavGroup>
  ),
  args: { type: 'expanded' },
};

export const Playground = {
  render: (args) => (
    <PrimaryNavGroup {...args}>
      <PrimaryNavItem
        state="idle"
        type={args.type === 'collapsed' ? 'collapsed' : 'default'}
        label="Item one"
        icon={<Home size={20} variant="Linear" color="currentColor" />}
        iconActive={<Home2 size={20} variant="Bold" color="currentColor" />}
      />
      <PrimaryNavItem
        state="active"
        type={args.type === 'collapsed' ? 'collapsed' : 'default'}
        label="Item two"
        icon={<MagicStar size={20} variant="Linear" color="currentColor" />}
        iconActive={<MagicStar size={20} variant="Bold" color="currentColor" />}
      />
    </PrimaryNavGroup>
  ),
  args: { type: 'expanded' },
  parameters: { chromatic: { disableSnapshot: true } },
};
