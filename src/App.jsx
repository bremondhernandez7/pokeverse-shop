import React, { useState, useEffect, useCallback } from 'react'
import PokemonCard from './components/PokemonCard.jsx'
import CartSidebar from './components/CartSidebar.jsx'
import CollectionView from './components/CollectionView.jsx'
import Notification from './components/Notification.jsx'
import { POKEMON_IDS, TYPE_COLORS, calcPrice } from './pokemonData.js'

const STORAGE_KEY_COLLECTION = 'pokeverse_collection'
const STORAGE_KEY_CART = 'pokeverse_cart'

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initial }
    catch { return initial }
  })
  const set = useCallback(v => {
    setVal(v)
    localStorage.setItem(key, JSON.stringify(v))
  }, [key])
  return [val, set]
}

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useLocalStorage(STORAGE_KEY_CART, [])
  const [collection, setCollection] = useLocalStorage(STORAGE_KEY_COLLECTION, [])
  const [cartOpen, setCartOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loadedCount, setLoadedCount] = useState(0)

  // Load pokemon
  useEffect(() => {
    async function load() {
      const results = []
      const newPrices = {}
      for (const id of POKEMON_IDS) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const data = await res.json()
          results.push(data)
          newPrices[data.id] = calcPrice(data.types)
          setLoadedCount(prev => prev + 1)
        } catch (e) { /* skip */ }
      }
      setPokemons(results)
      setPrices(newPrices)
      setLoading(false)
    }
    load()
  }, [])

  function pushNotif(message, type = 'success') {
    const id = Date.now()
    setNotifications(n => [...n, { id, message, type }])
  }

  function removeNotif(id) {
    setNotifications(n => n.filter(x => x.id !== id))
  }

  function handleAddToCart(pokemon, price) {
    const img = pokemon.sprites?.other?.['official-artwork']?.front_default
      || pokemon.sprites?.front_default
    const type = pokemon.types[0]?.type?.name || 'normal'
    setCart(prev => [...prev, { id: pokemon.id, name: pokemon.name, price, img, type }])
    pushNotif(`${pokemon.name.toUpperCase()} agregado al carrito`, 'info')
  }

  function handleRemoveFromCart(idx) {
    setCart(prev => prev.filter((_, i) => i !== idx))
  }

  function handleClearCart() {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      setCart([])
      pushNotif('Carrito vaciado', 'info')
    }
  }

  function handlePaymentSuccess(order) {
    const purchased = cart.map(item => ({
      ...item,
      txId: order.id,
      purchasedAt: new Date().toISOString(),
    }))
    setCollection([...collection, ...purchased])
    setCart([])
    setCartOpen(false)
    pushNotif('Pago completado. Cartas añadidas a tu colección', 'success')
  }

  // Unique types for filter
  const allTypes = ['ALL', ...new Set(pokemons.flatMap(p => p.types.map(t => t.type.name)))]

  const filtered = pokemons.filter(p => {
    const matchType = filter === 'ALL' || p.types.some(t => t.type.name === filter)
    const matchSearch = p.name.includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const collectionIds = new Set(collection.map(c => c.id))

  const progress = Math.round((loadedCount / POKEMON_IDS.length) * 100)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 30,
      }}>
        <div style={{ fontFamily: 'Press Start 2P', fontSize: 18, color: '#f5e642',
          textShadow: '0 0 20px #f5e64280', animation: 'flicker 3s infinite', letterSpacing: 2 }}>
          PokéVerse Shop
        </div>
        <div style={{ width: 300 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#7a7a9a' }}>CARGANDO POKÉDEX...</span>
            <span style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#f5e642' }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: '#1e1e2e', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'linear-gradient(90deg, #f5e642, #ff2d55)',
              borderRadius: 2, transition: 'width 0.3s',
              boxShadow: '0 0 10px #f5e64280',
            }}/>
          </div>
          <div style={{ fontFamily: 'Orbitron', fontSize: 8, color: '#3a3a5c', textAlign: 'center', marginTop: 10 }}>
            {loadedCount} / {POKEMON_IDS.length} CARTAS
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh' }}>
      {/* ── NAV ── */}
      <nav className="site-nav" style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: '#08080f',
        borderBottom: '1px solid #1e1e2e',
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
        boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
      }}>
        {/* Logo */}
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 4,
            background: 'linear-gradient(135deg, #f5e642, #ff2d55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Press Start 2P', fontSize: 14,
          }}>⚡</div>
          <div>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: '#f5e642',
              textShadow: '0 0 10px #f5e64260', letterSpacing: 1 }}>PokéVerse</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 8, color: '#4a4a6a', letterSpacing: 3 }}>TRADING CARDS</div>
          </div>
        </div>

        {/* Nav actions */}
        <div className="nav-actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Search */}
          <div className="nav-search" style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              color: '#4a4a6a', fontSize: 12 }}>🔍</span>
            <input
              className="nav-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="BUSCAR..."
              style={{
                background: '#0d0d14', border: '1px solid #2a2a40',
                color: '#e8e8f0', borderRadius: 4, padding: '8px 12px 8px 32px',
                fontFamily: 'Orbitron', fontSize: 10, outline: 'none', width: 180,
              }}
            />
          </div>

          {/* Collection btn */}
          <button className="nav-action-btn" onClick={() => setCollectionOpen(true)} style={{
            background: '#0d0d14',
            border: '1px solid #39ff1460',
            color: '#39ff14',
            padding: '8px 16px', borderRadius: 4,
            fontFamily: 'Orbitron', fontSize: 9, cursor: 'pointer',
            letterSpacing: 1,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>📦</span> MI COLECCIÓN
            <span style={{
              background: '#39ff1422', border: '1px solid #39ff14',
              borderRadius: 2, padding: '1px 6px', fontSize: 9,
            }}>{collection.length}</span>
          </button>

          {/* Cart btn */}
          <button className="nav-action-btn cart-action-btn" onClick={() => setCartOpen(true)} style={{
            background: cart.length > 0
              ? 'linear-gradient(135deg, #f5e642, #ffaa00)'
              : '#0d0d14',
            border: '1px solid #f5e64260',
            color: cart.length > 0 ? '#000' : '#f5e642',
            padding: '8px 20px', borderRadius: 4,
            fontFamily: 'Orbitron', fontSize: 9, cursor: 'pointer',
            letterSpacing: 1, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: cart.length > 0 ? '0 0 16px #f5e64240' : 'none',
            transition: 'all 0.2s',
          }}>
            🛒 CARRITO
            {cart.length > 0 && (
              <span style={{
                background: '#ff2d55', color: '#fff',
                borderRadius: 2, padding: '1px 7px', fontSize: 10, fontWeight: 900,
              }}>{cart.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero-section" style={{
        background: 'linear-gradient(180deg, #0d0d1a 0%, #050508 100%)',
        borderBottom: '1px solid #1e1e2e',
        padding: '50px 40px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG decoration */}
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, #f5e64208, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', left: '40%', bottom: -40,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, #ff2d5508, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        <div className="hero-copy" style={{ maxWidth: 700, position: 'relative' }}>
          <div style={{
            fontFamily: 'Orbitron', fontSize: 9, color: '#f5e642',
            letterSpacing: 4, marginBottom: 16,
          }}>◆ GEN 2-5 COLLECTION ◆</div>
          <h1 className="hero-title" style={{
            fontFamily: 'Press Start 2P', fontSize: 28, lineHeight: 1.6,
            color: '#e8e8f0',
            marginBottom: 16,
          }}>
            RARE<br />
            <span style={{ color: '#f5e642', textShadow: '0 0 30px #f5e64260' }}>POKÉMON</span><br />
            CARDS
          </h1>
          <p className="hero-text" style={{
            fontFamily: 'Rajdhani', fontSize: 17, color: '#7a7a9a',
            maxWidth: 500, lineHeight: 1.7,
          }}>
            Colecciona y compra cartas de las generaciones 2 a 5. 
            Desde Cyndaquil hasta Kyurem — ¡encuentra tus favoritos!
          </p>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{
          display: 'flex', gap: 30, marginTop: 40,
          borderTop: '1px solid #1e1e2e', paddingTop: 30,
        }}>
          {[
            { label: 'CARTAS DISPONIBLES', value: pokemons.length, color: '#f5e642' },
            { label: 'EN COLECCIÓN', value: collection.length, color: '#39ff14' },
            { label: 'EN CARRITO', value: cart.length, color: '#00d4ff' },
            { label: 'INVERSIÓN TOTAL', value: `$${collection.reduce((s,i) => s+parseFloat(i.price),0).toFixed(2)}`, color: '#ff2d55' },
          ].map(s => (
            <div className="stat-item" key={s.label}>
              <div style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#4a4a6a', letterSpacing: 2, marginBottom: 6 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 900, color: s.color,
                textShadow: `0 0 15px ${s.color}60` }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="filters-bar" style={{
        padding: '20px 40px',
        borderBottom: '1px solid #1e1e2e',
        background: '#08080f',
        display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: 9, color: '#3a3a5c', marginRight: 8, letterSpacing: 2 }}>
          FILTRAR:
        </span>
        {allTypes.map(type => {
          const tc = TYPE_COLORS[type]
          const active = filter === type
          return (
            <button className="filter-chip" key={type} onClick={() => setFilter(type)} style={{
              background: active
                ? (tc ? tc.color : '#f5e642')
                : (tc ? tc.bg : '#0d0d14'),
              color: active ? '#000' : (tc ? tc.color : '#e8e8f0'),
              border: `1px solid ${tc ? tc.color : '#2a2a40'}`,
              padding: '6px 14px', borderRadius: 3,
              fontFamily: 'Orbitron', fontSize: 8, cursor: 'pointer',
              letterSpacing: 1, transition: 'all 0.15s',
              fontWeight: active ? 900 : 400,
              boxShadow: active && tc ? `0 0 10px ${tc.color}60` : 'none',
            }}>
              {type === 'ALL' ? '◆ TODOS' : type.toUpperCase()}
            </button>
          )
        })}
        <span className="filters-count" style={{ marginLeft: 'auto', fontFamily: 'Orbitron', fontSize: 9, color: '#3a3a5c' }}>
          {filtered.length} RESULTADO{filtered.length !== 1 ? 'S' : ''}
        </span>
      </div>

      {/* ── GRID ── */}
      <main className="cards-main" style={{ padding: '40px', maxWidth: 1400, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'Orbitron', color: '#3a3a5c' }}>
            <div style={{ fontSize: 9, letterSpacing: 2 }}>NO SE ENCONTRARON CARTAS</div>
          </div>
        ) : (
          <div className="pokemon-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {filtered.map(p => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                price={prices[p.id]}
                onAddToCart={handleAddToCart}
                inCollection={collectionIds.has(p.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer" style={{
        borderTop: '1px solid #1e1e2e',
        padding: '30px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#3a3a5c' }}>
          PokéVerse Shop © 2025
        </div>
        <div style={{ fontFamily: 'Orbitron', fontSize: 8, color: '#2a2a40', letterSpacing: 3 }}>
          POWERED BY POKÉAPI + PAYPAL SANDBOX
        </div>
      </footer>

      {/* ── SIDEBARS / OVERLAYS ── */}
      <CartSidebar
        cart={cart}
        visible={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onSuccess={handlePaymentSuccess}
      />

      {collectionOpen && (
        <CollectionView
          collection={collection}
          onClose={() => setCollectionOpen(false)}
        />
      )}

      {/* ── NOTIFICATIONS ── */}
      <div className="notifications-stack" style={{
        position: 'fixed', bottom: 24, right: 24,
        display: 'flex', flexDirection: 'column', gap: 10, zIndex: 2000,
        alignItems: 'flex-end',
      }}>
        {notifications.map(n => (
          <Notification
            key={n.id}
            message={n.message}
            type={n.type}
            onDone={() => removeNotif(n.id)}
          />
        ))}
      </div>
    </div>
  )
}
