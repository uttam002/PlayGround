'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useWorldStore } from '@/store/world.store';

// Dynamic import prevents Next.js from attempting SSR on WebGL canvas
const WorldCanvas = dynamic(
  () => import('@/three/core/world-canvas').then((mod) => mod.WorldCanvas),
  {
    ssr: false,
    loading: () => <WorldLoadingFallback />,
  }
);

function WorldLoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c8d8e8',
        fontFamily: 'var(--font-cinzel)',
      }}
    >
      Setting sail...
    </div>
  );
}

export function WorldScene() {
  const setWorldLoaded = useWorldStore((s) => s.setWorldLoaded);

  useEffect(() => {
    setWorldLoaded(true);
  }, [setWorldLoaded]);

  return <WorldCanvas />;
}
