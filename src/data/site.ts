export interface Project {
  title: string;
  desc: string;
  tags: string[];
}

export interface Paper {
  title: string;
  venue: string;
  year: string;
  link: string;
}

export interface Post {
  title: string;
  date: string;
  excerpt: string;
}

export const projects: Project[] = [
  {
    title: 'PROJECT_01',
    desc: 'Placeholder description for a project. Swap in real details, stack, and outcomes here.',
    tags: ['REACT', 'AI'],
  },
  {
    title: 'PROJECT_02',
    desc: 'Placeholder description for a project. Swap in real details, stack, and outcomes here.',
    tags: ['PYTHON', 'ML'],
  },
  {
    title: 'PROJECT_03',
    desc: 'Placeholder description for a project. Swap in real details, stack, and outcomes here.',
    tags: ['TS', 'WEBGL'],
  },
  {
    title: 'PROJECT_04',
    desc: 'Placeholder description for a project. Swap in real details, stack, and outcomes here.',
    tags: ['RUST'],
  },
];

export const papers: Paper[] = [
  {
    title: 'PAPER TITLE PLACEHOLDER ONE',
    venue: 'Journal / Conference name, authors',
    year: '2025',
    link: '#',
  },
  {
    title: 'PAPER TITLE PLACEHOLDER TWO',
    venue: 'Journal / Conference name, authors',
    year: '2024',
    link: '#',
  },
];

export const posts: Post[] = [
  {
    title: 'ON BUILDING SMALL THINGS',
    date: '2026.06.02',
    excerpt: 'Placeholder excerpt for a blog post. Replace with your real writing.',
  },
  {
    title: 'NOTES ON LEARNING IN PUBLIC',
    date: '2026.04.18',
    excerpt: 'Placeholder excerpt for a blog post. Replace with your real writing.',
  },
  {
    title: 'WHY PIXELS STILL MATTER',
    date: '2026.02.09',
    excerpt: 'Placeholder excerpt for a blog post. Replace with your real writing.',
  },
];
