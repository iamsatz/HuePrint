import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './KitDetailPage.css'

export default function KitDetailPage() {
  const { id } = useParams()

  return (
    <div className="kit-detail-page">
      <div className="kit-detail-inner">
        <Link to="/browse" className="kit-detail-back">
          ← Back to kits
        </Link>
        <div className="kit-detail-coming-soon">
          <span className="kit-detail-icon">🎨</span>
          <h1>Coming Soon</h1>
          <p>
            The full kit detail view — including component previews and token exports — is
            coming in the next release.
          </p>
          <p className="kit-detail-id">Kit: <code>{id}</code></p>
        </div>
      </div>
    </div>
  )
}
