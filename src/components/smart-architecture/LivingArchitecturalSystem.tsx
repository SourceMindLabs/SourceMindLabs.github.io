'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import ArchitecturalCursor from './ArchitecturalCursor'

interface ArchitecturalZone {
  id: string
  type: 'compression' | 'expansion' | 'transit' | 'double-height' | 'mezzanine'
  thermal: 'cold' | 'cool' | 'neutral' | 'warm' | 'hot'
  stress: number
  age: number
  traffic: number
}

interface GravityField {
  direction: number // 0-360 degrees
  strength: number
  transition: boolean
}

interface LivingArchitecturalSystemProps {
  children?: React.ReactNode
  animationIntensity?: number
  reducedMotion?: boolean
  enableCursor?: boolean
  enableThermal?: boolean
  enableGravity?: boolean
  className?: string
}

export const LivingArchitecturalSystem: React.FC<LivingArchitecturalSystemProps> = ({
  children, 
  animationIntensity = 100,
  reducedMotion = false,
  enableCursor = true,
  enableThermal = true,
  enableGravity = true,
  className = ''
}) => {
  const [sessionAge, setSessionAge] = useState(0)
  const [zones, setZones] = useState<ArchitecturalZone[]>([])
  const [gravityField, setGravityField] = useState<GravityField>({
    direction: 270, // Down
    strength: 1,
    transition: false
  })
  const [perspective, setPerspective] = useState<'isometric' | 'perspective' | 'elevation'>('isometric')
  const [constructionPhase, setConstructionPhase] = useState<'blueprint' | '3d-model' | 'realistic'>('blueprint')
  const [thermalZones, setThermalZones] = useState<Map<string, number>>(new Map())
  
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTime = useRef<number>(Date.now())
  
  // Session-based architectural evolution
  useEffect(() => {
    const startTime = Date.now()
    
    const updateSessionAge = () => {
      const age = (Date.now() - startTime) / 1000 // seconds
      setSessionAge(age)

      // Evolve construction phase based on session duration
      if (age > 300) { // 5 minutes
        setConstructionPhase('realistic')
      } else if (age > 120) { // 2 minutes
        setConstructionPhase('3d-model')
      } else {
        setConstructionPhase('blueprint')
      }
      
      // Rotate gravity direction every 2 minutes
      if (Math.floor(age / 120) !== Math.floor((age - 1) / 120)) {
        rotateGravity()
      }
      
      // Change perspective every 90 seconds
      if (Math.floor(age / 90) !== Math.floor((age - 1) / 90)) {
        rotatePerspective()
      }
    }
    
    const interval = setInterval(updateSessionAge, 1000)
    return () => clearInterval(interval)
  }, [])

  // Gravity rotation system
  const rotateGravity = useCallback(() => {
    if (!enableGravity) return
    
    setGravityField(prev => ({
      ...prev,
      transition: true
    }))
    
    setTimeout(() => {
      setGravityField(prev => ({
        direction: (prev.direction + 90) % 360,
        strength: 0.8 + Math.random() * 0.4,
        transition: false
      }))
    }, 500)
  }, [enableGravity])
        
  // Perspective rotation system
  const rotatePerspective = useCallback(() => {
    const perspectives: Array<'isometric' | 'perspective' | 'elevation'> = 
      ['isometric', 'perspective', 'elevation']
    const currentIndex = perspectives.indexOf(perspective)
    const nextIndex = (currentIndex + 1) % perspectives.length
    setPerspective(perspectives[nextIndex])
  }, [perspective])

  // Thermal zone management
  const updateThermalZone = useCallback((zoneId: string, temperature: number) => {
    if (!enableThermal) return
    
    setThermalZones(prev => {
      const newMap = new Map(prev)
      newMap.set(zoneId, temperature)
      return newMap
    })
  }, [enableThermal])

  // Architectural zone stress tracking
  const recordInteraction = useCallback((zoneId: string, intensity: number = 1) => {
    setZones(prev => {
      const zoneIndex = prev.findIndex(z => z.id === zoneId)
      if (zoneIndex === -1) {
        // Create new zone
        return [...prev, {
          id: zoneId,
          type: 'compression',
          thermal: 'neutral',
          stress: intensity,
          age: 0,
          traffic: 1
        }]
        } else {
        // Update existing zone
        const updatedZones = [...prev]
        updatedZones[zoneIndex] = {
          ...updatedZones[zoneIndex],
          stress: Math.min(updatedZones[zoneIndex].stress + intensity, 10),
          traffic: updatedZones[zoneIndex].traffic + 1
        }
        return updatedZones
      }
    })
  }, [])

  // Continuous architectural breathing system
  useEffect(() => {
    if (reducedMotion) return
    
    const breathingCycle = () => {
      const now = Date.now()
      const deltaTime = now - lastFrameTime.current
      lastFrameTime.current = now
      
      // Update zone aging and self-healing
      setZones(prev => prev.map(zone => ({
        ...zone,
        age: zone.age + deltaTime / 1000,
        stress: Math.max(0, zone.stress - 0.001) // Gradual stress relief
      })).filter(zone => zone.age < 3600)) // Remove zones older than 1 hour
      
      // Apply architectural breathing to container
      if (containerRef.current) {
        const breathingPhase = Math.sin(now * 0.001) * 0.002
        const microVibration = Math.sin(now * 0.01) * 0.0005
        
        containerRef.current.style.transform = 
          `scale(${1 + breathingPhase}) rotateX(${microVibration}deg)`
      }
      
      animationFrameRef.current = requestAnimationFrame(breathingCycle)
    }
    
    animationFrameRef.current = requestAnimationFrame(breathingCycle)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [reducedMotion])

  // Get CSS transforms for current architectural state
  const getArchitecturalTransform = useCallback(() => {
    const gravityRotation = enableGravity ? gravityField.direction - 270 : 0
    const perspectiveTransform = 
      perspective === 'isometric' ? 'rotateX(30deg) rotateY(45deg)' :
      perspective === 'perspective' ? 'perspective(1000px) rotateX(10deg)' :
      'rotateX(0deg) rotateY(0deg)'
    
    return `${perspectiveTransform} rotateZ(${gravityRotation}deg)`
  }, [enableGravity, gravityField.direction, perspective])

  // Get construction phase styling
  const getConstructionStyling = useCallback(() => {
    switch (constructionPhase) {
      case 'blueprint':
        return {
          filter: 'contrast(1.2) hue-rotate(200deg)',
          borderStyle: 'dashed',
          opacity: 0.9
        }
      case '3d-model':
        return {
          filter: 'contrast(1.1) brightness(1.1)',
          borderStyle: 'solid',
          opacity: 0.95
        }
      case 'realistic':
        return {
          filter: 'contrast(1) brightness(1)',
          borderStyle: 'none',
          opacity: 1
        }
      default:
        return {}
    }
  }, [constructionPhase])

  return (
    <div 
      ref={containerRef}
      className={`architectural-system ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '2000px',
        ...getConstructionStyling()
      }}
      data-construction-phase={constructionPhase}
      data-perspective={perspective}
      data-session-age={Math.floor(sessionAge)}
    >
      {/* Revolutionary Cursor System */}
      {enableCursor && !reducedMotion && (
        <ArchitecturalCursor
          magneticStrength={200}
          thermalRadius={150}
          debrisCount={12}
          enabled={true}
      />
      )}
      
      {/* Architectural Grid Foundation */}
      <div 
        className="architectural-grid gpu-accelerated"
        style={{
          transform: getArchitecturalTransform(),
          transition: gravityField.transition ? 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        {children}
      </div>
      
      {/* Stress Visualization Overlay */}
      {zones.map(zone => (
        <StressVisualization
          key={zone.id}
          zone={zone}
          visible={zone.stress > 2}
        />
      ))}
      
      {/* Thermal Zones Overlay */}
      {enableThermal && (
        <ThermalOverlay 
          zones={thermalZones}
          intensity={animationIntensity / 100}
        />
      )}
      
      {/* Gravitational Field Indicator */}
      {enableGravity && !reducedMotion && (
        <GravityIndicator
          direction={gravityField.direction}
          strength={gravityField.strength}
          transitioning={gravityField.transition}
        />
      )}
      
      {/* Construction Phase Indicator */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div className="text-xs font-mono text-material-steel opacity-50">
          Phase: {constructionPhase} | Age: {Math.floor(sessionAge)}s | 
          Perspective: {perspective} | Gravity: {gravityField.direction}°
        </div>
      </div>

      <style jsx>{`
        .architectural-system {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--material-concrete);
          animation: 
            systemBreathing var(--slow-cycle) infinite ease-in-out,
            systemThermalShift var(--medium-cycle) infinite linear;
        }
        
        @keyframes systemBreathing {
          0%, 100% { 
            filter: brightness(1) contrast(1);
            transform: scale(1);
          }
          50% { 
            filter: brightness(1.02) contrast(1.05);
            transform: scale(1.001);
          }
        }
        
        @keyframes systemThermalShift {
          0%, 100% { background: var(--material-concrete); }
          25% { background: var(--material-plaster); }
          50% { background: var(--material-travertine); }
          75% { background: var(--material-plaster); }
        }
        
        .architectural-grid {
          position: relative;
          z-index: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .architectural-system {
            animation: none;
            transform: none !important;
            filter: none !important;
          }
          
          .architectural-grid {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// Stress Visualization Component
const StressVisualization: React.FC<{ zone: ArchitecturalZone; visible: boolean }> = ({ 
  zone, 
  visible 
}) => {
  if (!visible) return null
  
  return (
    <div
      className="fixed pointer-events-none z-40"
      style={{
        left: '50%',
        top: '50%',
        width: '100px',
        height: '100px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, 
          rgba(255, 0, 0, ${zone.stress * 0.1}) 0%,
          transparent 70%)`,
        animation: `stressPulse ${Math.max(0.5, 3 - zone.stress)}s infinite ease-in-out`
      }}
    >
      <style jsx>{`
        @keyframes stressPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// Thermal Overlay Component
const ThermalOverlay: React.FC<{ zones: Map<string, number>; intensity: number }> = ({ 
  zones, 
  intensity 
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {Array.from(zones.entries()).map(([zoneId, temperature]) => (
        <div
          key={zoneId}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: `${100 + temperature * 50}px`,
            height: `${100 + temperature * 50}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle,
              rgba(${temperature > 0 ? '255, 69, 0' : '0, 150, 255'}, ${Math.abs(temperature) * intensity * 0.1}) 0%,
              transparent 70%)`,
            animation: `thermalFlow ${3 + Math.abs(temperature)}s infinite ease-in-out`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes thermalFlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

// Gravity Indicator Component
const GravityIndicator: React.FC<{ 
  direction: number; 
  strength: number; 
  transitioning: boolean;
}> = ({ direction, strength, transitioning }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      <div 
        className="w-16 h-16 border-2 border-material-steel rounded-full flex items-center justify-center"
        style={{
          opacity: transitioning ? 1 : 0.3,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <div
          className="w-8 h-8"
          style={{
            transform: `rotate(${direction}deg)`,
            transition: transitioning ? 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          <div
            className="w-full h-0.5 bg-material-steel"
            style={{
              transformOrigin: 'center',
              transform: `scaleX(${strength})`
            }}
          />
          <div
            className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-material-steel ml-3 -mt-1"
          />
        </div>
      </div>
    </div>
  )
}

export default LivingArchitecturalSystem 