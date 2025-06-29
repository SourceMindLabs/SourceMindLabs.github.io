"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github, Globe, Mail, Twitter, Linkedin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Prof. Michael Rodriguez",
    role: "Principal Investigator & Lab Director",
    bio: "Leading AI researcher with 15+ years of experience in neural networks and machine learning. Former Principal Scientist at Google DeepMind.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Neural Architecture Search", "Large Language Models", "AI Safety", "Computational Neuroscience"],
    education: "PhD Computer Science, MIT",
    links: {
      email: "m.rodriguez@axionlab.ai",
      website: "https://mrodriguez.ai",
      scholar: "https://scholar.google.com/citations?user=example1",
      twitter: "https://twitter.com/mrodriguez_ai",
      linkedin: "https://linkedin.com/in/mrodriguez"
    },
    featured: true
  },
  {
    name: "Dr. Sarah Chen",
    role: "Senior Research Scientist",
    bio: "Expert in neural architecture search and automated machine learning. Previously led AutoML research at Microsoft Research.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Neural Architecture Search", "AutoML", "Efficient Deep Learning", "Hardware-aware Optimization"],
    education: "PhD Electrical Engineering, Stanford University",
    links: {
      email: "s.chen@axionlab.ai",
      scholar: "https://scholar.google.com/citations?user=example2",
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen"
    },
    featured: true
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Scientist - Neuroscience",
    bio: "Neuroscientist turned AI researcher, bridging biological and artificial neural networks. Expert in biologically-inspired learning algorithms.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Neuroscience-inspired AI", "Biological Neural Networks", "Cognitive Architectures", "Brain-Computer Interfaces"],
    education: "PhD Neuroscience, Caltech",
    links: {
      email: "e.watson@axionlab.ai",
      website: "https://emilywatson.dev",
      scholar: "https://scholar.google.com/citations?user=example3",
      twitter: "https://twitter.com/ewatson_neuro"
    },
    featured: true
  },
  {
    name: "Dr. James Liu",
    role: "Research Scientist - Edge AI",
    bio: "Specialist in edge computing and mobile AI. Focus on optimizing deep learning models for resource-constrained environments.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Edge Computing", "Model Compression", "Mobile AI", "IoT Intelligence"],
    education: "PhD Computer Engineering, UC Berkeley",
    links: {
      email: "j.liu@axionlab.ai",
      github: "https://github.com/jamesliu",
      scholar: "https://scholar.google.com/citations?user=example4",
      linkedin: "https://linkedin.com/in/jamesliu"
    },
    featured: false
  },
  {
    name: "Dr. Anna Kowalski",
    role: "Postdoctoral Researcher",
    bio: "Working on multi-modal learning and cross-attention mechanisms. Previously at OpenAI working on CLIP and DALL-E projects.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Multi-modal Learning", "Vision-Language Models", "Cross-attention Mechanisms", "Generative AI"],
    education: "PhD Computer Vision, ETH Zurich",
    links: {
      email: "a.kowalski@axionlab.ai",
      github: "https://github.com/annakowalski",
      scholar: "https://scholar.google.com/citations?user=example5",
      twitter: "https://twitter.com/anna_cv"
    },
    featured: false
  },
  {
    name: "Dr. Zhang Wei",
    role: "Research Scientist - NLP",
    bio: "Natural language processing expert with focus on multilingual models and cross-lingual understanding.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Natural Language Processing", "Multilingual Models", "Cross-lingual Understanding", "Language Generation"],
    education: "PhD Computational Linguistics, Tsinghua University",
    links: {
      email: "z.wei@axionlab.ai",
      scholar: "https://scholar.google.com/citations?user=example6",
      github: "https://github.com/zhangwei",
      linkedin: "https://linkedin.com/in/zhangwei"
    },
    featured: false
  },
  {
    name: "Maria Garcia",
    role: "PhD Student",
    bio: "PhD student working on federated learning and privacy-preserving AI. Research focus on secure multi-party computation for ML.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Federated Learning", "Privacy-preserving AI", "Secure Computation", "Distributed Systems"],
    education: "MS Computer Science, Carnegie Mellon University",
    links: {
      email: "m.garcia@axionlab.ai",
      github: "https://github.com/mariagarcia",
      linkedin: "https://linkedin.com/in/mariagarcia",
      twitter: "https://twitter.com/maria_fedai"
    },
    featured: false
  },
  {
    name: "Alex Kim",
    role: "PhD Student",
    bio: "PhD student researching reinforcement learning and its applications to neural architecture search and hyperparameter optimization.",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["Reinforcement Learning", "Neural Architecture Search", "Hyperparameter Optimization", "Meta-learning"],
    education: "MS Machine Learning, Georgia Tech",
    links: {
      email: "a.kim@axionlab.ai",
      github: "https://github.com/alexkim",
      scholar: "https://scholar.google.com/citations?user=example8",
      linkedin: "https://linkedin.com/in/alexkim"
    },
    featured: false
  },
  {
    name: "Sophie Martin",
    role: "Research Engineer",
    bio: "Software engineer specializing in ML infrastructure and deployment systems. Expert in MLOps and scaling AI research.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    researchInterests: ["MLOps", "AI Infrastructure", "Distributed Training", "Model Serving"],
    education: "MS Software Engineering, University of Washington",
    links: {
      email: "s.martin@axionlab.ai",
      github: "https://github.com/sophiemartin",
      linkedin: "https://linkedin.com/in/sophiemartin",
      website: "https://sophiemartin.dev"
    },
    featured: false
  }
]

export default function TeamPage() {
  const featuredMembers = teamMembers.filter(member => member.featured)
  const otherMembers = teamMembers.filter(member => !member.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Research Team
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Meet the brilliant minds behind AxionLab's groundbreaking research. 
          Our diverse team brings together expertise from AI, neuroscience, and engineering.
        </p>
      </motion.div>
      {/* Leadership */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold text-foreground">Leadership</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.education}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{member.bio}</p>
                  
                  {/* Research Interests */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-foreground">Research Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.researchInterests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {member.links.email && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`mailto:${member.links.email}`}>
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Link>
                      </Button>
                    )}
                    {member.links.website && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.website}>
                          <Globe className="mr-1 h-3 w-3" />
                          Website
                        </Link>
                      </Button>
                    )}
                    {member.links.scholar && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.scholar}>
                          <BookOpen className="mr-1 h-3 w-3" />
                          Scholar
                        </Link>
                      </Button>
                    )}
                    {member.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.github}>
                          <Github className="mr-1 h-3 w-3" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {member.links.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.twitter}>
                          <Twitter className="mr-1 h-3 w-3" />
                          Twitter
                        </Link>
                      </Button>
                    )}
                    {member.links.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.linkedin}>
                          <Linkedin className="mr-1 h-3 w-3" />
                          LinkedIn
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Research Team */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="mb-8 text-2xl font-bold text-foreground">Research Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {otherMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.education}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  
                  {/* Research Interests */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {member.researchInterests.slice(0, 3).map((interest) => (
                        <span
                          key={interest}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {interest}
                        </span>
                      ))}
                      {member.researchInterests.length > 3 && (
                        <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                          +{member.researchInterests.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {member.links.email && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`mailto:${member.links.email}`}>
                          <Mail className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {member.links.website && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.website}>
                          <Globe className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {member.links.scholar && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.scholar}>
                          <BookOpen className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {member.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.github}>
                          <Github className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {member.links.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.twitter}>
                          <Twitter className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {member.links.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.links.linkedin}>
                          <Linkedin className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Join Our Team */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 rounded-lg bg-muted/50 p-8 text-center"
      >
        <h2 className="mb-4 text-2xl font-bold text-foreground">Join Our Team</h2>
        <p className="mb-6 text-lg text-muted-foreground">
          We're always looking for talented researchers, engineers, and students to join our mission of advancing AI research.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" variant="neural" asChild>
            <Link href="/about#contact">View Open Positions</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="mailto:careers@axionlab.ai">Contact Us</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
} 