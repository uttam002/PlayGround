'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import type { NavigationRoute } from '@/types/navigation.types';
import type { IslandDefinition } from '@/types/island.types';
import { NAVIGATION_ROUTE, SHIP_HUB } from '@/constants/navigation.constants';

type NavigationRouteLineProps = {
  route: NavigationRoute;
  targetIsland: IslandDefinition;
};

export function NavigationRouteLine({ route, targetIsland }: NavigationRouteLineProps) {
  // Compute line start and end coordinates
  const points = useMemo(() => {
    return [
      new THREE.Vector3(SHIP_HUB.POSITION.x, 0.2, SHIP_HUB.POSITION.z),
      new THREE.Vector3(targetIsland.position.x, 0.2, targetIsland.position.z),
    ];
  }, [targetIsland.position]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  // Determine colors based on active selection or hovers
  const lineColor = route.isActive
    ? NAVIGATION_ROUTE.COLOR_ACTIVE
    : route.isHighlighted
    ? NAVIGATION_ROUTE.COLOR_HOVER
    : NAVIGATION_ROUTE.COLOR_DEFAULT;

  const lineOpacity = route.isActive
    ? NAVIGATION_ROUTE.OPACITY_ACTIVE
    : route.isHighlighted
    ? NAVIGATION_ROUTE.OPACITY_HOVER
    : NAVIGATION_ROUTE.OPACITY_DEFAULT;

  // Build THREE.Line object cleanly inside useMemo to avoid TS JSX typing conflicts with SVG <line>
  const lineObject = useMemo(() => {
    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: lineOpacity,
      dashSize: NAVIGATION_ROUTE.DASH_SIZE,
      gapSize: NAVIGATION_ROUTE.GAP_SIZE,
      depthWrite: false,
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    return line;
  }, [geometry, lineColor, lineOpacity]);

  return <primitive object={lineObject} />;
}
