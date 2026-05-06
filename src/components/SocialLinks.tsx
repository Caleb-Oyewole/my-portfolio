'use client';

import { LinkedInIcon, GitHubIcon, InstagramIcon, EmailIcon, TwitterIcon } from './Icons';

export interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
    label: string;
}

export const socialLinks: SocialLink[] = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/oyewole-caleb-295a8b294/',
        icon: <LinkedInIcon />,
        label: 'LinkedIn Profile',
    },
    {
        name: 'GitHub',
        url: 'https://github.com/Caleb-Oyewole',
        icon: <GitHubIcon />,
        label: 'GitHub Profile',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/_theoyewolecaleb/',
        icon: <InstagramIcon />,
        label: 'Instagram Profile',
    },
    {
        name: 'Twitter',
        url: 'https://x.com/OyeKola1299005',
        icon: <TwitterIcon />,
        label: 'Twitter Profile',
    },
    {
        name: 'Email',
        url: 'mailto:oyewolecaleb729@gmail.com',
        icon: <EmailIcon />,
        label: 'Send Email',
    },
];

export default function SocialLinks() {
    return (
        <div className="flex justify-center gap-4 py-8 flex-wrap">
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={link.label}
                    title={link.label}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
