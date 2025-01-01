import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const HomeSection = () => {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(25); // Default scale

    useEffect(() => {
        // Function to update scale based on window size
        const updateScale = () => {
            if (window.innerWidth < 480) {
                setScale(15); // Small screens (mobile)
            } else if (window.innerWidth < 768) {
                setScale(20); // Medium screens (tablet)
            } else {
                setScale(25); // Larger screens (desktop)
            }
        };

        // Call the function initially and on resize
        updateScale();
        window.addEventListener('resize', updateScale);

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true }); // Transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Load the 3D model (GLTF)
        const loader = new GLTFLoader();
        let mixer, model;

        loader.load(
            '/earth/scene.gltf', // Path to your model in the public folder
            (gltf) => {
                console.log('Model loaded:', gltf);
                model = gltf.scene;
                scene.add(model);
                model.position.set(0, -2, 0);

                // Initial scale
                model.scale.set(scale, scale, scale);

                // Check if the model has animations and set up the AnimationMixer
                mixer = new THREE.AnimationMixer(model);
                if (gltf.animations.length > 0) {
                    mixer.clipAction(gltf.animations[0]).play();
                }

                // Set up the camera position
                camera.position.z = 13;

                // Set up OrbitControls for interaction
                const controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = false; // Disable zoom

                // Restrict rotation to horizontal axis (only allow horizontal rotation)
                controls.maxPolarAngle = Math.PI / 2; // Restrict to horizontal rotation
                controls.minPolarAngle = Math.PI / 2; // Same as maxPolarAngle to restrict up/down movement

                // Animation loop to update the model rotation and animations
                const animate = () => {
                    requestAnimationFrame(animate);

                    if (mixer) mixer.update(0.0005);

                    // Slight floating effect: Oscillate the Earth up and down
                    const time = Date.now() * 0.002;
                    model.position.y = Math.sin(time) * 0.1 - 2; // Adjust floating amplitude

                    renderer.render(scene, camera);
                };
                animate();
            },
            undefined,
            (error) => {
                console.error('Error loading the 3D model:', error);
            }
        );

        // Set up lighting
        const light = new THREE.AmbientLight(0x404040, 3); // brighter light
        scene.add(light);

        // Add a directional light for more brightness
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);


        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [scale]); // Re-run the effect when scale changes

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black"> {/* Set the div background to black */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
};

export default HomeSection;
