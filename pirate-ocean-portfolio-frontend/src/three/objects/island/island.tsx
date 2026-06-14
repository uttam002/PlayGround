'use client';

import { useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import type * as THREE from 'three';
import { IslandBase } from './island-base';
import { PalmTree } from '@/three/objects/environment-props/palm-tree';
import { useNavigation } from '@/hooks/use-navigation';
import {
  ISLAND_GEOMETRY,
  ISLAND_INTERACTION,
} from '@/constants/island.constants';
import type { IslandProps } from './island.types';

export function Island({ definition }: IslandProps) {
  const { position, id } = definition;
  const groupRef = useRef<THREE.Group>(null);

  // Read selection and actions from the navigation hook
  const { selectedIslandId, hoveredIslandId, hoverIsland, navigateToIsland } = useNavigation();

  const isSelected = selectedIslandId === id;
  const isHovered = hoveredIslandId === id;

  // Hover in: stop propagation, update store, set cursor
  function handlePointerEnter(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    hoverIsland(id);
    document.body.style.cursor = 'pointer';
  }

  // Hover out: update store, reset cursor
  function handlePointerLeave(event: ThreeEvent<PointerEvent>) {
    hoverIsland(null);
    document.body.style.cursor = 'default';
  }

  // Click: stop propagation, select island, trigger camera shift
  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    navigateToIsland(id);
  }

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y + ISLAND_GEOMETRY.POSITION_Y, position.z]}
      name={`island-${id}`}
      scale={isSelected ? ISLAND_INTERACTION.SELECTED_SCALE : 1}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* Base terrain base mesh passing down hover status */}
      <IslandBase isHovered={isHovered} />

      {/* Palm trees decorations */}
      {ISLAND_GEOMETRY.TREE_POSITIONS.map((treePos: [number, number, number], index: number) => (
        <PalmTree
          key={`${id}-tree-${index}`}
          position={treePos}
          rotation={(index * Math.PI) / 3}
        />
      ))}
    </group>
  );
}
