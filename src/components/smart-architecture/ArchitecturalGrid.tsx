'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GridNode {
  id: string;
  x: number;
  y: number;
  weight: number;
  connections: string[];
  stress: number;
  temperature: number;
}

interface ArchitecturalGridProps {
  children: React.ReactNode;
  className?: string;
  density?: 'light' | 'medium' | 'heavy';
}

export const ArchitecturalGrid: React.FC<ArchitecturalGridProps> = ({
  children,
  className = '',
  density = 'medium'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridNodes, setGridNodes] = useState<GridNode[]>([]);
  const [userFocus, setUserFocus] = useState({ x: 0, y: 0 });
  const [contentLoads, setContentLoads] = useState<Array<{ x: number; y: number; weight: number }>>([]);
  
  // Motion values for real-time responsiveness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const contentDensity = useMotionValue(0);
  
  // Spring animations for smooth transitions
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const gridSpacing = useSpring(density === 'light' ? 80 : density === 'medium' ? 60 : 40, springConfig);
  const structuralLoad = useSpring(0, springConfig);

  // Initialize grid based on content density
  const initializeGrid = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const spacing = density === 'light' ? 80 : density === 'medium' ? 60 : 40;
    const nodes: GridNode[] = [];
    
    for (let x = 0; x < rect.width; x += spacing) {
      for (let y = 0; y < rect.height; y += spacing) {
        nodes.push({
          id: `node-${x}-${y}`,
          x,
          y,
          weight: Math.random() * 0.5 + 0.5,
          connections: [],
          stress: 0,
          temperature: 0
        });
      }
    }
    
    // Create connections between nearby nodes
    nodes.forEach(node => {
      nodes.forEach(otherNode => {
        if (node.id !== otherNode.id) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < spacing * 1.5) {
            node.connections.push(otherNode.id);
          }
        }
      });
    });
    
    setGridNodes(nodes);
  }, [density]);

  // Track mouse movement for predictive behaviors
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    setUserFocus({ x, y });
    
    // Update node temperatures based on proximity to cursor
    setGridNodes(prevNodes => 
      prevNodes.map(node => {
        const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
        const temperature = Math.max(0, 1 - distance / 200);
        return { ...node, temperature };
      })
    );
  }, [mouseX, mouseY]);

  // Handle scroll-based structural adjustments
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    scrollY.set(scrollTop);
    
    // Adjust structural load based on scroll velocity
    const previousScroll = scrollY.getPrevious() || 0;
    const scrollVelocity = Math.abs(scrollTop - previousScroll) / 16;
    structuralLoad.set(Math.min(scrollVelocity * 0.1, 1));
  }, [scrollY, structuralLoad]);

  // Content density analysis
  const analyzeContentDensity = useCallback(() => {
    if (!containerRef.current) return;
    
    const children = containerRef.current.children;
    const totalArea = containerRef.current.offsetWidth * containerRef.current.offsetHeight;
    let contentArea = 0;
    
    Array.from(children).forEach(child => {
      const childElement = child as HTMLElement;
      contentArea += childElement.offsetWidth * childElement.offsetHeight;
    });
    
    const density = contentArea / totalArea;
    contentDensity.set(density);
    
    // Adjust grid spacing based on content density
    const newSpacing = 40 + (60 * (1 - density));
    gridSpacing.set(newSpacing);
  }, [contentDensity, gridSpacing]);

  // Setup event listeners and initialization
  useEffect(() => {
    initializeGrid();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Periodic content analysis
    const contentAnalysisInterval = setInterval(analyzeContentDensity, 2000);
    
    // Resize observer for responsive grid
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(initializeGrid, 100);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(contentAnalysisInterval);
      resizeObserver.disconnect();
    };
  }, [initializeGrid, handleMouseMove, handleScroll, analyzeContentDensity]);

  return (
    <div 
      ref={containerRef}
      className={`architectural-grid relative ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Structural Grid Visualization */}
      <motion.svg
        className="absolute inset-0 pointer-events-none z-0"
        width="100%"
        height="100%"
        style={{
          opacity: 0.3
        }}
      >
        {/* Grid Lines */}
        {gridNodes.map((node, index) => (
          <g key={node.id}>
            {/* Vertical Load-Bearing Columns */}
            {node.connections.map(connectionId => {
              const connectedNode = gridNodes.find(n => n.id === connectionId);
              if (!connectedNode || connectedNode.x !== node.x) return null;
              
              const stress = Math.max(node.stress, connectedNode.stress);
              const thickness = 1 + stress * 3;
              
              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke="#8B7355"
                  strokeWidth={thickness}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    strokeWidth: thickness,
                    stroke: node.temperature > 0.5 ? "#A6906D" : "#8B7355"
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              );
            })}
            
            {/* Structural Nodes */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={2 + node.weight * 2}
              fill="#8B7355"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1 + node.temperature * 0.5,
                fill: node.temperature > 0.3 ? "#F5F0E2" : "#8B7355"
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200 
              }}
            />
          </g>
        ))}
        
        {/* Predictive Stress Visualization */}
        <motion.defs>
          <radialGradient id="stressGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5F0E2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B7355" stopOpacity="0.1" />
          </radialGradient>
        </motion.defs>
        
        {contentLoads.map((load, index) => (
          <motion.circle
            key={`load-${index}`}
            cx={load.x}
            cy={load.y}
            r={20 * load.weight}
            fill="url(#stressGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </motion.svg>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Adaptive Structural Beams */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(139, 115, 85, 0.1) 2px, 
            transparent 4px
          )`,
          backgroundSize: `${gridSpacing.get()}px 100%`
        }}
      />
    </div>
  );
};

export default ArchitecturalGrid; 