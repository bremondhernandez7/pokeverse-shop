# ⚡ PokéVerse Shop

> Tienda de cartas Pokémon — Generaciones 2 al 5 — con estilo arcade retro neón

Completamente diferente al de tu hermano. Diseño oscuro con neón amarillo/rojo, Pokémon de Gen 2-5, nuevo layout de filtros, sidebar de carrito y colección rediseñados.

---

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abre: http://localhost:5173

---

## 💳 PayPal Sandbox

Abre `src/components/CartSidebar.jsx` y reemplaza:

```js
const PAYPAL_CLIENT_ID = 'TU_PAYPAL_SANDBOX_CLIENT_ID'
```

con tu Client ID real de PayPal Sandbox.

---

## ✨ Diferencias vs el otro proyecto

| Feature | Hermano | Tuyo (PokéVerse) |
|---|---|---|
| Pokémon | Gen 1 | **Gen 2-5** |
| Tema | Claro/colores | **Oscuro arcade neón** |
| Fuente | Syne / DM Sans | **Press Start 2P / Orbitron** |
| Carrito | Modal | **Sidebar lateral** |
| Colección | Sección | **Vista pantalla completa** |
| Filtros | Botones simples | **Botones con colores por tipo** |
| Stats | No | **Barras de stats en cada carta** |

---

## 🃏 Cartas incluidas

- 🔥 Línea Cyndaquil (155-157)
- 💧 Línea Totodile (158-160)
- 🍃 Línea Chikorita (152-154)
- 🔮 Espeon, Umbreon (196, 197)
- ⚙️ Scizor, Heracross (212, 214)
- 💧 Suicune, Lugia, Ho-oh (245, 249, 250)
- 🍃 Línea Treecko (252-254)
- 🔥 Línea Torchic (255-257)
- 🐉 Latias, Latios, Rayquaza (380, 381, 384)
- 💧 Línea Piplup (393-395)
- ⚙️ Lucario (448), Garchomp (445)
- 🐉 Dialga, Palkia, Giratina (483, 484, 487)
- 🍃 Línea Snivy (495-497)
- 💧 Línea Oshawott (501-503)
- 🐉 Reshiram, Zekrom, Kyurem (643, 644, 646)

---

## 🛠 Tech Stack

- React 18 + Vite
- PokéAPI (datos en vivo)
- @paypal/react-paypal-js
- localStorage para persistencia
