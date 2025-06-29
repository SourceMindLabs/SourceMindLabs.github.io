"use client";

import { useRef, useEffect } from 'react';
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const researchPillars = [
  {
    title: "Neuro-Inspired Models",
    desc: "We build large-scale models inspired by the architectural and algorithmic principles of the brain.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C10 14.4772 14.4772 10 20 10V10C25.5228 10 30 14.4772 30 20V30H10V20Z" stroke="currentColor" strokeWidth="2" />
        <path d="M20 10V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 13V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 13V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Reinforcement Learning",
    desc: "Our work in RL aims to create agents that learn efficiently and generalize broadly, informed by biological reward systems.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 24L20 30L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    ),
  },
  {
    title: "Foundational AI",
    desc: "We explore the core components of intelligence and develop theoretical frameworks for building robust, general systems.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10V16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 30V24H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI Ethics & Safety",
    desc: "We are committed to the responsible development of AI, ensuring that our systems are fair, transparent, and aligned with human values.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35C20 35 30 30 30 20V10L20 5L10 10V20C10 30 20 35 20 35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 20L18 23L25 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const auroraRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    // Hero Parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    tl.to(textRef.current, { y: 200, opacity: 0.5 }, 0);
    tl.to(auroraRef.current, { scale: 1.5, y: -100, opacity: 0.5 }, 0);
    
    // Initial Load Animation
    gsap.from(textRef.current, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from(".hero-image", { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });

    // Pillars Animation
    const pillars = (pillarsRef.current as any).children;
    gsap.from(pillars, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: pillarsRef.current,
        start: 'top 80%',
      }
    });

  }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">
      {/* -------------------------  HERO  ------------------------- */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center px-6 py-32 overflow-hidden">
        <div ref={auroraRef} className="aurora-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={textRef}
            className="space-y-8"
          >
            <h1 className="font-lora text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Intelligence, <br />
              Reimagined.
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-lg">
              SourceMind is an AI research lab dedicated to advancing intelligence by understanding the principles of neuroscience.
            </p>
            <div className="flex gap-4">
                <Link href="/about" className="inline-block px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg">
                    Learn More
                </Link>
                <Link href="/contact" className="inline-block px-8 py-3 text-slate-800 font-semibold rounded-lg ring-2 ring-slate-200 hover:bg-slate-100 transition-colors">
                    Get in Touch
                </Link>
            </div>
          </div>
          <div className="hero-image relative hidden md:block">
            <svg width="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              {/* This is a placeholder SVG, you can replace with your abstract shape */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: 'hsla(38, 98%, 52%, 0.1)', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor: 'hsla(27, 98%, 52%, 0.1)', stopOpacity:1}} />
                </linearGradient>
              </defs>
              <path fill="url(#grad1)" d="M399,288.5Q370,327,337,358.5Q304,390,256,412Q208,434,161,409.5Q114,385,82,352.5Q50,320,53.5,265Q57,210,91,178.5Q125,147,171,130Q217,113,260.5,99.5Q304,86,346,108.5Q388,131,411.5,170.5Q435,210,417,250Q399,288.5,399,288.5Z"></path>
              <path stroke="#0f172a" strokeWidth="2" fill="none" d="M399,288.5Q370,327,337,358.5Q304,390,256,412Q208,434,161,409.5Q114,385,82,352.5Q50,320,53.5,265Q57,210,91,178.5Q125,147,171,130Q217,113,260.5,99.5Q304,86,346,108.5Q388,131,411.5,170.5Q435,210,417,250Q399,288.5,399,288.5Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* -----------------  RESEARCH PILLARS  ----------------- */}
      <section className="px-6 py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-24 max-w-3xl mx-auto">
              <h2 className="font-lora text-4xl lg:text-6xl font-bold text-slate-900">
                A New Foundation for Intelligence
              </h2>
              <p className="text-lg text-slate-600 mt-6">
                Our lab focuses on three core pillars of research to bridge the gap between biological and artificial minds.
              </p>
           </div>
          <div
            ref={pillarsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {researchPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col items-center p-6 rounded-lg"
              >
                <div className="text-brand-orange mb-6">{pillar.icon}</div>
                <h3 className="font-lora text-2xl font-bold mb-4 text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-slate-600">{pillar.desc}</p>
              </div>
            ))}
           </div>
        </div>
      </section>
      
      {/* -------------------  JOIN US  ------------------- */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-lora text-4xl lg:text-6xl font-bold text-slate-900">Join Our Mission</h2>
            <p className="text-lg text-slate-600 mt-6 mb-8 max-w-2xl mx-auto">
                We are looking for passionate researchers, engineers, and thinkers to help us build the future of intelligence. Explore our open roles and get in touch.
            </p>
            <Link href="/careers" className="inline-block px-10 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg">
                View Careers
            </Link>
        </div>
      </section>
    </div>
  );
}
