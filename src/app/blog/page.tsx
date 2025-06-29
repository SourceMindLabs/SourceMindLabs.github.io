"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, Clock, User, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

const categories = ["All", "Research", "Tutorials", "News", "Technical", "Insights"]

const blogPosts = [
  {
    title: "The Future of Neural Architecture Search: Lessons from Biology",
    excerpt: "Exploring how biological neural networks can inspire more efficient AI architectures and what this means for the future of machine learning.",
    content: "In this deep dive, we explore the fascinating intersection between neuroscience and AI architecture design...",
    author: "Dr. Sarah Chen",
    date: "2024-01-20",
    readTime: "8 min read",
    category: "Research",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    tags: ["NAS", "Neuroscience", "AI Architecture", "Biology"],
    featured: true,
    slug: "future-neural-architecture-search"
  },
  {
    title: "Building Efficient Language Models: A Practical Guide",
    excerpt: "Step-by-step tutorial on implementing efficient language models using modern techniques like quantization and pruning.",
    content: "Learn how to build production-ready language models that balance performance with computational efficiency...",
    author: "Prof. Michael Rodriguez",
    date: "2024-01-18",
    readTime: "12 min read",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop",
    tags: ["LLM", "Optimization", "Tutorial", "PyTorch"],
    featured: true,
    slug: "building-efficient-language-models"
  },
  {
    title: "AxionLab Wins Best Paper Award at NeurIPS 2024",
    excerpt: "Our research on biologically-inspired attention mechanisms has been recognized with the Best Paper Award at NeurIPS 2024.",
    content: "We're thrilled to announce that our paper on biologically-inspired attention mechanisms has won the prestigious Best Paper Award...",
    author: "AxionLab Team",
    date: "2024-01-15",
    readTime: "3 min read",
    category: "News",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
    tags: ["Award", "NeurIPS", "Recognition", "Achievement"],
    featured: true,
    slug: "neurips-2024-best-paper-award"
  },
  {
    title: "Understanding Attention Mechanisms in Modern AI",
    excerpt: "A comprehensive breakdown of how attention mechanisms work and why they're crucial for current AI systems.",
    content: "Attention mechanisms have revolutionized AI. In this post, we break down the mathematics and intuition behind them...",
    author: "Dr. Emily Watson",
    date: "2024-01-12",
    readTime: "10 min read",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
    tags: ["Attention", "Transformers", "Deep Learning", "Mathematics"],
    featured: false,
    slug: "understanding-attention-mechanisms"
  },
  {
    title: "Edge AI: Bringing Intelligence to IoT Devices",
    excerpt: "Exploring the challenges and solutions for deploying AI models on resource-constrained edge devices.",
    content: "Edge AI is transforming how we think about distributed intelligence. Here's what you need to know...",
    author: "Dr. James Liu",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
    tags: ["Edge AI", "IoT", "Optimization", "Mobile"],
    featured: false,
    slug: "edge-ai-iot-devices"
  },
  {
    title: "The Philosophy of AI: Bridging Human and Machine Intelligence",
    excerpt: "Reflecting on the philosophical implications of AI advancement and what it means to bridge human and machine cognition.",
    content: "As AI systems become more sophisticated, we must consider the deeper questions about intelligence itself...",
    author: "Prof. David Thompson",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=300&fit=crop",
    tags: ["Philosophy", "AGI", "Cognition", "Ethics"],
    featured: false,
    slug: "philosophy-of-ai"
  },
  {
    title: "Getting Started with Neural Architecture Search",
    excerpt: "A beginner-friendly introduction to neural architecture search and how to implement your first NAS experiment.",
    content: "Neural Architecture Search can seem daunting. This tutorial will get you started with your first NAS experiment...",
    author: "Dr. Anna Kowalski",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    tags: ["NAS", "Tutorial", "Beginner", "AutoML"],
    featured: false,
    slug: "getting-started-neural-architecture-search"
  },
  {
    title: "AxionLab Expands Research Team with Leading AI Experts",
    excerpt: "We're excited to welcome five new researchers to our team, bringing expertise in multimodal learning and neuromorphic computing.",
    content: "Our research team continues to grow with the addition of world-class researchers in key areas...",
    author: "AxionLab Team",
    date: "2024-01-03",
    readTime: "4 min read",
    category: "News",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop",
    tags: ["Team", "Hiring", "Growth", "Research"],
    featured: false,
    slug: "team-expansion-2024"
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const latestPosts = filteredPosts.slice(0, 6)

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
          Research Blog
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Insights, tutorials, and updates from the frontiers of AI research. 
          Dive deep into our latest discoveries and learn from our experiences.
        </p>
      </motion.div>
      {/* Featured Posts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold text-foreground">Featured Posts</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`} legacyBehavior>
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Search and Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-foreground">All Posts</h2>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.section>
      {/* All Posts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`} legacyBehavior>
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No posts found matching your criteria.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
} 