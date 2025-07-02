"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, Box, Settings } from 'lucide-react';

// Enhanced device performance detection
const getDevicePerformance = () => {
  if (typeof window === 'undefined') return 'medium';
  
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Check for high-end GPUs
  const highEndGPUs = ['RTX', 'GTX 1060', 'GTX 1070', 'GTX 1080', 'RX 580', 'RX 590', 'Vega', 'Apple M1', 'Apple M2'];
  const isHighEnd = highEndGPUs.some(gpu => renderer.includes(gpu));
  
  // Device characteristics
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /iPad|Android.*Tablet/i.test(navigator.userAgent);
  
  // Performance scoring
  let score = 0;
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else score += 1;
  
  if (isHighEnd) score += 3;
  if (!isMobile) score += 2;
  if (window.innerWidth >= 1920) score += 1;
  
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
};

type ModelViewerProps = {
  modelUrls: string[];
  className?: string;
  onLoaded?: () => void;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls, className, onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number>();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [qualityLevel, setQualityLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Memoized performance settings
  const performanceSettings = useMemo(() => {
    const devicePerformance = getDevicePerformance();
    setQualityLevel(devicePerformance);
    
    const settings = {
      low: {
        pixelRatio: Math.min(window.devicePixelRatio, 1),
        antialias: false,
        shadows: false,
        toneMapping: THREE.NoToneMapping,
        powerPreference: 'low-power' as WebGLPowerPreference,
        maxLights: 3,
        modelScale: 2.5,
        cameraDistance: 25,
        autoRotateSpeed: 0.5,
        bounceAmplitude: 0.1,
        renderTargetSize: 512,
      },
      medium: {
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        antialias: true,
        shadows: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: 'default' as WebGLPowerPreference,
        maxLights: 5,
        modelScale: 3,
        cameraDistance: 20,
        autoRotateSpeed: 1,
        bounceAmplitude: 0.2,
        renderTargetSize: 1024,
      },
      high: {
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        antialias: true,
        shadows: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: 'high-performance' as WebGLPowerPreference,
        maxLights: 7,
        modelScale: 3.5,
        cameraDistance: 18,
        autoRotateSpeed: 1.2,
        bounceAmplitude: 0.25,
        renderTargetSize: 2048,
      },
    };
    
    return settings[devicePerformance];
  }, []);

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
    
    // Clear previous content
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    let cleanup: (() => void) | null = null;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a0f0a); // Warm dark brown
      scene.fog = new THREE.Fog(0x1a0f0a, 15, 45);
      sceneRef.current = scene;

      // Enhanced lighting setup based on performance
      const lights: THREE.Light[] = [];
      
      // Ambient light for overall illumination
      const ambientLight = new THREE.AmbientLight(0xfff8dc, 0.4);
      scene.add(ambientLight);
      lights.push(ambientLight);
      
      // Main directional light (sun)
      const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      sunLight.position.set(12, 20, 8);
      sunLight.castShadow = performanceSettings.shadows;
      if (performanceSettings.shadows) {
        sunLight.shadow.mapSize.width = performanceSettings.renderTargetSize;
        sunLight.shadow.mapSize.height = performanceSettings.renderTargetSize;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 50;
        sunLight.shadow.camera.left = -20;
        sunLight.shadow.camera.right = 20;
        sunLight.shadow.camera.top = 20;
        sunLight.shadow.camera.bottom = -20;
        sunLight.shadow.bias = -0.0001;
      }
      scene.add(sunLight);
      lights.push(sunLight);

      // Fill light from opposite side
      if (performanceSettings.maxLights >= 3) {
        const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.6);
        fillLight.position.set(-10, 10, -10);
        scene.add(fillLight);
        lights.push(fillLight);
      }

      // Rim light for edge definition
      if (performanceSettings.maxLights >= 4) {
        const rimLight = new THREE.DirectionalLight(0xffe4b5, 0.7);
        rimLight.position.set(0, 8, -18);
        scene.add(rimLight);
        lights.push(rimLight);
      }

      // Point lights for warmth
      if (performanceSettings.maxLights >= 5) {
        const warmLight1 = new THREE.PointLight(0xffd700, 0.8, 25);
        warmLight1.position.set(8, 5, 8);
        scene.add(warmLight1);
        lights.push(warmLight1);

        const warmLight2 = new THREE.PointLight(0xff6b47, 0.6, 20);
        warmLight2.position.set(-6, 3, 6);
        scene.add(warmLight2);
        lights.push(warmLight2);
      }

      // Additional accent lights for high-end devices
      if (performanceSettings.maxLights >= 7) {
        const accentLight1 = new THREE.SpotLight(0xffa500, 0.5, 30, Math.PI / 6);
        accentLight1.position.set(0, 15, 0);
        accentLight1.target.position.set(0, 0, 0);
        scene.add(accentLight1);
        scene.add(accentLight1.target);
        lights.push(accentLight1);

        const accentLight2 = new THREE.PointLight(0xff4500, 0.4, 15);
        accentLight2.position.set(0, -5, 10);
        scene.add(accentLight2);
        lights.push(accentLight2);
      }

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75, 
        currentMount.clientWidth / currentMount.clientHeight, 
        0.1, 
        1000
      );
      camera.position.z = performanceSettings.cameraDistance;

      // Enhanced renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: performanceSettings.antialias,
        powerPreference: performanceSettings.powerPreference,
        alpha: true,
        stencil: false,
        depth: true,
      });
      
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(performanceSettings.pixelRatio);
      renderer.shadowMap.enabled = performanceSettings.shadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = performanceSettings.toneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Performance optimizations
      renderer.info.autoReset = false;
      renderer.sortObjects = true;
      renderer.setAnimationLoop(null); // We'll handle animation manually
      
      currentMount.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Enhanced controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = animationsEnabled;
      controls.autoRotateSpeed = performanceSettings.autoRotateSpeed;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 10;
      controls.maxDistance = 40;
      controls.minPolarAngle = Math.PI / 6;
      controls.maxPolarAngle = Math.PI - Math.PI / 6;
      controlsRef.current = controls;

      // Enhanced model loader
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      dracoLoader.preload();
      loader.setDRACOLoader(dracoLoader);

      const allModels = new THREE.Group();
      let modelsLoaded = 0;

      if (modelUrls.length === 0) {
        setIsLoading(false);
        return;
      }

      modelUrls.forEach((url, i) => {
        loader.load(
          url,
          (gltf) => {
            const model = gltf.scene;
            
            // Enhanced material processing
            model.traverse((node) => {
              if (node instanceof THREE.Mesh) {
                node.castShadow = performanceSettings.shadows;
                node.receiveShadow = performanceSettings.shadows;
                
                // Enhance materials
                if (node.material) {
                  if (Array.isArray(node.material)) {
                    node.material.forEach(mat => enhanceMaterial(mat));
                  } else {
                    enhanceMaterial(node.material);
                  }
                }
              }
            });

            // Position and scale the model
            model.scale.set(
              performanceSettings.modelScale, 
              performanceSettings.modelScale, 
              performanceSettings.modelScale
            );
            model.position.set(0, 0, 0);

            allModels.add(model);
            modelsLoaded++;

            if (modelsLoaded === modelUrls.length) {
              scene.add(allModels);
              
              // Center and position model
              const box = new THREE.Box3().setFromObject(allModels);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());
              allModels.position.sub(center);

              const maxDim = Math.max(size.x, size.y, size.z);
              const fov = camera.fov * (Math.PI / 180);
              let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
              cameraZ *= 2.2;
              camera.position.set(0, cameraZ / 3, cameraZ);
              controls.target.set(0, 0, 0);
              controls.update();

              setIsLoading(false);
              if (onLoaded) onLoaded();
            }
          },
          (progress) => {
            // Optional: Handle loading progress
          },
          (error) => {
            console.error(`Error loading model: ${url}`, error);
            setError(`Failed to load 3D model. Please check your connection.`);
            setIsLoading(false);
          }
        );
      });

      // Enhanced animation loop with performance monitoring
      let lastTime = 0;
      let frameCount = 0;
      let fps = 60;
      
      const animate = (currentTime: number) => {
        animationFrameRef.current = requestAnimationFrame(animate);
        
        // FPS monitoring
        frameCount++;
        if (currentTime - lastTime >= 1000) {
          fps = frameCount;
          frameCount = 0;
          lastTime = currentTime;
          
          // Dynamic quality adjustment
          if (fps < 30 && qualityLevel !== 'low') {
            console.log('Performance: Reducing quality due to low FPS');
            // Could implement dynamic quality reduction here
          }
        }
        
        // Update controls
        controls.autoRotate = animationsEnabled;
        controls.update();
        
        // Enhanced bouncing animation
        if (allModels.children.length > 0 && animationsEnabled) {
          const apple = allModels.children[0];
          const time = currentTime * 0.001;
          const bounceHeight = Math.sin(time * 1.2) * performanceSettings.bounceAmplitude;
          apple.position.y = bounceHeight;
          
          // Subtle rotation variation
          apple.rotation.y += 0.002;
        }
        
        // Render
        renderer.render(scene, camera);
        renderer.info.reset();
      };
      
      animate(0);

      // Handle resize
      const handleResize = () => {
        if (currentMount) {
          camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup function
      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (currentMount && renderer.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
        
        // Dispose of resources
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material?.dispose();
            }
          }
        });
        
        lights.forEach(light => {
          if (light instanceof THREE.DirectionalLight || light instanceof THREE.SpotLight) {
            light.shadow?.map?.dispose();
          }
        });
        
        renderer.dispose();
        controls.dispose();
        dracoLoader.dispose();
      };

    } catch (err) {
      console.error('3D Scene Error:', err);
      setError("Failed to initialize 3D scene. Your device may not support WebGL.");
      setIsLoading(false);
    }

    return cleanup;
  }, [modelUrls, performanceSettings, animationsEnabled, onLoaded, qualityLevel]);

  // Material enhancement function
  const enhanceMaterial = (material: THREE.Material) => {
    if (material instanceof THREE.MeshStandardMaterial) {
      material.roughness = 0.3;
      material.metalness = 0.1;
      material.envMapIntensity = 1.2;
      
      // Enhanced apple-specific material properties
      if (material.name.toLowerCase().includes('apple') || material.color.r > 0.5) {
        material.roughness = 0.2;
        material.metalness = 0.05;
        material.clearcoat = 0.3;
        material.clearcoatRoughness = 0.1;
      }
    }
  };

  // Toggle animations
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = animationsEnabled;
    }
  }, [animationsEnabled]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div ref={mountRef} className="w-full h-full outline-none"></div>
      
      {/* Enhanced Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="px-3 py-2 text-xs bg-black/60 text-white rounded-md hover:bg-black/80 transition-colors flex items-center gap-2"
          title={animationsEnabled ? "Disable Animations" : "Enable Animations"}
        >
          <Settings className="w-3 h-3" />
          {animationsEnabled ? "Pause" : "Play"}
        </button>
        
        <div className="px-3 py-1 text-xs bg-black/60 text-white rounded-md">
          Quality: {qualityLevel.toUpperCase()}
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-900/80 to-red-900/80 backdrop-blur-sm transition-opacity">
          <Loader2 className="h-16 w-16 animate-spin text-orange-400 mb-4" />
          <p className="text-xl text-white font-semibold">Loading 3D Apple Model...</p>
          <p className="text-sm text-orange-200 mt-2">Optimizing for your device</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 backdrop-blur-sm transition-opacity">
          <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
          <p className="text-xl text-white font-semibold text-center px-4">{error}</p>
          <p className="text-sm text-red-200 mt-2 text-center px-4">
            Try refreshing the page or using a different browser
          </p>
        </div>
      )}
      
      {/* Fallback State */}
      {(!modelUrls || modelUrls.length === 0) && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity">
          <Box className="h-32 w-32 text-orange-400/40 mb-4" />
          <p className="text-2xl text-orange-400/60 font-semibold">3D Model Viewer</p>
          <p className="text-orange-400/40 mt-2">Ready to load Kashmir Apple</p>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;