import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Team 20</span>
          </div>
          <nav className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">About</a>
            <a href="#services" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Services</a>
            <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
          <span>AI Native Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight max-w-2xl leading-tight mb-4">
          Building the Future with<br />
          <span className="text-violet-600">Artificial Intelligence</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 leading-relaxed">
          We help enterprises embrace AI-native workflows, transforming how teams work and deliver value through intelligent automation.
        </p>
        <div className="flex gap-4">
          <a href="#about" className="px-6 py-3 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-colors">
            Learn More
          </a>
          <a href="#contact" className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">What is an AI-Native Enterprise?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            An AI-native enterprise integrates artificial intelligence at the core of its operations — not as a supporting tool, but as the foundational driver of strategy, execution, and innovation. Unlike companies that simply add AI to existing workflows, AI-native organizations rethink their processes end-to-end with AI as the default executor.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">AI-First Operations</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Automation and intelligence embedded in every process by default.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl">🔄</span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Continuous Learning</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Systems that improve and adapt from every interaction and feedback loop.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl">🚀</span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Rapid Innovation</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Faster iteration cycles powered by AI-assisted development and decision-making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">Our Services</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">AI Strategy & Consulting</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">We help you define an AI roadmap aligned with your business goals and technical readiness.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Intelligent Automation</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Design and deploy AI-powered workflows that reduce manual effort and increase accuracy.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">AI-Native Development</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Build applications where AI is a first-class citizen — from code generation to intelligent UX.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Training & Enablement</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Equip your teams with the knowledge and tools to work effectively with AI systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Ready to Go AI-Native?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
            Whether you&apos;re starting your AI journey or looking to scale existing initiatives, we&apos;re here to help.
          </p>
          <a href="mailto:team20@example.com" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-colors">
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500">
          <span>© 2026 Team 20 — AI Native Enterprise Solutions</span>
          <span>Built with Next.js, TypeScript & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}