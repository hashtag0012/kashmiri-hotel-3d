"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, Box } from 'lucide-react';

// More aggressive device performance detection, moved outside component
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  // considers low core count, smaller screens (tablets/phones), and mobile user agents
  return (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    window.innerWidth < 1024 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

type ModelViewerProps = {
  modelUrls: string[];
  className?: string;
  onLoaded?: () => void;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls, className, onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null); // Ref to hold controls object
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Animations are now enabled by default for all devices
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

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
      scene.background = new THREE.Color(0x2c1810); // Warm chocolate brown background for aesthetic appeal
      scene.fog = new THREE.Fog(0x2c1810, 10, 50);

      // 5 Lighting sources for enhanced visual quality
      // Ambient light for overall illumination
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      // Main directional light for shadows and depth
      const directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.0); // Warm sunlight
      directionalLight.position.set(10, 15, 10);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Fill light from opposite side
      const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.5); // Soft blue fill light
      fillLight.position.set(-8, 8, -8);
      scene.add(fillLight);

      // Rim light for edge definition
      const rimLight = new THREE.DirectionalLight(0xffe4b5, 0.6); // Warm rim light
      rimLight.position.set(0, 5, -15);
      scene.add(rimLight);

      // Point light for intimate glow
      const pointLight = new THREE.PointLight(0xffd700, 0.7, 20); // Golden point light
      pointLight.position.set(5, 3, 5);
      scene.add(pointLight);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 20; // Pull camera much further out initially

      // Renderer with performance-based optimization
      const lowEnd = isLowEndDevice();
      renderer = new THREE.WebGLRenderer({ 
        antialias: !lowEnd, 
        powerPreference: lowEnd ? "low-power" : "high-performance",
        alpha: true
      });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1 : 2));
      renderer.shadowMap.enabled = !lowEnd;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = lowEnd ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = lowEnd ? 1.0 : 1.1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      currentMount.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls; // Store controls in ref
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = animationsEnabled; // Control rotation with state
      controls.autoRotateSpeed = 1;

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

              // Position and scale the Kashmiri apple model
              model.scale.set(3, 3, 3); // Scale the apple appropriately
              model.position.set(0, 0, 0); // Center the apple

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
                  cameraZ *= 2.5; // Pull camera much further out for very wide view
                  camera.position.set(0, cameraZ / 2, cameraZ);
                  controls.target.set(0, 0, 0);

                  controls.update();

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

      // Animation loop with performance-optimized bouncing
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Update auto-rotate based on the toggle state
        if (controls) {
          controls.autoRotate = animationsEnabled;
        }
        
        // Performance-optimized bouncing animation for the apple
        if (allModels.children.length > 0 && animationsEnabled) {
          const apple = allModels.children[0];
          const time = Date.now() * 0.001;
          const bounceHeight = Math.sin(time * 1) * 0.2; // Reduced frequency and amplitude for performance
          apple.position.y = bounceHeight;
        }
        
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

  // This new effect handles toggling animations ON/OFF
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = animationsEnabled;
    }
  }, [animationsEnabled]);

  return (
    <div
      className={cn("relative w-full h-full border-2 border-dashed rounded-lg overflow-hidden bg-muted/40 shadow-inner", className)}
    >
      <div ref={mountRef} className="w-full h-full outline-none"></div>
      
      {/* Performance Toggle Button */}
      <button
        onClick={() => setAnimationsEnabled(!animationsEnabled)}
        className="absolute top-4 right-4 z-10 px-3 py-1 text-xs bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
      >
        {animationsEnabled ? "Disable Animations" : "Enable Animations"}
      </button>
      
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
