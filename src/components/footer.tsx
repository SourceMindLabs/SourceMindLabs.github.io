import Link from "next/link";
import { Twitter, Linkedin, Github, Heart, Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";

const navLinks = [
  {
    title: "Research",
    links: [
      { href: "/research", label: "Publications" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/team", label: "Team" },
      { href: "/about", label: "About" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Cookie Policy" },
    ],
  },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
  { href: "#", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { href: "#", icon: Github, label: "GitHub", color: "hover:text-purple-400" },
];

const contactInfo = [
  { icon: Mail, text: "contact@axionlab.com", color: "text-emerald-400" },
  { icon: Phone, text: "+1 (555) 123-4567", color: "text-blue-400" },
  { icon: MapPin, text: "San Francisco, CA", color: "text-purple-400" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-gray-900">AxionLab</h3>
            <p className="font-body text-gray-600 text-small leading-relaxed">
              Advancing AI through neural innovation and cutting-edge research that bridges neuroscience and artificial intelligence.
            </p>
          </div>

          {/* Research */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-gray-900">Research</h4>
            <ul className="space-y-3 text-small">
              <li><Link href="/research" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">Papers</Link></li>
              <li><Link href="/projects" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">Projects</Link></li>
              <li><Link href="/blog" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-gray-900">Company</h4>
            <ul className="space-y-3 text-small">
              <li><Link href="/about" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">About</Link></li>
              <li><Link href="/team" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">Team</Link></li>
              <li><Link href="/contact" className="font-body text-gray-600 hover:text-gray-900 transition-colors link-elegant">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-gray-900">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-gray-600 text-small">
            © 2024 AxionLab. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/privacy" className="font-body text-gray-600 hover:text-gray-900 text-small transition-colors link-elegant">Privacy Policy</Link>
            <Link href="/terms" className="font-body text-gray-600 hover:text-gray-900 text-small transition-colors link-elegant">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 