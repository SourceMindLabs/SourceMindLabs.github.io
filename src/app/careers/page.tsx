"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Dna, Rocket } from "lucide-react";

const jobOpenings = [
  {
    title: "Research Scientist, Reinforcement Learning",
    location: "Remote",
    department: "Research",
    description: "Develop novel RL algorithms inspired by neural reward pathways and apply them to complex, unstructured environments.",
  },
  {
    title: "LLM Engineer, Neuro-Inspired Architectures",
    location: "Remote",
    department: "Engineering",
    description: "Design and train large-scale language models that incorporate principles of neural plasticity and sparse coding.",
  },
  {
    title: "Computational Neuroscientist",
    location: "Remote",
    department: "Research",
    description: "Analyze large neural datasets to extract principles of brain function that can inform next-generation AI models.",
  },
  {
    title: "Machine Learning Intern (PhD)",
    location: "Remote",
    department: "Internships",
    description: "Join our research team for a high-impact internship focused on a challenging problem in RL or neuro-inspired AI.",
  },
];

const perks = [
  {
    icon: <Rocket size={28} className="text-brand-orange"/>,
    title: "High-Impact Problems",
    description: "Work on fundamental questions at the intersection of intelligence, computation, and neuroscience."
  },
  {
    icon: <BrainCircuit size={28} className="text-brand-orange"/>,
    title: "World-Class Team",
    description: "Collaborate with a diverse, dedicated group of scientists and engineers in a culture of open inquiry."
  },
  {
    icon: <Dna size={28} className="text-brand-orange"/>,
    title: "Resources to Succeed",
    description: "Access to significant compute resources, research funding, and support for publishing and open-sourcing."
  }
];

export default function CareersPage() {
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
            Join Us in Building the Future of AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto"
          >
            We are looking for brilliant and passionate minds to help us bridge the gap between biological and artificial intelligence.
          </motion.p>
        </div>
      </section>
      {/* PERKS */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {perks.map((perk, i) => (
              <motion.div 
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="p-4"
              >
                <div className="flex justify-center mb-4">{perk.icon}</div>
                <h3 className="font-lora text-xl font-bold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-slate-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* OPEN POSITIONS */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-lora text-3xl md:text-4xl font-bold text-slate-900 text-center">
            Open Positions
          </h2>
          <div className="mt-12 space-y-6">
            {jobOpenings.map((job) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:border-brand-orange hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <p className="text-brand-orange font-semibold mt-1">
                      {job.department} &middot; {job.location}
                    </p>
                  </div>
                  <Link href={`/careers/${job.title.toLowerCase().replace(/ /g, '-').replace(/,/g, '')}`} className="mt-4 sm:mt-0 flex items-center justify-center px-5 py-2 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
                    Apply Now <ArrowRight className="ml-2" size={16}/>
                  </Link>
                </div>
                <p className="mt-4 text-slate-600">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
           <p className="text-center mt-12 text-slate-600">
             Don't see a role that fits? <a href="mailto:careers@sourcemind.com" className="text-brand-orange hover:underline">Get in touch</a>, we're always looking for talent.
           </p>
        </div>
      </section>
    </div>
  );
} 