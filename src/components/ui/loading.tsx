"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ 
  size = 'md', 
  text = 'Loading with Classical Excellence...', 
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center z-50' 
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-6">
        {/* Elegant Spinner */}
        <div className="relative">
          <motion.div
            className={`${sizeClasses[size]} border-4 border-amber-200 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-amber-600 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
                     <motion.div
             className={`absolute inset-2 ${sizeClasses[size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'md']} border-2 border-transparent border-r-yellow-600 rounded-full`}
             animate={{ rotate: -360 }}
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           />
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-6 h-6' : 'w-10 h-10'} bg-gradient-to-br from-amber-600 to-yellow-600 rounded-sm flex items-center justify-center border border-amber-700 shadow-lg`}
            >
              <span 
                className={`text-white font-bold ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'}`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                S
              </span>
            </motion.div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.p
            className={`${textSizes[size]} font-semibold text-amber-800 mb-2`}
            style={{ fontFamily: 'Georgia, serif' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {text}
          </motion.p>
          
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-amber-600 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
        />
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoading() {
  return <Loading size="lg" text="Preparing Excellence..." fullScreen />;
}

// Button Loading Component
export function ButtonLoading() {
  return <Loading size="sm" text="" />;
}

// Section Loading Component
export function SectionLoading({ text }: { text?: string }) {
  return <Loading size="md" text={text || "Loading content..."} />;
} 