import type { Project, TimelineItem, Certification, SocialLink, Stat, HeroBadge } from '@/types'

export const PERSONAL_INFO = {
  name: 'Shankar Mattavelli',
  nameFirstLine: 'Shankar',
  nameSecondLine: 'Mattavelli',
  role: 'Frontend Developer',
  location: 'Milano, Italia',
  bio: 'Basato a Milano, Italia — specializzato in sviluppo web interattivo, computer grafica 3D e visual computing.',
  email: 'shankar.mattavelli@gmail.com',
  objective: 'Ruolo IT / Developer con focus su Computer Graphics, WebGL e Interactive 3D',
} as const

export const STATS: Stat[] = [
  { value: '6+', label: 'PROGETTI' },
  { value: '6', label: 'CERTIFICAZIONI' },
  { value: '5+', label: 'ANNI' },
]

export const HERO_BADGES: HeroBadge[] = [
  { label: 'React', top: '11%', left: '0%', floatDelay: 0, floatDuration: 4.2 },
  { label: 'Three.js', top: '21%', left: '13%', floatDelay: 0.5, floatDuration: 3.8 },
  { label: 'Node.js', top: '9%', right: '20%', floatDelay: 1.2, floatDuration: 4.5 },
  { label: 'After Effects', top: '37%', right: '1%', floatDelay: 0.8, floatDuration: 3.6 },
  { label: 'Cinema 4D', top: '66%', right: '18%', floatDelay: 1.5, floatDuration: 4.1 },
  { label: 'Blender', top: '54%', left: '40%', floatDelay: 0.3, floatDuration: 3.9 },
  { label: 'WebGL', top: '75%', left: '54%', floatDelay: 1.0, floatDuration: 4.3 },
  { label: 'Python', top: '82%', right: '9%', floatDelay: 0.6, floatDuration: 4.0 },
]

export const PROJECTS: Project[] = [
  {
    id: 'strata',
    num: '01',
    title: 'Strata',
    category: 'DATA DASHBOARD',
    year: '2024',
    tags: ['3D'],
    slug: 'strata',
    description: 'Dashboard interattiva per la visualizzazione di dati complessi in tempo reale, con scene 3D integrate.',
    role: 'Solo Developer',
    duration: '2 mesi',
    type: 'Data Dashboard',
  },
  {
    id: 'nocturne',
    num: '02',
    title: 'Nocturne',
    category: 'INTERACTIVE EXPERIENCE',
    year: '2024',
    tags: ['3D'],
    slug: 'nocturne',
    description: 'Piattaforma di visualizzazione musicale in tempo reale — le frequenze audio diventano forme geometriche animate.',
    role: 'Solo Developer & Creative Director',
    duration: '3 mesi',
    type: 'Interactive Experience',
  },
  {
    id: 'forma',
    num: '03',
    title: 'Forma',
    category: 'BRAND & MOTION',
    year: '2023',
    tags: [],
    slug: 'forma',
    description: 'Identità visiva e motion design per uno studio di architettura a Milano — logo, tipografia, animazioni.',
    role: 'Brand Designer & Motion Artist',
    duration: '2 mesi',
    type: 'Brand & Motion',
  },
  {
    id: 'reverie',
    num: '04',
    title: 'Reverie',
    category: '3D E-COMMERCE',
    year: '2023',
    tags: ['3D'],
    slug: 'reverie',
    description: 'Piattaforma e-commerce con configuratore 3D interattivo per prodotti di lusso.',
    role: 'Frontend Developer',
    duration: '4 mesi',
    type: '3D E-Commerce',
  },
  {
    id: 'atlas',
    num: '05',
    title: 'Atlas',
    category: 'INTERACTIVE MAP',
    year: '2023',
    tags: ['3D'],
    slug: 'atlas',
    description: 'Mappa interattiva 3D per la visualizzazione geografica di dati climatici globali.',
    role: 'Frontend Developer',
    duration: '3 mesi',
    type: 'Interactive Map',
  },
  {
    id: 'prism',
    num: '06',
    title: 'Prism',
    category: 'CREATIVE TOOL',
    year: '2023',
    tags: [],
    slug: 'prism',
    description: 'Tool creativo browser-based per la generazione procedurale di pattern visivi.',
    role: 'Solo Developer',
    duration: '1 mese',
    type: 'Creative Tool',
  },
]

export const TIMELINE: TimelineItem[] = [
  {
    id: 'itis',
    side: 'left',
    institution: 'IST. TECNICO INDUSTRIALE',
    role: 'Diploma ITIS',
    year: '2017',
    description: 'Specializzazione in Informatica e Telecomunicazioni. Programmazione, reti, sistemi operativi, basi di dati.',
  },
  {
    id: 'cg3d',
    side: 'right',
    institution: 'ACCADEMIA DEL DIGITALE',
    role: 'Corso CG & 3D',
    year: '2019',
    description: 'Formazione professionale in Computer Grafica: modellazione 3D, rigging, rendering, compositing. Blender, Maya, Cinema 4D.',
  },
  {
    id: 'stage',
    side: 'left',
    institution: 'SOFTHOUSE SRL',
    role: 'Stage — Junior Developer',
    year: '2021',
    description: 'Sviluppo Frontend React, integrazione Three.js, metodologie agile. Prima esperienza su prodotto reale con clienti reali.',
  },
  {
    id: 'freelance',
    side: 'right',
    institution: 'INDIPENDENTE',
    role: 'Freelance Dev & CG Artist',
    year: '2022',
    description: 'Clienti in Europa e Nord America. Specializzato in esperienze 3D interattive, data visualization e motion design.',
  },
]

export const CERTIFICATIONS: Certification[] = [
  { id: 'google-it', title: 'Google IT Support Professional', issuer: 'Google / Coursera', year: '2023' },
  { id: 'blender', title: 'Blender Certified Artist', issuer: 'Blender Foundation', year: '2023' },
  { id: 'maya', title: 'Autodesk Certified User — Maya', issuer: 'Autodesk', year: '2023' },
  { id: 'threejs', title: 'Three.js Journey', issuer: 'Bruno Simon / Threejs', year: '2023' },
  { id: 'adobe', title: 'Adobe Certified — Premiere Pro', issuer: 'Adobe', year: '2023' },
  { id: 'comptia', title: 'CompTIA IT Fundamentals+', issuer: 'CompTIA', year: '2023' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/shankar-mattavelli' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/shankar-mattavelli' },
  { id: 'twitter', label: 'Twitter', url: 'https://twitter.com/shankar_mattavelli' },
]

export const NAV_ITEMS = [
  { label: 'PROGETTI', href: '#progetti' },
  { label: 'PERCORSO', href: '#percorso' },
  { label: 'CERTIFICAZIONI', href: '#certificazioni' },
  { label: 'CONTATTO', href: '#contatto' },
] as const
