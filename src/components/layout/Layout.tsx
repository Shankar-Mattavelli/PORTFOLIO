import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import CursorGlow from '@/components/ui/CursorGlow'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <>
      <CursorGlow />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
