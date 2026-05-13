// API Route to Fetch GitHub Projects
// TODO: Add your GitHub Personal Access Token to environment variables
// This fetches starred or authored repositories from GitHub API

import { NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
}

export async function GET() {
  try {
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubToken = process.env.GITHUB_TOKEN;

    // TODO: Add these environment variables to .env.local
    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username not configured' },
        { status: 400 }
      );
    }

    // Fetch user repositories from GitHub API
    // TODO: Customize this endpoint:
    // - /users/{username}/repos - Get all repositories
    // - /users/{username}/starred - Get starred repositories
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=12`,
      {
        headers: {
          ...(githubToken && { Authorization: `token ${githubToken}` }),
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Map of repository names to image indices for local images
    const imageMap: { [key: string]: number } = {
      'webdev_1': 1,
      'Official-Company-Website': 2,
      'pr3dkt': 3,
      'proj2_DE': 4,
      'etl_dags': 5,
      'quizz': 6,
      'proj1_DE': 7,
      'kwizz': 8,
    };

    // Filter and format repositories
    const formattedRepos = repos
      .filter((repo: GitHubRepo) => !repo.name.includes('portfolio') || repo.description)
      .map((repo: GitHubRepo, index: number) => {
        // Get image path from map, or generate based on index
        const imageIndex = imageMap[repo.name] || (index + 1);
        return {
          id: repo.id,
          title: repo.name,
          description: repo.description || 'No description provided',
          tags: [repo.language || 'No language', ...repo.topics].filter(Boolean),
          link: repo.html_url,
          stars: repo.stargazers_count,
          image: `/github-project-${imageIndex}.svg`,
        };
      })
      .slice(0, 8); // TODO: Adjust limit based on your needs

    return NextResponse.json(formattedRepos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects' },
      { status: 500 }
    );
  }
}
