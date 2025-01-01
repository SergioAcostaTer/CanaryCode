import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Earth } from '../../Scenes/Earth';

const HomeSection = () => {
    const [scale, setScale] = useState(30);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 480) {
                setScale(20);
            } else if (window.innerWidth < 768) {
                setScale(25);
            } else {
                setScale(28);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <Canvas
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                camera={{ fov: 75, position: [0, 0, 15] }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Earth scale={[scale, scale, scale]} position={[0, -3, 0]} />
                <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.25}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
};

export default HomeSection;
