'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  intensity: number;
  type: 'magnetic' | 'thermal' | 'debris' | 'sparks';
}

interface ArchitecturalCursorProps {
  magneticStrength?: number;
  thermalRadius?: number;
  debrisCount?: number;
  enabled?: boolean;
}

export const ArchitecturalCursor: React.FC<ArchitecturalCursorProps> = ({
  magneticStrength = 200,
  thermalRadius = 150,
  debrisCount = 12,
  enabled = true
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [clickIntensity, setClickIntensity] = useState(0);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);
  const animationRef = useRef<number>();

  // Revolutionary Cursor Tracking with Physics
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enabled) return;
    
    const x = e.clientX;
    const y = e.clientY;
    setCursorPosition({ x, y });

    // Create trails based on movement speed
    const now = Date.now();
    const velocity = Math.sqrt(
      Math.pow(x - cursorPosition.x, 2) + Math.pow(y - cursorPosition.y, 2)
    );

    if (now - lastTrailTime.current > 50 - Math.min(velocity * 2, 45)) {
      const trailType = velocity > 50 ? 'sparks' : 
                       velocity > 20 ? 'debris' :
                       isPressed ? 'thermal' : 'magnetic';

      setTrails(prev => [...prev.slice(-debrisCount), {
        id: trailIdRef.current++,
        x,
        y,
        timestamp: now,
        intensity: Math.min(velocity / 100, 1),
        type: trailType
      }]);
      
      lastTrailTime.current = now;
    }

    // Apply magnetic effects to nearby elements
    applyMagneticField(x, y, velocity);
  }, [cursorPosition, isPressed, enabled, debrisCount]);

  // Magnetic Field System
  const applyMagneticField = useCallback((x: number, y: number, velocity: number) => {
    const elements = document.querySelectorAll('.proximity-responsive');
    
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      if (distance < magneticStrength) {
        const intensity = 1 - (distance / magneticStrength);
        const pullX = (x - centerX) * intensity * 0.1;
        const pullY = (y - centerY) * intensity * 0.1;
        const rotation = Math.sin(Date.now() * 0.01) * intensity * 2;

        (element as HTMLElement).style.transform = 
          `translate(${pullX}px, ${pullY}px) rotate(${rotation}deg) scale(${1 + intensity * 0.05})`;
        
        // Thermal effect
        if (distance < thermalRadius) {
          const hue = 20 - (intensity * 40); // Blue to red
          (element as HTMLElement).style.filter = 
            `hue-rotate(${hue}deg) brightness(${1 + intensity * 0.2})`;
        }
      } else {
        // Reset when outside range
        (element as HTMLElement).style.transform = '';
        (element as HTMLElement).style.filter = '';
      }
    });
  }, [magneticStrength, thermalRadius]);

  // Click Effects System
  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
    setClickIntensity(1);
    
    // Create explosion of debris
    const explosionTrails: CursorTrail[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 30 + Math.random() * 20;
      explosionTrails.push({
        id: trailIdRef.current++,
        x: cursorPosition.x + Math.cos(angle) * distance,
        y: cursorPosition.y + Math.sin(angle) * distance,
        timestamp: Date.now(),
        intensity: 0.8 + Math.random() * 0.2,
        type: 'sparks'
      });
    }
    
    setTrails(prev => [...prev, ...explosionTrails]);
  }, [cursorPosition]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    setClickIntensity(0);
  }, []);

  // Trail Cleanup Animation
  useEffect(() => {
    const cleanup = () => {
      setTrails(prev => prev.filter(trail => 
        Date.now() - trail.timestamp < 2000
      ));
      
      setClickIntensity(prev => prev > 0 ? prev * 0.95 : 0);
      
      animationRef.current = requestAnimationFrame(cleanup);
    };
    
    if (enabled) {
      animationRef.current = requestAnimationFrame(cleanup);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled]);
    
  // Event Listeners
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main Cursor Enhancement */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none transition-none"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          background: `radial-gradient(circle, 
            rgba(107, 68, 35, ${0.6 + clickIntensity * 0.4}) 0%,
            rgba(139, 69, 19, ${0.4 + clickIntensity * 0.3}) 30%,
            rgba(160, 82, 45, ${0.2 + clickIntensity * 0.2}) 60%,
            transparent 100%)`,
          transform: `scale(${1 + clickIntensity * 0.5}) rotate(${Date.now() * 0.1}deg)`,
          boxShadow: `0 0 ${20 + clickIntensity * 30}px rgba(107, 68, 35, ${0.3 + clickIntensity * 0.5})`,
          filter: `blur(${clickIntensity * 2}px)`,
        }}
      />

      {/* Magnetic Field Visualization */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          left: cursorPosition.x - magneticStrength / 2,
          top: cursorPosition.y - magneticStrength / 2,
          width: magneticStrength,
          height: magneticStrength,
          border: `1px solid rgba(107, 68, 35, ${0.1 + clickIntensity * 0.2})`,
          borderRadius: '50%',
          animation: 'magneticPulse 3s infinite ease-in-out',
        }}
      />

      {/* Thermal Field */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          left: cursorPosition.x - thermalRadius / 2,
          top: cursorPosition.y - thermalRadius / 2,
          width: thermalRadius,
          height: thermalRadius,
          background: `radial-gradient(circle, 
            rgba(255, 69, 0, ${0.05 + clickIntensity * 0.1}) 0%,
            transparent 70%)`,
          animation: 'thermalShimmer 2s infinite ease-in-out',
        }}
      />

      {/* Cursor Trails and Debris */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
            width: 4 + trail.intensity * 8,
            height: 4 + trail.intensity * 8,
            background: getTrailColor(trail.type, trail.intensity),
            borderRadius: trail.type === 'debris' ? '0' : '50%',
            opacity: Math.max(0, 1 - (Date.now() - trail.timestamp) / 2000),
            transform: `
              scale(${trail.intensity})
              rotate(${(Date.now() - trail.timestamp) * 0.5}deg)
            `,
            animation: `${getTrailAnimation(trail.type)} ${2 - trail.intensity}s ease-out forwards`,
          }}
        />
      ))}

      {/* Architectural Grid Lines Following Cursor */}
      <svg
        className="fixed inset-0 pointer-events-none opacity-20"
              style={{
          width: '100vw',
          height: '100vh',
              }}
            >
        {/* Dynamic grid lines that bend toward cursor */}
        <defs>
          <pattern
            id="architecturalGrid"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(107, 68, 35, 0.3)"
              strokeWidth="0.5"
              />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#architecturalGrid)"
          style={{
            transform: `translate(${Math.sin(cursorPosition.x * 0.01) * 2}px, ${Math.cos(cursorPosition.y * 0.01) * 2}px)`,
          }}
        />
        
        {/* Cursor-following construction lines */}
        <line
          x1="0"
          y1={cursorPosition.y}
          x2="100%"
          y2={cursorPosition.y}
          stroke="rgba(107, 68, 35, 0.15)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <line
          x1={cursorPosition.x}
          y1="0"
          x2={cursorPosition.x}
          y2="100%"
          stroke="rgba(107, 68, 35, 0.15)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </svg>

      <style jsx>{`
        @keyframes magneticPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.1; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.3; }
        }
        
        @keyframes thermalShimmer {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(90deg); }
        }
        
        @keyframes trailFade {
          0% { opacity: 1; transform: scale(1) translateY(0px); }
          100% { opacity: 0; transform: scale(0.1) translateY(-20px); }
        }
        
        @keyframes debrisFall {
          0% { opacity: 1; transform: scale(1) rotate(0deg) translateY(0px); }
          100% { opacity: 0; transform: scale(0.3) rotate(360deg) translateY(50px); }
        }
        
        @keyframes sparksExplode {
          0% { opacity: 1; transform: scale(1) translateY(0px); }
          100% { opacity: 0; transform: scale(2) translateY(-30px); }
        }
        
        @keyframes thermalDissipate {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(3); filter: blur(10px); }
        }
      `}</style>
    </div>
  );
};

// Helper Functions
function getTrailColor(type: CursorTrail['type'], intensity: number): string {
  const alpha = intensity * 0.8;
  
  switch (type) {
    case 'magnetic':
      return `rgba(107, 68, 35, ${alpha})`;
    case 'thermal':
      return `rgba(255, 69, 0, ${alpha})`;
    case 'debris':
      return `rgba(93, 64, 55, ${alpha})`;
    case 'sparks':
      return `rgba(255, 140, 0, ${alpha})`;
    default:
      return `rgba(107, 68, 35, ${alpha})`;
  }
}

function getTrailAnimation(type: CursorTrail['type']): string {
  switch (type) {
    case 'magnetic':
      return 'trailFade';
    case 'thermal':
      return 'thermalDissipate';
    case 'debris':
      return 'debrisFall';
    case 'sparks':
      return 'sparksExplode';
    default:
      return 'trailFade';
  }
}

export default ArchitecturalCursor; 