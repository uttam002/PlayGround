// use-navigation.ts
// Public API for navigation — UI and features call this, not the store directly

import { useCallback } from 'react';
import { useNavigationStore } from '@/store/navigation.store';
import { useCameraStore } from '@/store/camera.store';

export function useNavigation() {
  const selectedIslandId = useNavigationStore((s) => s.selectedIslandId);
  const hoveredIslandId = useNavigationStore((s) => s.hoveredIslandId);
  const routes = useNavigationStore((s) => s.routes);
  const selectIsland = useNavigationStore((s) => s.selectIsland);
  const hoverIsland = useNavigationStore((s) => s.hoverIsland);
  const clearSelection = useNavigationStore((s) => s.clearSelection);

  const setCameraMode = useCameraStore((s) => s.setCameraMode);

  // Select island and transition camera to focus mode
  const navigateToIsland = useCallback(
    (islandId: string) => {
      selectIsland(islandId);
      setCameraMode('focus'); // Camera system reads this and transitions
    },
    [selectIsland, setCameraMode]
  );

  // Return to world map
  const returnToWorldMap = useCallback(() => {
    clearSelection();
    setCameraMode('exploration'); // Return back to overhead explore mode
  }, [clearSelection, setCameraMode]);

  return {
    selectedIslandId,
    hoveredIslandId,
    routes,
    navigateToIsland,
    returnToWorldMap,
    hoverIsland,
    clearSelection,
  };
}
