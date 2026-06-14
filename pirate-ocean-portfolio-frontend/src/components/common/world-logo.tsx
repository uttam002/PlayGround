// src/components/common/world-logo.tsx
'use client';

export function WorldLogo() {
  return (
    <div
      id="world-logo"
      style={{
        pointerEvents: 'auto', // Re-enable pointer events for this element
        padding: 'var(--space-6)',
      }}
    >
      <h1
        className="font-display"
        style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--gold-primary)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px rgba(212, 160, 23, 0.3)',
          lineHeight: 1,
        }}
      >
        The Developer's Voyage
      </h1>
      <p
        className="text-label"
        style={{
          marginTop: 'var(--space-1)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.15em',
        }}
      >
        A Portfolio Experience
      </p>
    </div>
  );
}
