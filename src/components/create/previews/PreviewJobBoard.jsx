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
    { role: 'Senior Product Designer', company: 'Stripe', initials: 'ST', location: 'Remote', salary: '$140–$180K', tags: ['Full-time', 'Design', 'Remote'], featured: true },
    { role: 'Frontend Engineer', company: 'Linear', initials: 'LN', location: 'SF / Remote', salary: '$160–$200K', tags: ['Full-time', 'React'], featured: false },
    { role: 'Product Manager', company: 'Figma', initials: 'FG', location: 'San Francisco', salary: '$150–$190K', tags: ['Full-time', 'Product'], featured: false },
    { role: 'Brand Designer', company: 'Vercel', initials: 'VC', location: 'Remote', salary: '$120–$150K', tags: ['Full-time', 'Brand', 'Remote'], featured: false },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ WorkBoards</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Browse</a>
          <a className="lp-app-nav-link">Companies</a>
          <a className="lp-app-nav-link">Salary</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Post a Job</button>
      </nav>

      <div style={{ padding: '16px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input className="lp-input" placeholder="Job title, skill, or company" style={{ flex: 2, minWidth: 140 }} readOnly />
        <input className="lp-input" placeholder="Location or Remote" style={{ flex: 1, minWidth: 120 }} readOnly />
        <select className="lp-input" style={{ maxWidth: 120 }}>
          <option>Any role</option>
          <option>Design</option>
          <option>Engineering</option>
        </select>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search Jobs</button>
      </div>

      <div style={{ padding: '10px 24px', background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', fontWeight: 600 }}>Filter:</span>
        {['All', 'Remote', 'Full-time', 'Design', 'Engineering'].map((chip, i) => (
          <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{chip}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>284 positions</span>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {jobs.map((job, i) => (
            <div key={i} className="lp-job-row" style={{ position: 'relative', borderColor: job.featured ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-border, #e5e7eb)' }}>
              {job.featured && (
                <div style={{ position: 'absolute', top: -8, right: 12, background: 'var(--hp-primary, #7c3aed)', color: 'var(--hp-background, #fff)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                  Featured
                </div>
              )}
              <div className="lp-job-company-icon" style={{ background: job.featured ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-surface, #f9fafb)', color: job.featured ? 'var(--hp-background, #fff)' : 'var(--hp-text, #111827)', border: '1.5px solid var(--hp-border, #e5e7eb)' }}>
                {job.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div className="lp-job-role">{job.role}</div>
                <div className="lp-job-meta">{job.company} · {job.location}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {job.tags.map((tag, j) => (
                    <span key={j} className={j === 0 ? 'lp-badge lp-badge--secondary' : 'lp-badge'} style={j !== 0 ? { background: 'var(--hp-surface, #f3f4f6)', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.7rem' } : { fontSize: '0.7rem' }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="lp-job-salary">{job.salary}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success, #059669)', fontWeight: 600, marginBottom: 6 }}>● Active</div>
                <button className="lp-btn lp-btn--primary lp-btn--sm">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
