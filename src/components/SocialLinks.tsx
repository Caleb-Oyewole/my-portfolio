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
        url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=oyewolecaleb729@gmail.com&su=Contact%20from%20Portfolio&body=',
        icon: <EmailIcon />,
        label: 'Send Email via Gmail',
    },
];

export default function SocialLinks() {
    return (
        <div className="flex justify-center gap-4 py-8 flex-wrap">
            {socialLinks.map((link) => {
                // Determine color based on social platform
                let bgColor = "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200";
                let hoverColor = "hover:bg-blue-500 dark:hover:bg-blue-600";

                if (link.name === 'LinkedIn') {
                    bgColor = "bg-blue-600 text-white";
                    hoverColor = "hover:bg-blue-700";
                } else if (link.name === 'Email') {
                    bgColor = "bg-red-500 text-white";
                    hoverColor = "hover:bg-red-600";
                } else if (link.name === 'GitHub') {
                    bgColor = "bg-slate-800 text-white dark:bg-slate-600";
                    hoverColor = "hover:bg-slate-900 dark:hover:bg-slate-700";
                } else if (link.name === 'Instagram') {
                    bgColor = "bg-pink-500 text-white";
                    hoverColor = "hover:bg-pink-600";
                } else if (link.name === 'Twitter') {
                    bgColor = "bg-black text-white";
                    hoverColor = "hover:bg-slate-800";
                }

                return (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${bgColor} ${hoverColor} transition-all duration-300 transform hover:scale-110`}
                        aria-label={link.label}
                        title={link.label}
                    >
                        {link.icon}
                    </a>
                );
            })}
        </div>
    );
}
