"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, Box } from 'lucide-react';

type ModelViewerProps = {
  modelUrls: string[];
  className?: string;
  onLoaded?: () => void;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls, className, onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!modelUrls || modelUrls.length === 0) {
      setIsLoading(false);
      setError(null);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    setIsLoading(true);
    setError(null);
    
    // Clear previous canvas if any
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87ceeb);
      scene.fog = new THREE.Fog(0x87ceeb, 10, 50);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      currentMount.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 512;
      directionalLight.shadow.mapSize.height = 512;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Ground plane
      const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(100, 100),
          new THREE.ShadowMaterial({ opacity: 0.3 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      // Model Loader
      const loader = new GLTFLoader();
      
      // Add DRACOLoader
      // Make sure to have the draco decoder files in your public/draco folder
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // Use a CDN for the decoder
      loader.setDRACOLoader(dracoLoader);

      const allModels = new THREE.Group();
      let modelsLoaded = 0;

      if(modelUrls.length === 0) {
        setIsLoading(false);
        return;
      }

      modelUrls.forEach((url, i) => {
          loader.load(
            url,
            (gltf) => {
              const model = gltf.scene;
              model.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                  node.castShadow = true;
                }
              });

              // If this is the first model (grass), scale it up and center it
              if (i === 0) {
                model.scale.set(15, 15, 15); // Enlarge the grass to cover the full screen
                model.position.set(0, 0, 0); // Center the grass
              } else if (i === 1) {
                // Enlarge the house and place it just on the grass
                model.scale.set(2.5, 2.5, 2.5); // Enlarge the house
                model.position.set(0, 1, 0); // Lower the house to sit just on the grass
              }

              allModels.add(model);
              modelsLoaded++;

              if (modelsLoaded === modelUrls.length) {
                  scene.add(allModels);
                  // Center and scale model group
                  const box = new THREE.Box3().setFromObject(allModels);
                  const size = box.getSize(new THREE.Vector3());
                  const center = box.getCenter(new THREE.Vector3());
                  allModels.position.sub(center);

                  const maxDim = Math.max(size.x, size.y, size.z);
                  const fov = camera.fov * (Math.PI / 180);
                  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                  cameraZ *= 0.45; // Zoom in more so grass fills the segment
                  camera.position.set(0, cameraZ / 2, cameraZ);
                  controls.target.set(0, 0, 0);

                  controls.update();

                  // Adjust ground plane position
                  ground.position.y = box.min.y - center.y;

                  setIsLoading(false);
                  if (onLoaded) onLoaded();
              }
            },
            undefined,
            (error) => {
              console.error(`An error happened while loading the model: ${url}`, error);
              setError(`Failed to load model: ${url}. Check URL and CORS policy.`);
              setIsLoading(false);
            }
          );
      });

      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if(currentMount) {
          camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (currentMount && renderer.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        controls.dispose();
      };
    } catch(err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  }, [modelUrls]);

  return (
    <div
      className={cn("relative w-full h-full border-2 border-dashed rounded-lg overflow-hidden bg-muted/40 shadow-inner", className)}
    >
      <div ref={mountRef} className="w-full h-full outline-none"></div>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading model...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <p className="mt-4 text-lg text-destructive">{error}</p>
        </div>
      )}
      {(!modelUrls || modelUrls.length === 0) && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity">
          <Box className="h-24 w-24 text-muted-foreground/20" />
          <p className="mt-4 text-xl text-muted-foreground">Enter a model URL to view</p>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
