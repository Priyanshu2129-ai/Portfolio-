export interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  description?: string;
  icon?: string;
  levelTag: string; // e.g. "Learned & Explored"
}

export interface SkillCategoryGroup {
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategoryGroup[] = [
  {
    category: 'Programming',
    title: 'Core Programming',
    description: 'Foundational languages explored for logic building, algorithms, and computational thinking.',
    skills: [
      { name: 'Java', category: 'Programming', levelTag: 'Learned & Explored', description: 'Object-oriented programming, data structures, and core principles.' },
      { name: 'C', category: 'Programming', levelTag: 'Learned & Explored', description: 'Low-level concepts, memory management, and structured programming.' },
      { name: 'Python', category: 'Programming', levelTag: 'Learned & Explored', description: 'Scripting, algorithmic exploration, and problem-solving.' }
    ]
  },
  {
    category: 'Frontend',
    title: 'Frontend Development',
    description: 'Technologies used to design responsive, interactive, and modern user interfaces.',
    skills: [
      { name: 'HTML', category: 'Frontend', levelTag: 'Learned & Explored', description: 'Semantic markup, accessibility, and modern structural standards.' },
      { name: 'CSS', category: 'Frontend', levelTag: 'Learned & Explored', description: 'Responsive layouts, Flexbox, Grid, animations, and modern styling.' },
      { name: 'JavaScript', category: 'Frontend', levelTag: 'Learned & Explored', description: 'ES6+ fundamentals, DOM manipulation, asynchronous programming.' },
      { name: 'React', category: 'Frontend', levelTag: 'Learned & Explored', description: 'Component-based architecture, hooks, state management, and SPAs.' }
    ]
  },
  {
    category: 'Backend',
    title: 'Backend Systems',
    description: 'Server-side runtime and API development.',
    skills: [
      { name: 'Node.js', category: 'Backend', levelTag: 'Learned & Explored', description: 'Event-driven server runtime, REST API creation, and asynchronous backend logic.' }
    ]
  },
  {
    category: 'Database',
    title: 'Databases & Storage',
    description: 'Relational and NoSQL data storage solutions.',
    skills: [
      { name: 'SQL', category: 'Database', levelTag: 'Learned & Explored', description: 'Relational data modeling, table schemas, queries, and joins.' },
      { name: 'MongoDB', category: 'Database', levelTag: 'Learned & Explored', description: 'Document-oriented database, collections, and JSON-like query structures.' }
    ]
  },
  {
    category: 'Tools',
    title: 'Developer Tools & Platforms',
    description: 'Essential workflow tools, version control systems, and deployment infrastructure.',
    skills: [
      { name: 'Git', category: 'Tools', levelTag: 'Learned & Explored', description: 'Local version control, branching, committing, and history management.' },
      { name: 'GitHub', category: 'Tools', levelTag: 'Learned & Explored', description: 'Code hosting, collaboration, pull requests, and repository workflows.' },
      { name: 'Postman', category: 'Tools', levelTag: 'Learned & Explored', description: 'API testing, request inspection, and endpoint verification.' },
      { name: 'Vercel', category: 'Tools', levelTag: 'Learned & Explored', description: 'Continuous deployment, serverless hosting, and production previews.' }
    ]
  }
];
