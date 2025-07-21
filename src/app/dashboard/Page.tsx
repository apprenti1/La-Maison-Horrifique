import { type ReactElement } from "react"
import Navbar from '@/components/navbar/Navbar'
import BackgroundEffects from '../../components/BackgroundEffects.tsx'
import FloatingHorrorElements from '../../components/FloatingHorrorElements.tsx'
import Dashboard from './Dashboard'

export default function DashboardPage(): ReactElement {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Floating Horror Elements */}
      <FloatingHorrorElements />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Dashboard Content */}
      <Dashboard />
    </div>
  )
}
