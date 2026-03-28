export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string; // Optional: path to an image
}

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A real-time sales tracker built with Next.js and Chart.js.",
        tags: ["React", "Next.js", "Tailwind"],
        link: "https://github.com/yourusername/project1",
    },
    {
        id: 2,
        title: "AI Chatbot",
        description: "A custom LLM interface using OpenAI API and LangChain.",
        tags: ["TypeScript", "OpenAI", "Node.js"],
        link: "https://github.com/yourusername/project2",
    },
    {
        id: 3,
        title: "Data Visualization App",
        description: "An interactive data visualization tool built with D3.js and React.",
        tags: ["React", "D3.js", "Tailwind"],
        link: "https://github.com/yourusername/project3",
    },
    // Add as many as you like here!
];