import React from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Earth(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('/scenes/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = Math.sin(Date.now() / 1000) * 0.2 - 3;
    }
  });

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="RootNode" scale={0.002}>
          <group name="Earth" rotation={[-Math.PI / 2, 0, 0]} scale={57.393} position={[0, 0, 0]}>
            <mesh name="Earth_Earth_0" geometry={nodes.Earth_Earth_0.geometry} material={materials.Earth} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/scenes/scene-transformed.glb');
