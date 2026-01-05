"use client";
import React, { useEffect, useCallback } from 'react'  

function Messages({ message, onClose }) {
  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (!message) return
    
    const t = setTimeout(() => handleClose(), 5000)
    return () => clearTimeout(t)
  }, [message, handleClose])

  if (!message) return null

  const { status, text } = message

  const base = {
    position: 'fixed',
    right: 20,
    top: 20,
    padding: '12px 16px',
    borderRadius: 6,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 100,
    maxWidth: '80vw',
    wordBreak: 'break-word',
    paddingInline: 16,
  }

  let variant = {}
  if (status === 200) {
    variant = { background: 'var(--bg-300)', color: 'var(--success)', border: '1px solid var(--success)' }
  } else if (status === 400) {
    variant = { background: 'var(--bg-300)', color: 'var(--error)', border: '1px solid var(--error)' }
  } else {
    variant = { background: 'var(--bg-300)', color: 'var(--warning)', border: '1px solid var(--warning)' }
  }

  return (
    <div style={{ ...base, ...variant }} role="status" aria-live="polite">
      <div style={{ flex: 1 }}>{text}</div>
      <button
        onClick={() => onClose?.()}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}
        aria-label="Cerrar mensaje"
      >
        ×
      </button>
    </div>
  )
}

export default Messages