export interface Project {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  image: string;
}

export interface Paper {
  title: string;
  venue: string;
  year: string;
  link: string;
}

export const scholarUrl =
  'https://scholar.google.com/citations?user=wNAW_xIAAAAJ&hl=en&authuser=1';

export const projects: Project[] = [
  {
    title: 'TRAPICHE',
    desc: 'Brazilian cloud for developers. Auto-deploy on every push, servers in São Paulo, pay in BRL with Pix — no IOF, no international card.',
    tags: ['CLOUD', 'DEPLOY', 'NEXT.JS', 'ASTRO', 'GO', 'GIN', 'LIBSQL', 'REACT', 'FASTIFY'],
    href: 'https://trapiche.cloud',
    image: '/projects/trapiche.png',
  },
  {
    title: 'WISIO',
    desc: 'AI writing platform for researchers drafting scientific manuscripts in English. Source-grounded feedback, PubMed and Crossref citations in one editor.',
    tags: ['AI', 'WRITING', 'NEXT.JS', 'ASTRO', 'REACT', 'GO', 'TIPTAP', 'MONGODB', 'OPENAI'],
    href: 'https://wisio.app',
    image: '/projects/wisio.png',
  },
  {
    title: 'LUUP',
    desc: 'Spec-driven development CLI that interviews you into a full spec, then drives coding agents through build and acceptance.',
    tags: ['CLI', 'AI AGENTS', 'BUN', 'TYPESCRIPT', 'SOLIDJS', 'DRIZZLE', 'AI SDK', 'MCP', 'ZOD'],
    href: 'https://luup.dev',
    image: '/projects/luup.png',
  },
  {
    title: 'SAAS MAP',
    desc: 'Interactive map of Brazilian SaaS by state and city. Explore startups by region, zoom into cities, and add your own product to the map.',
    tags: ['MAP', 'NEXT.JS', 'REACT', 'D3', 'LIBSQL', 'TAILWIND', 'TYPESCRIPT'],
    href: 'https://saas-map.trapiche.cloud',
    image: '/projects/dev-map.png',
  },
  {
    title: 'PROVADOR VIRTUAL',
    desc: 'AI virtual try-on MVP — upload your photo and a garment to preview how the outfit looks on you, powered by IDM-VTON.',
    tags: ['AI', 'FASHION', 'NEXT.JS', 'REACT', 'TAILWIND', 'REPLICATE', 'TYPESCRIPT'],
    href: 'https://github.com/acf77/provador-virtual',
    image: '/projects/provador-virtual.png',
  },
];

export const papers: Paper[] = [
  {
    title: 'Hypertension and exercise training: evidence from clinical studies',
    venue:
      'IC Moraes-Silva, CT Mostarda, AC Silva-Filho, MC Irigoyen — Exercise for Cardiovascular Disease Prevention and Treatment',
    year: '2017',
    link: 'https://link.springer.com/chapter/10.1007/978-981-10-4304-8_5',
  },
  {
    title:
      'Inspiratory muscle training improves autonomic modulation and exercise tolerance in chronic obstructive pulmonary disease subjects: a randomized-controlled trial',
    venue:
      'ALC Cutrim, AAM Duarte, AC Silva-Filho, CJ Dias, CB Urtado, RM Ribeiro, et al. — Respiratory Physiology & Neurobiology 263, 31-37',
    year: '2019',
    link: 'https://www.sciencedirect.com/science/article/pii/S1569904819300163',
  },
  {
    title:
      'Effect of different phases of menstrual cycle in heart rate variability of physically active women',
    venue:
      'ER Pestana, CT Mostarda, AC Silva-Filho, EP Salvador, et al. — Sport Sciences for Health 14 (2), 297-303',
    year: '2018',
    link: 'https://link.springer.com/article/10.1007/s11332-018-0426-5',
  },
  {
    title:
      'Effect of exercise training in heart rate variability, anxiety, depression, and sleep quality in kidney recipients: A preliminary study',
    venue:
      'R Barroso, AC Silva-Filho, CJ Dias, N Soares Jr, A Mostarda, LA Azoubel, et al. — Journal of Health Psychology 24 (3), 299-308',
    year: '2019',
    link: 'https://journals.sagepub.com/doi/abs/10.1177/1359105316676329',
  },
  {
    title:
      'Effect of exercise training and detraining in autonomic modulation and cardiorespiratory fitness in breast cancer survivors',
    venue:
      'SG JB, AC Silva-Filho, CJ Dias, RD Leite, C Mostarda — The Journal of Sports Medicine and Physical Fitness 57 (7-8), 1062-1068',
    year: '2017',
    link: 'https://www.researchgate.net/profile/Antonio-Silva-Filho-6/publication/312086054_Effect_of_exercise_training_and_detraining_in_autonomic_modulation_and_cardiorespiratory_capacity_in_breast_cancer_survivors/links/58b997ada6fdcc2d14dc42af/Effect-of-exercise-training-and-detraining-in-autonomic-modulation-and-cardiorespiratory-capacity-in-breast-cancer-survivors.pdf',
  },
  {
    title:
      'Short-term combined exercise training improves cardiorespiratory fitness and autonomic modulation in cancer patients receiving adjuvant therapy',
    venue:
      'C Mostarda, J Castro-Filha, AD Reis, M Sevílio Jr, CJ Dias, AC Silva-Filho, et al. — Journal of Exercise Rehabilitation 13 (5), 599',
    year: '2017',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5667608/',
  },
  {
    title: 'Autonomic modulation analysis in active and sedentary kidney transplanted recipients',
    venue:
      'CJ Moraes Dias, LM Anaisse Azoubel, H Araújo Costa, E Costa Maia, et al. — Clinical and Experimental Pharmacology and Physiology 42 (12), 1239-1244',
    year: '2015',
    link: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/1440-1681.12481',
  },
  {
    title: 'A case-control study of exercise and kidney disease: hemodialysis and transplantation',
    venue:
      'A Silva-Filho, LA Azoubel, RF Barroso, E Carneiro, CAA Dias-Filho, et al. — International Journal of Sports Medicine 40 (03), 209-217',
    year: '2019',
    link: 'https://www.thieme-connect.com/products/ejournals/html/10.1055/a-0810-8583',
  },
  {
    title:
      'A Machine Learning model of the combination of normalized SD1 and SD2 indexes from 24h-Heart Rate Variability as a predictor of myocardial infarction',
    venue:
      'AC Silva-Filho, SR Dutra-Macedo, ASM Vieira, C Mostarda — arXiv preprint arXiv:2102.09410',
    year: '2021',
    link: 'https://arxiv.org/abs/2102.09410',
  },
];
