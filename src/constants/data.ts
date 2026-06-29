import type { Project, TimelineItem, Certification, SocialLink, Stat, HeroBadge } from '@/types'

// ── Status dot ────────────────────────────────────────────────────────────
// Cambia CURRENT_STATUS per aggiornare il dot nell'header.
export type StatusType = 'disponibile' | 'occupato' | 'apprendistato'

export const CURRENT_STATUS: StatusType = 'apprendistato'

export const STATUS_CONFIG: Record<StatusType, {
  color: string
  label: string
  pingDuration: number   // durata animazione ping (s)
}> = {
  disponibile: {
    color: '#2dd4bf',       // teal — positivo, coerente col dark theme
    label: 'Disponibile',
    pingDuration: 1.4,
  },
  occupato: {
    color: '#e879a0',       // fuchsia-pink — vivace, nell'orbita del viola accent
    label: 'Impegnato in attività',
    pingDuration: 1.0,
  },
  apprendistato: {
    color: '#71717a',       // zinc-500 — neutro, pulsa molto lentamente
    label: 'Apprendistato in corso',
    pingDuration: 3.5,
  },
}

export const PERSONAL_INFO = {
  name: 'Shankar Mattavelli',
  nameFirstLine: 'Shankar',
  nameSecondLine: 'Mattavelli',
  role: 'Frontend Developer',
  location: 'Milano, Italia',
  bio: "Ogni nuovo progetto è un'opportunità per crescere. Mi piace sperimentare, adattarmi a nuovi contesti e migliorare continuamente.",
  email: 'shankar.mattavelli@gmail.com',
  phone: '+39 334 925 0900',
  linkedin: 'https://www.linkedin.com/in/shankar-mattavelli',
  objective: 'Ruolo IT / Developer con focus su Computer Graphics, WebGL e Interactive 3D',
  contactBio: 'Curiosità, sperimentazione e apprendimento continuo guidano ogni progetto che realizzo.',
} as const

export const STATS: Stat[] = [
  { value: '5+', label: 'PROGETTI' },
  { value: '6', label: 'CERTIFICAZIONI' },
  { value: '5+', label: 'ANNI' },
]

export const HERO_BADGES: HeroBadge[] = [
  // Margine sinistro (20px dal bordo)
  { label: 'Blender',            top: '8%',  left: '20px', floatDelay: 0,   floatDuration: 4.2 },
  { label: 'Word',               top: '26%', left: '20px', floatDelay: 0.6, floatDuration: 3.8 },
  { label: 'Excel',              top: '54%', left: '20px', floatDelay: 1.2, floatDuration: 4.5 },
  { label: 'GitHub',             top: '72%', left: '20px', floatDelay: 0.3, floatDuration: 3.7 },
  // Top center-right
  { label: 'Premiere Pro',       top: '7%',  right: '26%', floatDelay: 1.1, floatDuration: 3.9 },
  { label: 'ChatGPT',            top: '7%',  right: '2%',  floatDelay: 0.9, floatDuration: 4.3 },
  // Metà destra (zona glow)
  { label: 'Claude',             top: '28%', right: '10%', floatDelay: 1.5, floatDuration: 3.6 },
  { label: 'Visual Studio Code', top: '52%', right: '2%',  floatDelay: 0.4, floatDuration: 4.1 },
  // Gap bio/stats
  { label: 'PowerPoint',         top: '68%', left: '38%',  floatDelay: 0.7, floatDuration: 4.4 },
  // Bottom
  { label: 'Unreal Engine',      top: '82%', right: '18%', floatDelay: 1.8, floatDuration: 4.0 },
]

export const PROJECTS: Project[] = [
  {
    id: 'solarsteinn',
    num: '01',
    title: 'Solarsteinn',
    category: 'GAME DEVELOPMENT',
    year: '2023',
    tags: ['3D'],
    techTags: ['Unreal Engine 5', 'Blueprint', '3D Modeling', 'Game Design'],
    slug: 'solarsteinn',
    preview: '/projects/solarsteinn/shankar-solarsteinn.jpg',
    description: 'Progetto di sviluppo videogioco indie — concept, modellazione personaggi, boss fight e state machine in Unreal Engine 5.',
    role: 'Game Developer & 3D Artist',
    duration: '—',
    type: 'Game Development',
    gallery: [
      '/projects/solarsteinn/shankar-solarsteinn.jpg',
      '/projects/solarsteinn/shankar-boss-fight.jpg',
      '/projects/solarsteinn/shankar-minion-evil.jpg',
      '/projects/solarsteinn/shankar-screenshot-2023-08-28-193912.jpg',
      '/projects/solarsteinn/shankar-state-machine.jpg',
    ],
  },
  {
    id: 'lamborghini',
    num: '02',
    title: 'Lamborghini',
    category: '3D VISUALIZATION',
    year: '2024',
    tags: ['3D'],
    techTags: ['Blender', 'Cycles', 'Lighting', 'Rendering'],
    slug: 'lamborghini',
    preview: '/projects/lamborghini/shankar-mattaveli-shankar-art.jpg',
    description: 'Render fotorealistico di una Lamborghini Sián futuristica in un\'ambientazione cyberpunk notturna — illuminazione neon, motion blur e atmosfera volumetrica.',
    role: 'Solo 3D Artist',
    duration: '—',
    type: '3D Visualization',
    gallery: [
      '/projects/lamborghini/shankar-mattaveli-shankar-art.jpg',
      '/projects/lamborghini/shankar-car-side.jpg',
      '/projects/lamborghini/shankar-car-front.jpg',
    ],
  },
  {
    id: 'uniquiz',
    num: '03',
    title: 'UniQuiz',
    category: 'WEB APPLICATION',
    year: '2024',
    tags: [],
    techTags: ['—'],
    slug: 'uniquiz',
    preview: '/projects/UniQuiz/UniQuiz.png',
    isIcon: true,
    description: 'Applicazione web per la gestione e la fruizione di quiz universitari — contenuti in arrivo.',
    role: 'Solo Developer',
    duration: '—',
    type: 'Web Application',
    gallery: ['/projects/UniQuiz/UniQuiz.png'],
  },
  {
    id: 'mira',
    num: '04',
    title: 'MIRA',
    category: 'AI APPLICATION',
    year: '2025',
    tags: [],
    techTags: ['—'],
    slug: 'mira',
    preview: '/projects/mira/mira.png',
    isIcon: true,
    description: 'Assistente AI personalizzato — contenuti in arrivo.',
    role: 'Solo Developer',
    duration: '—',
    type: 'AI Application',
    gallery: ['/projects/mira/mira.png'],
  },
  {
    id: 'work-management',
    num: '05',
    title: 'Work Management',
    category: 'WEB APPLICATION',
    year: '2025',
    tags: [],
    techTags: ['—'],
    slug: 'work-management',
    preview: '/projects/work_management_tool/work-management-tool.png',
    isIcon: true,
    description: 'Tool per la gestione del lavoro e dei progetti aziendali — contenuti in arrivo.',
    role: 'Solo Developer',
    duration: '—',
    type: 'Web Application',
    gallery: ['/projects/work_management_tool/work-management-tool.png'],
  },
]

export const TIMELINE: TimelineItem[] = [
  {
    id: 'decathlon',
    side: 'left',
    institution: 'DECATHLON',
    role: 'Magazziniere',
    year: '2020',
    yearRange: 'ott 2020 – giu 2021',
    location: 'Basiano (MI)',
    description: 'Contratto a chiamata. Gestione magazzino, ricezione e smistamento merci, picking e riassortimento scaffali in ambiente logistico ad alto volume.',
    logo: '/logos/decathlon.jpg',
  },
  {
    id: 'lambdacorp',
    side: 'right',
    institution: 'LAMBDACORP PROJECT TEAM',
    role: 'Unreal Engine Developer',
    year: '2023',
    yearRange: 'ott 2023 – set 2024',
    location: 'Da remoto',
    description: 'Sviluppo gameplay in Unreal Engine 5 in un team indie. Progettazione di sistemi in Blueprint, cinematics e ottimizzazione di ambienti 3D real-time su pipeline Git collaborativa.',
    logo: '/logos/lambdacorp.jpg',
  },
  {
    id: 'babalu',
    side: 'left',
    institution: 'BABALÙ APP',
    role: 'Operatore Video & Stand Fieristico',
    year: '2024',
    yearRange: 'dic 2023 – apr 2025',
    location: 'Milano · Torino · Roma',
    description: 'Freelance. Montaggio e post-produzione video, motion graphics e gestione tecnica di stand fieristici su scala nazionale. DaVinci Resolve, After Effects e attrezzatura di ripresa professionale.',
    logo: '/logos/babalu.jpg',
  },
  {
    id: 'leroy-merlin',
    side: 'right',
    institution: 'LEROY MERLIN',
    role: 'Addetto Supply Chain',
    year: '2024',
    yearRange: 'gen 2024 – lug 2024',
    location: 'Busnago (MB)',
    description: 'Part-time. Gestione del flusso merci interno, ricezione forniture e supporto alla supply chain del punto vendita in contesto retail di grande distribuzione.',
    logo: '/logos/leroy-merlin.jpg',
  },
  {
    id: 'digitech-tech',
    side: 'left',
    institution: 'DIGITECH CENTER S.R.L.',
    role: 'Responsabile Tecnico & Multimedia',
    year: '2024',
    yearRange: 'set 2024 – Presente',
    location: 'Vimercate (MB)',
    description: 'Gestione dell\'infrastruttura tecnica e produzione di contenuti multimediali aziendali: video, grafica, presentazioni e materiali digitali per corsi professionali e comunicazione.',
    logo: '/logos/digitech.jpg',
  },
  {
    id: 'digitech-form',
    side: 'right',
    institution: 'DIGITECH CENTER S.R.L.',
    role: '+ Formatore Sicurezza sul Lavoro',
    year: '2024',
    yearRange: 'nov 2024 – Presente',
    location: 'Vimercate (MB)',
    description: 'Mansione aggiuntiva al ruolo tecnico già in corso. Docenza di corsi obbligatori sulla sicurezza nei luoghi di lavoro (D.Lgs. 81/08): gestione in aula, predisposizione materiali didattici e documentazione dei partecipanti.',
    logo: '/logos/digitech.jpg',
  },
]

export const CERTIFICATIONS: Certification[] = [
  { id: 'maturita', title: 'Diploma di Maturità Scientifica', issuer: 'Liceo Scientifico Antonio Banfi', year: '2020', documentUrl: '/certificates/Diploma%20Maturit%C3%A0-%20Shankar%20Mattavelli.pdf' },
  { id: 'inglese', title: 'Certificato di Lingua Inglese', issuer: 'EAS Milan', year: '2021', documentUrl: '/certificates/certificato%20di%20Inglese.pdf' },
  { id: 'ied', title: 'Diploma Accademico', issuer: 'IED — Istituto Europeo di Design', year: '2023', documentUrl: '/certificates/Diploma%20accademico%20-%20IED.pdf' },
  { id: 'formatore', title: 'Qualifica Formatore Sicurezza sul Lavoro', issuer: 'Digitech Center S.r.l.', year: '2024', documentUrl: '/certificates/ATTESTATO%20FORMATORE%20-%20SHANKAR%20MATTAVELLI.pdf' },
  { id: 'elettronica', title: 'Attestato Corso Elettronica', issuer: 'Digitech Center S.r.l.', year: '2025', documentUrl: '/certificates/28.03.2024%20-%20ATTESTATO%20ELETTRONICA%20-%20SHANKAR%20MATTAVELLI.pdf' },
  { id: 'cybersecurity', title: 'Cyber Awareness — Sicurezza Digitale sul Lavoro', issuer: 'Digitech Center S.r.l.', year: '2025' },
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
