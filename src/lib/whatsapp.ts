import { business } from '../config'
import type { CartLine } from '../types'

export function formatPrice(value: number): string {
  return `${business.currency}${value}`
}

export function buildOrderMessage(lines: CartLine[], subtotal: number, shipping: number): string {
  const items = lines
    .map((line) => `${line.item.emoji} ${line.item.name.toUpperCase()} x${line.quantity}   ${formatPrice(line.quantity * line.item.price)}`)
    .join('\n')

  return [
    '¡Hola! Quiero hacer el siguiente pedido:',
    '',
    items,
    '',
    '------------------------------',
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    `Envío: ${formatPrice(shipping)}`,
    `TOTAL: ${formatPrice(subtotal + shipping)}`,
    '',
    'Nombre: ______________',
    'Teléfono: ______________',
    'Dirección: ______________',
    '¿Alguna nota adicional? ______________',
    '',
    '¡Gracias!',
  ].join('\n')
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}
