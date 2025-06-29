'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader, Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
    setError(null);
  }

  if (submitted) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="font-lora text-3xl font-bold text-slate-900 mb-4">Thank You!</h1>
          <p className="text-lg text-slate-700 mb-8">
            Your message has been sent. We'll get back to you shortly.
          </p>
          <button 
            onClick={resetForm}
            className="px-8 py-3 rounded-md bg-black text-white font-semibold shadow-sm hover:bg-slate-800 transition-all"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-lora text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Have a question, a proposal, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* FORM AND INFO */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text" id="name" name="name" required
                  value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-0 focus:border-brand-orange transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email" id="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-0 focus:border-brand-orange transition-colors"
                  placeholder="jane.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text" id="subject" name="subject" required
                  value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-0 focus:border-brand-orange transition-colors"
                  placeholder="Regarding your services"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-0 focus:border-brand-orange transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 rounded-md bg-black text-white font-semibold shadow-sm hover:bg-slate-800 transition-all disabled:bg-slate-400 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-3" size={20} />
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="order-1 md:order-2">
            <h2 className="font-lora text-3xl font-bold text-slate-900">Contact Information</h2>
            <p className="mt-3 text-lg text-slate-600">
              Reach out to us directly through any of the methods below.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-brand-orange mt-1 mr-4"/>
                <div>
                  <h3 className="font-lora text-lg font-bold">Email</h3>
                  <p className="text-slate-600">For general inquiries and demos</p>
                  <a href="mailto:hello@sourcemind.com" className="text-brand-orange hover:underline">
                    hello@sourcemind.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-brand-orange mt-1 mr-4"/>
                <div>
                  <h3 className="font-lora text-lg font-bold">Phone</h3>
                  <p className="text-slate-600">Mon-Fri, 9am - 5pm PT</p>
                  <a href="tel:+1-555-123-4567" className="text-brand-orange hover:underline">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-brand-orange mt-1 mr-4"/>
                <div>
                  <h3 className="font-lora text-lg font-bold">Office</h3>
                  <p className="text-slate-600">123 Innovation Drive<br/>Palo Alto, CA 94301</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 