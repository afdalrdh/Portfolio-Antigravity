import { lazy, Suspense, createElement, useState, useEffect } from 'react';

// Map prefix to the react-icons module path
// Sorted: longer prefixes first to avoid conflicts (e.g. "Fa6" before "Fa")
const prefixToModule = [
    ['Lia', () => import('react-icons/lia')],
    ['Fa6', () => import('react-icons/fa6')],
    ['Hi2', () => import('react-icons/hi2')],
    ['Io5', () => import('react-icons/io5')],
    ['Tfi', () => import('react-icons/tfi')],
    ['Vsc', () => import('react-icons/vsc')],
    ['Si', () => import('react-icons/si')],
    ['Fi', () => import('react-icons/fi')],
    ['Fa', () => import('react-icons/fa')],
    ['Bs', () => import('react-icons/bs')],
    ['Di', () => import('react-icons/di')],
    ['Tb', () => import('react-icons/tb')],
    ['Ai', () => import('react-icons/ai')],
    ['Bi', () => import('react-icons/bi')],
    ['Cg', () => import('react-icons/cg')],
    ['Ci', () => import('react-icons/ci')],
    ['Fc', () => import('react-icons/fc')],
    ['Gi', () => import('react-icons/gi')],
    ['Go', () => import('react-icons/go')],
    ['Gr', () => import('react-icons/gr')],
    ['Hi', () => import('react-icons/hi')],
    ['Im', () => import('react-icons/im')],
    ['Io', () => import('react-icons/io')],
    ['Lu', () => import('react-icons/lu')],
    ['Md', () => import('react-icons/md')],
    ['Pi', () => import('react-icons/pi')],
    ['Ri', () => import('react-icons/ri')],
    ['Rx', () => import('react-icons/rx')],
    ['Sl', () => import('react-icons/sl')],
    ['Ti', () => import('react-icons/ti')],
    ['Wi', () => import('react-icons/wi')],
];

// Cache loaded modules to avoid redundant imports
const moduleCache = {};

/**
 * Dynamically load and render a react-icon by its component name.
 * Uses dynamic import() so only the needed icon library is bundled/loaded.
 */
function DynamicIcon({ iconCode, ...props }) {
    const [IconComponent, setIconComponent] = useState(null);

    useEffect(() => {
        if (!iconCode) return;

        const code = iconCode.replace(/\s/g, '');

        // Find the matching prefix
        const match = prefixToModule.find(([prefix]) => code.startsWith(prefix));
        if (!match) return;

        const [prefix, loader] = match;

        // Use cached module if available
        if (moduleCache[prefix]) {
            const Icon = moduleCache[prefix][code];
            if (Icon) setIconComponent(() => Icon);
            return;
        }

        // Dynamically import the icon module
        loader().then((mod) => {
            moduleCache[prefix] = mod;
            const Icon = mod[code];
            if (Icon) setIconComponent(() => Icon);
        }).catch(() => {
            // silently fail
        });
    }, [iconCode]);

    if (!iconCode) return null;
    if (IconComponent) return <IconComponent {...props} />;

    // Fallback while loading or if not found
    return <span>{iconCode.slice(0, 2)}</span>;
}

/**
 * Render a react-icons icon by its code name.
 * Supports all react-icons families via dynamic import (code-split).
 * @param {string} iconCode - The react-icons component name (e.g. 'SiFigma', 'BsPaletteFill', 'DiPhotoshop')
 * @returns {JSX.Element|null}
 */
export const renderIcon = (iconCode) => {
    if (!iconCode) return null;
    return <DynamicIcon iconCode={iconCode} />;
};
