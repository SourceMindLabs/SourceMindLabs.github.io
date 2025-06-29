"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Attendance Automation",
    desc: "Scout proactively reaches out to parents by phone, text, and email and logs attendance automatically.",
    icon: "📊",
  },
  {
    title: "Digital Master Agreements",
    desc: "Built-in e-signature workflows ensure every master agreement is completed and stored securely.",
    icon: "📝",
  },
  {
    title: "Work Sample Collection",
    desc: "Pull representative samples from 50+ curriculum providers, detect compliance issues, and compile packets instantly.",
    icon: "📂",
  },
  {
    title: "One-click State Reporting",
    desc: "Generate CALPADS and other state reports in seconds – no spreadsheets required.",
    icon: "📤",
  },
  {
    title: "Live Compliance Dashboard",
    desc: "See exactly what needs attention and what's coming up, updated in real-time across every student.",
    icon: "📈",
  },
  {
    title: "Enterprise-grade Security",
    desc: "Modern encryption, MFA, granular permissions, and regular audits keep sensitive student data safe.",
    icon: "🔒",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-slate-50 px-6 py-32 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-8 text-black">
            Every piece of compliance, automated
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-700">
            Explore how SourceMind eliminates busywork so your staff can focus on students.
          </motion.p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24 px-6 bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
              className="group border border-transparent rounded-lg p-8 hover:shadow-xl transition-all bg-slate-50">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-black group-hover:text-brand transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand text-white text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-8">
          Ready to automate compliance?
        </motion.h2>
        <Link href="/contact" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-md bg-white text-brand font-semibold shadow-lg hover:shadow-xl transition-all">
            Schedule a demo
          </motion.a>
        </Link>
      </section>
    </div>
  );
} 