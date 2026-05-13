"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import SocialLinks from '@/components/SocialLinks';
import GitHubProjects from '@/components/GitHubProjects';
import { useTheme } from 'next-themes';
import { projects } from '@/data/projects';

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Message sent successfully! I will get back to you soon.');
        e.currentTarget.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again.');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Caleb Oyewole</h1>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}
      </nav>

      {/* Hero Section with Profile Picture */}
      <header className="py-20 px-6 text-center max-w-6xl mx-auto">
        {/* Profile Picture Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            {/* Profile Picture Frame */}
            <div className="w-full h-full rounded-full bg-linear-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-1">
              {/* Inner Profile Picture (Placeholder) */}
              <div className="relative w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <Image
                  src="/profile-pic.jpg"
                  alt="Caleb Oyewole"
                  fill
                  sizes="192px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold mb-4">Building Digital Experiences</h2>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-2">
          Data Engineer | Graphics Designer | Back-End Developer
        </p>

        {/* Social Links Section */}
        <SocialLinks />
      </header>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h3 className="text-4xl font-bold mb-2">Selected Works</h3>
            <p className="text-slate-500 dark:text-slate-400">A collection of things I&apos;ve built recently.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* GitHub Projects Section - TODO: Configure GITHUB_USERNAME in .env.local */}
      <GitHubProjects />

      {/* Contact Form - Connected to API backend */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-8 text-center">Get In Touch</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Message (minimum 10 characters)"
            rows={4}
            minLength={10}
            maxLength={1000}
            required
            onChange={(e) => setMessageLength(e.target.value.length)}
            className="w-full p-3 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <div className="text-xs text-slate-500 dark:text-slate-400 text-right">
            {messageLength} / 1000 characters
          </div>

          {/* Status Messages */}
          {formMessage && (
            <div
              className={`p-3 rounded text-sm text-center ${formStatus === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}
            >
              {formMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={formStatus === 'loading' || messageLength < 10}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {formStatus === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin">⏳</span> Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </section>
    </div>
  );
}