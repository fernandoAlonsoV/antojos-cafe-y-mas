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

export interface MenuItem {
  id: string
  name: string
  description?: string
  category: CategoryId
  emoji: string
  image: string
  sizes: Size[]
}

export interface CartLine {
  /** Clave única de la línea: `${item.id}|${size.oz}`. */
  key: string
  item: MenuItem
  size: Size
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  notes: string
}
