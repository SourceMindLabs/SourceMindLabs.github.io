import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32 hero-gradient">
        <div className="container-wide text-center">
          <h1 className="text-hero font-display mb-8">
            AxionLab
          </h1>
          <p className="text-subtitle font-body mb-8 max-w-4xl mx-auto">
            Studying how the brain works to build better AI
          </p>
          <p className="text-body-large font-body max-w-3xl mx-auto mb-16">
            We're a small research team working on understanding how neural networks in the brain 
            process information. Our goal is to apply these insights to improve machine learning systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary font-body">
              Learn About Our Work
            </button>
            <button className="btn-secondary font-body">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-sm section-white">
        <div className="container-wide">
          <div className="stats-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { number: '2025', label: 'Started' },
                { number: '2', label: 'People' },
                { number: 'Brain + AI', label: 'Focus' },
                { number: 'Early', label: 'Stage' }
              ].map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div className="stat-number">{stat.number}</div>
                  <div className="text-body font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className="section-padding section-white">
        <div className="container-narrow text-center">
          <h2 className="text-title font-display mb-8">
            What We're Working On
          </h2>
          <div className="quote mb-12">
            <p className="text-body-large font-body">
              The brain is remarkably efficient at learning and processing information. 
              We study how it does this and try to build AI systems that work more like the brain.
            </p>
          </div>
          <p className="text-body font-body mb-12 leading-relaxed">
            AxionLab is an early-stage research lab focused on neuroscience and machine learning. 
            We're interested in how biological neural networks learn and adapt, and how we can 
            use these insights to create better AI algorithms. It's still early days, but we're 
            excited about the potential.
          </p>
          <button className="btn-primary font-body">
            Read More
          </button>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="text-title font-display mb-6">
              Areas We're Exploring
            </h2>
            <p className="text-body-large font-body max-w-3xl mx-auto">
              Our current research interests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card-elegant p-8 text-center hover-lift">
              <div className="w-16 h-16 logo-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🧠</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">How Neurons Learn</h3>
              <p className="text-body font-body text-neutral-medium">
                Studying how individual neurons and neural circuits change when they learn something new, 
                and how we might apply this to machine learning.
              </p>
            </div>

            <div className="card-elegant p-8 text-center hover-lift">
              <div className="w-16 h-16 logo-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🔬</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">Brain-Inspired Algorithms</h3>
              <p className="text-body font-body text-neutral-medium">
                Developing new machine learning methods based on what we know about 
                how the brain processes information.
              </p>
            </div>

            <div className="card-elegant p-8 text-center hover-lift">
              <div className="w-16 h-16 logo-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">Efficient Learning</h3>
              <p className="text-body font-body text-neutral-medium">
                The brain learns quickly with little data and uses very little energy. 
                We want to understand how and apply it to AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding section-white">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="text-title font-display mb-6">
              The Team
            </h2>
            <p className="text-body-large font-body max-w-3xl mx-auto">
              Two people working on neuroscience and AI research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="card-elegant team-card p-10 text-center hover-lift">
              <div className="w-24 h-24 logo-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">SH</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">San Hashim</h3>
              <p className="text-body font-body mb-4">Research Lead & Co-Founder</p>
              <p className="text-small font-body text-neutral-medium">
                Reads about how the brain works and writes code to see if we can 
                make AI learn the same way
              </p>
            </div>
            <div className="card-elegant team-card p-10 text-center hover-lift">
              <div className="w-24 h-24 logo-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Muhammad</h3>
              <p className="text-body font-body mb-4">Software Engineer & Co-Founder</p>
              <p className="text-small font-body text-neutral-medium">
                Builds the code and tools needed to test our ideas about 
                brain-inspired AI systems
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-body-large font-body mb-8">
              Interested in this kind of research? We'd like to hear from you.
            </p>
            <button className="btn-secondary font-body">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding section-dark">
        <div className="relative z-10 container-narrow text-center">
          <h2 className="text-title font-display text-white mb-8">
            Early Days
          </h2>
          <p className="text-body-large font-body text-gray-300 mb-12">
            We're just getting started with our research. If you're interested in what we're doing 
            or want to collaborate, feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 border-none rounded-2xl px-10 py-4 font-semibold hover-lift transition-all duration-300">
              Follow Our Progress
            </button>
            <button className="border-2 border-white bg-transparent text-white rounded-2xl px-10 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
