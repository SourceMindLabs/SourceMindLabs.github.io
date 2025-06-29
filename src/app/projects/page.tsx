"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github, Play, Calendar, Users, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    title: "NeuroLM - Brain-Inspired Language Model",
    description: "A revolutionary language model architecture inspired by neural circuits in the human brain. Features dynamic attention mechanisms that mirror biological neural processes.",
    longDescription: "NeuroLM represents a breakthrough in AI architecture design by incorporating principles from neuroscience. Our model uses adaptive attention mechanisms that simulate the dynamic nature of neural connections in the brain, resulting in improved efficiency and interpretability.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
    tech: ["PyTorch", "Transformers", "CUDA", "Neuroscience"],
    links: {
      github: "https://github.com/axionlab/neurolm",
      demo: "/projects/neurolm/demo",
      paper: "/papers/neurolm.pdf"
    },
    stats: {
      stars: 1247,
      forks: 189,
      contributors: 8
    },
    date: "2024-01-20",
    status: "Active",
    featured: true
  },
  {
    title: "EdgeAI Optimizer",
    description: "An automated tool for optimizing neural networks for edge deployment. Reduces model size by 80% while maintaining 95% accuracy.",
    longDescription: "EdgeAI Optimizer is a comprehensive toolkit for preparing AI models for edge deployment. It combines neural architecture search, quantization, and pruning techniques to create highly efficient models suitable for mobile and IoT devices.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
    tech: ["TensorFlow", "ONNX", "TensorRT", "Mobile"],
    links: {
      github: "https://github.com/axionlab/edgeai-optimizer",
      demo: "/projects/edgeai/demo"
    },
    stats: {
      stars: 892,
      forks: 134,
      contributors: 6
    },
    date: "2024-01-15",
    status: "Active",
    featured: true
  },
  {
    title: "MultiModal Research Platform",
    description: "A unified platform for multi-modal AI research combining vision, language, and audio processing capabilities.",
    longDescription: "Our multi-modal research platform provides researchers with a comprehensive toolkit for developing and testing AI models that can process multiple types of data simultaneously. It includes pre-trained models, evaluation benchmarks, and visualization tools.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop",
    tech: ["Python", "React", "Docker", "MLflow"],
    links: {
      github: "https://github.com/axionlab/multimodal-platform",
      demo: "/projects/multimodal/demo"
    },
    stats: {
      stars: 654,
      forks: 98,
      contributors: 12
    },
    date: "2024-01-10",
    status: "Active",
    featured: true
  },
  {
    title: "Neural Architecture Search Suite",
    description: "An open-source suite of tools for automated neural architecture search with support for various model types and constraints.",
    longDescription: "This comprehensive NAS suite enables researchers to automatically discover optimal neural network architectures for their specific tasks and constraints. It supports hardware-aware search, multi-objective optimization, and real-time performance monitoring.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    tech: ["PyTorch", "Ray", "Optuna", "Kubernetes"],
    links: {
      github: "https://github.com/axionlab/nas-suite"
    },
    stats: {
      stars: 423,
      forks: 67,
      contributors: 5
    },
    date: "2023-12-20",
    status: "Maintained",
    featured: false
  },
  {
    title: "BioML Toolkit",
    description: "A specialized toolkit for applying machine learning to biological and neuroscience data.",
    longDescription: "BioML Toolkit bridges the gap between machine learning and biological sciences. It provides specialized algorithms and preprocessing tools designed specifically for biological data, including neural recordings, genomic sequences, and protein structures.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=300&fit=crop",
    tech: ["Python", "SciPy", "Pandas", "Jupyter"],
    links: {
      github: "https://github.com/axionlab/bioml-toolkit"
    },
    stats: {
      stars: 287,
      forks: 45,
      contributors: 4
    },
    date: "2023-11-15",
    status: "Maintained",
    featured: false
  },
  {
    title: "Federated Learning Framework",
    description: "A privacy-preserving federated learning framework designed for distributed AI training across multiple institutions.",
    longDescription: "Our federated learning framework enables collaborative AI training while preserving data privacy. It supports secure aggregation, differential privacy, and Byzantine fault tolerance, making it suitable for sensitive applications in healthcare and finance.",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&h=300&fit=crop",
    tech: ["Python", "gRPC", "Cryptography", "Docker"],
    links: {
      github: "https://github.com/axionlab/federated-learning"
    },
    stats: {
      stars: 512,
      forks: 89,
      contributors: 7
    },
    date: "2023-10-30",
    status: "Maintained",
    featured: false
  }
]

const statusColors: Record<string, string> = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Maintained": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Archived": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

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
          Research Projects
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Explore our open-source projects and research implementations. 
          From cutting-edge AI models to practical tools, discover how we're advancing the field.
        </p>
      </motion.div>
      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold text-foreground">Featured Projects</h2>
        <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-1">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="lg:flex">
                  <div className="lg:w-2/5">
                    <div className="aspect-video lg:h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-3/5">
                    <CardHeader>
                      <div className="mb-3 flex items-center justify-between">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(project.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        {project.longDescription}
                      </CardDescription>
                      
                      {/* Tech Stack */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Stats */}
                      <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.stats.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {project.stats.forks}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.stats.contributors}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {project.links.github && (
                          <Button variant="outline" asChild>
                            <Link href={project.links.github} legacyBehavior>
                              <Github className="mr-2 h-4 w-4" />
                              GitHub
                            </Link>
                          </Button>
                        )}
                        {project.links.demo && (
                          <Button variant="neural" asChild>
                            <Link href={project.links.demo} legacyBehavior>
                              <Play className="mr-2 h-4 w-4" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {project.links.paper && (
                          <Button variant="outline" asChild>
                            <Link href={project.links.paper} legacyBehavior>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Paper
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Other Projects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="mb-8 text-2xl font-bold text-foreground">More Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                  
                  {/* Tech Stack */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {project.stats.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {project.stats.forks}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {project.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.github} legacyBehavior>
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.demo} legacyBehavior>
                          <Play className="mr-1 h-3 w-3" />
                          Demo
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
    </div>
  );
} 