import Header from '@/components/shared/Header'
import Navbar from '@/components/shared/Navbar'
import type { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {' '}
      <Header />
      <Navbar />
      {children}
    </div>
  )
}

export default RootLayout
