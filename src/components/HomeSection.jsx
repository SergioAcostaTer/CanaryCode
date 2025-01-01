import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Earth } from '../scenes/Earth';
import { BlurText } from './BlurText';
import * as THREE from 'three';


const HomeSection = () => {
    const [scale, setScale] = useState(37);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 480) {
                setScale(37);
            } else if (window.innerWidth < 768) {
                setScale(42);
            } else {
                setScale(46);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">

            <div className="absolute bottom-[calc(50vh+7vh)] w-full h-[calc(43vh-100px)] flex flex-col justify-center px-4">
                <BlurText text="Canary Code" className="text-5xl text-white text-center font-bold" tag='h1' delay={0} />
            </div>
            <Canvas
                style={{ position: 'absolute', bottom: "7vh", left: 0, width: '100%', height: '50vh', backgroundColor: 'transparent' }}
                camera={{ fov: 75, position: [0, 0, 15] }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <Earth scale={[scale, scale, scale]} />
                {/* <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.25}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enablePan={false}
                /> */}
            </Canvas>

        </div>
    );
};

export default HomeSection;
