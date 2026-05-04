// Different Pokemon set - Generations 2-5 focus, completely different from bro's
export const POKEMON_IDS = [
  // Gen 2
  155, 156, 157, // Cyndaquil line
  158, 159, 160, // Totodile line
  152, 153, 154, // Chikorita line
  196, 197,       // Espeon, Umbreon
  212, 214,       // Scizor, Heracross
  245, 249, 250,  // Suicune, Lugia, Ho-oh
  // Gen 3
  252, 253, 254,  // Treecko line
  255, 256, 257,  // Torchic line
  380, 381,       // Latias, Latios
  384,            // Rayquaza
  // Gen 4
  393, 394, 395,  // Piplup line
  448,            // Lucario
  445,            // Garchomp
  483, 484, 487,  // Dialga, Palkia, Giratina
  // Gen 5
  495, 496, 497,  // Snivy line
  501, 502, 503,  // Oshawott line
  643, 644, 646,  // Reshiram, Zekrom, Kyurem
];

export const TYPE_COLORS = {
  fire:     { color: '#ff4d00', bg: 'rgba(255,77,0,0.15)',    label: '🔥 Fuego' },
  water:    { color: '#00aaff', bg: 'rgba(0,170,255,0.15)',   label: '💧 Agua' },
  grass:    { color: '#39d353', bg: 'rgba(57,211,83,0.15)',   label: '🍃 Planta' },
  electric: { color: '#f5e642', bg: 'rgba(245,230,66,0.15)', label: '⚡ Eléctrico' },
  psychic:  { color: '#ff79c6', bg: 'rgba(255,121,198,0.15)',label: '🔮 Psíquico' },
  dragon:   { color: '#7b68ee', bg: 'rgba(123,104,238,0.15)',label: '🐉 Dragón' },
  steel:    { color: '#aab8c2', bg: 'rgba(170,184,194,0.15)',label: '⚙️ Acero' },
  ice:      { color: '#74d7ec', bg: 'rgba(116,215,236,0.15)',label: '❄️ Hielo' },
  fighting: { color: '#ff6b35', bg: 'rgba(255,107,53,0.15)', label: '🥊 Lucha' },
  normal:   { color: '#a8a878', bg: 'rgba(168,168,120,0.15)',label: '⭐ Normal' },
  flying:   { color: '#89b4fa', bg: 'rgba(137,180,250,0.15)',label: '🦅 Volador' },
  poison:   { color: '#a855f7', bg: 'rgba(168,85,247,0.15)', label: '☠️ Veneno' },
  ground:   { color: '#d97706', bg: 'rgba(217,119,6,0.15)',  label: '🌍 Tierra' },
  rock:     { color: '#92400e', bg: 'rgba(146,64,14,0.15)',  label: '🪨 Roca' },
  ghost:    { color: '#6d28d9', bg: 'rgba(109,40,217,0.15)', label: '👻 Fantasma' },
  dark:     { color: '#374151', bg: 'rgba(55,65,81,0.2)',    label: '🌑 Siniestro' },
  bug:      { color: '#65a30d', bg: 'rgba(101,163,13,0.15)', label: '🐛 Bicho' },
};

export function calcPrice(types) {
  const t = types[0]?.type?.name;
  if (['dragon','psychic','ghost'].includes(t)) return (Math.random()*40+60).toFixed(2);
  if (['fire','electric','steel','ice'].includes(t)) return (Math.random()*30+30).toFixed(2);
  if (['water','grass','fighting'].includes(t)) return (Math.random()*20+15).toFixed(2);
  return (Math.random()*10+5).toFixed(2);
}

export function getRarity(types) {
  const t = types[0]?.type?.name;
  if (['dragon','psychic','ghost'].includes(t)) return { label: 'LEGENDARY', color: '#ffd700' };
  if (['fire','electric','steel','ice'].includes(t)) return { label: 'RARE', color: '#ff2d55' };
  if (['water','grass','fighting'].includes(t)) return { label: 'UNCOMMON', color: '#00d4ff' };
  return { label: 'COMMON', color: '#7a7a9a' };
}
