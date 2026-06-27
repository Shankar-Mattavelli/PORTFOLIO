export interface Project {
  id: string
  num: string
  title: string
  category: string
  year: string
  tags: string[]
  slug: string
  image?: string
  description?: string
  role?: string
  duration?: string
  type?: string
}

export interface TimelineItem {
  id: string
  side: 'left' | 'right'
  institution: string
  role: string
  year: string
  description: string
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
