import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { LanguageProvider } from '@/context/LanguageContext'

const HomePage    = lazy(() => import('@/pages/HomePage'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))

export default function App() {
  return (
    <LanguageProvider>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={null}>
              <ProjectPage />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
    </LanguageProvider>
  )
}
