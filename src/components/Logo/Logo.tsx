import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';

import './Logo.css';

export const Logo = () => (
  <Canvas className='logo-canvas' camera={{ position: [0, 0, 11], fov: 25 }}>
    <Html fullscreen zIndexRange={[0, 0]} className="html-container">
      <div className="main-logo-container">
        <div className="main-logo">Mateusz Masek Blog</div>
      </div>
    </Html>
    <Stars saturation={1} radius={200} />
    <ambientLight intensity={0.1} />
    <directionalLight position={[0, 0, 1]} />
  </Canvas>
);