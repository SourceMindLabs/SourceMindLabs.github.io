'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxLayer {
  id: string
  depth: number
  direction: 'up' | 'down' | 'left' | 'right' | 'diagonal'
  speed: number
  rotationSpeed?: number
  scaleSpeed?: number
  opacityChange?: boolean
}

interface UltraParallaxLayersProps {
  intensity?: number
  className?: string
}

export default function UltraParallaxLayers({ 
  intensity = 100, 
  className = '' 
}: UltraParallaxLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerElementsRef = useRef<HTMLDivElement[]>([])
  const scrollPositionRef = useRef(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Define 7 different parallax layers with complex behaviors
  const parallaxLayers: ParallaxLayer[] = [
    {
      id: 'background-foundation',
      depth: 0.1,
      direction: 'up',
      speed: 0.1,
      rotationSpeed: 0.02,
      opacityChange: false
    },
    {
      id: 'structural-beams',
      depth: 0.25,
      direction: 'diagonal',
      speed: 0.3,
      rotationSpeed: 0.05,
      scaleSpeed: 0.02
    },
    {
      id: 'mid-architecture',
      depth: 0.4,
      direction: 'down',
      speed: 0.5,
      rotationSpeed: -0.03,
      opacityChange: true
    },
    {
      id: 'floating-elements',
      depth: 0.6,
      direction: 'left',
      speed: 0.7,
      scaleSpeed: 0.05,
      opacityChange: true
    },
    {
      id: 'interactive-layer',
      depth: 0.75,
      direction: 'right',
      speed: 0.9,
      rotationSpeed: 0.1,
      scaleSpeed: 0.03
    },
    {
      id: 'foreground-details',
      depth: 0.9,
      direction: 'up',
      speed: 1.2,
      rotationSpeed: -0.08,
      opacityChange: true
    },
    {
      id: 'surface-particles',
      depth: 1.0,
      direction: 'diagonal',
      speed: 1.5,
      rotationSpeed: 0.15,
      scaleSpeed: 0.08
    }
  ]

  // Create visual elements for each parallax layer
  const createParallaxElements = () => {
    if (!containerRef.current) return

    parallaxLayers.forEach((layer, layerIndex) => {
      const layerContainer = document.createElement('div')
      layerContainer.className = `parallax-layer parallax-layer-${layer.id}`
      layerContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: ${layerIndex + 1};
        will-change: transform, opacity;
        overflow: hidden;
      `

      // Create elements within each layer
      const elementCount = Math.floor(20 - (layer.depth * 15)) // More elements in background
      for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div')
        element.className = `parallax-element ${layer.id}-element-${i}`
        
        // Different visual styles based on layer depth
        if (layer.depth < 0.3) {
          // Background architectural elements
          element.style.cssText = `
            position: absolute;
            width: ${50 + Math.random() * 200}px;
            height: ${20 + Math.random() * 100}px;
            background: linear-gradient(${Math.random() * 360}deg, 
              rgba(139, 115, 85, ${0.05 + Math.random() * 0.1}), 
              rgba(139, 115, 85, ${0.02 + Math.random() * 0.05})
            );
            border-radius: ${Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            will-change: transform;
          `
        } else if (layer.depth < 0.6) {
          // Mid-layer structural elements
          element.style.cssText = `
            position: absolute;
            width: ${30 + Math.random() * 80}px;
            height: ${30 + Math.random() * 80}px;
            background: rgba(139, 115, 85, ${0.1 + Math.random() * 0.2});
            clip-path: polygon(
              ${Math.random() * 30}% 0%, 
              100% ${Math.random() * 30}%, 
              ${70 + Math.random() * 30}% 100%, 
              0% ${70 + Math.random() * 30}%
            );
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            will-change: transform;
          `
        } else {
          // Foreground detailed elements
          element.style.cssText = `
            position: absolute;
            width: ${10 + Math.random() * 40}px;
            height: ${10 + Math.random() * 40}px;
            background: radial-gradient(circle, 
              rgba(139, 115, 85, ${0.2 + Math.random() * 0.4}), 
              transparent
            );
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            will-change: transform;
          `
        }
        
        layerContainer.appendChild(element)
      }

             containerRef.current!.appendChild(layerContainer)
      layerElementsRef.current.push(layerContainer)
    })
  }

  // Advanced scroll-triggered parallax with multiple movement types
  const setupScrollParallax = () => {
    if (!containerRef.current) return

    layerElementsRef.current.forEach((layerElement, layerIndex) => {
      const layer = parallaxLayers[layerIndex]
      const elements = layerElement.querySelectorAll('.parallax-element')

             // Create ScrollTrigger for the entire layer
       ScrollTrigger.create({
         trigger: containerRef.current!,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const direction = self.direction
          const velocity = Math.abs(self.getVelocity()) / 1000
          
          // Calculate movement based on layer properties
          let translateX = 0
          let translateY = 0
          let rotation = 0
          let scale = 1
          let opacity = 1

          // Direction-based movement
          switch (layer.direction) {
            case 'up':
              translateY = progress * layer.speed * -100
              break
            case 'down':
              translateY = progress * layer.speed * 100
              break
            case 'left':
              translateX = progress * layer.speed * -50
              break
            case 'right':
              translateX = progress * layer.speed * 50
              break
            case 'diagonal':
              translateX = progress * layer.speed * -30
              translateY = progress * layer.speed * -50
              break
          }

          // Add rotation if specified
          if (layer.rotationSpeed) {
            rotation = progress * layer.rotationSpeed * 360
          }

          // Add scale changes if specified
          if (layer.scaleSpeed) {
            scale = 1 + (Math.sin(progress * Math.PI * 2) * layer.scaleSpeed)
          }

          // Add opacity changes if specified
          if (layer.opacityChange) {
            opacity = 0.3 + (Math.sin(progress * Math.PI) * 0.7)
          }

          // Add velocity-based effects
          const velocityScale = Math.min(velocity * 2, 1)
          rotation += direction * velocityScale * 10
          scale += velocityScale * 0.1

          // Apply transformations to layer
          gsap.set(layerElement, {
            x: translateX,
            y: translateY,
            rotation: rotation,
            scale: scale,
            opacity: opacity,
            ease: "none"
          })

          // Individual element animations within layer
          elements.forEach((element, elementIndex) => {
            const elementOffset = (elementIndex / elements.length) * 100
            const elementPhase = (progress + elementOffset / 100) % 1
            
            gsap.set(element, {
              x: Math.sin(elementPhase * Math.PI * 4) * 20,
              y: Math.cos(elementPhase * Math.PI * 3) * 15,
                             rotation: elementPhase * 180 * (layer.rotationSpeed || 0),
              scale: 1 + Math.sin(elementPhase * Math.PI * 6) * 0.1,
              ease: "none"
            })
          })

          // Track scroll state
          setIsScrolling(velocity > 0.1)
          scrollPositionRef.current = progress
        }
      })
    })
  }

  // Magnetic scroll momentum effects
  const createScrollMomentum = () => {
    if (!containerRef.current) return

    let lastScrollY = 0
    let momentum = 0
    let isDecelerating = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      momentum = delta
      lastScrollY = currentScrollY

      if (!isDecelerating) {
        isDecelerating = true
        
        // Create momentum-based secondary animations
        layerElementsRef.current.forEach((layerElement, layerIndex) => {
          const layer = parallaxLayers[layerIndex]
          const momentumStrength = Math.abs(momentum) * layer.depth * 0.1
          
          gsap.to(layerElement, {
            x: `+=${momentum > 0 ? momentumStrength : -momentumStrength}`,
                         rotation: `+=${momentum * (layer.rotationSpeed || 0)}`,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              isDecelerating = false
            }
          })
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }

  // Intersection-based layer activation
  const createIntersectionTriggers = () => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const layerIndex = parseInt(entry.target.getAttribute('data-layer-index') || '0')
          const layer = parallaxLayers[layerIndex]
          
          if (entry.isIntersecting) {
            // Activate layer with staggered element reveals
            const elements = entry.target.querySelectorAll('.parallax-element')
            gsap.fromTo(elements, {
              opacity: 0,
              scale: 0.8,
              y: 50
            }, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              stagger: {
                amount: 2,
                from: "random"
              }
            })
          } else {
            // Deactivate layer for performance
            const elements = entry.target.querySelectorAll('.parallax-element')
            gsap.to(elements, {
              opacity: 0.3,
              scale: 0.9,
              duration: 0.5,
              ease: "power2.out"
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    layerElementsRef.current.forEach((layer, index) => {
      layer.setAttribute('data-layer-index', index.toString())
      observer.observe(layer)
    })

    return () => observer.disconnect()
  }

  // Initialize all parallax systems
  useEffect(() => {
    if (!containerRef.current) return

    const cleanupFunctions: (() => void)[] = []

    // Stagger initialization for performance
    setTimeout(() => {
      createParallaxElements()
    }, 100)

    setTimeout(() => {
      setupScrollParallax()
    }, 500)

    setTimeout(() => {
      const momentumCleanup = createScrollMomentum()
      if (momentumCleanup) cleanupFunctions.push(momentumCleanup)
    }, 1000)

    setTimeout(() => {
      const intersectionCleanup = createIntersectionTriggers()
      if (intersectionCleanup) cleanupFunctions.push(intersectionCleanup)
    }, 1500)

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
      
      // Cleanup parallax elements
      layerElementsRef.current.forEach(layer => {
        if (layer.parentNode) {
          layer.parentNode.removeChild(layer)
        }
      })
      layerElementsRef.current.length = 0
      
      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf(layerElementsRef.current)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`ultra-parallax-layers ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: intensity / 100
      }}
    >
      {/* Scroll velocity indicator */}
      <div 
        style={{
          position: 'fixed',
          top: '90px',
          right: '10px',
          background: isScrolling ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,0,0.3)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '11px',
          fontFamily: 'monospace',
          zIndex: 1000,
          transition: 'background 0.3s ease'
        }}
      >
        Scroll: {isScrolling ? 'ACTIVE' : 'IDLE'} | Pos: {Math.round(scrollPositionRef.current * 100)}%
      </div>
      
      {/* Layer depth indicators */}
      <div 
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '10px',
          fontFamily: 'monospace',
          zIndex: 1000,
          lineHeight: '1.3'
        }}
      >
        <div>Parallax Layers Active: {parallaxLayers.length}</div>
        <div>Depth Range: 0.1 → 1.0</div>
        <div>Speed Range: 0.1x → 1.5x</div>
      </div>
    </div>
  )
} 