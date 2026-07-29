import { useCallback, useEffect, useMemo, useState } from 'react'
import { menu } from '../data/menu'
import type { CartLine, MenuItem, Size } from '../types'
import { business } from '../config'

const STORAGE_KEY = 'antojos-cart-v2'

type StoredCart = Record<string, number>

export function lineKey(item: MenuItem, size: Size): string {
  return `${item.id}|${size.oz}`
}

const catalog = new Map<string, { item: MenuItem; size: Size }>(
  menu.flatMap((item) => item.sizes.map((size) => [lineKey(item, size), { item, size }] as const)),
)

function readStoredCart(): StoredCart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const result: StoredCart = {}
    for (const [key, quantity] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof quantity === 'number' && quantity > 0 && catalog.has(key)) {
        result[key] = Math.floor(quantity)
      }
    }
    return result
  } catch {
    return {}
  }
}

export function useCart() {
  const [quantities, setQuantities] = useState<StoredCart>(readStoredCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
  }, [quantities])

  const setQuantity = useCallback((item: MenuItem, size: Size, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current }
      const key = lineKey(item, size)
      if (quantity <= 0) delete next[key]
      else next[key] = quantity
      return next
    })
  }, [])

  const remove = useCallback((item: MenuItem, size: Size) => {
    setQuantities((current) => {
      const next = { ...current }
      delete next[lineKey(item, size)]
      return next
    })
  }, [])

  const clear = useCallback(() => setQuantities({}), [])

  const lines = useMemo<CartLine[]>(
    () =>
      menu.flatMap((item) =>
        item.sizes
          .map((size) => ({ key: lineKey(item, size), item, size }))
          .filter((line) => quantities[line.key] > 0)
          .map((line) => ({ ...line, quantity: quantities[line.key] })),
      ),
    [quantities],
  )

  const count = lines.reduce((total, line) => total + line.quantity, 0)
  const subtotal = lines.reduce((total, line) => total + line.quantity * line.size.price, 0)
  const shipping = count > 0 ? business.shippingCost : 0

  return {
    quantities,
    lines,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    setQuantity,
    remove,
    clear,
  }
}
