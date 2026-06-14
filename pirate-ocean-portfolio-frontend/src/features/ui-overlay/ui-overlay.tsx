// src/features/ui-overlay/ui-overlay.tsx
'use client';

import { WorldOverlay } from '@/components/layout/world-overlay';
import { WorldLogo } from '@/components/common/world-logo';
import { OverlayControls } from '@/components/common/overlay-controls';
import { IslandInfoPanel } from './island-info-panel';

export function UiOverlay() {
  return (
    <WorldOverlay>
      {/* Top bar: Logo (left) + Controls (right) */}
      <div
        id="overlay-top-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <WorldLogo />
        <OverlayControls
          onMenuClick={() => {
            // Phase 2: open navigation menu
            console.log('Menu clicked — Phase 2 feature');
          }}
          onResumeClick={() => {
            // Phase 2: download resume
            console.log('Resume clicked — Phase 2 feature');
          }}
        />
      </div>

      {/* Spacer — fills remaining height so panel anchors to bottom */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Island selection panel */}
        <IslandInfoPanel />
      </div>
    </WorldOverlay>
  );
}
