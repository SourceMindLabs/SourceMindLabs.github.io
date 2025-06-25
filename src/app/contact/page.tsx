'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // For static sites, you can use services like:
    // - Formspree (https://formspree.io)
    // - Netlify Forms
    // - EmailJS
    // For now, we'll simulate the submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, replace this with your form service
    console.log('Form submitted:', formData)
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-success-soft rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-success-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-title font-display text-neutral-dark mb-4">Thank You!</h1>
          <p className="text-body font-body text-neutral-medium mb-8">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary-contact font-body"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="section-padding pt-32">
        <div className="container-narrow text-center">
          <h1 className="text-hero font-display text-neutral-dark mb-8">
            Get in Touch
          </h1>
          <p className="text-subtitle font-body text-neutral-medium mb-8 max-w-2xl mx-auto">
            Have questions about our research? Interested in collaboration? 
            Want to join our mission? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="contact-card text-center p-8">
              <div className="contact-icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold text-neutral-dark mb-3">Email Us</h3>
              <p className="text-body font-body text-neutral-medium mb-4">
                For general inquiries and collaboration opportunities
              </p>
              <a href="mailto:hello@axionlab.ai" className="text-primary-main font-medium hover:text-primary-dark transition-colors">
                hello@axionlab.ai
              </a>
            </div>

            <div className="contact-card text-center p-8">
              <div className="contact-icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold text-neutral-dark mb-3">Join Our Team</h3>
              <p className="text-body font-body text-neutral-medium mb-4">
                Interested in working with us? Let's talk about opportunities
              </p>
              <a href="mailto:careers@axionlab.ai" className="text-primary-main font-medium hover:text-primary-dark transition-colors">
                careers@axionlab.ai
              </a>
            </div>

            <div className="contact-card text-center p-8">
              <div className="contact-icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold text-neutral-dark mb-3">Partnership</h3>
              <p className="text-body font-body text-neutral-medium mb-4">
                Research collaborations and strategic partnerships
              </p>
              <a href="mailto:partnerships@axionlab.ai" className="text-primary-main font-medium hover:text-primary-dark transition-colors">
                partnerships@axionlab.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="contact-form-container">
            <div className="text-center mb-12">
              <h2 className="text-title font-display text-neutral-dark mb-4">
                Send us a Message
              </h2>
              <p className="text-body-large font-body text-neutral-medium">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Research Collaboration</option>
                  <option value="career">Career Opportunities</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="form-input resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-contact font-body disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding section-light">
        <div className="container-narrow text-center">
          <h3 className="text-lg font-display font-semibold text-neutral-dark mb-6">
            Response Time
          </h3>
          <p className="text-body font-body text-neutral-medium mb-8">
            We typically respond to all inquiries within 24 hours during business days. 
            For urgent matters, please mark your subject as "Urgent" and we'll prioritize your message.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-medium">
            <span>📍 Remote-First Team</span>
            <span>🕐 Response: 24hrs</span>
            <span>🌍 Global Reach</span>
          </div>
        </div>
      </section>
    </div>
  )
} 