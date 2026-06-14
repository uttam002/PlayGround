'use client';

import { useCamera } from '@/hooks/use-camera';
import { AppConfig } from '@/config/app.config';

export function CameraDebugPanel() {
  if (!AppConfig.isDevelopment) return null;

  const { mode, isTransitioning, enterCinematic, enterExploration } = useCamera();

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        background: 'rgba(5, 5, 15, 0.85)',
        border: '1px solid rgba(200, 216, 232, 0.2)',
        color: '#c8d8e8',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ borderBottom: '1px solid rgba(200, 216, 232, 0.1)', paddingBottom: '8px', fontWeight: 'bold' }}>
        🎥 CAMERA SYSTEM DEBUG
      </div>
      <div>
        Mode: <strong style={{ color: '#00ffd2' }}>{mode}</strong>
      </div>
      <div>
        Status:{' '}
        <span style={{ color: isTransitioning ? '#ffaa00' : '#00ff66' }}>
          {isTransitioning ? 'Transitioning...' : 'Idle'}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={enterCinematic}
          disabled={isTransitioning || mode === 'cinematic'}
          style={{
            background: mode === 'cinematic' ? 'rgba(200, 216, 232, 0.1)' : '#1a2b4c',
            color: mode === 'cinematic' ? 'rgba(200, 216, 232, 0.4)' : '#c8d8e8',
            border: '1px solid rgba(200, 216, 232, 0.3)',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isTransitioning || mode === 'cinematic' ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
        >
          → Cinematic Mode
        </button>
        <button
          onClick={enterExploration}
          disabled={isTransitioning || mode === 'exploration'}
          style={{
            background: mode === 'exploration' ? 'rgba(200, 216, 232, 0.1)' : '#1a2b4c',
            color: mode === 'exploration' ? 'rgba(200, 216, 232, 0.4)' : '#c8d8e8',
            border: '1px solid rgba(200, 216, 232, 0.3)',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: isTransitioning || mode === 'exploration' ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
        >
          → Exploration Mode
        </button>
      </div>
    </div>
  );
}
