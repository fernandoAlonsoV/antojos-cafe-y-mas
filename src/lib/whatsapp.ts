import { business } from '../config'
import { milkLabel, sweetenerLabel } from '../data/options'
import type { CartLine, CustomerInfo, Customization, MenuItem, Size } from '../types'

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

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  shipping: number,
  customer: CustomerInfo,
): string {
  const items = lines.flatMap((line) => {
    const head = `${line.item.emoji} ${line.item.name.toUpperCase()} (${sizeLabel(line.size)}) x${line.quantity}   ${formatPrice(
      line.quantity * line.size.price,
    )}`
    const details = [
      ...customizationSummary(line.item, line.customization).map((part) => `   • ${part}`),
      ...(line.customization.notes.trim() ? [`   • Nota: ${line.customization.notes.trim()}`] : []),
    ]
    return [head, ...details]
  })

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
    `Dirección: ${customer.address}`,
    `Notas: ${customer.notes.trim() || 'Sin notas adicionales'}`,
    '',
    '¡Gracias!',
  ].join('\n')
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}
