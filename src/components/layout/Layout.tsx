import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import CustomScrollbar from '@/components/ui/CustomScrollbar'
import LangToggle from '@/components/ui/LangToggle'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  const { pathname } = useLocation()
  return (
    <>
      <CursorGlow />
      <CustomScrollbar />
      <Header />
      <main className="flex-1">{children}</main>
      {pathname !== '/' && <Footer />}
      <LangToggle />
    </>
  )
}
