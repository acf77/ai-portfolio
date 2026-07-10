import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    externalLink: z.string(),
    source: z.enum(['tabnews', 'linkedin']),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    role: z.string(),
    tags: z.array(z.string()),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    video: z.string().optional(),
    diagram: z.string().optional(),
    diagramAlt: z.string().optional(),
  }),
});

export const collections = { posts, work };
