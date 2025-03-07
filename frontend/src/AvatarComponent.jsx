// AvatarComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AvatarComponent = ({ botState, sentiment = 0 }) => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarRef = useRef(null);
  const animationsRef = useRef({});
  const mixerRef = useRef(null);
  const frameIdRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      25, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.5, 5);
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load the avatar - using a simple ready-made model for speed
    // For the quickest implementation, we're using a free model from Ready Player Me or Sketchfab
    const loader = new GLTFLoader();
    
    // URL to a free 3D avatar model (replace with your chosen model)
    const avatarUrl = 'https://models.readyplayer.me/64f1c5da22f57d37408a375c.glb';
    
    loader.load(
      avatarUrl,
      (gltf) => {
        // Add avatar to scene
        const avatar = gltf.scene;
        avatar.position.set(0, 0, 0);
        avatar.scale.set(1, 1, 1);
        scene.add(avatar);
        avatarRef.current = avatar;

        // Set up animations
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;

          // Store animations by name for easy reference
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            animationsRef.current[clip.name] = action;
          });

          // Start with idle animation
          if (animationsRef.current['Idle']) {
            animationsRef.current['Idle'].play();
          }
        }

        setIsLoaded(true);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading avatar:', error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (mixerRef.current) {
        const delta = clock.getDelta();
        mixerRef.current.update(delta);
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle bot state changes to update animations
  useEffect(() => {
    if (!isLoaded || !animationsRef.current || !mixerRef.current) return;

    // Stop all current animations
    Object.values(animationsRef.current).forEach(action => {
      action.stop();
    });

    // Play appropriate animation based on bot state
    let animationName = 'Idle';

    switch (botState) {
      case 'listening':
        animationName = 'Listening';
        break;
      case 'thinking':
        animationName = 'Thinking';
        break;
      case 'speaking':
        animationName = 'Talking';
        break;
      default:
        // Different idle animations based on sentiment
        if (sentiment > 0.3) {
          animationName = 'Happy';
        } else if (sentiment < -0.3) {
          animationName = 'Sad';
        } else {
          animationName = 'Idle';
        }
    }

    // Fallback to Idle if the specific animation doesn't exist
    const targetAnimation = animationsRef.current[animationName] || animationsRef.current['Idle'];
    
    if (targetAnimation) {
      targetAnimation.reset();
      targetAnimation.play();
    }
  }, [botState, sentiment, isLoaded]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px',
        backgroundColor: '#f0f0f0'
      }}
    >
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          Loading Avatar...
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;