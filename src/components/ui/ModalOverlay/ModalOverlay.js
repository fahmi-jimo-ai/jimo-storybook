import React, { useEffect, useState, useCallback, useContext, createContext } from 'react';
import './ModalOverlay.css';

/** Duration (ms) of the exit animation — must match CSS transition. */
const EXIT_DURATION = 200;

/**
 * Context that provides the animated close function to any descendant.
 * Use the useModalClose() hook to consume it.
 */
const ModalOverlayContext = createContext(null);

/**
 * Returns the animated close function from the nearest ModalOverlay ancestor.
 * Call this inside any modal content component to ensure the fade-out plays
 * before the overlay unmounts.
 *
 * @example
 * const handleClose = useModalClose();
 * <Button onClick={handleClose}>Cancel</Button>
 */
export const useModalClose = () => useContext(ModalOverlayContext);

/**
 * Full-page backdrop for modals.
 * Fades in on mount and fades out before calling onClose.
 * Exposes the animated close function via useModalClose() to all descendants.
 *
 * @example
 * {open && (
 *   <ModalOverlay onClose={() => setOpen(false)}>
 *     <MyModal />
 *   </ModalOverlay>
 * )}
 */
export const ModalOverlay = ({ onClose, children, className }) => {
  const [phase, setPhase] = useState('entering');

  // Advance entering → visible on the next paint so the enter transition fires
  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase('visible'));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = useCallback(() => {
    if (phase === 'exiting') return;
    setPhase('exiting');
    setTimeout(() => onClose?.(), EXIT_DURATION);
  }, [phase, onClose]);

  const classes = [
    'modal-overlay',
    `modal-overlay--${phase}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ModalOverlayContext.Provider value={handleClose}>
      <div className={classes} onClick={handleClose}>
        {children}
      </div>
    </ModalOverlayContext.Provider>
  );
};

ModalOverlay.displayName = 'ModalOverlay';
