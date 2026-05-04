import React from 'react'

export default function CartSidebar({ cart, onRemove, onClear, onSuccess, visible, onClose }) {
  const total = cart.reduce((s, i) => s + parseFloat(i.price), 0).toFixed(2)

  if (!visible) return null

  return (
    <div className="cart-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex',
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ flex: 1, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      />

      {/* Panel */}
      <div className="cart-panel" style={{
        width: 420, maxWidth: '95vw',
        background: '#0a0a12',
        borderLeft: '1px solid #2a2a40',
        display: 'flex', flexDirection: 'column',
        animation: 'slideDown 0.3s',
        boxShadow: '-10px 0 60px rgba(0,0,0,0.8)',
      }}>
        {/* Header */}
        <div className="cart-header" style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1e1e2e',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 10, color: '#f5e642', letterSpacing: 2, marginBottom: 4 }}>
              ◆ CARRITO DE COMPRAS
            </div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 18, color: '#e8e8f0' }}>
              {cart.length} ÍTEM{cart.length !== 1 ? 'S' : ''}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid #2a2a40',
            color: '#7a7a9a', width: 36, height: 36,
            borderRadius: 4, cursor: 'pointer',
            fontFamily: 'Orbitron', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              fontFamily: 'Orbitron', color: '#3a3a5c', fontSize: 11,
              lineHeight: 2,
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🛒</div>
              TU CARRITO<br/>ESTÁ VACÍO
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map((item, idx) => (
                <div className="cart-item" key={idx} style={{
                  background: '#0d0d14',
                  border: '1px solid #1e1e2e',
                  borderRadius: 4,
                  padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <img src={item.img} alt={item.name} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 10, color: '#e8e8f0', textTransform: 'capitalize' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#4a4a6a', fontFamily: 'Orbitron', marginTop: 2 }}>
                      #{String(item.id).padStart(3,'0')}
                    </div>
                  </div>
                  <div className="cart-item-price" style={{ fontFamily: 'Orbitron', fontSize: 14, color: '#f5e642', marginRight: 8 }}>
                    ${item.price}
                  </div>
                  <button onClick={() => onRemove(idx)} style={{
                    background: '#ff2d5520', border: '1px solid #ff2d55',
                    color: '#ff2d55', width: 28, height: 28, borderRadius: 3,
                    cursor: 'pointer', fontFamily: 'Orbitron', fontSize: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer" style={{ padding: '20px 24px', borderTop: '1px solid #1e1e2e' }}>
            {/* Total */}
            <div className="cart-total" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 20, padding: '14px 16px',
              background: '#0d0d14', border: '1px solid #2a2a40', borderRadius: 4,
            }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 11, color: '#7a7a9a' }}>TOTAL</span>
              <span style={{ fontFamily: 'Orbitron', fontSize: 22, color: '#f5e642',
                textShadow: '0 0 15px #f5e64260' }}>
                ${total}
              </span>
            </div>

            {/* Clear button */}
            <button onClick={onClear} style={{
              width: '100%', marginBottom: 12,
              background: 'transparent', border: '1px solid #2a2a40',
              color: '#7a7a9a', padding: '10px', borderRadius: 4,
              fontFamily: 'Orbitron', fontSize: 9, cursor: 'pointer',
              letterSpacing: 1, transition: 'all 0.2s',
            }}>VACIAR CARRITO</button>

            {/* Pay button */}
            <button onClick={() => onSuccess({ id: 'TX-' + Date.now() })} style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f5e642, #ffaa00)',
              border: '1px solid #f5e642',
              color: '#000',
              padding: '14px',
              borderRadius: 4,
              fontFamily: 'Orbitron',
              fontSize: 12,
              cursor: 'pointer',
              letterSpacing: 1,
              fontWeight: 700,
              transition: 'all 0.2s',
            }}>PAGAR AHORA</button>
          </div>
        )}
      </div>
    </div>
  )
}
