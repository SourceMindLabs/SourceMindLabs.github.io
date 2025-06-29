"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BrainCircuit, Dna, Rocket } from "lucide-react"

const researchAreas = [
  {
    icon: <BrainCircuit size={32} className="text-brand-orange" />,
    title: "Neuro-Inspired Learning Algorithms",
    description: "We develop novel algorithms for training and inference in artificial neural networks by drawing direct inspiration from the principles of computational neuroscience. Our work explores concepts like sparse representations, predictive coding, and synaptic plasticity to create more efficient and robust models.",
  },
  {
    icon: <Rocket size={32} className="text-brand-orange" />,
    title: "Reinforcement Learning & Decision Making",
    description: "Our research in RL focuses on creating agents that can learn complex behaviors in data-scarce environments. We investigate how the brain's reward systems can inform the design of more sample-efficient and generalizable RL algorithms for robotics and autonomous systems.",
  },
  {
    icon: <Dna size={32} className="text-brand-orange" />,
    title: "Foundation Models of Intelligence",
    description: "We aim to build large-scale, pre-trained models that capture fundamental aspects of biological intelligence. These LLMs and multi-modal systems are designed not just for performance, but for interpretability and alignment with human cognitive architectures.",
  },
]

export default function ResearchPage() {
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
            Research at the Frontier of Intelligence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-slate-700 max-w-3xl mx-auto"
          >
            We believe that the next breakthroughs in artificial intelligence will come from a deeper understanding of the brain. Our research combines neuroscience, reinforcement learning, and large-scale modeling to build the next generation of AI.
          </motion.p>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {researchAreas.map((area, idx) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="mb-4">{area.icon}</div>
                <h3 className="font-lora text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="font-lora text-3xl md:text-4xl font-bold mb-6">
            Collaborate With Us
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            We partner with academic institutions and industry leaders to push the boundaries of AI research. If you're interested in working together, we'd love to connect.
          </p>
          <Link href="/contact" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-md bg-brand-orange text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Get in Touch
            </motion.a>
          </Link>
        </div>
      </section>
    </div>
  )
} 