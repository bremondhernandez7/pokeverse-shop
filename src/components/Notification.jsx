import React, { useEffect, useState } from 'react'

export default function Notification({ message, type = 'success', onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 3200)
    const t2 = setTimeout(() => onDone?.(), 3700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const colors = {
    success: { border: '#39ff14', icon: '✓', label: 'ÉXITO' },
    error:   { border: '#ff2d55', icon: '✕', label: 'ERROR' },
    info:    { border: '#00d4ff', icon: '◆', label: 'INFO' },
  }
  const c = colors[type] || colors.info

  return (
    <div className="notification-card" style={{
      animation: leaving ? 'notif-out 0.5s forwards' : 'notif-in 0.4s forwards',
      background: '#0d0d14',
      border: `1px solid ${c.border}`,
      boxShadow: `0 0 20px ${c.border}60, 0 4px 30px rgba(0,0,0,0.5)`,
      borderRadius: 4,
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      maxWidth: 360,
      width: '100%',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 3,
        background: `${c.border}22`,
        border: `1px solid ${c.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: c.border, fontSize: 16, fontFamily: 'Orbitron',
        flexShrink: 0,
      }}>{c.icon}</div>
      <div>
        <div style={{ fontFamily: 'Orbitron', fontSize: 9, color: c.border, letterSpacing: 2, marginBottom: 4 }}>
          {c.label}
        </div>
        <div style={{ fontSize: 13, color: '#e8e8f0', lineHeight: 1.5 }}>{message}</div>
      </div>
    </div>
  )
}
