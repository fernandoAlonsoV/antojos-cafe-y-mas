import type { Customization, ItemOptions, MilkId, SweetenerId } from '../types'

export const sweeteners: { id: SweetenerId; label: string }[] = [
  { id: 'azucar-morena', label: 'Azúcar morena' },
  { id: 'miel', label: 'Miel' },
  { id: 'syrups', label: 'Syrups' },
]

export const milks: { id: MilkId; label: string }[] = [
  { id: 'entera', label: 'Entera' },
  { id: 'deslactosada', label: 'Deslactosada' },
  { id: 'avena', label: 'Avena' },
  { id: 'almendra', label: 'Almendra' },
  { id: 'soya', label: 'Soya' },
]

export const NOTES_MAX_LENGTH = 100

export function sweetenerLabel(id: SweetenerId): string {
  return sweeteners.find((option) => option.id === id)?.label ?? id
}

export function milkLabel(id: MilkId): string {
  return milks.find((option) => option.id === id)?.label ?? id
}

export function defaultCustomization(options: ItemOptions): Customization {
  return {
    sweetened: options.sweetener,
    sweetener: options.sweetener ? sweeteners[0].id : null,
    milk: options.milk ? milks[0].id : null,
    notes: '',
  }
}
