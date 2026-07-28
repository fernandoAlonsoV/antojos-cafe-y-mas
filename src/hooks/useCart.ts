import { useCallback, useEffect, useMemo, useState } from 'react'
import { menu } from '../data/menu'
import type { CartLine, MenuItem } from '../types'
import { business } from '../config'

const STORAGE_KEY = 'antojos-cart-v1'

type StoredCart = Record<string, number>

function readStoredCart(): StoredCart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const result: StoredCart = {}
    for (const [id, quantity] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof quantity === 'number' && quantity > 0 && menu.some((item) => item.id === id)) {
        result[id] = Math.floor(quantity)
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

  const setQuantity = useCallback((item: MenuItem, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current }
      if (quantity <= 0) delete next[item.id]
      else next[item.id] = quantity
      return next
    })
  }, [])

  const add = useCallback(
    (item: MenuItem, amount = 1) => {
      setQuantities((current) => {
        const quantity = (current[item.id] ?? 0) + amount
        const next = { ...current }
        if (quantity <= 0) delete next[item.id]
        else next[item.id] = quantity
        return next
      })
    },
    [],
  )

  const remove = useCallback((item: MenuItem) => {
    setQuantities((current) => {
      const next = { ...current }
      delete next[item.id]
      return next
    })
  }, [])

  const clear = useCallback(() => setQuantities({}), [])

  const lines = useMemo<CartLine[]>(
    () =>
      menu
        .filter((item) => quantities[item.id] > 0)
        .map((item) => ({ item, quantity: quantities[item.id] })),
    [quantities],
  )

  const count = lines.reduce((total, line) => total + line.quantity, 0)
  const subtotal = lines.reduce((total, line) => total + line.quantity * line.item.price, 0)
  const shipping = count > 0 ? business.shippingCost : 0

  return {
    quantities,
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
