"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample research data without images
const featuredPublications = [
  {
    title: "Neural Architecture Search for Language Models",
    abstract: "We present a novel approach to automatically discover optimal transformer architectures for language understanding tasks.",
    authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    venue: "Nature Machine Intelligence",
    area: "Neural Architecture Search",
    date: "2024-01-15",
    links: {
      paper: "#",
      code: "#",
    }
  },
  {
    title: "Biologically-Inspired Attention Mechanisms",
    abstract: "This work implements attention patterns observed in cortical neural networks to improve deep learning model performance.",
    authors: ["Dr. James Wilson", "Dr. Lisa Park"],
    venue: "Science Advances",
    area: "Neuroscience",
    date: "2024-01-10",
    links: {
      paper: "#",
      code: "#",
      blog: "#"
    }
  },
  {
    title: "Efficient Training of Large Language Models",
    abstract: "Novel optimization techniques for training large-scale language models in resource-constrained environments.",
    authors: ["Dr. Emily Foster", "Dr. David Kim"],
    venue: "International Conference on Machine Learning",
    area: "Optimization",
    date: "2024-01-05",
    links: {
      paper: "#",
      code: "#"
    }
  },
  {
    title: "Sparse Neural Networks for Edge Computing",
    abstract: "Development of sparse neural architectures optimized for deployment on edge devices with limited computational resources.",
    authors: ["Dr. Alex Johnson", "Dr. Maria Garcia"],
    venue: "AAAI Conference on Artificial Intelligence",
    area: "Edge Computing",
    date: "2023-12-20",
    links: {
      paper: "#",
      code: "#"
    }
  },
  {
    title: "Hierarchical Memory Networks",
    abstract: "A new class of memory-augmented neural networks inspired by hippocampal-cortical interactions.",
    authors: ["Dr. Kevin Lee", "Dr. Anna Zhang"],
    venue: "NeurIPS",
    area: "Memory Networks",
    date: "2023-12-15",
    links: {
      paper: "#",
      code: "#",
      blog: "#"
    }
  },
  {
    title: "Continual Learning with Neural Plasticity",
    abstract: "Implementing synaptic plasticity mechanisms to enable continual learning without catastrophic forgetting.",
    authors: ["Dr. Thomas Brown", "Dr. Sophie Miller"],
    venue: "ICML Workshop",
    area: "Continual Learning",
    date: "2023-12-10",
    links: {
      paper: "#",
      code: "#"
    }
  }
]

const researchAreas = [
  "All Areas",
  "Neural Architecture Search",
  "Neuroscience",
  "Optimization",
  "Edge Computing",
  "Memory Networks",
  "Continual Learning"
]

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("All Areas")

  const filteredPublications = featuredPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesArea = selectedArea === "All Areas" || pub.area === selectedArea
    return matchesSearch && matchesArea
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Research & Publications
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Explore our cutting-edge research in AI, neuroscience, and machine learning. 
          Our work bridges the gap between biological intelligence and artificial systems.
        </p>
      </div>

      {/* Featured Research */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Featured Publications</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPublications.slice(0, 3).map((pub, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    {pub.area}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(pub.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">
                  {pub.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pub.abstract}
                </p>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Authors:</strong> {pub.authors.join(", ")}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Venue:</strong> {pub.venue}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {pub.links.paper && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.paper}>Paper</Link>
                  </Button>
                )}
                {pub.links.code && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.code}>Code</Link>
                  </Button>
                )}
                {pub.links.blog && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.blog}>Blog</Link>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* All Publications */}
      <section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">All Publications</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {researchAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPublications.map((pub, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    {pub.area}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(pub.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {pub.title}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Authors:</strong> {pub.authors.join(", ")}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Venue:</strong> {pub.venue}
                </div>
                <p className="text-gray-600 mb-4">
                  {pub.abstract}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {pub.links.paper && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.paper}>Paper</Link>
                  </Button>
                )}
                {pub.links.code && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.code}>Code</Link>
                  </Button>
                )}
                {pub.links.blog && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={pub.links.blog}>Blog</Link>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">No publications found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  )
} 