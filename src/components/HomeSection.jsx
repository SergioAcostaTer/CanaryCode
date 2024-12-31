import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HomeSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x111111, 0); // Setting alpha to 0 for full transparency

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        const geometry = new THREE.SphereGeometry(1, 256, 256);
        const texture = new THREE.TextureLoader().load('/earth.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);

        const SCALE = 2;
        sphere.scale.set(SCALE, SCALE, SCALE);
        sphere.position.set(0, -0.5, 0);
        scene.add(sphere);

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div className="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="text-center z-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">About Us</h1>
                    <p className="text-lg sm:text-xl text-white mt-4 max-w-3xl mx-auto">
                        We are a software company based in the Canary Islands, focused on providing innovative and customized software solutions.
                    </p>
                </div>
            </div>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
};

export default HomeSection;
