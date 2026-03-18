import type { ComponentDoc } from '../docs.types';

export const docs: ComponentDoc = {
  name: 'Radio',
  figmaUrl: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=604-1379',
  description:
    'Single-select radio button within a group. Use multiple Radio components sharing the same name to form a mutually exclusive selection group.',
  whenToUse: [
    'Mutually exclusive options — user must pick exactly one',
    'Settings forms with 2–5 options (e.g. plan tier, notification frequency)',
    'Preference selections where all options are visible at once',
  ],
  whenNotToUse: [
    'Multi-select — use <Checkbox> instead',
    'On/off single toggle — use <Toggle> instead',
    'More than 6 options — use <DropdownSelector> + <DropdownMenuList> instead',
  ],
  variants: {},
  props: [
    { name: 'label', type: 'React.ReactNode', description: 'Label text displayed to the right of the radio button' },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether this option is selected' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interaction' },
    { name: 'name', type: 'string', description: 'HTML name attribute — group all mutually exclusive radios with the same name' },
    { name: 'value', type: 'string', description: 'HTML value attribute for form handling' },
    { name: 'onChange', type: 'React.ChangeEventHandler<HTMLInputElement>', description: 'Change handler' },
  ],
  examples: [
    {
      label: 'Radio group',
      code: `<>
  <Radio name="plan" value="free" label="Free" checked={plan === 'free'} onChange={() => setPlan('free')} />
  <Radio name="plan" value="pro" label="Pro" checked={plan === 'pro'} onChange={() => setPlan('pro')} />
  <Radio name="plan" value="enterprise" label="Enterprise" checked={plan === 'enterprise'} onChange={() => setPlan('enterprise')} />
</>`,
    },
    {
      label: 'Disabled option',
      code: `<Radio name="tier" value="enterprise" label="Enterprise (contact sales)" disabled />`,
    },
  ],
  relatedComponents: ['Checkbox', 'Toggle', 'DropdownSelector'],
  sourceFile: 'src/components/ui/Radio/Radio.tsx',
};
