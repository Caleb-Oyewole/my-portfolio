import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl bg-slate-50/50 dark:bg-slate-800/50">
            {/* Project Image with Fallback */}
            <div className="relative h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-5 overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        📸 No Image
                    </div>
                )}
            </div>

            <h4 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
            </h4>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline decoration-blue-500/30 underline-offset-4 hover:decoration-blue-500"
            >
                View Project →
            </a>
        </div>
    );
}