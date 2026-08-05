import type { BadgeId, MenuItem, Size } from '../types'

/** Etiquetas disponibles para los productos; se activan con `badges` en `menu.ts`. */
export const badges: Record<BadgeId, { emoji: string; label: string; color: string }> = {
  nuevo: { emoji: '🌸', label: 'Nuevo', color: '#3A8D5D' },
  temporada: { emoji: '🍂', label: 'Temporada', color: '#8B5E34' },
  'mas-vendido': { emoji: '⭐', label: 'Más vendido', color: '#E4A72D' },
  popular: { emoji: '🔥', label: 'Popular', color: '#C85A3A' },
  promocion: { emoji: '💲', label: 'Promoción', color: '#D84B4B' },
  'edicion-limitada': {
    emoji: '🥤',
    label: 'Edición limitada',
    color: '#5A63D8',
  },
  vegano: { emoji: '🌱', label: 'Vegano', color: '#2D8A58' },
  frio: { emoji: '🧊', label: 'Frío', color: '#4094D8' },
  recomendado: { emoji: '☕', label: 'Recomendado', color: '#5B4030' },
}

export function isPromo(item: MenuItem): boolean {
  return item.badges?.includes('promocion') ?? false
}

/** Precio tachado de un tamaño: sólo con el badge `promocion` y si es mayor al precio actual. */
export function previousPrice(item: MenuItem, size: Size): number | null {
  if (!isPromo(item) || size.previousPrice === undefined) return null
  return size.previousPrice > size.price ? size.previousPrice : null
}
