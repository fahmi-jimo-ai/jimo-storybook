import { useState } from 'react';
import { Toast, ToastContainer } from '../../../src/components/ui/Toast/Toast';
import '../../../src/components/ui/Toast/Toast.css';
import { Button } from '../../../src/components/ui/Button/Button';
import '../../../src/components/ui/Button/Button.css';

const FIGMA_URL =
  'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1760-7178';

/** Interactive wrapper — click the button to trigger the toast with its enter animation */
function ToastDemo({ type, title, body, primaryAction, secondaryAction, dismissable }) {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Button level="secondary" size="small" onClick={() => setVisible(true)}>
        Show Toast
      </Button>
      <ToastContainer>
        {visible && (
          <Toast
            type={type}
            title={title}
            body={body}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            dismissable={dismissable}
            duration={4000}
            onDismiss={() => setVisible(false)}
          />
        )}
      </ToastContainer>
    </div>
  );
}

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'positive', 'warning', 'negative'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    title: { control: 'text' },
    body: { control: 'text' },
    dismissable: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    primaryAction: { control: 'text' },
    secondaryAction: { control: 'text' },
    duration: {
      control: 'number',
      description: 'Auto-dismiss delay in ms. Pass 0 or Infinity to disable.',
      table: { defaultValue: { summary: '4000' } },
    },
    onDismiss: { control: false },
    onPrimaryAction: { control: false },
    onSecondaryAction: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

/** Click "Show Toast" to see the enter animation and auto-dismiss */
export const Default = {
  render: () => <ToastDemo type="neutral" title="Heads up" />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Positive = {
  render: () => <ToastDemo type="positive" title="Changes saved" />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Warning = {
  render: () => <ToastDemo type="warning" title="Connection unstable" />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Negative = {
  render: () => <ToastDemo type="negative" title="Something went wrong" />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const AllTypes = {
  render: () => {
    const variants = [
      { type: 'neutral', title: 'Heads up' },
      { type: 'positive', title: 'Changes saved' },
      { type: 'warning', title: 'Connection unstable' },
      { type: 'negative', title: 'Something went wrong' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {variants.map(({ type, title }) => (
          <Toast key={type} type={type} title={title} duration={Infinity} />
        ))}
      </div>
    );
  },
};

export const WithBody = {
  args: {
    type: 'positive',
    title: 'Profile updated',
    body: 'Your changes have been saved and are now live.',
    duration: Infinity,
  },
};

export const WithActions = {
  args: {
    type: 'neutral',
    title: 'Unsaved changes',
    body: 'You have unsaved changes. Do you want to save before leaving?',
    primaryAction: 'Save',
    secondaryAction: 'Discard',
    duration: Infinity,
  },
};

export const NonDismissable = {
  args: {
    type: 'warning',
    title: 'Scheduled maintenance',
    body: 'The service will be unavailable on Sunday from 02:00–04:00 UTC.',
    dismissable: false,
    duration: Infinity,
  },
};

export const Playground = {
  args: {
    type: 'neutral',
    title: 'Toast title',
    body: '',
    dismissable: true,
    primaryAction: '',
    secondaryAction: '',
    duration: Infinity,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
