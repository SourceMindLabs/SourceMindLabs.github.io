"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Target, Users, Lightbulb, Globe, Award, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const values = [
  {
    icon: Brain,
    title: "Scientific Excellence",
    description: "We pursue rigorous, reproducible research that advances the fundamental understanding of artificial intelligence and its applications."
  },
  {
    icon: Users,
    title: "Collaborative Innovation",
    description: "We believe the best breakthroughs come from diverse perspectives working together across disciplines and institutions."
  },
  {
    icon: Globe,
    title: "Open Science",
    description: "We share our research, code, and insights openly to accelerate progress for the entire AI research community."
  },
  {
    icon: Lightbulb,
    title: "Ethical AI",
    description: "We develop AI systems that are safe, beneficial, and aligned with human values, considering long-term societal impact."
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

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32 hero-gradient">
        <div className="container-narrow text-center">
          <h1 className="text-hero font-display mb-8">
            About AxionLab
          </h1>
          <p className="text-subtitle font-body mb-8">
            A small research lab working on neuroscience and AI
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding section-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="text-title font-display mb-6">
              Why We Started This
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-body-large font-body leading-relaxed">
              We started SourceMindLabs in 2025 because we think there's a lot to learn from how the brain works. 
              Current AI systems need huge amounts of data and energy to learn things that humans can 
              pick up quickly. The brain does this with much less power and data.
            </p>
            
            <p className="text-body font-body leading-relaxed">
              We're not claiming to solve everything, but we think studying how biological neural networks 
              work could help us build better AI. It's early-stage research, and we're still figuring 
              out a lot of things. But the basic question interests us: how does the brain learn so efficiently?
            </p>
            
            <div className="quote">
              <p className="text-body-large font-body">
                "We're trying to understand how the brain works and see if we can use those ideas 
                to make AI systems that are more efficient and useful."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Approach */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-title font-display mb-6">
              How We Approach This
            </h2>
            <p className="text-body-large font-body max-w-3xl mx-auto">
              Our research method is pretty straightforward
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="card-elegant p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Study the Brain</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                We read neuroscience papers and try to understand how neurons connect and learn. 
                We focus on the parts that seem most relevant to machine learning.
              </p>
            </div>
            
            <div className="card-elegant p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Build Simple Models</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                We write code to test our ideas about how brain-like learning might work. 
                We start simple and see what happens.
              </p>
            </div>

            <div className="card-elegant p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Test Our Ideas</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                We run experiments to see if our brain-inspired methods actually work better 
                than standard approaches. Sometimes they do, sometimes they don't.
              </p>
            </div>

            <div className="card-elegant p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Share What We Learn</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                When we find something interesting, we'll write about it and share our code. 
                Good research should be open and reproducible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding section-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-title font-display mb-6">
              Who We Are
            </h2>
            <p className="text-body-large font-body max-w-3xl mx-auto">
              Two people interested in brains and computers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="card-elegant p-10 text-center hover-lift">
              <div className="w-24 h-24 logo-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">SH</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">San Hashim</h3>
              <p className="text-body font-body mb-4 font-semibold">Research Lead & Co-Founder</p>
              <p className="text-small font-body leading-relaxed text-neutral-medium">
                Curious about how brains actually learn things and spends time coding up 
                experiments to test if we can get AI to work more like that.
              </p>
            </div>
            
            <div className="card-elegant p-10 text-center hover-lift">
              <div className="w-24 h-24 logo-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Muhammad</h3>
              <p className="text-body font-body mb-4 font-semibold">Software Engineer & Co-Founder</p>
              <p className="text-small font-body leading-relaxed text-neutral-medium">
                Writes the code to test our ideas about brain-inspired AI. Enjoys the challenge 
                of turning research concepts into working programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Work */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="text-title font-display mb-6">
              What We're Working On Now
            </h2>
          </div>
          
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-4">Learning with Less Data</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                The brain can learn new things from just a few examples. We're studying how 
                neural plasticity works and trying to build AI that learns more like this.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-4">Efficient Neural Networks</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                Most AI uses a lot of energy. The brain doesn't. We're looking at how biological 
                neurons are organized and trying to make more efficient artificial networks.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-4">Understanding What AI Learns</h3>
              <p className="text-body font-body leading-relaxed text-neutral-medium">
                It's hard to understand what current AI systems actually learn. We think brain-inspired 
                approaches might lead to more interpretable AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding section-dark">
        <div className="relative z-10 container-narrow text-center">
          <h2 className="text-title font-display text-white mb-8">
            Interested in This Work?
          </h2>
          <p className="text-body-large font-body text-gray-300 mb-12">
            If you're working on similar things or just curious about what we're doing, 
            we'd be happy to chat. We're always interested in meeting other researchers.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 border-none rounded-2xl px-10 py-4 font-semibold hover-lift transition-all duration-300">
              Email Us
            </button>
            <button className="border-2 border-white bg-transparent text-white rounded-2xl px-10 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 