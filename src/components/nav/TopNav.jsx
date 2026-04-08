import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/useTheme'
import './TopNav.css'

export default function TopNav() {
  const { isDark, toggle } = useTheme()

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="top-nav-wordmark">HuePrint</Link>

        <nav className="top-nav-links">
          <NavLink
            to="/browse"
            className={({ isActive }) => 'top-nav-link' + (isActive ? ' active' : '')}
          >
            Browse Kits
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => 'top-nav-link top-nav-link--cta' + (isActive ? ' active' : '')}
          >
            Create Kit
          </NavLink>
        </nav>

        <button
          className="top-nav-theme-btn"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
