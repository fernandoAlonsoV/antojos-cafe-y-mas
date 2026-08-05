import type { BadgeId, Category, ItemOptions, MenuItem, Size } from "../types";

export const categories: Category[] = [
  {
    id: "cafe-lattes",
    label: "Café Lattes",
    icon: "coffee",
    note: "Vaso de 20 oz",
  },
  { id: "matcha", label: "Matcha", icon: "matcha", note: "Vaso de 20 oz" },
  {
    id: "cereal-lattes",
    label: "Cereal Lattes",
    icon: "cereal",
    note: "Tu cereal favorito en versión latte · 20 oz · también en Matcha",
  },
  {
    id: "birthday-lattes",
    label: "Birthday Lattes",
    icon: "birthday",
    note: "Dulce, colorido y perfecto para celebrar",
  },
  {
    id: "birthday-matcha",
    label: "Birthday Matcha",
    icon: "birthday",
    note: "Alegre, cremoso y lleno de sabor",
  },
  {
    id: "smoothies",
    label: "Smoothie",
    icon: "smoothie",
    note: "Vaso de 16 oz · preparado con agua",
  },
  {
    id: "kids",
    label: "Kids Menú",
    icon: "milkshake",
    note: "Milkshakes en vaso de 16 oz · sólo con leche entera",
  },
  {
    id: "refreshers",
    label: "Refreshers",
    icon: "refresher",
    note: "Vaso de 16 oz · preparado con agua",
  },
];

const PHOTO = "products/producto-small-267x-20y-350x350px.webp";

/** Bebidas en las que el cliente elige el tipo de leche. */
const WITH_MILK: ItemOptions = { milk: true };
/** Bebidas con agua o con leche fija (milkshakes): no se elige leche. */
const NO_MILK: ItemOptions = { milk: false };

const oz20 = (price: number): Size[] => [{ oz: 20, price, previousPrice: 7 }];
const oz16 = (price: number): Size[] => [{ oz: 16, price }];

/** Producto de la lista de una categoría; `badges` es opcional. */
type Listed = { name: string; image: string; badges?: BadgeId[] };

const mini10y20: Size[] = [
  { oz: 10, price: 5, label: "Mini" },
  { oz: 20, price: 7 },
];

const cafeLattes: Listed[] = [
  {
    name: "Vanilla latte",
    image: "products/vainilla_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Rompope latte",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Biscoff latte",
    image: "products/biscoff_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Caramel latte",
    image: "products/caramel_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Nutella latte",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Banana latte",
    image: "products/banana_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Banana Biscoff latte",
    image: "products/banana_biscoff_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Mazapán latte",
    image: "products/mazapan_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Cookies & cream latte",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Ferrero Rocher latte",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Duvalín latte",
    image: "products/duvalin_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Pumpkin spice latte",
    image: "products/pumpkin_spice_latte_500x500px.webp",
    badges: ["nuevo", "temporada"],
  },
  {
    name: "Chips ahoy latte",
    image: "products/chips_ahoy_latte_500x500px.webp",
    badges: ["nuevo", "temporada"],
  },
];

const matchas: Listed[] = [
  {
    name: "Matcha latte",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Vanilla Matcha",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Double Matcha",
    image: "products/double_matcha_500x500px.webp",
    badges: [],
  },
  {
    name: "Banana Matcha",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Banana Biscoff Matcha",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Strawberry Matcha",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Blueberry Matcha",
    image: "products/blueberry_matcha_500x500px.webp",
    badges: [],
  },
  {
    name: "Lavander Matcha",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Cookies & cream Matcha",
    image: "products/cookies_cream_matcha_500x500px.webp",
    badges: [],
  },
];

const cerealLattes: {
  name: string;
  description: string;
  image: string;
  badges: BadgeId[];
}[] = [
  {
    name: "Marshmallow Cereal Latte",
    description: "Dulce, cremoso y lleno de nostalgia.",
    image: "products/producto-small-267x-20y-350x350px.webp",
    badges: [],
  },
  {
    name: "Cocoa Cereal Latte",
    description: "Intenso, chocolatoso y reconfortante.",
    image: "products/cocoa_cereal_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Cinnamon Toast Cereal Latte",
    description: "Suave, especiado y perfecto para ti.",
    image: "products/cinnamon_toast_cereal_latte_500x500px.webp",
    badges: [],
  },
  {
    name: "Fruity Pebbles Cereal Latte",
    description: "Divertido, afrutado y lleno de color.",
    image: "products/fruit_pebbles_latte_500x500px.webp",
    badges: [],
  },
];

const milkshakes: {
  name: string;
  description: string;
  image: string;
  badges: BadgeId[];
}[] = [
  {
    name: "Strawberry Milkshake",
    description: "",
    image: "",
    badges: [],
  },
  {
    name: "Chocolate Milkshake",
    description: "",
    image: "",
    badges: [],
  },
  {
    name: "Cookies & Cream Milkshake",
    description: "",
    image: "",
    badges: [],
  },
  {
    name: "Banana Milkshake",
    description: "",
    image: "",
    badges: [],
  },
  {
    name: "Nutella Milkshake",
    description: "",
    image: "",
    badges: [],
  },
  {
    name: "Biscoff Milkshake",
    description: "",
    image: "",
    badges: [],
  },
];

function slug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const menu: MenuItem[] = [
  ...cafeLattes.map<MenuItem>(({ name, image, badges }) => ({
    id: slug(name),
    name,
    badges,
    category: "cafe-lattes",
    emoji: "☕",
    image,
    sizes: oz20(6),
    options: WITH_MILK,
  })),
  ...matchas.map<MenuItem>(({ name, image, badges }) => ({
    id: slug(name),
    name,
    badges,
    category: "matcha",
    emoji: "🍵",
    image,
    sizes: oz20(7),
    options: WITH_MILK,
  })),
  ...cerealLattes.map<MenuItem>(({ name, description, image, badges }) => ({
    id: slug(name),
    name,
    description,
    badges,
    category: "cereal-lattes",
    emoji: "🥣",
    image,
    sizes: oz20(7),
    options: WITH_MILK,
  })),
  {
    id: "birthday-latte",
    name: "Birthday Latte",
    description: "Café cremoso con sabor a pastel de cumpleaños.",
    category: "birthday-lattes",
    emoji: "🎂",
    image: PHOTO,
    // Con el badge "promocion" se tacha `previousPrice` y se cobra `price`.
    sizes: [
      { oz: 10, price: 5, label: "Mini", previousPrice: 5 },
      { oz: 20, price: 7, previousPrice: 7 },
    ],
    options: WITH_MILK,
    badges: [],
  },
  {
    id: "birthday-matcha-drink",
    name: "Birthday Matcha",
    badges: [],
    description: "Matcha cremoso con sabor a pastel de cumpleaños.",
    category: "birthday-matcha",
    emoji: "🎉",
    image: PHOTO,
    sizes: mini10y20,
    options: WITH_MILK,
  },
  {
    id: "berry-smoothie",
    name: "Berry Smoothie",
    badges: [],
    description:
      "Frutos rojos y muy refrescante; se prepara con agua, sin leche.",
    category: "smoothies",
    emoji: "🍓",
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  },
  ...milkshakes.map<MenuItem>(({ name, description, badges }) => ({
    id: slug(name),
    name,
    badges,
    description,
    category: "kids",
    emoji: "🥤",
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
  })),
  {
    id: "dragon-fruit-lemonade",
    name: "Dragón Fruit Lemonade",
    description:
      "Limonada afrutada y muy refrescante; se prepara con agua, sin leche.",
    category: "refreshers",
    emoji: "🐉",
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
    badges: [],
  },
  {
    id: "lemonade",
    name: "Lemonade",
    description: "Limonada natural bien fría; se prepara con agua, sin leche.",
    category: "refreshers",
    emoji: "🍋",
    image: PHOTO,
    sizes: oz16(5),
    options: NO_MILK,
    badges: [],
  },
];
