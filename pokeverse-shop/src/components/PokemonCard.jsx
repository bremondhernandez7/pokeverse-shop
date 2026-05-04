import React, { useState } from 'react'
import { TYPE_COLORS, getRarity } from '../pokemonData.js'

export default function PokemonCard({ pokemon, price, onAddToCart, inCollection }) {
  const [hovered, setHovered] = useState(false)
  const [adding, setAdding] = useState(false)

  const type1 = pokemon.types[0]?.type?.name || 'normal'
  const typeInfo = TYPE_COLORS[type1] || TYPE_COLORS.normal
  const rarity = getRarity(pokemon.types)
  const img = pokemon.sprites?.other?.['official-artwork']?.front_default
    || pokemon.sprites?.front_default

  function handleAdd() {
    setAdding(true)
    onAddToCart(pokemon, price)
    setTimeout(() => setAdding(false), 800)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#13131e' : '#0d0d14',
        border: `1px solid ${hovered ? typeInfo.color : '#1e1e2e'}`,
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'all 0.25s',
        boxShadow: hovered
          ? `0 0 20px ${typeInfo.color}50, 0 8px 40px rgba(0,0,0,0.5)`
          : '0 2px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Rarity badge top-left */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: '#0a0a12', border: `1px solid ${rarity.color}`,
        color: rarity.color, fontFamily: 'Orbitron', fontSize: 7,
        padding: '3px 7px', borderRadius: 2, letterSpacing: 1,
        zIndex: 2,
      }}>{rarity.label}</div>

      {/* Collection badge */}
      {inCollection && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: '#39ff1422', border: '1px solid #39ff14',
          color: '#39ff14', fontFamily: 'Orbitron', fontSize: 7,
          padding: '3px 7px', borderRadius: 2, letterSpacing: 1, zIndex: 2,
        }}>OWNED</div>
      )}

      {/* Image area */}
      <div style={{
        background: `radial-gradient(circle at center, ${typeInfo.bg} 0%, #080810 70%)`,
        height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, position: 'relative',
      }}>
        {/* Hex grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 2 L28 9 L28 21 L15 28 L2 21 L2 9 Z' fill='none' stroke='${encodeURIComponent(typeInfo.color)}' stroke-width='0.3' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}/>
        <img
          src={img}
          alt={pokemon.name}
          style={{
            width: 130, height: 130, objectFit: 'contain',
            filter: hovered
              ? `drop-shadow(0 0 16px ${typeInfo.color})`
              : `drop-shadow(0 4px 8px rgba(0,0,0,0.5))`,
            transition: 'filter 0.3s',
            animation: hovered ? 'float 2s ease-in-out infinite' : 'none',
            position: 'relative', zIndex: 1,
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Number + name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#3a3a5c' }}>
            #{String(pokemon.id).padStart(3,'0')}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {pokemon.types.map(t => (
              <span key={t.type.name} style={{
                background: (TYPE_COLORS[t.type.name]?.bg) || 'rgba(255,255,255,0.1)',
                color: TYPE_COLORS[t.type.name]?.color || '#fff',
                fontSize: 9, fontFamily: 'Orbitron', padding: '2px 6px',
                borderRadius: 2, border: `1px solid ${TYPE_COLORS[t.type.name]?.color || '#fff'}40`,
              }}>{t.type.name.toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div style={{
          fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700,
          color: '#e8e8f0', textTransform: 'capitalize', marginBottom: 12,
          letterSpacing: 1,
        }}>{pokemon.name}</div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14,
        }}>
          {pokemon.stats.slice(0,4).map(s => (
            <div key={s.stat.name} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, color: '#4a4a6a', fontFamily: 'Orbitron' }}>
                  {s.stat.name.replace('special-','sp.').toUpperCase().slice(0,6)}
                </span>
                <span style={{ fontSize: 9, color: typeInfo.color, fontFamily: 'Orbitron' }}>{s.base_stat}</span>
              </div>
              <div style={{ height: 3, background: '#1a1a28', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(s.base_stat / 150 * 100, 100)}%`,
                  height: '100%',
                  background: typeInfo.color,
                  borderRadius: 2,
                  boxShadow: `0 0 6px ${typeInfo.color}`,
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Price + Buy button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, fontFamily: 'Orbitron', color: '#4a4a6a', marginBottom: 2 }}>PRECIO</div>
            <div style={{
              fontFamily: 'Orbitron', fontSize: 18, fontWeight: 900,
              color: '#f5e642',
              textShadow: '0 0 12px #f5e64280',
            }}>
              ${price}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={adding}
            style={{
              background: adding ? '#1a1a28' : `linear-gradient(135deg, ${typeInfo.color}, ${typeInfo.color}cc)`,
              color: adding ? typeInfo.color : '#000',
              border: `1px solid ${typeInfo.color}`,
              borderRadius: 4, padding: '10px 16px',
              fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 1,
              cursor: adding ? 'default' : 'pointer',
              transition: 'all 0.2s',
              fontWeight: 700,
              boxShadow: adding ? 'none' : `0 0 12px ${typeInfo.color}60`,
              flex: 1,
            }}
          >
            {adding ? 'AGREGADO ✓' : '+ CARRITO'}
          </button>
        </div>
      </div>
    </div>
  )
}
