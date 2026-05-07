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
        link: "https://github.com/Caleb-Oyewole/project1",
        image: "https://images.unsplash.com/photo-1460925895917-adf4198c838f?w=500&h=300&fit=crop",
    },
    {
        id: 2,
        title: "AI Chatbot",
        description: "A custom LLM interface using OpenAI API and LangChain.",
        tags: ["TypeScript", "OpenAI", "Node.js"],
        link: "https://github.com/Caleb-Oyewole/project2",
        image: "https://images.unsplash.com/photo-1677442d019cecf8ec14c28cdfcb47e15ff19cf6f?w=500&h=300&fit=crop",
    },
    {
        id: 3,
        title: "Data Visualization App",
        description: "An interactive data visualization tool built with D3.js and React.",
        tags: ["React", "D3.js", "Tailwind"],
        link: "https://github.com/Caleb-Oyewole/project3",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    },
    {
        id: 4,
        title: "Backend API Service",
        description: "RESTful API with PostgreSQL and advanced authentication.",
        tags: ["Node.js", "PostgreSQL", "Express"],
        link: "https://github.com/Caleb-Oyewole/project4",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    {
        id: 5,
        title: "Mobile App",
        description: "Cross-platform mobile application with React Native.",
        tags: ["React Native", "Firebase", "TypeScript"],
        link: "https://github.com/Caleb-Oyewole/project5",
        image: "https://images.unsplash.com/photo-1512941691920-25c2f6e2d3f5?w=500&h=300&fit=crop",
    },
    {
        id: 6,
        title: "Design System",
        description: "Comprehensive component library with Storybook integration.",
        tags: ["React", "Storybook", "CSS"],
        link: "https://github.com/Caleb-Oyewole/project6",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    },
];