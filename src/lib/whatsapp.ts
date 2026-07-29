import { business } from '../config'
import type { CartLine, CustomerInfo, Size } from '../types'

export function formatPrice(value: number): string {
  return `${business.currency}${value.toFixed(2)}`
}

export function sizeLabel(size: Size): string {
  return size.label ? `${size.label} ${size.oz} oz` : `${size.oz} oz`
}

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  shipping: number,
  customer: CustomerInfo,
): string {
  const items = lines.map(
    (line) =>
      `${line.item.emoji} ${line.item.name.toUpperCase()} (${sizeLabel(line.size)}) x${line.quantity}   ${formatPrice(
        line.quantity * line.size.price,
      )}`,
  )

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
