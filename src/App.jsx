import React from 'react'
import coverImage from '@assets/CleanShot_2026-04-08_at_15.24.40@2x_1775642087389.png'

function App() {
  return (
    <div className="app-shell">
      <main className="app-card">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">HuePrint</p>
            <h1>PRD Tracker</h1>
            <p className="lede">
              Keep product requirements, notes, and progress in one place.
            </p>
          </div>
          <img className="hero-image" src={coverImage} alt="HuePrint PRD tracker preview" />
        </section>
      </main>
    </div>
  )
}

export default App
