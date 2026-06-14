import { WorldScene } from '@/features/world/world-scene';
import { UiOverlay } from '@/features/ui-overlay';

export default function PortfolioPage() {
  return (
    <main style={{ overflow: 'hidden', width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Visual Layer */}
      <WorldScene />

      {/* HTML Interactive overlay layer */}
      <UiOverlay />
    </main>
  );
}

