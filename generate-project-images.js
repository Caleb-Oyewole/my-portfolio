const fs = require('fs');
const path = require('path');

// Color palette based on technology tags
const colorMap = {
    'Python': '#3776ab',
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'React': '#61dafb',
    'Node.js': '#339933',
    'Flask': '#000000',
    'Django': '#092e20',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Express': '#90c53f',
    'PostgreSQL': '#336791',
    'MongoDB': '#13aa52',
    'default': '#3b82f6'
};

// Mapping of project names to their colors based on tags
const projects = [
    { id: 1, title: 'webdev_1', tags: ['HTML'], color: '#e34c26' },
    { id: 2, title: 'Official-Company-Website', tags: ['HTML', 'CSS', 'JavaScript'], color: '#f7df1e' },
    { id: 3, title: 'pr3dkt', tags: ['TypeScript'], color: '#3178c6' },
    { id: 4, title: 'proj2_DE', tags: ['Python'], color: '#3776ab' },
    { id: 5, title: 'etl_dags', tags: ['Python'], color: '#3776ab' },
    { id: 6, title: 'quizz', tags: ['Python'], color: '#3776ab' },
    { id: 7, title: 'proj1_DE', tags: ['Python'], color: '#3776ab' },
    { id: 8, title: 'kwizz', tags: ['Python'], color: '#3776ab' }
];

function getColorForTags(tags) {
    if (tags && tags.length > 0) {
        const tag = tags[0].trim();
        return colorMap[tag] || colorMap['default'];
    }
    return colorMap['default'];
}

function generateSVG(title, tags, color) {
    const bgColor = color;
    const textColor = '#ffffff';
    const tagString = tags.join(', ');

    // Clean title for display
    const displayTitle = title
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="grad${title}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(bgColor, -20)};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="500" height="300" fill="url(#grad${title})" />
  
  <!-- Decorative shapes -->
  <circle cx="450" cy="30" r="80" fill="rgba(255, 255, 255, 0.1)" />
  <circle cx="50" cy="250" r="60" fill="rgba(255, 255, 255, 0.1)" />
  <rect x="20" y="20" width="4" height="100" fill="rgba(255, 255, 255, 0.2)" />
  
  <!-- Title -->
  <text x="250" y="100" font-size="48" font-weight="bold" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif">
    ${displayTitle.substring(0, 20)}
  </text>
  
  <!-- Subtitle/Tags -->
  <text x="250" y="160" font-size="18" text-anchor="middle" fill="rgba(255, 255, 255, 0.8)" font-family="Arial, sans-serif">
    ${tagString}
  </text>
  
  <!-- Icon placeholder -->
  <rect x="350" y="220" width="120" height="60" fill="rgba(255, 255, 255, 0.15)" rx="8" />
  <text x="410" y="255" font-size="24" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif">
    📊
  </text>
</svg>`;
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

async function generateImages() {
    const publicDir = path.join(__dirname, 'public');

    console.log('🎨 Generating GitHub project preview images...\n');

    projects.forEach((project) => {
        const color = getColorForTags(project.tags);
        const svg = generateSVG(project.title, project.tags, color);
        const filename = `github-project-${project.id}.svg`;
        const filepath = path.join(publicDir, filename);

        fs.writeFileSync(filepath, svg);
        console.log(`✅ Created: ${filename}`);
    });

    console.log('\n🎉 All project images generated successfully!');
    console.log('📁 Images saved to: public/');
}

generateImages().catch(err => {
    console.error('❌ Error generating images:', err);
    process.exit(1);
});
