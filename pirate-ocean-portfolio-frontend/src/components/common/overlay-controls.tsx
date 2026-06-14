// src/components/common/overlay-controls.tsx
'use client';

type OverlayControlsProps = {
  onMenuClick?: () => void;
  onResumeClick?: () => void;
};

const BUTTON_STYLE: React.CSSProperties = {
  pointerEvents: 'auto',
  background: 'var(--surface-glass)',
  border: '1px solid var(--surface-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-accent)',
  padding: 'var(--space-2) var(--space-4)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  letterSpacing: '0.05em',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
  transition: 'background var(--transition-fast), border-color var(--transition-fast)',
};

export function OverlayControls({ onMenuClick, onResumeClick }: OverlayControlsProps) {
  return (
    <div
      id="overlay-controls"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-6)',
      }}
    >
      <button
        id="btn-resume"
        style={BUTTON_STYLE}
        onClick={onResumeClick}
        aria-label="Download resume"
      >
        Resume
      </button>
      <button
        id="btn-menu"
        style={BUTTON_STYLE}
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        ☰ Menu
      </button>
    </div>
  );
}
