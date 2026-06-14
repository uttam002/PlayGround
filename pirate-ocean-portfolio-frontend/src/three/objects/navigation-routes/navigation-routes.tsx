'use client';

import { useNavigationStore } from '@/store/navigation.store';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';
import { NavigationRouteLine } from './navigation-route-line';

export function NavigationRoutes() {
  const routes = useNavigationStore((s) => s.routes);

  return (
    <group name="navigation-routes">
      {routes.map((route) => {
        const targetIsland = ISLAND_DEFINITIONS.find((island) => island.id === route.toId);
        if (!targetIsland) return null;

        return (
          <NavigationRouteLine
            key={route.id}
            route={route}
            targetIsland={targetIsland}
          />
        );
      })}
    </group>
  );
}
