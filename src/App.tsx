import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/nav/TopNav'
import LandingPage from './pages/LandingPage'
import BrowsePage from './pages/BrowsePage'
import KitDetailPage from './pages/KitDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/kit/:id" element={<KitDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
