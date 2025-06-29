"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              SourceMind
            </Link>
            <p className="text-slate-600 mt-4 leading-relaxed max-w-sm">
              Advancing AI by understanding the principles of neuroscience.
            </p>
          </div>

          {/* Links Section */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-slate-900 hover:underline underline-offset-2 transition-colors"
                    legacyBehavior>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-slate-900 hover:underline underline-offset-2 transition-colors"
                    legacyBehavior>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} SourceMind, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 hover:text-slate-900 text-sm transition-colors"
                legacyBehavior>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 