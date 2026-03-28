import React, { useState } from 'react';
import { ModalOverlay, useModalClose } from '../../../src/components/ui/ModalOverlay/ModalOverlay';
import '../../../src/components/ui/ModalOverlay/ModalOverlay.css';

const meta = {
  title: 'Atoms/ModalOverlay',
  component: ModalOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ── Shared mock modal shell ──────────────────────────────────────────────────
// Mimics a real modal card. Uses useModalClose() so the "Close" button
// triggers the fade-out — same pattern every future Modal component will use.

function MockModal({ title, body }) {
  const handleClose = useModalClose();
  return (
    <div
      style={{
        background: 'var(--color-bg-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        boxShadow: 'var(--shadow-xl)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p style={{ font: 'var(--text-heading-5)', color: 'var(--color-text-primary)', margin: 0 }}>
        {title}
      </p>
      <p style={{ font: 'var(--text-body-3)', color: 'var(--color-text-secondary)', margin: 0 }}>
        {body}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
        <button
          type="button"
          onClick={handleClose}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            font: 'var(--text-body-3)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-default)',
            background: 'var(--color-bg-default)',
            color: 'var(--color-text-primary)',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ── Demo wrapper ─────────────────────────────────────────────────────────────

function OverlayDemo({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 'var(--space-8)', minHeight: '300px' }}>
      <button
        type="button"
        style={{
          padding: 'var(--space-2) var(--space-4)',
          font: 'var(--text-body-3)',
          cursor: 'pointer',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-bg-default)',
        }}
        onClick={() => setOpen(true)}
      >
        Open overlay
      </button>

      {open && (
        <ModalOverlay onClose={() => setOpen(false)}>
          <MockModal title={title} body={body} />
        </ModalOverlay>
      )}
    </div>
  );
}

// ── Stories ──────────────────────────────────────────────────────────────────

// Default: demonstrates both close paths
// — backdrop click triggers fade-out via ModalOverlay's own handler
// — "Close" button inside MockModal triggers fade-out via useModalClose()
export const Default = {
  render: () => (
    <OverlayDemo
      title="Modal title"
      body='Close via the "Close" button (useModalClose) or by clicking the backdrop.'
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Playground = {
  render: () => (
    <OverlayDemo
      title="Playground"
      body="Both the backdrop and the Close button animate the overlay out before unmounting."
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};
