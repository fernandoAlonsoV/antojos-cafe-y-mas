import { business } from '../config'
import { categories } from '../data/menu'
import { milkLabel, sweetenerLabel } from '../data/options'
import type { CartLine, Category, CustomerInfo, Customization, MenuItem, Size } from '../types'
import { isDelivery, pickupNote } from './delivery'

export function formatPrice(value: number): string {
  return `${business.currency}${value.toFixed(2)}`
}

export function sizeLabel(size: Size): string {
  return size.label ? `${size.label} ${size.oz} oz` : `${size.oz} oz`
}

/** Resumen legible de la personalización, sin el tamaño ni las notas. */
export function customizationSummary(item: MenuItem, customization: Customization): string[] {
  const parts: string[] = []
  if (item.options.sweetener) {
    parts.push(
      customization.sweetened && customization.sweetener
        ? sweetenerLabel(customization.sweetener)
        : 'Sin endulzar',
    )
  }
  if (item.options.milk && customization.milk) {
    parts.push(`Leche ${milkLabel(customization.milk).toLowerCase()}`)
  }
  return parts
}

/** Agrupa las líneas por categoría, respetando el orden del menú. */
export function groupByCategory(lines: CartLine[]): { category: Category; lines: CartLine[] }[] {
  return categories
    .map((category) => ({
      category,
      lines: lines.filter((line) => line.item.category === category.id),
    }))
    .filter((group) => group.lines.length > 0)
}

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  shipping: number,
  customer: CustomerInfo,
): string {
  const items = groupByCategory(lines).flatMap(({ category, lines: group }) => [
    `*${category.label.toUpperCase()}*`,
    ...group.flatMap((line) => {
      const head = `${line.item.emoji} ${line.item.name.toUpperCase()} (${sizeLabel(line.size)}) x${line.quantity}   ${formatPrice(
        line.quantity * line.size.price,
      )}`
      const details = [
        ...customizationSummary(line.item, line.customization).map((part) => `   • ${part}`),
        ...(line.customization.notes.trim()
          ? [`   • Nota: ${line.customization.notes.trim()}`]
          : []),
      ]
      return [head, ...details]
    }),
    '',
  ])
  items.pop()

  const totals = [`Subtotal: ${formatPrice(subtotal)}`]
  if (shipping > 0) totals.push(`Envío: ${formatPrice(shipping)}`)
  totals.push(`TOTAL: ${formatPrice(subtotal + shipping)}`)

  return [
    '¡Hola! Quiero hacer el siguiente pedido:',
    '',
    ...items,
    '',
    '------------------------------',
    '',
    ...totals,
    '',
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    isDelivery ? `Dirección: ${customer.address}` : pickupNote,
    `Notas: ${customer.notes.trim() || 'Sin notas adicionales'}`,
    '',
    '¡Gracias!',
  ].join('\n')
}

export function whatsappUrl(message: string): string {
  // api.whatsapp.com en vez de wa.me: su redirección rompe los emojis del mensaje.
  return `https://api.whatsapp.com/send?phone=${business.whatsappNumber}&text=${encodeURIComponent(message)}`
}
