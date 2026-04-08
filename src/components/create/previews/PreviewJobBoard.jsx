import React, { useRef, useEffect } from 'react'

export default function PreviewJobBoard({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
    if (kit.typography) {
      if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
      if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
    }
  }, [kit])
  if (!kit) return null

  const jobs = [
    { role: 'Senior Product Designer', company: 'Stripe', location: 'Remote', salary: '$140–$180K', tags: ['Full-time', 'Design'] },
    { role: 'Frontend Engineer', company: 'Linear', location: 'SF / Remote', salary: '$160–$200K', tags: ['Full-time', 'React'] },
    { role: 'Product Manager', company: 'Figma', location: 'SF', salary: '$150–$190K', tags: ['Full-time', 'Product'] },
    { role: 'Brand Designer', company: 'Vercel', location: 'Remote', salary: '$120–$150K', tags: ['Full-time', 'Brand'] },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Jobs</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Browse</a>
          <a className="lp-app-nav-link">Companies</a>
          <a className="lp-app-nav-link">Salary</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Post a Job</button>
      </nav>

      <div style={{ padding: '16px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input className="lp-input" placeholder="Job title or keyword" style={{ flex: 1, minWidth: 140 }} readOnly />
        <input className="lp-input" placeholder="Location or Remote" style={{ flex: 1, minWidth: 120 }} readOnly />
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search</button>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 12 }}>284 open positions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {jobs.map((job, i) => (
            <div key={i} className="lp-job-row">
              <div className="lp-job-company-icon">
                {job.company[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div className="lp-job-role">{job.role}</div>
                <div className="lp-job-meta">{job.company} · {job.location}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {job.tags.map((tag, j) => <span key={j} className="lp-badge lp-badge--secondary" style={{ fontSize: '0.7rem' }}>{tag}</span>)}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="lp-job-salary">{job.salary}</div>
                <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ marginTop: 8 }}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
