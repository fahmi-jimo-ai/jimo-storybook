import { DropdownMenuGroup } from '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
import { DropdownMenuList } from '../../../src/components/ui/DropdownMenuList/DropdownMenuList';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=738:1190';

const SAMPLE_ITEMS = ['Option one', 'Option two', 'Option three', 'Option four'];

const meta = {
  title: 'Organisms/Dropdown/DropdownMenuGroup',
  component: DropdownMenuGroup,
  tags: ['autodocs'],
  argTypes: {
    maxHeight: { control: 'text', description: 'CSS max-height to enable scroll (e.g. "200px")' },
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
    <DropdownMenuGroup {...args}>
      {SAMPLE_ITEMS.map((item) => (
        <DropdownMenuList key={item} text={item} />
      ))}
    </DropdownMenuGroup>
  ),
};

export const WithHeader = {
  render: (args) => (
    <DropdownMenuGroup {...args}>
      <DropdownMenuList state="list-header" text="Section A" />
      <DropdownMenuList text="Option one" />
      <DropdownMenuList text="Option two" />
      <DropdownMenuList state="list-header" text="Section B" />
      <DropdownMenuList text="Option three" />
      <DropdownMenuList text="Option four" state="disabled" />
    </DropdownMenuGroup>
  ),
};

export const WithDangerItem = {
  render: (args) => (
    <DropdownMenuGroup {...args}>
      <DropdownMenuList text="Edit" />
      <DropdownMenuList text="Duplicate" />
      <DropdownMenuList text="Delete" danger />
    </DropdownMenuGroup>
  ),
};

export const Scrollable = {
  render: () => (
    <DropdownMenuGroup maxHeight="220px">
      {Array.from({ length: 10 }, (_, i) => (
        <DropdownMenuList key={i} text={`Option ${i + 1}`} />
      ))}
    </DropdownMenuGroup>
  ),
};

export const MultiSelect = {
  render: (args) => (
    <DropdownMenuGroup {...args}>
      <DropdownMenuList multiSelect state="selected" text="Selected option" />
      <DropdownMenuList multiSelect state="default" text="Unchecked option" />
      <DropdownMenuList multiSelect state="default" text="Another option" />
      <DropdownMenuList multiSelect state="selected" text="Also selected" />
      <DropdownMenuList multiSelect state="disabled" text="Disabled option" />
    </DropdownMenuGroup>
  ),
};

export const Playground = {
  render: (args) => (
    <DropdownMenuGroup {...args}>
      {SAMPLE_ITEMS.map((item) => (
        <DropdownMenuList key={item} text={item} />
      ))}
    </DropdownMenuGroup>
  ),
  args: { maxHeight: undefined },
  parameters: { chromatic: { disableSnapshot: true } },
};
