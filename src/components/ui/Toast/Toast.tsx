import React, { useEffect, useRef, useState } from 'react';
import { TickCircle, Warning2, CloseCircle, InfoCircle } from 'iconsax-react';
import { CloseIcon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button/Button';
import '../Button/Button.css';
import './Toast.css';

export type ToastType = 'neutral' | 'positive' | 'warning' | 'negative';

export interface ToastProps {
  /** Semantic type / color */
  type?: ToastType;
  /** Toast title */
  title: string;
  /** Optional body text */
  body?: string;
  /** Show the dismiss × button */
  dismissable?: boolean;
  /** Called when dismissed (after exit animation completes) */
  onDismiss?: () => void;
  /** Primary action button label */
  primaryAction?: string;
  /** Called on primary action click */
  onPrimaryAction?: () => void;
  /** Secondary action button label */
  secondaryAction?: string;
  /** Called on secondary action click */
  onSecondaryAction?: () => void;
  /**
   * Auto-dismiss delay in ms. Defaults to 4000.
   * Pass 0 or Infinity to disable auto-dismiss entirely.
   */
  duration?: number;
  className?: string;
}

/** Filled iconsax icons for each toast type */
const TypeIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  switch (type) {
    case 'positive':
      return <TickCircle size={24} variant="Bold" color="#159201" />;
    case 'warning':
      return <Warning2 size={24} variant="Bold" color="#E07900" />;
    case 'negative':
      return <CloseCircle size={24} variant="Bold" color="#FF4646" />;
    case 'neutral':
    default:
      return <InfoCircle size={24} variant="Bold" color="#071331" />;
  }
};

export const Toast: React.FC<ToastProps> = ({
  type = 'neutral',
  title,
  body,
  dismissable = true,
  onDismiss,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  duration = 4000,
  className,
}) => {
  // Animation phases: entering → visible (spring in) → exiting (slide down + fade out)
  const [phase, setPhase] = useState<'entering' | 'visible' | 'exiting'>('entering');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasActions = primaryAction || secondaryAction;

  /** Kick off the exit animation then invoke onDismiss once it finishes */
  const triggerDismiss = React.useCallback(() => {
    if (phase === 'exiting') return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('exiting');
    timerRef.current = setTimeout(() => onDismiss?.(), 400);
  }, [phase, onDismiss]);

  // Advance from 'entering' → 'visible' on the next paint so the enter transition fires
  useEffect(() => {
    const t = requestAnimationFrame(() => setPhase('visible'));
    return () => cancelAnimationFrame(t);
  }, []);

  // Auto-dismiss after `duration` ms
  useEffect(() => {
    if (!duration || duration === Infinity) return;
    timerRef.current = setTimeout(triggerDismiss, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount only

  const classes = [
    'toast',
    `toast--${type}`,
    `toast--${phase}`,
    !body ? 'toast--no-body' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert" aria-live="assertive">
      <div className="toast__main">
        <div className="toast__content">
          <span className="toast__type-icon" aria-hidden="true">
            <TypeIcon type={type} />
          </span>
          <div className="toast__text">
            <p className="toast__title">{title}</p>
            {body && <p className="toast__body">{body}</p>}
          </div>
        </div>
        {dismissable && (
          <button
            type="button"
            className="toast__dismiss"
            onClick={triggerDismiss}
            aria-label="Dismiss"
          >
            <CloseIcon size={20} color="currentColor" />
          </button>
        )}
      </div>
      {hasActions && (
        <div className="toast__actions">
          {secondaryAction && (
            <Button
              level="secondary"
              size="small"
              className="toast__btn"
              onClick={onSecondaryAction}
            >
              {secondaryAction}
            </Button>
          )}
          {primaryAction && (
            <Button
              level="primary"
              size="small"
              className="toast__btn"
              onClick={onPrimaryAction}
            >
              {primaryAction}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Toast.displayName = 'Toast';

// ─── ToastContainer ───────────────────────────────────────────────────────────
/**
 * Fixed bottom-center container for toasts.
 * Wrap all <Toast> instances in this so they always enter/exit from the bottom centre.
 *
 * @example
 * <ToastContainer>
 *   {visible && <Toast type="positive" title="Saved!" onDismiss={() => setVisible(false)} />}
 * </ToastContainer>
 */
export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="toast-container" aria-label="Notifications">
    {children}
  </div>
);

ToastContainer.displayName = 'ToastContainer';
