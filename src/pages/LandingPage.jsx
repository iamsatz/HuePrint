import React from 'react'
import { Link } from 'react-router-dom'
import coverImage from '@assets/CleanShot_2026-04-08_at_15.24.40@2x_1775642087389.png'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <main className="app-card">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">HuePrint</p>
            <h1>Design token kits for AI-builders</h1>
            <p className="lede">
              Browse curated brand palettes, preview on real UI components, and download
              AI-ready token files. Paste into Claude, v0, or Cursor — get branded output
              instantly.
            </p>
            <Link to="/browse" className="hero-cta">
              Browse Kits
            </Link>
          </div>
          <img
            className="hero-image"
            src={coverImage}
            alt="HuePrint kit browser preview"
          />
        </section>
      </main>
    </div>
  )
}
