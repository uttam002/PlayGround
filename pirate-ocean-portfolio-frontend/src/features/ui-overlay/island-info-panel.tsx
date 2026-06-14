// src/features/ui-overlay/island-info-panel.tsx
'use client';

import { useNavigation } from '@/hooks/use-navigation';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';

export function IslandInfoPanel() {
  const { selectedIslandId, returnToWorldMap } = useNavigation();

  const selectedIsland = ISLAND_DEFINITIONS.find(
    (island) => island.id === selectedIslandId
  );

  if (!selectedIsland) return null;

  return (
    <div
      id="island-info-panel"
      style={{
        pointerEvents: 'auto',
        position: 'absolute',
        bottom: 'var(--space-8)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--surface-dark)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6) var(--space-8)',
        backdropFilter: 'blur(12px)',
        minWidth: '280px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Island label */}
      <p
        className="text-label"
        style={{
          color: 'var(--gold-muted)',
          marginBottom: 'var(--space-1)',
        }}
      >
        Destination
      </p>

      {/* Island name */}
      <h2
        className="font-display"
        style={{
          fontSize: 'var(--text-xl)',
          color: 'var(--gold-primary)',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-4)',
        }}
      >
        {selectedIsland.label}
      </h2>

      {/* Island type badge */}
      <span
        style={{
          display: 'inline-block',
          background: 'var(--ocean-primary)',
          color: 'var(--ocean-highlight)',
          padding: 'var(--space-1) var(--space-3)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-4)',
        }}
      >
        {selectedIsland.type}
      </span>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          marginTop: 'var(--space-2)',
        }}
      >
        <button
          id="btn-explore-island"
          style={{
            background: 'var(--gold-primary)',
            color: '#050510',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-6)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
          aria-label={`Explore ${selectedIsland.label}`}
        >
          Explore Island
        </button>
        <button
          id="btn-close-panel"
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
          onClick={returnToWorldMap}
          aria-label="Close island panel"
        >
          Close
        </button>
      </div>
    </div>
  );
}
