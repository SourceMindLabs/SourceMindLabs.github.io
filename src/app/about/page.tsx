"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Target, Users, Lightbulb, Globe, Award, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const values = [
  {
    icon: "🔬",
    title: "Pioneering Research",
    description: "We tackle fundamental questions and push the boundaries of what's possible in AI, guided by scientific rigor."
  },
  {
    icon: "🤝",
    title: "Open Collaboration",
    description: "We believe in the power of the community and actively share our findings, code, and models to accelerate progress."
  },
  {
    icon: "🧠",
    title: "Neuroscience-Grounded",
    description: "Our work is deeply rooted in principles from neuroscience, believing the brain offers the ultimate blueprint for intelligence."
  },
  {
    icon: "🌍",
    title: "Beneficial AI",
    description: "We are committed to developing safe, interpretable, and beneficial AI that aligns with long-term human values."
  }
]

const achievements = [
  {
    icon: Award,
    title: "45+ Publications",
    description: "Published in top-tier venues including NeurIPS, ICML, ICLR, and Nature"
  },
  {
    icon: Users,
    title: "12 Team Members",
    description: "Diverse expertise spanning AI, neuroscience, and engineering"
  },
  {
    icon: Globe,
    title: "Global Collaborations",
    description: "Research partnerships with institutions across 5 continents"
  },
  {
    icon: Lightbulb,
    title: "8 Open Source Projects",
    description: "Contributing tools and frameworks used by thousands of researchers"
  }
]

const team = [
  {
    name: "San Hashim",
    role: "Founder & Lead Scientist",
    bio: "San leads the lab's research in neuro-inspired architectures and reinforcement learning.",
  },
  {
    name: "Muhammad",
    role: "Principal Research Engineer",
    bio: "Muhammad specializes in building and scaling large-scale models and AI systems.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-lora text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Advancing AI from a new perspective.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-slate-700 max-w-3xl mx-auto"
          >
            SourceMind is an independent research lab. Our mission is to understand the principles of biological intelligence and replicate them in silicon to create more capable, general, and beneficial AI.
          </motion.p>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-slate-900">
              Our Research Philosophy
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our work is guided by a core set of beliefs about how to build the next generation of AI.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, idx) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center p-4"
              >
                <div className="text-4xl inline-block">{value.icon}</div>
                <h3 className="font-lora text-xl font-bold mt-6 mb-3 text-slate-900">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-slate-900">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We are a small, multi-disciplinary team of scientists and engineers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-500">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-brand-orange font-semibold mb-2">{member.role}</p>
                <p className="text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 