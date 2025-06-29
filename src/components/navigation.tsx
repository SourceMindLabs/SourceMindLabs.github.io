"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerLines = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { y: -100 }, { y: 0, duration: 0.6, ease: "power2.out" });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(mobileMenuRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to(hamburgerLines.current[0], { rotate: 45, y: 6, duration: 0.3, ease: 'power2.out' }, 0)
      .to(hamburgerLines.current[1], { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
      .to(hamburgerLines.current[2], { rotate: -45, y: -6, duration: 0.3, ease: 'power2.out' }, 0);

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      (mobileMenuRef.current as any).style.display = 'block';
      tl.play();
    } else {
      document.body.style.overflow = '';
      tl.reverse().then(() => {
        if (!isMobileMenuOpen) (mobileMenuRef.current as any).style.display = 'none';
      });
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/research', label: 'Research' },
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/80' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              SourceMind
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group">
                <span className="text-slate-700 hover:text-brand-orange font-medium transition-colors duration-300">
                  {link.label}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></div>
              </Link>
            ))}
            
            <div className="w-px h-5 bg-slate-200" />
            
            <Link 
              href="/contact"
              className="border border-slate-800 text-slate-800 px-5 py-2 rounded-md font-semibold tracking-wide transition-all duration-300 shadow-sm hover:bg-slate-800 hover:text-white transform hover:scale-105 active:scale-95"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5 group"
            aria-label="Open menu"
          >
            <div ref={el => {hamburgerLines.current[0] = el}} className="w-6 h-0.5 bg-slate-800" />
            <div ref={el => {hamburgerLines.current[1] = el}} className="w-6 h-0.5 bg-slate-800" />
            <div ref={el => {hamburgerLines.current[2] = el}} className="w-6 h-0.5 bg-slate-800" />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        style={{ display: 'none', opacity: 0, transform: 'translateY(-20px)' }}
        className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold text-slate-800 hover:text-brand-orange transition-colors duration-300">
                  {link.label}
              </Link>
            ))}
            <Link 
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-slate-900 text-white px-8 py-3 rounded-md font-semibold tracking-wide shadow-lg text-lg transform hover:scale-105 active:scale-95 transition-transform"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
} 