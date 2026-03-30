import React from 'react';
import { Calendar1, CloseCircle, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { Input } from '../Input/Input';
import '../Input/Input.css';
import { Chip } from '../Chip/Chip';
import '../Chip/Chip.css';
import {
  today,
  addDays,
  isSameDay,
  isBefore,
  isAfter,
  toMidnight,
  formatShort,
  formatSlash,
  parseSlash,
  formatLong,
  getCalendarDays,
  formatMonthYear,
  stepMonth,
  getSinglePresets,
  getRangePresets,
} from './dateUtils.js';
import './DatePicker.css';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const DatePicker = ({
  mode = 'single',
  withQuickTags = false,
  value,
  startDate,
  endDate,
  onChange,
  onRangeChange,
  placeholder,
  label,
  supportiveText,
  size = 'regular',
  disabled = false,
  minDate,
  maxDate,
  open,
  onOpenChange,
  className,
}) => {
  const wrapperRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const endInputRef = React.useRef(null);
  const exitTimerRef = React.useRef(null);

  // ── Open/close state ──
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const setOpen = React.useCallback(
    (next) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

  React.useEffect(() => {
    if (isOpen) {
      clearTimeout(exitTimerRef.current);
      setIsVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)));
    } else {
      setIsAnimating(false);
      exitTimerRef.current = setTimeout(() => setIsVisible(false), 150);
    }
    return () => clearTimeout(exitTimerRef.current);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // ── Single date internal state ──
  const [internalValue, setInternalValue] = React.useState(null);
  const selectedDate = value !== undefined ? value : internalValue;

  // ── Range internal state ──
  const [internalStart, setInternalStart] = React.useState(null);
  const [internalEnd, setInternalEnd] = React.useState(null);
  const rangeStart = startDate !== undefined ? startDate : internalStart;
  const rangeEnd = endDate !== undefined ? endDate : internalEnd;

  // ── Range selection phase ──
  const [rangePhase, setRangePhase] = React.useState('start'); // 'start' | 'end'
  const [hoveredDate, setHoveredDate] = React.useState(null);

  // ── Text input state (panel inputs) ──
  const [singleInputText, setSingleInputText] = React.useState('');
  const [startInputText, setStartInputText] = React.useState('');
  const [endInputText, setEndInputText] = React.useState('');

  // Sync text inputs when values change
  React.useEffect(() => {
    setSingleInputText(selectedDate ? formatSlash(selectedDate) : '');
  }, [selectedDate]);

  React.useEffect(() => {
    setStartInputText(rangeStart ? formatSlash(rangeStart) : '');
  }, [rangeStart]);

  React.useEffect(() => {
    setEndInputText(rangeEnd ? formatSlash(rangeEnd) : '');
  }, [rangeEnd]);

  // ── View month ──
  const refDate = mode === 'single' ? selectedDate : (rangeStart || rangeEnd);
  const initialYear = refDate ? refDate.getFullYear() : today().getFullYear();
  const initialMonth = refDate ? refDate.getMonth() : today().getMonth();
  const [viewYear, setViewYear] = React.useState(initialYear);
  const [viewMonth, setViewMonth] = React.useState(initialMonth);

  // Navigate when external value changes
  React.useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  React.useEffect(() => {
    const ref = rangeStart || rangeEnd;
    if (ref) {
      setViewYear(ref.getFullYear());
      setViewMonth(ref.getMonth());
    }
  }, [rangeStart, rangeEnd]);

  // ── Helpers ──
  const setSelectedDate = (d) => {
    if (value === undefined) setInternalValue(d);
    onChange?.(d);
  };

  const setRange = (s, e) => {
    if (startDate === undefined) setInternalStart(s);
    if (endDate === undefined) setInternalEnd(e);
    onRangeChange?.(s, e);
  };

  const defaultPlaceholder = mode === 'range' ? 'Select date range' : 'Select a date';
  const displayPlaceholder = placeholder ?? defaultPlaceholder;

  // ── Trigger display text ──
  const triggerText = (() => {
    if (mode === 'single') return selectedDate ? formatShort(selectedDate) : null;
    if (rangeStart && rangeEnd) return `${formatShort(rangeStart)} → ${formatShort(rangeEnd)}`;
    if (rangeStart) return formatShort(rangeStart);
    return null;
  })();

  const hasValue = mode === 'single' ? !!selectedDate : !!(rangeStart || rangeEnd);

  const handleClearTrigger = (e) => {
    e.stopPropagation();
    if (mode === 'single') {
      setSelectedDate(null);
    } else {
      setRange(null, null);
      setRangePhase('start');
    }
  };

  // ── Month navigation ──
  const goToPrev = () => {
    const { year, month } = stepMonth(viewYear, viewMonth, -1);
    setViewYear(year);
    setViewMonth(month);
  };

  const goToNext = () => {
    const { year, month } = stepMonth(viewYear, viewMonth, 1);
    setViewYear(year);
    setViewMonth(month);
  };

  // ── Day click ──
  const handleDayClick = (day) => {
    const d = toMidnight(day);
    if (minDate && isBefore(d, minDate)) return;
    if (maxDate && isAfter(d, maxDate)) return;

    if (mode === 'single') {
      setSelectedDate(d);
      setOpen(false);
      return;
    }

    // Range mode
    if (rangePhase === 'start' || !rangeStart) {
      setRange(d, null);
      setRangePhase('end');
      setTimeout(() => endInputRef.current?.focus(), 0);
      return;
    }

    // rangePhase === 'end'
    if (!isBefore(d, rangeStart)) {
      setRange(rangeStart, d);
      setRangePhase('start');
      setHoveredDate(null);
      setOpen(false);
    } else {
      // Clicked before start — reset with new start
      setRange(d, null);
      setRangePhase('end');
      setTimeout(() => endInputRef.current?.focus(), 0);
    }
  };

  // ── Preset selection ──
  const handleSinglePreset = (preset) => {
    const d = preset.resolve();
    setSelectedDate(d);
    setOpen(false);
  };

  const handleRangePreset = (preset) => {
    const [s, e] = preset.resolve();
    setRange(s, e);
    setRangePhase('start');
    setOpen(false);
  };

  // ── Text input commit (shared between blur and Enter) ──
  const commitSingleInput = (text) => {
    const parsed = parseSlash(text);
    if (parsed) {
      setSelectedDate(toMidnight(parsed));
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    } else {
      setSingleInputText(selectedDate ? formatSlash(selectedDate) : '');
    }
  };

  const commitStartInput = (text) => {
    const parsed = parseSlash(text);
    if (parsed) {
      const d = toMidnight(parsed);
      setRange(d, rangeEnd && !isBefore(d, rangeEnd) ? null : rangeEnd);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    } else {
      setStartInputText(rangeStart ? formatSlash(rangeStart) : '');
    }
  };

  const commitEndInput = (text) => {
    const parsed = parseSlash(text);
    if (parsed) {
      const d = toMidnight(parsed);
      if (rangeStart && !isBefore(d, rangeStart)) {
        setRange(rangeStart, d);
      } else {
        setEndInputText(rangeEnd ? formatSlash(rangeEnd) : '');
      }
    } else {
      setEndInputText(rangeEnd ? formatSlash(rangeEnd) : '');
    }
  };

  const handleSingleInputBlur = () => commitSingleInput(singleInputText);
  const handleStartInputBlur = () => commitStartInput(startInputText);
  const handleEndInputBlur = () => commitEndInput(endInputText);

  const handleSingleInputKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commitSingleInput(singleInputText); }
  };
  const handleStartInputKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commitStartInput(startInputText); }
  };
  const handleEndInputKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commitEndInput(endInputText); }
  };

  // ── Day cell class helper ──
  const getDayClasses = (day) => {
    const d = toMidnight(day);
    const isOtherMonth = day.getMonth() !== viewMonth;
    const isToday = isSameDay(d, today());
    const isSelected = mode === 'single' && isSameDay(d, selectedDate);
    const isDisabled =
      (minDate && isBefore(d, toMidnight(minDate))) ||
      (maxDate && isAfter(d, toMidnight(maxDate)));

    const isRangeStart = mode === 'range' && rangeStart && isSameDay(d, rangeStart);
    const isRangeEnd = mode === 'range' && rangeEnd && isSameDay(d, rangeEnd);

    const inRange =
      mode === 'range' &&
      rangeStart &&
      rangeEnd &&
      isAfter(d, rangeStart) &&
      isBefore(d, rangeEnd);

    const isInHoverMode =
      mode === 'range' && rangePhase === 'end' && rangeStart && !rangeEnd && !!hoveredDate;

    // Hover preview: between rangeStart and hoveredDate (when waiting for end)
    const inHoverRange =
      isInHoverMode &&
      isAfter(d, rangeStart) &&
      isBefore(d, hoveredDate);

    // The day the cursor is currently on — acts as prospective range end
    const isHoverEnd = isInHoverMode && isSameDay(d, hoveredDate);

    return [
      'date-picker__day',
      isOtherMonth ? 'date-picker__day--other-month' : '',
      isToday && !isSelected && !isRangeStart && !isRangeEnd ? 'date-picker__day--today' : '',
      isSelected ? 'date-picker__day--selected' : '',
      isDisabled ? 'date-picker__day--disabled' : '',
      isRangeStart ? 'date-picker__day--range-start' : '',
      isRangeEnd ? 'date-picker__day--range-end' : '',
      inRange ? 'date-picker__day--in-range' : '',
      inHoverRange ? 'date-picker__day--range-hover' : '',
      isHoverEnd ? 'date-picker__day--range-hover-end' : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  // ── Is preset active ──
  const isSinglePresetActive = (preset) => {
    if (!selectedDate) return false;
    return isSameDay(selectedDate, preset.resolve());
  };

  const isRangePresetActive = (preset) => {
    if (!rangeStart || !rangeEnd) return false;
    const [s, e] = preset.resolve();
    return isSameDay(rangeStart, s) && isSameDay(rangeEnd, e);
  };

  const calendarDays = getCalendarDays(viewYear, viewMonth);
  const singlePresets = getSinglePresets();
  const rangePresets = getRangePresets();
  const presets = mode === 'single' ? singlePresets : rangePresets;

  const wrapperClass = [
    'date-picker',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const triggerInputClass = [
    'date-picker__trigger-input',
    isOpen ? 'date-picker__trigger-input--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const clearButton = (
    <button
      type="button"
      className="date-picker__trigger-clear"
      onClick={handleClearTrigger}
      aria-label="Clear date"
    >
      <CloseCircle size={16} variant="Bold" color="currentColor" />
    </button>
  );

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      {/* Trigger — uses Input component for visual consistency */}
      <div
        className="date-picker__trigger-wrap"
        onClick={(e) => {
          if (!e.target.closest('.date-picker__trigger-clear') && !disabled) {
            setOpen(!isOpen);
          }
        }}
      >
        <Input
          size={size}
          disabled={disabled}
          value={triggerText || ''}
          placeholder={displayPlaceholder}
          label={label}
          supportiveText={supportiveText}
          leftIcon={
            <Calendar1
              size={size === 'small' ? 16 : 20}
              variant="Linear"
              color="currentColor"
            />
          }
          cta={hasValue ? clearButton : undefined}
          className={triggerInputClass}
          readOnly
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />
      </div>

      {/* Panel */}
      {isVisible && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Date picker"
          className={[
            'date-picker__panel',
            isAnimating ? 'date-picker__panel--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Quick tags (preset pills) — opt-in via withQuickTags */}
          {withQuickTags && (
            <div className="date-picker__presets">
              {presets.map((p) => {
                const isActive =
                  mode === 'single' ? isSinglePresetActive(p) : isRangePresetActive(p);
                return (
                  <Chip
                    key={p.label}
                    type={isActive ? 'brand' : 'neutral'}
                    variant="secondary"
                    size="x-small"
                    onClick={() =>
                      mode === 'single' ? handleSinglePreset(p) : handleRangePreset(p)
                    }
                    style={{ cursor: 'pointer', flexShrink: 0 }}
                  >
                    {p.label}
                  </Chip>
                );
              })}
            </div>
          )}

          {/* Date text input(s) — uses Input component */}
          <div className="date-picker__inputs">
            {mode === 'single' ? (
              <Input
                size="small"
                value={singleInputText}
                placeholder="Month/DD/YYYY"
                onChange={(e) => setSingleInputText(e.target.value)}
                onBlur={handleSingleInputBlur}
                onKeyDown={handleSingleInputKeyDown}
                cta={
                  singleInputText ? (
                    <button
                      type="button"
                      className="date-picker__input-clear"
                      onClick={() => { setSingleInputText(''); setSelectedDate(null); }}
                      aria-label="Clear"
                    >
                      <CloseCircle size={14} variant="Bold" color="currentColor" />
                    </button>
                  ) : undefined
                }
              />
            ) : (
              <>
                <Input
                  size="small"
                  leftIcon={<span className="date-picker__input-dot date-picker__input-dot--start" aria-hidden="true" />}
                  value={startInputText}
                  placeholder="Month/DD/YYYY"
                  onChange={(e) => setStartInputText(e.target.value)}
                  onBlur={handleStartInputBlur}
                  onKeyDown={handleStartInputKeyDown}
                  onFocus={() => setRangePhase('start')}
                  cta={
                    startInputText ? (
                      <button
                        type="button"
                        className="date-picker__input-clear"
                        onClick={() => { setStartInputText(''); setRange(null, rangeEnd); setRangePhase('start'); }}
                        aria-label="Clear start date"
                      >
                        <CloseCircle size={14} variant="Bold" color="currentColor" />
                      </button>
                    ) : undefined
                  }
                />
                <Input
                  ref={endInputRef}
                  size="small"
                  leftIcon={<span className="date-picker__input-dot date-picker__input-dot--end" aria-hidden="true" />}
                  value={endInputText}
                  placeholder="Month/DD/YYYY"
                  onChange={(e) => setEndInputText(e.target.value)}
                  onBlur={handleEndInputBlur}
                  onKeyDown={handleEndInputKeyDown}
                  onFocus={() => setRangePhase('end')}
                  cta={
                    endInputText ? (
                      <button
                        type="button"
                        className="date-picker__input-clear"
                        onClick={() => { setEndInputText(''); setRange(rangeStart, null); setRangePhase('end'); }}
                        aria-label="Clear end date"
                      >
                        <CloseCircle size={14} variant="Bold" color="currentColor" />
                      </button>
                    ) : undefined
                  }
                />
              </>
            )}
          </div>

          {/* Month/year header */}
          <div className="date-picker__month-header">
            <button
              type="button"
              className="date-picker__month-nav"
              onClick={goToPrev}
              aria-label="Previous month"
            >
              <ArrowLeft2 size={14} variant="Linear" color="currentColor" />
            </button>
            <span className="date-picker__month-label">
              {formatMonthYear(viewYear, viewMonth)}
            </span>
            <button
              type="button"
              className="date-picker__month-nav"
              onClick={goToNext}
              aria-label="Next month"
            >
              <ArrowRight2 size={14} variant="Linear" color="currentColor" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="date-picker__weekdays" aria-hidden="true">
            {WEEKDAYS.map((d) => (
              <span key={d} className="date-picker__weekday">
                {d}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="date-picker__grid" role="grid" aria-label={formatMonthYear(viewYear, viewMonth)}>
            {calendarDays.map((day, idx) => {
              const isDisabled =
                (minDate && isBefore(toMidnight(day), toMidnight(minDate))) ||
                (maxDate && isAfter(toMidnight(day), toMidnight(maxDate)));

              return (
                <button
                  key={idx}
                  type="button"
                  role="gridcell"
                  className={getDayClasses(day)}
                  onClick={() => !isDisabled && handleDayClick(day)}
                  onMouseEnter={() => {
                    if (mode === 'range' && rangePhase === 'end' && rangeStart && !rangeEnd) {
                      setHoveredDate(toMidnight(day));
                    }
                  }}
                  onMouseLeave={() => {
                    if (mode === 'range') setHoveredDate(null);
                  }}
                  aria-label={formatLong(day)}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
