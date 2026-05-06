/**
 * GitHub Projects Component - ACTIVE
 * ✅ Fetches and displays projects from your GitHub profile
 * 
 * ACTIVATED: GITHUB_USERNAME=Caleb-Oyewole is configured in .env.local
 * 
 * To improve:
 * 1. (Optional) Add GITHUB_TOKEN to .env.local for private repos
 *    Generate at: https://github.com/settings/tokens
 *    Scopes needed: public_repo, read:user
 * 
 * 2. Your projects are auto-fetched from: github.com/Caleb-Oyewole
 */

'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

interface GitHubProject {
    id: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
    stars?: number;
}

export default function GitHubProjects() {
    const [projects, setProjects] = useState<GitHubProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGitHubProjects() {
            try {
                const response = await fetch('/api/github-projects');

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub projects');
                }

                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error('Error fetching GitHub projects:', err);
                setError('Unable to load GitHub projects. Check your environment configuration.');
            } finally {
                setLoading(false);
            }
        }

        fetchGitHubProjects();
    }, []);

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h3 className="text-4xl font-bold mb-12">GitHub Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 animate-pulse"
                        >
                            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-5" />
                            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h3 className="text-4xl font-bold mb-12">GitHub Projects</h3>
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
                        TODO: Configure GITHUB_USERNAME in .env.local to display your projects
                    </p>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h3 className="text-4xl font-bold mb-12">GitHub Projects</h3>
                <p className="text-slate-500 dark:text-slate-400">No public projects found on GitHub.</p>
            </section>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h3 className="text-4xl font-bold mb-2">GitHub Projects</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Automatically synced from your GitHub profile
                    </p>
                </div>
                <a
                    href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    View All on GitHub →
                </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
