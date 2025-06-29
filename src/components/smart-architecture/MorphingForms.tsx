'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface FormState {
  curvature: number;
  height: number;
  width: number;
  depth: number;
  openingSize: number;
  cantileverExtension: number;
}

interface ContentArea {
  x: number;
  y: number;
  width: number;
  height: number;
  importance: number;
}

interface MorphingFormsProps {
  children: React.ReactNode;
  formType: 'wall' | 'archway' | 'cantilever' | 'void';
  className?: string;
  adaptToContent?: boolean;
  importance?: number;
}

export const MorphingForms: React.FC<MorphingFormsProps> = ({
  children,
  formType,
  className = '',
  adaptToContent = true,
  importance = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>({
    curvature: 0,
    height: 100,
    width: 100,
    depth: 20,
    openingSize: 0,
    cantileverExtension: 0
  });
  const [contentAreas, setContentAreas] = useState<ContentArea[]>([]);
  const [userFocus, setUserFocus] = useState({ x: 0, y: 0, intensity: 0 });
  
  // Motion values for dynamic form adjustments
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const contentDensity = useMotionValue(0);
  const engagementLevel = useMotionValue(0);
  
  // Spring configurations for smooth morphing
  const springConfig = { stiffness: 60, damping: 25, mass: 1.5 };
  const morphX = useSpring(0, springConfig);
  const morphY = useSpring(0, springConfig);
  const morphScale = useSpring(1, springConfig);
  const morphRotation = useSpring(0, springConfig);

  // Analyze content areas for structural adaptation
  const analyzeContentAreas = useCallback(() => {
    if (!containerRef.current || !adaptToContent) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const areas: ContentArea[] = [];
    
    // Analyze child elements
    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childRect = childElement.getBoundingClientRect();
      
      if (childRect.width > 0 && childRect.height > 0) {
        areas.push({
          x: childRect.left - rect.left,
          y: childRect.top - rect.top,
          width: childRect.width,
          height: childRect.height,
          importance: importance + (index * 0.1) // Later elements slightly more important
        });
      }
    });
    
    setContentAreas(areas);
    
    // Calculate overall content density
    const totalContentArea = areas.reduce((sum, area) => sum + (area.width * area.height), 0);
    const containerArea = rect.width * rect.height;
    const density = totalContentArea / containerArea;
    contentDensity.set(density);
    
  }, [adaptToContent, importance, contentDensity]);

  // Track mouse for user focus areas
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Calculate focus intensity based on movement speed
    const currentTime = Date.now();
    const previousX = mouseX.getPrevious() || x;
    const previousY = mouseY.getPrevious() || y;
    const velocity = Math.sqrt(Math.pow(x - previousX, 2) + Math.pow(y - previousY, 2));
    const intensity = Math.max(0, 1 - velocity / 100);
    
    setUserFocus({ x, y, intensity });
    engagementLevel.set(intensity);
    
    // Trigger form adaptations based on focus
    adaptFormToFocus(x, y, intensity);
    
  }, [mouseX, mouseY, engagementLevel]);

  // Adapt form based on user focus
  const adaptFormToFocus = useCallback((x: number, y: number, intensity: number) => {
    const centerX = containerRef.current?.offsetWidth || 0 / 2;
    const centerY = containerRef.current?.offsetHeight || 0 / 2;
    
    switch (formType) {
      case 'wall':
        // Walls curve to frame content
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const curvature = (1 - distanceFromCenter / maxDistance) * intensity;
        
        setFormState(prev => ({
          ...prev,
          curvature: curvature * 30,
          height: 100 + (intensity * 20)
        }));
        break;
        
      case 'archway':
        // Archways form when content needs framing
        const needsFraming = contentAreas.some(area => 
          x >= area.x && x <= area.x + area.width && 
          y >= area.y && y <= area.y + area.height
        );
        
        setFormState(prev => ({
          ...prev,
          openingSize: needsFraming ? 60 + (intensity * 40) : 20,
          height: needsFraming ? 120 + (intensity * 30) : 100
        }));
        break;
        
      case 'cantilever':
        // Cantilevers extend based on content importance
        const nearImportantContent = contentAreas.find(area => {
          const areaCenter = { x: area.x + area.width / 2, y: area.y + area.height / 2 };
          const distance = Math.sqrt(Math.pow(x - areaCenter.x, 2) + Math.pow(y - areaCenter.y, 2));
          return distance < 100 && area.importance > 0.7;
        });
        
        setFormState(prev => ({
          ...prev,
          cantileverExtension: nearImportantContent ? 40 + (intensity * 30) : 0,
          depth: nearImportantContent ? 30 + (intensity * 15) : 20
        }));
        break;
        
      case 'void':
        // Voids reshape around user focus
        morphX.set((x - centerX) * 0.1);
        morphY.set((y - centerY) * 0.1);
        morphScale.set(1 + intensity * 0.3);
        break;
    }
  }, [formType, contentAreas, morphX, morphY, morphScale]);

  // Content importance analysis
  const analyzeContentImportance = useCallback(() => {
    if (!adaptToContent) return;
    
    setContentAreas(prevAreas => 
      prevAreas.map(area => {
        // Increase importance if user has focused on this area
        const isNearFocus = Math.sqrt(
          Math.pow(userFocus.x - (area.x + area.width / 2), 2) + 
          Math.pow(userFocus.y - (area.y + area.height / 2), 2)
        ) < 150;
        
        return {
          ...area,
          importance: isNearFocus ? Math.min(area.importance + 0.1, 1) : area.importance
        };
      })
    );
  }, [adaptToContent, userFocus]);

  // Setup event listeners and analysis
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Initial content analysis
    analyzeContentAreas();
    
    // Periodic content analysis
    const analysisInterval = setInterval(analyzeContentAreas, 3000);
    const importanceInterval = setInterval(analyzeContentImportance, 1000);
    
    // Resize observer for responsive adaptation
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(analyzeContentAreas, 100);
    });
    
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(analysisInterval);
      clearInterval(importanceInterval);
      resizeObserver.disconnect();
    };
  }, [handleMouseMove, analyzeContentAreas, analyzeContentImportance]);

  // Generate SVG path for morphing forms
  const generateFormPath = useCallback(() => {
    const width = containerRef.current?.offsetWidth || 200;
    const height = containerRef.current?.offsetHeight || 200;
    
    switch (formType) {
      case 'wall':
        const curvature = formState.curvature;
        return `M 0,0 Q ${width/2},${curvature} ${width},0 L ${width},${height} Q ${width/2},${height - curvature} 0,${height} Z`;
        
      case 'archway':
        const archHeight = formState.height;
        const openingSize = formState.openingSize;
        const archY = height - archHeight;
        return `M 0,${height} L 0,${archY} Q ${width/2},${archY - 20} ${width},${archY} L ${width},${height} 
                M ${(width - openingSize)/2},${height} L ${(width - openingSize)/2},${archY + 40} 
                Q ${width/2},${archY + 20} ${(width + openingSize)/2},${archY + 40} L ${(width + openingSize)/2},${height}`;
        
      case 'cantilever':
        const extension = formState.cantileverExtension;
        const depth = formState.depth;
        return `M 0,0 L ${width + extension},0 L ${width + extension},${depth} L ${width},${depth + 10} L 0,${height} Z`;
        
      case 'void':
        const centerX = width / 2 + morphX.get();
        const centerY = height / 2 + morphY.get();
        const scale = morphScale.get();
        const voidWidth = 60 * scale;
        const voidHeight = 40 * scale;
        return `M 0,0 L ${width},0 L ${width},${height} L 0,${height} Z 
                M ${centerX - voidWidth/2},${centerY - voidHeight/2} 
                L ${centerX + voidWidth/2},${centerY - voidHeight/2} 
                L ${centerX + voidWidth/2},${centerY + voidHeight/2} 
                L ${centerX - voidWidth/2},${centerY + voidHeight/2} Z`;
        
      default:
        return `M 0,0 L ${width},0 L ${width},${height} L 0,${height} Z`;
    }
  }, [formType, formState, morphX, morphY, morphScale]);

  // Get form color based on state
  const getFormColor = useCallback(() => {
    const baseColors = {
      wall: '#F7F3E9',
      archway: '#F5F0E2',
      cantilever: '#E8E3D6',
      void: 'transparent'
    };
    
    const engagementIntensity = engagementLevel.get();
    const warmColor = {
      wall: '#F2EDD9',
      archway: '#F0ECE5',
      cantilever: '#E0DCD0',
      void: 'rgba(245, 240, 226, 0.1)'
    };
    
    return engagementIntensity > 0.3 ? warmColor[formType] : baseColors[formType];
  }, [formType, engagementLevel]);

  return (
    <div 
      ref={containerRef}
      className={`morphing-form morphing-form--${formType} relative ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Morphing Form Visualization */}
      <motion.svg
        className="absolute inset-0 pointer-events-none z-0"
        width="100%"
        height="100%"
        style={{
          opacity: formType === 'void' ? 1 : 0.6
        }}
      >
        <motion.path
          d={generateFormPath()}
          fill={getFormColor()}
          stroke="#8B7355"
          strokeWidth={formType === 'void' ? 2 : 1}
          fillRule={formType === 'void' ? 'evenodd' : 'nonzero'}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            fill: getFormColor()
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
        />
        
        {/* Stress Lines for Cantilevers */}
        {formType === 'cantilever' && formState.cantileverExtension > 0 && (
          <motion.g>
            {[...Array(3)].map((_, i) => (
              <motion.line
                key={`stress-${i}`}
                x1={containerRef.current?.offsetWidth || 0}
                y1={5 + i * 8}
                x2={(containerRef.current?.offsetWidth || 0) + formState.cantileverExtension}
                y2={5 + i * 8}
                stroke="#A6906D"
                strokeWidth="1"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </motion.g>
        )}
        
        {/* Structural Support Visualization */}
        {formType === 'archway' && formState.openingSize > 30 && (
          <motion.g>
            <motion.rect
              x={(containerRef.current?.offsetWidth || 0) / 2 - 5}
              y={(containerRef.current?.offsetHeight || 0) - formState.height + 20}
              width="10"
              height={formState.height - 40}
              fill="#8B7355"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: 'bottom' }}
            />
          </motion.g>
        )}
      </motion.svg>

      {/* Content Area Highlighting */}
      <AnimatePresence>
        {contentAreas.map((area, index) => (
          area.importance > 0.7 && (
            <motion.div
              key={`content-highlight-${index}`}
              className="absolute pointer-events-none z-5"
              style={{
                left: area.x,
                top: area.y,
                width: area.width,
                height: area.height,
                border: `2px solid rgba(139, 115, 85, ${area.importance * 0.5})`,
                borderRadius: '8px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            />
          )
        ))}
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>

      {/* User Focus Indicator */}
      {userFocus.intensity > 0.3 && (
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{
            left: userFocus.x - 15,
            top: userFocus.y - 15,
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '2px solid rgba(139, 115, 85, 0.6)',
            background: 'radial-gradient(circle, rgba(245, 240, 226, 0.3) 0%, transparent 70%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1 + userFocus.intensity * 0.5, 
            opacity: userFocus.intensity 
          }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}
    </div>
  );
};

export default MorphingForms; 