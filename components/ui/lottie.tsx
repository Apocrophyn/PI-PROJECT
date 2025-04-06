'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function LottieAnimation({ 
  src, 
  width = 300, 
  height = 300, 
  className = '', 
  loop = true, 
  autoplay = true 
}: LottieProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetch(src)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, [src]);

  if (!isClient || !animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{
        width: width,
        height: height,
      }}
      className={className}
    />
  );
} 