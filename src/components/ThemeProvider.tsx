"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div suppressHydrationWarning>
            {/* 'attribute="class"' allows Tailwind to use 'dark:' modifiers */}
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" enableColorScheme={false}>
                {children}
            </NextThemesProvider>
        </div>
    );
}