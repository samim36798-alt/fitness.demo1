import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Plate3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.parentElement?.clientWidth || 400;
    const height = canvas.parentElement?.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Bumper Plate
    const plateGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.28, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x12141a,
      metalness: 0.85,
      roughness: 0.25,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.rotation.x = Math.PI / 2.8;

    // Inner Chrome Hub
    const hubGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 32);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.95,
      roughness: 0.1,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    plateMesh.add(hubMesh);

    // Center Bore Hole ring
    const ringGeo = new THREE.TorusGeometry(1.72, 0.04, 16, 64);
    const neonMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      emissive: 0xccff00,
      emissiveIntensity: 0.8,
    });
    const neonRing = new THREE.Mesh(ringGeo, neonMat);
    plateMesh.add(neonRing);

    scene.add(plateMesh);

    // Lights
    const neonLight = new THREE.PointLight(0xccff00, 3.5, 12);
    neonLight.position.set(2, 3, 3);
    scene.add(neonLight);

    const whiteLight = new THREE.DirectionalLight(0xffffff, 1.2);
    whiteLight.position.set(-3, -2, 4);
    scene.add(whiteLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = Math.PI / 2.8;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.015;
      targetRotX += deltaY * 0.015;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isDragging) {
        targetRotY += 0.008;
      }
      plateMesh.rotation.y += (targetRotY - plateMesh.rotation.y) * 0.1;
      plateMesh.rotation.x += (targetRotX - plateMesh.rotation.x) * 0.1;
      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
