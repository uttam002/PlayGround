// navigation.types.ts
// Defines how the user moves through the world

export type NavigationRoute = {
  id: string;
  fromId: string;
  toId: string;
  isActive: boolean;
  isHighlighted: boolean;
};

export type NavigationState = {
  selectedIslandId: string | null;
  hoveredIslandId: string | null;
  routes: NavigationRoute[];
};

export type IslandSelectEvent = {
  islandId: string;
  timestamp: number;
};
