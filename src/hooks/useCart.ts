import { useCallback, useEffect, useMemo, useState } from 'react'
import { business } from '../config'
import { menu } from '../data/menu'
import type { CartLine, Customization, MenuItem, Size, StoredLine } from '../types'

const STORAGE_KEY = 'antojos-cart-v3'

/** Firma que identifica una línea: mismo producto, tamaño y personalización se acumulan. */
export function lineKey(itemId: string, sizeOz: number, customization: Customization): string {
  const sweet = customization.sweetened ? (customization.sweetener ?? 'si') : 'sin'
  return [itemId, sizeOz, sweet, customization.milk ?? '-', customization.notes.trim()].join('|')
}

function isCustomization(value: unknown): value is Customization {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.sweetened === 'boolean' &&
    (typeof candidate.sweetener === 'string' || candidate.sweetener === null) &&
    (typeof candidate.milk === 'string' || candidate.milk === null) &&
    typeof candidate.notes === 'string'
  )
}

function isStoredLine(value: unknown): value is StoredLine {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.key === 'string' &&
    typeof candidate.itemId === 'string' &&
    typeof candidate.sizeOz === 'number' &&
    typeof candidate.quantity === 'number' &&
    candidate.quantity > 0 &&
    isCustomization(candidate.customization)
  )
}

function resolve(stored: StoredLine): CartLine | null {
  const item = menu.find((candidate) => candidate.id === stored.itemId)
  const size = item?.sizes.find((candidate) => candidate.oz === stored.sizeOz)
  if (!item || !size) return null
  return {
    key: stored.key,
    item,
    size,
    customization: stored.customization,
    quantity: Math.floor(stored.quantity),
  }
}

function readStoredLines(): StoredLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isStoredLine).filter((line) => resolve(line) !== null)
  } catch {
    return []
  }
}

export function useCart() {
  const [stored, setStored] = useState<StoredLine[]>(readStoredLines)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [stored])

  const add = useCallback(
    (item: MenuItem, size: Size, customization: Customization, quantity: number) => {
      if (quantity <= 0) return
      const key = lineKey(item.id, size.oz, customization)
      setStored((current) => {
        const existing = current.find((line) => line.key === key)
        if (existing) {
          return current.map((line) =>
            line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
          )
        }
        return [...current, { key, itemId: item.id, sizeOz: size.oz, customization, quantity }]
      })
    },
    [],
  )

  const setQuantity = useCallback((key: string, quantity: number) => {
    setStored((current) =>
      quantity <= 0
        ? current.filter((line) => line.key !== key)
        : current.map((line) => (line.key === key ? { ...line, quantity } : line)),
    )
  }, [])

  const remove = useCallback((key: string) => {
    setStored((current) => current.filter((line) => line.key !== key))
  }, [])

  const clear = useCallback(() => setStored([]), [])

  const lines = useMemo<CartLine[]>(
    () => stored.map(resolve).filter((line): line is CartLine => line !== null),
    [stored],
  )

  const count = lines.reduce((total, line) => total + line.quantity, 0)
  const subtotal = lines.reduce((total, line) => total + line.quantity * line.size.price, 0)
  const shipping = count > 0 ? business.shippingCost : 0

  return {
    lines,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    add,
    setQuantity,
    remove,
    clear,
  }
}
