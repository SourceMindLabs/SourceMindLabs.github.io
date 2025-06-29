'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { SmartMaterials } from './SmartMaterials';
import { ArchitecturalCursor } from './ArchitecturalCursor';
import { MorphingForms } from './MorphingForms';

interface BuildingState {
  hvacFlow: number;
  lightingLevel: number;
  securityLevel: number;
  occupancyDensity: number;
  environmentalStress: number;
  learningPhase: 'observing' | 'learning' | 'adapting' | 'optimized';
}

interface UserPattern {
  pathHistory: Array<{ x: number; y: number; timestamp: number }>;
  interactionHotspots: Array<{ x: number; y: number; frequency: number }>;
  scrollBehavior: { velocity: number; direction: 'up' | 'down'; frequency: number };
  dwellTimes: Array<{ element: string; duration: number }>;
}

interface SmartArchitecturalSystemProps {
  children: React.ReactNode;
  className?: string;
  learningEnabled?: boolean;
  anticipatoryMode?: boolean;
  buildingType?: 'residential' | 'commercial' | 'institutional' | 'hybrid';
}

export const SmartArchitecturalSystem: React.FC<SmartArchitecturalSystemProps> = ({
  children,
  className = '',
  learningEnabled = true,
  anticipatoryMode = true,
  buildingType = 'hybrid'
}) => {
  const systemRef = useRef<HTMLDivElement>(null);
  const [buildingState, setBuildingState] = useState<BuildingState>({
    hvacFlow: 0.5,
    lightingLevel: 0.7,
    securityLevel: 0.3,
    occupancyDensity: 0,
    environmentalStress: 0,
    learningPhase: 'observing'
  });
  
  const [userPattern, setUserPattern] = useState<UserPattern>({
    pathHistory: [],
    interactionHotspots: [],
    scrollBehavior: { velocity: 0, direction: 'down', frequency: 0 },
    dwellTimes: []
  });
  
  const [sessionStartTime] = useState(Date.now());
  const [adaptationLevel, setAdaptationLevel] = useState(0);
  
  // Motion values for system-wide coordination
  const systemStress = useMotionValue(0);
  const systemHeat = useMotionValue(0);
  const userEngagement = useMotionValue(0);
  const buildingIntelligence = useMotionValue(0);
  
  // Spring configurations for system responses
  const springConfig = { stiffness: 40, damping: 20, mass: 2 };
  const hvacResponse = useSpring(0.5, springConfig);
  const lightingResponse = useSpring(0.7, springConfig);
  const structuralResponse = useSpring(0, springConfig);

  // Track user navigation patterns
  const trackUserMovement = useCallback((event: MouseEvent) => {
    if (!systemRef.current || !learningEnabled) return;
    
    const rect = systemRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const timestamp = Date.now();
    
    setUserPattern(prev => ({
      ...prev,
      pathHistory: [
        ...prev.pathHistory.slice(-50), // Keep last 50 points
        { x, y, timestamp }
      ]
    }));
    
    // Update system heat based on movement
    const recentMovement = userPattern.pathHistory.slice(-10);
    if (recentMovement.length > 1) {
      const totalDistance = recentMovement.reduce((sum, point, index) => {
        if (index === 0) return 0;
        const prev = recentMovement[index - 1];
        return sum + Math.sqrt(Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2));
      }, 0);
      
      const avgVelocity = totalDistance / recentMovement.length;
      systemHeat.set(Math.min(avgVelocity / 100, 1));
    }
  }, [learningEnabled, userPattern.pathHistory, systemHeat]);

  // Analyze interaction hotspots
  const analyzeInteractionHotspots = useCallback(() => {
    if (!learningEnabled || userPattern.pathHistory.length < 10) return;
    
    const recentPoints = userPattern.pathHistory.slice(-100);
    const hotspots: Array<{ x: number; y: number; frequency: number }> = [];
    const gridSize = 50;
    
    // Create a grid and count interactions in each cell
    const grid = new Map<string, number>();
    
    recentPoints.forEach(point => {
      const gridX = Math.floor(point.x / gridSize) * gridSize;
      const gridY = Math.floor(point.y / gridSize) * gridSize;
      const key = `${gridX},${gridY}`;
      grid.set(key, (grid.get(key) || 0) + 1);
    });
    
    // Convert high-frequency grid cells to hotspots
    grid.forEach((frequency, key) => {
      if (frequency > 5) {
        const [x, y] = key.split(',').map(Number);
        hotspots.push({ x: x + gridSize/2, y: y + gridSize/2, frequency });
      }
    });
    
    setUserPattern(prev => ({ ...prev, interactionHotspots: hotspots }));
  }, [learningEnabled, userPattern.pathHistory]);

  // Smart building systems simulation
  const updateBuildingSystems = useCallback(() => {
    const currentTime = Date.now();
    const sessionDuration = (currentTime - sessionStartTime) / 1000; // seconds
    
    // Simulate time of day effects
    const timeOfDay = (currentTime / 1000 / 60) % 1440; // minutes in day
    const isNight = timeOfDay < 360 || timeOfDay > 1200; // 6AM to 8PM
    
    // Calculate occupancy based on user activity
    const recentActivity = userPattern.pathHistory.filter(
      point => currentTime - point.timestamp < 30000 // last 30 seconds
    ).length;
    const occupancyDensity = Math.min(recentActivity / 20, 1);
    
    // Update building systems based on occupancy and patterns
    const targetHvac = 0.3 + (occupancyDensity * 0.4) + (isNight ? -0.1 : 0.1);
    const targetLighting = isNight ? 0.4 : 0.8 - (occupancyDensity * 0.2);
    const targetSecurity = isNight ? 0.8 : 0.3 + (occupancyDensity * 0.2);
    
    hvacResponse.set(targetHvac);
    lightingResponse.set(targetLighting);
    
    setBuildingState(prev => ({
      ...prev,
      hvacFlow: targetHvac,
      lightingLevel: targetLighting,
      securityLevel: targetSecurity,
      occupancyDensity,
      environmentalStress: systemStress.get()
    }));
    
    // Update learning phase based on session duration and adaptation
    if (sessionDuration > 120 && buildingState.learningPhase === 'observing') {
      setBuildingState(prev => ({ ...prev, learningPhase: 'learning' }));
    } else if (sessionDuration > 300 && buildingState.learningPhase === 'learning') {
      setBuildingState(prev => ({ ...prev, learningPhase: 'adapting' }));
    } else if (sessionDuration > 600 && buildingState.learningPhase === 'adapting') {
      setBuildingState(prev => ({ ...prev, learningPhase: 'optimized' }));
      buildingIntelligence.set(1);
    }
    
  }, [sessionStartTime, userPattern.pathHistory, hvacResponse, lightingResponse, systemStress, buildingState.learningPhase, buildingIntelligence]);

  // Predictive content loading based on scroll patterns
  const predictiveContentLoading = useCallback(() => {
    if (!anticipatoryMode) return;
    
    const scrollElement = window;
    const scrollTop = scrollElement.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Predict next scroll direction based on recent behavior
    const recentScrolls = userPattern.scrollBehavior;
    const scrollProgress = scrollTop / (documentHeight - windowHeight);
    
    // Pre-load content if user is likely to continue scrolling
    if (scrollProgress > 0.7 && recentScrolls.direction === 'down') {
      // Trigger predictive loading of next section
      setAdaptationLevel(prev => Math.min(prev + 0.1, 1));
    }
  }, [anticipatoryMode, userPattern.scrollBehavior]);

  // Building intelligence evolution
  const evolveBuildingIntelligence = useCallback(() => {
    const { learningPhase } = buildingState;
    const patternComplexity = userPattern.interactionHotspots.length;
    const adaptationScore = adaptationLevel + (patternComplexity * 0.1);
    
    // Evolve building behavior based on learned patterns
    if (learningPhase === 'optimized' && adaptationScore > 0.7) {
      // Building becomes more proactive
      systemStress.set(systemStress.get() * 0.9); // Reduce stress through optimization
      userEngagement.set(Math.min(userEngagement.get() + 0.1, 1));
    }
  }, [buildingState.learningPhase, userPattern.interactionHotspots, adaptationLevel, systemStress, userEngagement]);

  // Setup system monitoring and learning
  useEffect(() => {
    if (!systemRef.current) return;
    
    const container = systemRef.current;
    
    // Track user interactions
    container.addEventListener('mousemove', trackUserMovement);
    
    // Periodic system updates
    const systemUpdateInterval = setInterval(updateBuildingSystems, 5000);
    const hotspotAnalysisInterval = setInterval(analyzeInteractionHotspots, 10000);
    const contentLoadingInterval = setInterval(predictiveContentLoading, 2000);
    const intelligenceEvolutionInterval = setInterval(evolveBuildingIntelligence, 15000);
    
    // Scroll behavior tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const previousScroll = userPattern.scrollBehavior.velocity;
      const velocity = Math.abs(scrollTop - previousScroll);
      const direction = scrollTop > previousScroll ? 'down' : 'up';
      
      setUserPattern(prev => ({
        ...prev,
        scrollBehavior: {
          velocity,
          direction,
          frequency: prev.scrollBehavior.frequency + 1
        }
      }));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('mousemove', trackUserMovement);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(systemUpdateInterval);
      clearInterval(hotspotAnalysisInterval);
      clearInterval(contentLoadingInterval);
      clearInterval(intelligenceEvolutionInterval);
    };
  }, [trackUserMovement, updateBuildingSystems, analyzeInteractionHotspots, predictiveContentLoading, evolveBuildingIntelligence, userPattern.scrollBehavior]);

  // Get building status color
  const getBuildingStatusColor = useCallback(() => {
    switch (buildingState.learningPhase) {
      case 'observing': return '#A6906D';
      case 'learning': return '#CD853F';
      case 'adapting': return '#8B7355';
      case 'optimized': return '#6D5940';
      default: return '#8B7355';
    }
  }, [buildingState.learningPhase]);

  return (
    <div 
      ref={systemRef}
      className={`smart-architectural-system relative ${className}`}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          rgba(247, 243, 233, ${1 - systemHeat.get() * 0.2}) 0%, 
          rgba(245, 240, 226, ${1 - systemHeat.get() * 0.15}) 100%)`
      }}
    >
      {/* Building Intelligence Status */}
      <motion.div
        className="fixed top-4 right-4 z-50 text-xs font-mono opacity-70"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.7, y: 0 }}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '8px',
          border: `2px solid ${getBuildingStatusColor()}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ color: getBuildingStatusColor(), fontWeight: '600' }}>
          Building Status: {buildingState.learningPhase.toUpperCase()}
        </div>
        <div style={{ fontSize: '10px', marginTop: '4px' }}>
          HVAC: {Math.round(buildingState.hvacFlow * 100)}% | 
          Lighting: {Math.round(buildingState.lightingLevel * 100)}% | 
          Occupancy: {Math.round(buildingState.occupancyDensity * 100)}%
        </div>
      </motion.div>

      {/* Revolutionary Architectural Cursor System */}
      <ArchitecturalCursor 
        magneticStrength={learningEnabled ? 250 : 200}
        thermalRadius={180}
        debrisCount={15}
        enabled={true}
      />
        
      {/* Structural Grid Foundation */}
      <ArchitecturalGrid 
        density={buildingState.occupancyDensity > 0.7 ? 'heavy' : buildingState.occupancyDensity > 0.3 ? 'medium' : 'light'}
        className="min-h-screen"
      >
        
        {/* Smart Material Wrapper */}
        <SmartMaterials 
          materialType={buildingType === 'residential' ? 'wood' : buildingType === 'commercial' ? 'steel' : 'concrete'}
          anticipatory={anticipatoryMode}
          className="min-h-screen"
        >
          
          {/* Morphing Forms Layer */}
          <MorphingForms 
            formType="wall"
            adaptToContent={learningEnabled}
            importance={buildingState.occupancyDensity}
          >
            
            {/* Main Content */}
            <div className="relative z-10">
              {children}
            </div>
            
          </MorphingForms>
          
        </SmartMaterials>
        
      </ArchitecturalGrid>

      {/* HVAC Flow Visualization */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(139, 115, 85, ${buildingState.hvacFlow * 0.05}) 0%, 
            transparent 60%)`
        }}
      />

      {/* Lighting System Simulation */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-15"
        style={{
          background: buildingState.lightingLevel < 0.5 
            ? `linear-gradient(180deg, 
                rgba(0, 0, 0, ${(1 - buildingState.lightingLevel) * 0.3}) 0%, 
                transparent 100%)`
            : 'none'
        }}
      />

      {/* User Interaction Hotspots */}
      <AnimatePresence>
        {learningEnabled && userPattern.interactionHotspots.map((hotspot, index) => (
          <motion.div
            key={`hotspot-${index}`}
            className="absolute pointer-events-none z-25"
            style={{
              left: hotspot.x - 15,
              top: hotspot.y - 15,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(139, 115, 85, ${Math.min(hotspot.frequency * 0.1, 0.5)}) 0%, 
                transparent 70%)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1 + (hotspot.frequency * 0.02), 
              opacity: Math.min(hotspot.frequency * 0.1, 0.8) 
            }}
            exit={{ scale: 0, opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Predictive Loading Indicators */}
      {anticipatoryMode && adaptationLevel > 0.5 && (
        <motion.div
          className="fixed bottom-4 left-4 z-40 text-xs font-mono opacity-60"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.6, x: 0 }}
          style={{
            background: 'rgba(139, 115, 85, 0.1)',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(139, 115, 85, 0.2)'
          }}
        >
          Building Intelligence: {Math.round(adaptationLevel * 100)}%
        </motion.div>
      )}

      {/* Environmental Stress Visualization */}
      {buildingState.environmentalStress > 0.3 && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            background: `repeating-linear-gradient(45deg, 
              transparent 0px, 
              rgba(139, 115, 85, ${buildingState.environmentalStress * 0.05}) 2px, 
              transparent 4px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export default SmartArchitecturalSystem; 