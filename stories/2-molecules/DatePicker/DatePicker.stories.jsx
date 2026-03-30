import React from 'react';
import { DatePicker } from '../../../src/components/ui/DatePicker/DatePicker';
import '../../../src/components/ui/DatePicker/DatePicker.css';

const FIGMA_URL = 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    size: { control: 'select', options: ['regular', 'small'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    supportiveText: { control: 'text' },
    disabled: { control: 'boolean' },
    withQuickTags: { control: 'boolean' },
    // Controlled props — managed in render
    value: { control: false },
    startDate: { control: false },
    endDate: { control: false },
    onChange: { control: false },
    onRangeChange: { control: false },
    open: { control: false },
    onOpenChange: { control: false },
    minDate: { control: false },
    maxDate: { control: false },
  },
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export default meta;

// ── Wrapper with internal state for interactive stories ──
function SingleDateDemo(props) {
  const [value, setValue] = React.useState(props.initialValue ?? null);
  return (
    <div style={{ width: '320px' }}>
      <DatePicker
        {...props}
        mode="single"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

function RangeDateDemo(props) {
  const [startDate, setStartDate] = React.useState(props.initialStart ?? null);
  const [endDate, setEndDate] = React.useState(props.initialEnd ?? null);
  return (
    <div style={{ width: '320px' }}>
      <DatePicker
        {...props}
        mode="range"
        startDate={startDate}
        endDate={endDate}
        onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
      />
    </div>
  );
}

// ── Stories ──

export const Default = {
  render: () => <SingleDateDemo />,
};

export const WithLabel = {
  render: () => (
    <SingleDateDemo
      label="Select date"
      supportiveText="Pick a single calendar date"
    />
  ),
};

export const WithValue = {
  render: () => (
    <SingleDateDemo
      label="Date"
      initialValue={new Date(2026, 2, 15)} // March 15, 2026
    />
  ),
};

export const SingleDateOpen = {
  render: () => {
    function OpenDemo() {
      const [value, setValue] = React.useState(new Date(2026, 2, 15));
      return (
        <div style={{ width: '320px', paddingBottom: '380px' }}>
          <DatePicker
            mode="single"
            label="Date"
            value={value}
            onChange={setValue}
            open={true}
          />
        </div>
      );
    }
    return <OpenDemo />;
  },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export const DateRange = {
  render: () => (
    <RangeDateDemo placeholder="Select date range" />
  ),
};

export const DateRangeOpen = {
  render: () => {
    function RangeOpenDemo() {
      const [startDate, setStartDate] = React.useState(new Date(2026, 2, 4));
      const [endDate, setEndDate] = React.useState(new Date(2026, 2, 13));
      return (
        <div style={{ width: '320px', paddingBottom: '380px' }}>
          <DatePicker
            mode="range"
            label="Date range"
            startDate={startDate}
            endDate={endDate}
            onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
            open={true}
          />
        </div>
      );
    }
    return <RangeOpenDemo />;
  },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export const WithMinMax = {
  render: () => (
    <SingleDateDemo
      label="Restricted date"
      supportiveText="Only dates in March 2026 are selectable"
      minDate={new Date(2026, 2, 1)}
      maxDate={new Date(2026, 2, 31)}
    />
  ),
};

export const WithQuickTags = {
  render: () => {
    function QuickTagsDemo() {
      const [value, setValue] = React.useState(null);
      return (
        <div style={{ width: '320px', paddingBottom: '380px' }}>
          <DatePicker
            mode="single"
            label="Date"
            withQuickTags
            value={value}
            onChange={setValue}
            open={true}
          />
        </div>
      );
    }
    return <QuickTagsDemo />;
  },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
};

export const Disabled = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <DatePicker
        mode="single"
        label="Single date (disabled)"
        disabled
      />
      <DatePicker
        mode="range"
        label="Date range (disabled)"
        disabled
      />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <SingleDateDemo label="Regular size" size="regular" />
      <SingleDateDemo label="Small size" size="small" />
    </div>
  ),
};

export const Playground = {
  render: (args) => {
    function PlaygroundDemo() {
      const [value, setValue] = React.useState(null);
      const [startDate, setStartDate] = React.useState(null);
      const [endDate, setEndDate] = React.useState(null);
      return (
        <div style={{ width: '320px' }}>
          {args.mode === 'range' ? (
            <DatePicker
              {...args}
              startDate={startDate}
              endDate={endDate}
              onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
            />
          ) : (
            <DatePicker
              {...args}
              value={value}
              onChange={setValue}
            />
          )}
        </div>
      );
    }
    return <PlaygroundDemo />;
  },
  args: {
    mode: "range",
    size: "small",
    label: 'Date',
    placeholder: "Select a date...",
    supportiveText: '',
    disabled: false,
    withQuickTags: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    design: { type: 'figma', url: FIGMA_URL },
  },
};
