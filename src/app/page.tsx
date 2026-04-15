"use client";
import ProjectCard from '@/components/ProjectCard';
import { useTheme } from 'next-themes';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'Description for project one',
      tags: ['typescript', 'react'],
      link: '#',
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Description for project two',
      tags: ['next.js', 'tailwind'],
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Caleb Oyewole</h1>
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
        <p className="text-slate-500 dark:text-slate-400">Data Engineer | Graphics Designer | Back-End Developer</p>
      </header>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h3 className="text-4xl font-bold mb-2">Selected Works</h3>
            <p className="text-slate-500">A collection of things I&apos;ve built recently.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-8 text-center">Get In Touch</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Message" rows={4} className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors">Send Message</button>
        </form>
      </section>
    </div>
  );
}