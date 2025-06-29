'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface MaterialState {
  temperature: number;
  stress: number;
  opacity: number;
  thermal: number;
  engagement: number;
}

interface SmartMaterialsProps {
  children: React.ReactNode;
  materialType: 'concrete' | 'steel' | 'glass' | 'wood';
  className?: string;
  anticipatory?: boolean;
}

export const SmartMaterials: React.FC<SmartMaterialsProps> = ({
  children,
  materialType,
  className = '',
  anticipatory = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialState, setMaterialState] = useState<MaterialState>({
    temperature: 0,
    stress: 0,
    opacity: 1,
    thermal: 0,
    engagement: 0
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isPrewarming, setIsPrewarming] = useState(false);
  
  // Motion values for real-time material responses
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverProgress = useMotionValue(0);
  const thermalValue = useMotionValue(0);
  
  // Spring configurations for different materials
  const materialConfigs = {
    concrete: { stiffness: 50, damping: 20, mass: 2 },
    steel: { stiffness: 150, damping: 15, mass: 1 },
    glass: { stiffness: 200, damping: 25, mass: 0.5 },
    wood: { stiffness: 80, damping: 30, mass: 1.5 }
  };
  
  const springConfig = materialConfigs[materialType];
  const materialOpacity = useSpring(1, springConfig);
  const materialScale = useSpring(1, springConfig);
  const materialRotation = useSpring(0, springConfig);

  // Material color palettes
  const materialColors = {
    concrete: {
      base: '#F7F3E9',
      warm: '#F5F0E2',
      hot: '#F2EDD9',
      stress: '#E8E3D6'
    },
    steel: {
      base: '#8B4513',
      warm: '#A0522D',
      hot: '#CD853F',
      stress: '#D2691E'
    },
    glass: {
      base: '#FFFFFF',
      warm: '#FAF7F2',
      hot: '#F7F4EF',
      stress: '#F0EDE8'
    },
    wood: {
      base: '#D2B48C',
      warm: '#CD853F',
      hot: '#DEB887',
      stress: '#BC9A6A'
    }
  };

  // Predictive hover detection
  const predictiveHoverDetection = useCallback((event: MouseEvent) => {
    if (!containerRef.current || !anticipatory) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate distance to element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const proximityThreshold = Math.min(rect.width, rect.height) * 0.7;
    
    // Pre-warm material when cursor is approaching
    if (distance < proximityThreshold && !isHovered) {
      setIsPrewarming(true);
      const warmthLevel = 1 - (distance / proximityThreshold);
      thermalValue.set(warmthLevel * 0.3);
      
      setMaterialState(prev => ({
        ...prev,
        temperature: warmthLevel * 0.5,
        thermal: warmthLevel
      }));
    } else if (distance >= proximityThreshold && isPrewarming) {
      setIsPrewarming(false);
      thermalValue.set(0);
      setMaterialState(prev => ({
        ...prev,
        temperature: 0,
        thermal: 0
      }));
    }
    
    mouseX.set(x);
    mouseY.set(y);
  }, [anticipatory, isHovered, isPrewarming, thermalValue, mouseX, mouseY]);

  // Handle mouse enter with material-specific behaviors
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    hoverProgress.set(1);
    
    // Material-specific responses
    switch (materialType) {
      case 'concrete':
        materialOpacity.set(0.95);
        thermalValue.set(1);
        break;
      case 'steel':
        materialScale.set(1.02);
        materialRotation.set(0.5);
        break;
      case 'glass':
        materialOpacity.set(0.9);
        break;
      case 'wood':
        materialScale.set(1.01);
        materialRotation.set(-0.3);
        break;
    }
    
    setMaterialState(prev => ({
      ...prev,
      temperature: 1,
      stress: 0.7,
      engagement: 1
    }));
  }, [materialType, hoverProgress, materialOpacity, materialScale, materialRotation, thermalValue]);

  // Handle mouse leave with material recovery
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPrewarming(false);
    hoverProgress.set(0);
    
    // Return to baseline states
    materialOpacity.set(1);
    materialScale.set(1);
    materialRotation.set(0);
    thermalValue.set(0);
    
    setMaterialState(prev => ({
      ...prev,
      temperature: 0,
      stress: 0,
      thermal: 0,
      engagement: 0
    }));
  }, [hoverProgress, materialOpacity, materialScale, materialRotation, thermalValue]);

  // Material aging and weathering simulation
  const [materialAge, setMaterialAge] = useState(0);
  
  useEffect(() => {
    const ageTimer = setInterval(() => {
      setMaterialAge(prev => Math.min(prev + 0.01, 1));
    }, 1000);
    
    return () => clearInterval(ageTimer);
  }, []);

  // Global mouse tracking for predictive behavior
  useEffect(() => {
    window.addEventListener('mousemove', predictiveHoverDetection);
    return () => window.removeEventListener('mousemove', predictiveHoverDetection);
  }, [predictiveHoverDetection]);

  // Get current material color based on state
  const getCurrentColor = useCallback(() => {
    const colors = materialColors[materialType];
    const { temperature, stress, thermal } = materialState;
    
    if (temperature > 0.7) return colors.hot;
    if (temperature > 0.3 || thermal > 0.3) return colors.warm;
    if (stress > 0.5) return colors.stress;
    return colors.base;
  }, [materialType, materialState]);

  // Material-specific texture generation
  const getTexturePattern = useCallback(() => {
    switch (materialType) {
      case 'concrete':
        return `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, 
          rgba(245, 240, 226, ${materialState.thermal}) 0%, 
          transparent 40%)`;
      case 'steel':
        return `linear-gradient(${materialRotation.get()}deg, 
          rgba(160, 82, 45, 0.1) 0%, 
          rgba(139, 69, 19, 0.2) 50%, 
          rgba(160, 82, 45, 0.1) 100%)`;
      case 'glass':
        return `radial-gradient(ellipse at center, 
          rgba(255, 255, 255, ${0.1 + materialState.engagement * 0.2}) 0%, 
          transparent 70%)`;
      case 'wood':
        return `repeating-linear-gradient(${90 + materialRotation.get()}deg, 
          rgba(210, 180, 140, 0.1) 0px, 
          rgba(205, 133, 63, 0.2) ${2 + materialAge * 3}px, 
          rgba(210, 180, 140, 0.1) ${4 + materialAge * 6}px)`;
      default:
        return 'none';
    }
  }, [materialType, mouseX, mouseY, materialState, materialRotation, materialAge]);

  return (
    <motion.div
      ref={containerRef}
      className={`smart-material smart-material--${materialType} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: getCurrentColor(),
        opacity: materialOpacity,
        scale: materialScale,
        rotate: materialRotation,
        backgroundImage: getTexturePattern(),
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Thermal Response Overlay */}
      <AnimatePresence>
        {(materialState.thermal > 0 || isPrewarming) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: materialState.thermal * 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, 
                rgba(245, 240, 226, 0.6) 0%, 
                transparent 60%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Stress Visualization */}
      {materialState.stress > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: materialState.stress * 0.2 }}
          style={{
            background: materialType === 'concrete' 
              ? `repeating-linear-gradient(45deg, 
                  transparent 0px, 
                  rgba(232, 227, 214, 0.3) 2px, 
                  transparent 4px)`
              : materialType === 'steel'
              ? `repeating-linear-gradient(0deg, 
                  rgba(210, 105, 30, 0.1) 0px, 
                  transparent 1px, 
                  transparent 3px)`
              : 'none'
          }}
        />
      )}

      {/* Material-specific surface effects */}
      {materialType === 'glass' && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          style={{
            background: `conic-gradient(from ${mouseX.get()}deg at ${mouseX.get()}px ${mouseY.get()}px, 
              rgba(255, 255, 255, 0.2) 0deg, 
              transparent 60deg, 
              rgba(255, 255, 255, 0.1) 120deg, 
              transparent 180deg)`
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Aging/Weathering Effects */}
      {materialAge > 0.5 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: (materialAge - 0.5) * 0.2,
            background: materialType === 'steel' 
              ? `radial-gradient(circle at 30% 70%, rgba(160, 82, 45, 0.1) 20%, transparent 40%),
                 radial-gradient(circle at 80% 20%, rgba(205, 133, 63, 0.1) 15%, transparent 35%)`
              : materialType === 'concrete'
              ? `linear-gradient(45deg, transparent 40%, rgba(232, 227, 214, 0.1) 50%, transparent 60%)`
              : 'none'
          }}
        />
      )}
    </motion.div>
  );
};

export default SmartMaterials; 