// src/components/layout/world-overlay.tsx
// The HTML layer above Three.js. Pointer events disabled by default — enable per element.

import type { ReactNode } from 'react';

type WorldOverlayProps = {
  children: ReactNode;
};

export function WorldOverlay({ children }: WorldOverlayProps) {
  return (
    <div
      id="world-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overlay)' as any,
        pointerEvents: 'none', // Pass mouse events to Three.js by default
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
