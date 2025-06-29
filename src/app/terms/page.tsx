"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-lora text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-lg text-slate-600"
          >
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 prose lg:prose-xl">
          <h2 className="font-lora font-bold">1. Agreement to Terms</h2>
          <p>
            By using our services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the services.
          </p>
          
          <h2 className="font-lora font-bold">2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of SourceMind Inc. and its licensors.
          </p>
          
          <h2 className="font-lora font-bold">3. Termination</h2>
          <p>
            We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 className="font-lora font-bold">4. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>

          <h2 className="font-lora font-bold">5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@sourcemind.com" className="text-brand-orange hover:underline">legal@sourcemind.com</a>
          </p>
        </div>
      </section>
    </div>
  )
} 