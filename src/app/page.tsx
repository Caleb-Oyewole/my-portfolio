"use client";
import { useTheme } from 'next-themes';

export default function Portfolio() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold italic">DevPortfolio</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="py-20 text-center">
        <h2 className="text-5xl font-extrabold mb-4">Building Digital Experiences</h2>
        <p className="text-slate-500 dark:text-slate-400">Software Engineer | Designer | Blogger</p>
      </header>

      {/* Projects Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8">Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="border dark:border-slate-700 p-6 rounded-xl hover:shadow-lg transition">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded mb-4"></div>
              <h4 className="text-xl font-bold">Project Title {i}</h4>
              <p className="text-sm text-slate-500">A brief description of the tech stack and impact.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-8 text-center">Get In Touch</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 rounded border dark:bg-slate-800 dark:border-slate-700" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded border dark:bg-slate-800 dark:border-slate-700" />
          <textarea placeholder="Message" rows={4} className="w-full p-3 rounded border dark:bg-slate-800 dark:border-slate-700"></textarea>
          <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">Send Message</button>
        </form>
      </section>
    </div>
  );
}