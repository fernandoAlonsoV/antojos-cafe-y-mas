export type CategoryId =
  | 'cafe-lattes'
  | 'matcha'
  | 'cereal-lattes'
  | 'birthday-lattes'
  | 'birthday-matcha'
  | 'smoothies'
  | 'kids'
  | 'refreshers'

export type CategoryIcon =
  | 'coffee'
  | 'matcha'
  | 'cereal'
  | 'birthday'
  | 'smoothie'
  | 'milkshake'
  | 'refresher'

export interface Category {
  id: CategoryId
  label: string
  icon: CategoryIcon
  /** Nota corta que se muestra bajo el nombre de la categoría. */
  note?: string
}

export interface Size {
  /** Onzas del vaso; también identifica al tamaño dentro del producto. */
  oz: number
  price: number
  /** Etiqueta opcional (ej. "Mini"); si falta se usa "20 oz". */
  label?: string
}

export type MilkId = 'entera' | 'deslactosada' | 'avena' | 'almendra' | 'soya'

/** Qué se puede personalizar de un producto; lo que está en false no se muestra. */
export interface ItemOptions {
  milk: boolean
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  category: CategoryId
  emoji: string
  image: string
  sizes: Size[]
  options: ItemOptions
}

export interface Customization {
  /** Grado de endulzamiento de 0 (sin endulzar) a 100 (muy dulce). */
  sweetness: number
  milk: MilkId | null
  notes: string
}

/** Línea tal como se guarda en localStorage. */
export interface StoredLine {
  key: string
  itemId: string
  sizeOz: number
  customization: Customization
  quantity: number
}

export interface CartLine {
  /** Firma de producto + tamaño + personalización. */
  key: string
  item: MenuItem
  size: Size
  customization: Customization
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  notes: string
}
