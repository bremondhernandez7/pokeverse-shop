import React from 'react'
import { TYPE_COLORS } from '../pokemonData.js'

export default function CollectionView({ collection, onClose }) {
  const total = collection.reduce((s, i) => s + parseFloat(i.price), 0).toFixed(2)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 900,
      background: '#050508',
      animation: 'slideDown 0.3s',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#050508',
        borderBottom: '1px solid #1e1e2e',
        padding: '20px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#39ff14', letterSpacing: 3, marginBottom: 4 }}>
            ◆ MI COLECCIÓN
          </div>
          <div style={{ fontFamily: 'Orbitron', fontSize: 22, color: '#e8e8f0' }}>
            {collection.length} CARTA{collection.length !== 1 ? 'S' : ''} OBTENIDA{collection.length !== 1 ? 'S' : ''}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#4a4a6a', marginBottom: 4 }}>INVERSIÓN TOTAL</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 24, color: '#f5e642',
              textShadow: '0 0 20px #f5e64260' }}>${total}</div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid #2a2a40',
            color: '#7a7a9a', padding: '10px 20px', borderRadius: 4,
            cursor: 'pointer', fontFamily: 'Orbitron', fontSize: 9,
            letterSpacing: 1,
          }}>← VOLVER</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
        {collection.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '100px 0',
            fontFamily: 'Orbitron', color: '#3a3a5c',
          }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>📦</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>COLECCIÓN VACÍA</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#2a2a40' }}>
              COMPRA CARTAS PARA EMPEZAR TU COLECCIÓN
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
          }}>
            {collection.map((item, idx) => {
              const typeInfo = TYPE_COLORS[item.type] || TYPE_COLORS.normal
              return (
                <div key={idx} style={{
                  background: '#0d0d14',
                  border: `1px solid ${typeInfo.color}40`,
                  borderRadius: 6, overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    background: '#39ff1422', border: '1px solid #39ff14',
                    color: '#39ff14', fontFamily: 'Orbitron', fontSize: 7,
                    padding: '2px 6px', borderRadius: 2,
                  }}>OWNED</div>
                  <div style={{
                    background: `radial-gradient(circle, ${typeInfo.bg}, #080810)`,
                    height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src={item.img} alt={item.name} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 8, color: '#3a3a5c', marginBottom: 4 }}>
                      #{String(item.id).padStart(3,'0')}
                    </div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: '#e8e8f0',
                      textTransform: 'capitalize', marginBottom: 8 }}>{item.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 9, fontFamily: 'Orbitron', color: '#4a4a6a' }}>PAGADO</span>
                      <span style={{ fontFamily: 'Orbitron', fontSize: 14, color: '#f5e642' }}>${item.price}</span>
                    </div>
                    <div style={{ fontSize: 9, fontFamily: 'Orbitron', color: '#3a3a5c', marginTop: 4 }}>
                      {item.txId && `TX: ${item.txId.slice(0,12)}...`}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
