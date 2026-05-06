# 📝 Content Templates: Fill in Your Professional Details

## 🧑‍💼 About You Section Template

Add this to make your portfolio more personal. Place after the profile picture in `src/app/page.tsx`:

```typescript
{/* Bio Section */}
<div className="max-w-3xl mb-12">
  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
    [Add 2-3 sentences about yourself. Example:]
    I'm a passionate Data Engineer and Full-Stack Developer with expertise in building 
    scalable applications and designing intuitive user experiences. With [X years] of 
    experience, I've helped [companies/clients] achieve their digital transformation goals.
  </p>
  
  <div className="flex flex-wrap gap-3 justify-center">
    <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
      Download Resume
    </button>
    <button className="px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
      View My Work
    </button>
  </div>
</div>
```

---

## 🛠️ Skills Section Template

Add this as a new section:

```typescript
{/* Skills Section */}
<section className="max-w-6xl mx-auto px-6 py-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-20">
  <h3 className="text-4xl font-bold mb-12 text-center">Technical Skills</h3>
  
  <div className="grid md:grid-cols-3 gap-8">
    {/* Languages */}
    <div>
      <h4 className="font-bold text-l mb-4">Languages</h4>
      <div className="flex flex-wrap gap-2">
        {['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java'].map(lang => (
          <span key={lang} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
            {lang}
          </span>
        ))}
      </div>
    </div>
    
    {/* Frameworks */}
    <div>
      <h4 className="font-bold text-l mb-4">Frameworks</h4>
      <div className="flex flex-wrap gap-2">
        {['React', 'Next.js', 'FastAPI', 'Node.js', 'Django'].map(fw => (
          <span key={fw} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
            {fw}
          </span>
        ))}
      </div>
    </div>
    
    {/* Tools */}
    <div>
      <h4 className="font-bold text-l mb-4">Tools & Platforms</h4>
      <div className="flex flex-wrap gap-2">
        {['Docker', 'AWS', 'PostgreSQL', 'Git', 'Figma'].map(tool => (
          <span key={tool} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm">
            {tool}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

## 💼 Experience Timeline Template

```typescript
{/* Experience Section */}
<section className="max-w-4xl mx-auto px-6 py-20 mb-20">
  <h3 className="text-4xl font-bold mb-12 text-center">Experience</h3>
  
  <div className="space-y-8">
    {/* Job 1 */}
    <div className="border-l-4 border-blue-500 pl-6 pb-8">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">2023 - Present</p>
      <h4 className="text-2xl font-bold mt-1">Senior Developer</h4>
      <p className="text-slate-600 dark:text-slate-400">Tech Company Inc.</p>
      <ul className="mt-3 text-slate-600 dark:text-slate-400 space-y-1 text-sm">
        <li>• Led development of a real-time data processing pipeline</li>
        <li>• Improved application performance by 40%</li>
        <li>• Mentored junior developers</li>
      </ul>
    </div>
    
    {/* Job 2 */}
    <div className="border-l-4 border-slate-300 dark:border-slate-700 pl-6">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">2021 - 2023</p>
      <h4 className="text-2xl font-bold mt-1">Full Stack Developer</h4>
      <p className="text-slate-600 dark:text-slate-400">Startup Co.</p>
      <ul className="mt-3 text-slate-600 dark:text-slate-400 space-y-1 text-sm">
        <li>• Developed 5+ web applications with React and Node.js</li>
        <li>• Implemented CI/CD pipelines reducing deployment time by 50%</li>
      </ul>
    </div>
  </div>
</section>
```

---

## 🎓 Education Section Template

```typescript
{/* Education Section */}
<section className="max-w-4xl mx-auto px-6 py-20 mb-20">
  <h3 className="text-4xl font-bold mb-12 text-center">Education</h3>
  
  <div className="space-y-6">
    <div className="flex justify-between items-start pb-6 border-b border-slate-200 dark:border-slate-700">
      <div>
        <h4 className="text-xl font-bold">Master of Science in Computer Science</h4>
        <p className="text-slate-600 dark:text-slate-400">University Name, 2021</p>
      </div>
      <p className="text-slate-500">GPA: 3.8/4.0</p>
    </div>
    
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-xl font-bold">Bachelor of Science in Computer Engineering</h4>
        <p className="text-slate-600 dark:text-slate-400">University Name, 2019</p>
      </div>
      <p className="text-slate-500">GPA: 3.9/4.0</p>
    </div>
  </div>
</section>
```

---

## 📁 Example Real Projects Data

Replace the placeholder projects in `src/app/page.tsx` with real ones:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with payment integration, user authentication, and admin dashboard. Built with React, Node.js, and MongoDB.',
    tags: ['react', 'node.js', 'mongodb', 'stripe'],
    link: 'https://github.com/yourname/ecommerce-platform',
  },
  {
    id: 2,
    title: 'Real-time Data Analytics Dashboard',
    description: 'Analytics dashboard displaying real-time data from multiple sources. Features interactive charts, data filtering, and export functionality.',
    tags: ['typescript', 'react', 'websockets', 'fastapi'],
    link: 'https://github.com/yourname/analytics-dashboard',
  },
  {
    id: 3,
    title: 'AI-Powered Content Generator',
    description: 'SaaS application that uses GPT to generate high-quality content. Includes user management, payment processing, and API endpoints.',
    tags: ['next.js', 'openai-api', 'postgresql', 'stripe'],
    link: 'https://github.com/yourname/ai-generator',
  },
  {
    id: 4,
    title: 'Microservices Architecture Template',
    description: 'Production-ready template for building microservices with Docker, Kubernetes, and comprehensive monitoring setup.',
    tags: ['docker', 'kubernetes', 'python', 'prometheus'],
    link: 'https://github.com/yourname/microservices-template',
  },
  {
    id: 5,
    title: 'Mobile App - Task Manager',
    description: 'Cross-platform task management app with offline support, cloud sync, and team collaboration features.',
    tags: ['react-native', 'firebase', 'redux'],
    link: 'https://github.com/yourname/task-manager-app',
  },
  {
    id: 6,
    title: 'Data Pipeline ETL Tool',
    description: 'Scalable ETL tool for processing large datasets with error handling, logging, and scheduled execution.',
    tags: ['python', 'apache-airflow', 'postgresql'],
    link: 'https://github.com/yourname/etl-tool',
  },
];
```

---

## ⭐ Testimonials Section Template

```typescript
{/* Testimonials Section */}
<section className="max-w-6xl mx-auto px-6 py-20 mb-20">
  <h3 className="text-4xl font-bold mb-12 text-center">What People Say</h3>
  
  <div className="grid md:grid-cols-3 gap-8">
    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        "Working with Caleb was an absolute pleasure. They delivered high-quality code on time and went above and beyond to ensure our project's success."
      </p>
      <p className="font-bold">Jane Doe</p>
      <p className="text-slate-500 text-sm">CEO, Tech Startup Inc.</p>
    </div>
    
    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        "Exceptional problem-solving skills and attention to detail. Highly recommend for any project."
      </p>
      <p className="font-bold">John Smith</p>
      <p className="text-slate-500 text-sm">Product Manager, Design Studio</p>
    </div>
    
    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        "Great communication and always delivers. A key member of our engineering team."
      </p>
      <p className="font-bold">Sarah Wilson</p>
      <p className="text-slate-500 text-sm">CTO, Enterprise Solutions</p>
    </div>
  </div>
</section>
```

---

## 🎨 Update Your Hero Section Copy

Replace generic text with personal information:

```typescript
// CURRENT:
<p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-2">
  Data Engineer | Graphics Designer | Back-End Developer
</p>

// USE THIS FORMAT:
<p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-2">
  [Your Title] | [Your Focus] | [Your Specialty]
</p>

// EXAMPLE:
<p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-2">
  Full Stack Developer | AI Enthusiast | Open Source Contributor
</p>
```

---

## 📋 Checklist: What to Update

- [ ] Replace "Project One" with real projects
- [ ] Replace "Project Two" with real projects  
- [ ] Add 4-6 more projects (aim for 6 total)
- [ ] Update your social links (already done in SocialLinks.tsx!)
- [ ] Add your professional bio
- [ ] Add your technical skills
- [ ] Add your work experience
- [ ] Add your education
- [ ] Add professional photo/profile picture
- [ ] Add testimonials if you have them
- [ ] Update the hero tagline

---

## 💡 Pro Tips

1. **Project Descriptions:** Be specific. Instead of "Great project," say "Reduced load time by 45% through query optimization"
2. **Skills Section:** Organize by category (Languages, Frameworks, Tools)
3. **Experience:** Focus on impact and results, not just duties
4. **Links:** Make sure GitHub/project links work and are public
5. **Testimonials:** Ask colleagues/clients for a sentence or two of feedback

