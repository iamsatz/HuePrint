import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './TopNav.css'

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="top-nav-wordmark">
          HuePrint
        </Link>
        <nav className="top-nav-links">
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              'top-nav-link' + (isActive ? ' top-nav-link--active' : '')
            }
          >
            Browse Kits
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
