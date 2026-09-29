import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Create Metallic Dumbbell Group
    const dumbbellGroup = new THREE.Group();

    // Metallic material
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.92,
      roughness: 0.22,
    });

    // Neon accent material
    const neonMaterial = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      emissive: 0xccff00,
      emissiveIntensity: 0.6,
      metalness: 0.4,
      roughness: 0.1,
    });

    // Handle bar
    const handleGeo = new THREE.CylinderGeometry(0.14, 0.14, 4.2, 32);
    const handleMesh = new THREE.Mesh(handleGeo, metalMaterial);
    handleMesh.rotation.z = Math.PI / 2;
    dumbbellGroup.add(handleMesh);

    // Helper to create weight plates
    const createPlate = (xOffset: number, radius: number, thickness: number) => {
      const plateGeo = new THREE.CylinderGeometry(radius, radius, thickness, 32);
      const plate = new THREE.Mesh(plateGeo, metalMaterial);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = xOffset;
      dumbbellGroup.add(plate);

      // Neon Ring Accent
      const ringGeo = new THREE.TorusGeometry(radius + 0.02, 0.03, 16, 32);
      const ring = new THREE.Mesh(ringGeo, neonMaterial);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = xOffset;
      dumbbellGroup.add(ring);
    };

    createPlate(-1.6, 1.25, 0.3);
    createPlate(-1.2, 1.05, 0.3);
    createPlate(1.2, 1.05, 0.3);
    createPlate(1.6, 1.25, 0.3);

    scene.add(dumbbellGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xccff00, 2.2);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-6, -6, -4);
    scene.add(dirLight2);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      dumbbellGroup.rotation.y += 0.007;
      dumbbellGroup.rotation.x += (mouseY * 0.4 - dumbbellGroup.rotation.x) * 0.05;
      dumbbellGroup.rotation.z += (mouseX * 0.4 - dumbbellGroup.rotation.z) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full pointer-events-none" />;
};
