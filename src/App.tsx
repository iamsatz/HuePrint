import Hero from './components/landing/Hero'
import HowItWorks from './components/landing/HowItWorks'
import Footer from './components/landing/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <HowItWorks />
      <div className="flex-1" />
      <Footer />
    </div>
  )
}

export default App
