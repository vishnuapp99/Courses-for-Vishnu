import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './EnergyVisualization.css';

const EnergyVisualization = ({ energyLevel }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Energy level colors
    const energyColors = {
      high: { color: 0xff6b6b, intensity: 2 },
      medium: { color: 0x4ecdc4, intensity: 1.5 },
      low: { color: 0x95a5a6, intensity: 1 }
    };

    const currentEnergy = energyColors[energyLevel] || energyColors.medium;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: currentEnergy.color,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create energy orb
    const orbGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: currentEnergy.color,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Add light
    const light = new THREE.PointLight(currentEnergy.color, currentEnergy.intensity, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Animation
    const clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      time = clock.getElapsedTime();

      // Rotate particles
      particlesMesh.rotation.y = time * 0.2;
      particlesMesh.rotation.x = time * 0.1;

      // Animate orb
      orb.rotation.x = time * 0.5;
      orb.rotation.y = time * 0.3;
      orb.scale.setScalar(1 + Math.sin(time) * 0.2);

      // Animate particles position
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Pulse light
      light.intensity = currentEnergy.intensity + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      renderer.dispose();
    };
  }, [energyLevel]);

  return (
    <div className="visualization-container animate__animated animate__fadeIn">
      <div className="text-center mb-3">
        <h3 className="text-white fw-bold">
          <i className="fas fa-cube me-2"></i>
          Energy Flow Visualization
        </h3>
        <p className="text-white-50">
          Watch your energy flow in real-time
        </p>
      </div>
      <div 
        ref={mountRef} 
        className="three-container"
        style={{ 
          width: '100%', 
          height: '400px',
          borderRadius: '15px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default EnergyVisualization;

