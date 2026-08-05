import type { Category, ItemOptions, MenuItem, Size } from '../types'

export const categories: Category[] = [
  { id: 'cafe-lattes', label: 'Café Lattes', icon: 'coffee', note: 'Vaso de 20 oz' },
  { id: 'matcha', label: 'Matcha', icon: 'matcha', note: 'Vaso de 20 oz' },
  {
    id: 'cereal-lattes',
    label: 'Cereal Lattes',
    icon: 'cereal',
    note: 'Tu cereal favorito en versión latte · 20 oz · también en Matcha',
  },
  { id: 'birthday-lattes', label: 'Birthday Lattes', icon: 'birthday', note: 'Dulce, colorido y perfecto para celebrar' },
  { id: 'birthday-matcha', label: 'Birthday Matcha', icon: 'birthday', note: 'Alegre, cremoso y lleno de sabor' },
  { id: 'smoothies', label: 'Smoothie', icon: 'smoothie', note: 'Vaso de 16 oz · preparado con agua' },
  {
    id: 'kids',
    label: 'Kids Menú',
    icon: 'milkshake',
    note: 'Milkshakes en vaso de 16 oz · sólo con leche entera',
  },
  { id: 'refreshers', label: 'Refreshers', icon: 'refresher', note: 'Vaso de 16 oz · preparado con agua' },
]

const PHOTO = 'products/producto-small-267x-20y-350x350px.webp'

/** Bebidas en las que el cliente elige el tipo de leche. */
const WITH_MILK: ItemOptions = { milk: true }
/** Bebidas con agua o con leche fija (milkshakes): no se elige leche. */
const NO_MILK: ItemOptions = { milk: false }

const oz20 = (price: number): Size[] => [{ oz: 20, price }]
const oz16 = (price: number): Size[] => [{ oz: 16, price }]
const mini10y20: Size[] = [
  { oz: 10, price: 5, label: 'Mini' },
  { oz: 20, price: 7 },
]

const cafeLattes = [
  'Vanilla latte',
  'Rompope latte',
  'Biscoff latte',
  'Caramel latte',
  'Nutella latte',
  'Banana latte',
  'Banana Biscoff latte',
  'Mazapán latte',
  'Cookies & cream latte',
  'Ferrero Rocher latte',
  'Duvalín latte',
]

const matchas = [
  'Matcha latte',
  'Vanilla Matcha',
  'Double Matcha',
  'Banana Matcha',
  'Banana Biscoff Matcha',
  'Strawberry Matcha',
  'Blueberry Matcha',
  'Lavander Matcha',
  'Cookies & cream Matcha',
]

const cerealLattes: { name: string; description: string }[] = [
  { name: 'Marshmallow Cereal Latte', description: 'Dulce, cremoso y lleno de nostalgia.' },
  { name: 'Cocoa Cereal Latte', description: 'Intenso, chocolatoso y reconfortante.' },
  { name: 'Cinnamon Toast Cereal Latte', description: 'Suave, especiado y perfecto para ti.' },
  { name: 'Fruity Pebbles Cereal Latte', description: 'Divertido, afrutado y lleno de color.' },
]

const milkshakes = [
  'Strawberry Milkshake',
  'Chocolate Milkshake',
  'Cookies & Cream Milkshake',
  'Banana Milkshake',
  'Nutella Milkshake',
  'Biscoff Milkshake',
]

function slug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const menu: MenuItem[] = [
  ...cafeLattes.map<MenuItem>((name) => ({
    id: slug(name),
    name,
    category: 'cafe-lattes',
    emoji: '☕',
    image: PHOTO,
    sizes: oz20(6),
    options: WITH_MILK,
  })),
  ...matchas.map<MenuItem>((name) => ({
    id: slug(name),
    name,
    category: 'matcha',
    emoji: '🍵',
    image: PHOTO,
    sizes: oz20(7),
    options: WITH_MILK,
  })),
  ...cerealLattes.map<MenuItem>(({ name, description }) => ({
    id: slug(name),
    name,
    description,
    category: 'cereal-lattes',
    emoji: '🥣',
    image: PHOTO,
    sizes: oz20(7),
    options: WITH_MILK,
  })),
  {
    id: 'birthday-latte',
    name: 'Birthday Latte',
    description: 'Café cremoso con sabor a pastel de cumpleaños.',
    category: 'birthday-lattes',
    emoji: '🎂',
    image: PHOTO,
    sizes: mini10y20,
    options: WITH_MILK,
  },
  {
    id: 'birthday-matcha-drink',
    name: 'Birthday Matcha',
    description: 'Matcha cremoso con sabor a pastel de cumpleaños.',
    category: 'birthday-matcha',
    emoji: '🎉',
    image: PHOTO,
    sizes: mini10y20,
    options: WITH_MILK,
  },
  {
    id: 'berry-smoothie',
    name: 'Berry Smoothie',
    description: 'Frutos rojos y muy refrescante; se prepara con agua, sin leche.',
    category: 'smoothies',
    emoji: '🍓',
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  },
  ...milkshakes.map<MenuItem>((name) => ({
    id: slug(name),
    name,
    description: 'Se prepara únicamente con leche entera.',
    category: 'kids',
    emoji: '🥤',
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  })),
  {
    id: 'dragon-fruit-lemonade',
    name: 'Dragón Fruit Lemonade',
    description: 'Limonada afrutada y muy refrescante; se prepara con agua, sin leche.',
    category: 'refreshers',
    emoji: '🐉',
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    description: 'Limonada natural bien fría; se prepara con agua, sin leche.',
    category: 'refreshers',
    emoji: '🍋',
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  },
]
