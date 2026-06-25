import React from 'react'
import { AlertCircle, Inbox, Loader2 } from 'lucide-react'

export function Spinner({ size = 20 }) {
  return (
    <Loader2
      size={size}
      className="cv-spinner"
      style={{ animation: 'cv-spin 0.8s linear infinite', color: 'var(--hp-primary)' }}
    />
  )
}

export function Skeleton({ width = '100%', height = 12, style = {} }) {
  return (
    <div
      className="cv-skeleton"
      style={{
        width,
        height,
        borderRadius: 6,
        background: 'linear-gradient(90deg, var(--hp-surface) 25%, var(--hp-border) 50%, var(--hp-surface) 75%)',
        backgroundSize: '200% 100%',
        animation: 'cv-shimmer 1.4s ease infinite',
        ...style,
      }}
    />
  )
}

export function LoadingState({ label = 'Loading' }) {
  return (
    <div className="cv-block-state cv-block-state--loading" style={{ padding: 32, textAlign: 'center', background: 'var(--hp-background)' }}>
      <Spinner size={28} />
      <p style={{ margin: '12px 0 0', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>Loading {label.toLowerCase()}…</p>
      <div style={{ maxWidth: 320, margin: '20px auto 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton height={14} />
        <Skeleton height={14} width="80%" />
        <Skeleton height={80} />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  )
}

export function EmptyState({ label = 'Content', message }) {
  return (
    <div className="cv-block-state cv-block-state--empty" style={{ padding: 40, textAlign: 'center', background: 'var(--hp-surface)', border: '1px dashed var(--hp-border)' }}>
      <Inbox size={32} strokeWidth={1.25} style={{ color: 'var(--hp-textMuted)', marginBottom: 12 }} />
      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>No {label.toLowerCase()} yet</p>
      <p style={{ margin: '6px 0 0', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>
        {message || `When data arrives, your ${label.toLowerCase()} will appear here.`}
      </p>
    </div>
  )
}

export function ErrorState({ label = 'Content', message }) {
  return (
    <div className="cv-block-state cv-block-state--error" style={{ padding: 32, background: 'var(--hp-background)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
        <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>Failed to load {label.toLowerCase()}</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font)' }}>
            {message || 'Something went wrong. Try refreshing or check your connection.'}
          </p>
          <button style={{ marginTop: 12, padding: '6px 14px', borderRadius: 7, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Retry</button>
        </div>
      </div>
    </div>
  )
}

/**
 * @param {{ state?: 'default'|'loading'|'empty'|'error', label?: string, supportsStates?: boolean, children: React.ReactNode }} props
 */
export default function BlockStateWrapper({ state = 'default', label = 'Content', supportsStates = true, children }) {
  if (!supportsStates || state === 'default') return children
  if (state === 'loading') return <LoadingState label={label} />
  if (state === 'empty') return <EmptyState label={label} />
  if (state === 'error') return <ErrorState label={label} />
  return children
}
