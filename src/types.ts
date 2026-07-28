export type CategoryId = 'frias' | 'calientes' | 'dulces'

export interface Category {
  id: CategoryId
  label: string
  icon: 'cold' | 'hot' | 'cake'
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: CategoryId
  emoji: string
  image: string
}

export interface CartLine {
  item: MenuItem
  quantity: number
}
