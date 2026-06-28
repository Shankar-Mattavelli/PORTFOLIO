export interface Project {
  id: string
  num: string
  title: string
  category: string
  year: string
  tags: string[]        // badge compatto (es. '3D')
  techTags: string[]    // tag tecnici visualizzati nell'hover card
  slug: string
  preview?: string      // immagine carousel (path locale o URL)
  description: string
  role: string
  duration: string
  type: string
  gallery?: string[]    // immagini pagina dettaglio
}

export interface TimelineItem {
  id: string
  side: 'left' | 'right'
  institution: string
  role: string
  year: string
  yearRange?: string
  location?: string
  description: string
  logo?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  documentUrl?: string
}

export interface SocialLink {
  id: string
  label: string
  url: string
}

export interface Stat {
  value: string
  label: string
}

export interface HeroBadge {
  label: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  floatDelay: number
  floatDuration: number
}
