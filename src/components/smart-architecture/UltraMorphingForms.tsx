'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(MorphSVGPlugin)
  } catch (e) {
    console.log('MorphSVGPlugin not available')
  }
}

interface UltraMorphingFormsProps {
  intensity?: number
  className?: string
}

export default function UltraMorphingForms({ 
  intensity = 100, 
  className = '' 
}: UltraMorphingFormsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const morphingElementsRef = useRef<HTMLDivElement[]>([])
  const [currentPhase, setCurrentPhase] = useState(0)

  // Shape-shifting geometric forms
  const createMorphingGeometry = () => {
    if (!containerRef.current) return

    const shapes = [
      // Rectangle morphing to circle to triangle cycle
      {
        type: 'rectangle-to-organic',
        element: createMorphingDiv('morphing-rect'),
        phases: [
          { borderRadius: '0%', transform: 'scale(1) rotate(0deg)' },
          { borderRadius: '50%', transform: 'scale(1.1) rotate(45deg)' },
          { borderRadius: '20% 50% 30% 40%', transform: 'scale(0.95) rotate(90deg)' },
          { borderRadius: '50% 20% 50% 20%', transform: 'scale(1.05) rotate(135deg)' },
          { borderRadius: '0%', transform: 'scale(1) rotate(180deg)' }
        ]
      },
      // Navigation morphing between states
      {
        type: 'navigation-transformation',
        element: createMorphingDiv('morphing-nav'),
        phases: [
          { width: '100%', height: '60px', borderRadius: '0px' },
          { width: '80px', height: '80px', borderRadius: '50%' },
          { width: '200px', height: '200px', borderRadius: '20px' },
          { width: '60px', height: '300px', borderRadius: '30px' },
          { width: '100%', height: '60px', borderRadius: '0px' }
        ]
      },
      // Content blocks liquid mercury effect
      {
        type: 'liquid-content',
        element: createMorphingDiv('morphing-content'),
        phases: [
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%)' },
          { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
          { clipPath: 'polygon(0% 20%, 80% 0%, 100% 80%, 20% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        ]
      }
    ]

    shapes.forEach((shape, shapeIndex) => {
      const element = shape.element
      containerRef.current?.appendChild(element)
      morphingElementsRef.current.push(element)

      // Continuous morphing timeline
      const masterTl = gsap.timeline({ repeat: -1 })
      
      shape.phases.forEach((phase, phaseIndex) => {
        const nextPhase = shape.phases[(phaseIndex + 1) % shape.phases.length]
        
        masterTl.to(element, {
          ...nextPhase,
          duration: 8 + Math.random() * 4, // 8-12 seconds per phase
          ease: "power2.inOut",
          onUpdate: function() {
            // Add micro-variations during transition
            const progress = this.progress()
            const microVariation = Math.sin(progress * Math.PI * 4) * 0.02
            element.style.filter = `blur(${microVariation}px) hue-rotate(${progress * 10}deg)`
          }
        })
      })

      // Add secondary breathing animation
      const breathingTl = gsap.timeline({ repeat: -1 })
      breathingTl.to(element, {
        scale: 1.03,
        duration: 6 + Math.random() * 3,
        ease: "power1.inOut"
      })
      .to(element, {
        scale: 0.97,
        duration: 6 + Math.random() * 3,
        ease: "power1.inOut"
      })

      // Add material state changes
      const materialTl = gsap.timeline({ repeat: -1 })
      const baseHue = shapeIndex * 60 // Different base hue for each shape
      materialTl.to(element, {
        filter: `hue-rotate(${baseHue + 30}deg) saturate(1.2) brightness(1.1)`,
        duration: 12,
        ease: "power2.inOut"
      })
      .to(element, {
        filter: `hue-rotate(${baseHue - 20}deg) saturate(0.8) brightness(0.9)`,
        duration: 15,
        ease: "power2.inOut"
      })
      .to(element, {
        filter: `hue-rotate(${baseHue}deg) saturate(1) brightness(1)`,
        duration: 10,
        ease: "power2.inOut"
      })
    })
  }

  // Create morphing div helper
  function createMorphingDiv(className: string): HTMLDivElement {
    const div = document.createElement('div')
    div.className = `ultra-morphing-form ${className}`
    div.style.cssText = `
      position: absolute;
      background: rgba(139, 115, 85, 0.1);
      border: 1px solid rgba(139, 115, 85, 0.2);
      pointer-events: none;
      will-change: transform, border-radius, clip-path, filter;
      transition: none;
    `
    
    // Position based on type
    if (className.includes('rect')) {
      div.style.cssText += `
        top: 20%;
        left: 10%;
        width: 200px;
        height: 150px;
      `
    } else if (className.includes('nav')) {
      div.style.cssText += `
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: rgba(139, 115, 85, 0.05);
      `
    } else if (className.includes('content')) {
      div.style.cssText += `
        top: 50%;
        right: 10%;
        width: 300px;
        height: 200px;
        background: rgba(139, 115, 85, 0.08);
      `
    }
    
    return div
  }

  // Physics-based collision system
  const createCollisionDynamics = () => {
    if (!containerRef.current) return

    const collisionElements = morphingElementsRef.current
    
    collisionElements.forEach((element, index) => {
      // Random movement that causes collisions
      const movementTl = gsap.timeline({ repeat: -1 })
      
      movementTl.to(element, {
        x: `+=${(Math.random() - 0.5) * 200}`,
        y: `+=${(Math.random() - 0.5) * 100}`,
        duration: 10 + Math.random() * 5,
        ease: "power1.inOut",
        onUpdate: function() {
          checkCollisions(element, index)
        }
      })
      .to(element, {
        x: `+=${(Math.random() - 0.5) * 200}`,
        y: `+=${(Math.random() - 0.5) * 100}`,
        duration: 10 + Math.random() * 5,
        ease: "power1.inOut",
        onUpdate: function() {
          checkCollisions(element, index)
        }
      })
    })
  }

  // Collision detection and response
  function checkCollisions(element: HTMLDivElement, elementIndex: number) {
    const rect1 = element.getBoundingClientRect()
    
    morphingElementsRef.current.forEach((otherElement, otherIndex) => {
      if (elementIndex === otherIndex) return
      
      const rect2 = otherElement.getBoundingClientRect()
      
      // Simple AABB collision detection
      if (rect1.left < rect2.right && 
          rect1.right > rect2.left && 
          rect1.top < rect2.bottom && 
          rect1.bottom > rect2.top) {
        
        // Collision detected - bounce away
        const angle = Math.random() * Math.PI * 2
        const force = 50 + Math.random() * 30
        
        gsap.to(element, {
          x: `+=${Math.cos(angle) * force}`,
          y: `+=${Math.sin(angle) * force}`,
          rotation: `+=${(Math.random() - 0.5) * 180}`,
          duration: 0.5,
          ease: "bounce.out"
        })
        
        gsap.to(otherElement, {
          x: `+=${Math.cos(angle + Math.PI) * force}`,
          y: `+=${Math.sin(angle + Math.PI) * force}`,
          rotation: `+=${(Math.random() - 0.5) * 180}`,
          duration: 0.5,
          ease: "bounce.out"
        })
        
        // Visual collision effect
        element.style.filter = 'brightness(1.5) saturate(2)'
        otherElement.style.filter = 'brightness(1.5) saturate(2)'
        
        setTimeout(() => {
          element.style.filter = ''
          otherElement.style.filter = ''
        }, 200)
      }
    })
  }

  // Anti-gravity floating elements
  const createAntiGravityZones = () => {
    if (!containerRef.current) return

    // Create floating elements that defy gravity
    for (let i = 0; i < 5; i++) {
      const floater = document.createElement('div')
      floater.className = 'anti-gravity-element'
      floater.style.cssText = `
        position: absolute;
        width: ${20 + Math.random() * 40}px;
        height: ${20 + Math.random() * 40}px;
        background: radial-gradient(circle, rgba(139, 115, 85, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        will-change: transform;
        z-index: 1;
      `
      
      containerRef.current.appendChild(floater)
      morphingElementsRef.current.push(floater)
      
      // Continuous floating upward motion
      const floatingTl = gsap.timeline({ repeat: -1 })
      floatingTl.to(floater, {
        y: '-=50vh',
        rotation: 360,
        duration: 15 + Math.random() * 10,
        ease: "none"
      })
      .set(floater, {
        y: '50vh'
      })
      
      // Organic floating motion
      const organicTl = gsap.timeline({ repeat: -1 })
      organicTl.to(floater, {
        x: `+=${(Math.random() - 0.5) * 100}`,
        duration: 8 + Math.random() * 4,
        ease: "power1.inOut"
      })
      .to(floater, {
        x: `+=${(Math.random() - 0.5) * 100}`,
        duration: 8 + Math.random() * 4,
        ease: "power1.inOut"
      })
    }
  }

  // Ultra-slow layout evolution (2-5 minute cycles)
  const createLayoutEvolution = () => {
    if (!containerRef.current) return

    const evolutionTl = gsap.timeline({ repeat: -1 })
    
    // Phase 1: Grid layout (2 minutes)
    evolutionTl.to(containerRef.current, {
      background: 'linear-gradient(45deg, rgba(139, 115, 85, 0.05), rgba(139, 115, 85, 0.1))',
      duration: 120,
      ease: "power1.inOut"
    })
    
    // Phase 2: Radial layout (3 minutes)
    .to(containerRef.current, {
      background: 'radial-gradient(circle, rgba(139, 115, 85, 0.08), rgba(139, 115, 85, 0.03))',
      duration: 180,
      ease: "power1.inOut"
    })
    
    // Phase 3: Organic flowing layout (2.5 minutes)
    .to(containerRef.current, {
      background: 'conic-gradient(from 0deg, rgba(139, 115, 85, 0.06), rgba(139, 115, 85, 0.12), rgba(139, 115, 85, 0.04))',
      duration: 150,
      ease: "power1.inOut"
    })
    
    // Phase 4: Return to base (1.5 minutes)
    .to(containerRef.current, {
      background: 'transparent',
      duration: 90,
      ease: "power1.inOut"
    })

    // Update current phase for external tracking
    evolutionTl.call(() => setCurrentPhase(0), [], 0)
    evolutionTl.call(() => setCurrentPhase(1), [], 120)
    evolutionTl.call(() => setCurrentPhase(2), [], 300)
    evolutionTl.call(() => setCurrentPhase(3), [], 450)
  }

  // Initialize all ultra-morphing systems
  useEffect(() => {
    if (!containerRef.current) return

    const timeouts: NodeJS.Timeout[] = []

    // Stagger initialization to prevent performance spike
    timeouts.push(setTimeout(createMorphingGeometry, 100))
    timeouts.push(setTimeout(createCollisionDynamics, 500))
    timeouts.push(setTimeout(createAntiGravityZones, 1000))
    timeouts.push(setTimeout(createLayoutEvolution, 1500))

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      
      // Cleanup morphing elements
      morphingElementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element)
        }
      })
      morphingElementsRef.current.length = 0
      
      // Kill all GSAP animations on this container
      gsap.killTweensOf(containerRef.current)
      gsap.killTweensOf(morphingElementsRef.current)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`ultra-morphing-forms-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
        willChange: 'background',
        opacity: intensity / 100
      }}
    >
      {/* Phase indicator */}
      <div 
        style={{
          position: 'absolute',
          top: '50px',
          right: '10px',
          background: 'rgba(0,0,0,0.3)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '11px',
          fontFamily: 'monospace',
          zIndex: 10
        }}
      >
        Morph Phase: {currentPhase + 1}/4
      </div>
    </div>
  )
} 