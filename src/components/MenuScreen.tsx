import { useState } from 'react'
import { business } from '../config'
import { categories, menu } from '../data/menu'
import { formatPrice } from '../lib/whatsapp'
import type { CategoryId, MenuItem } from '../types'
import {
  BagIcon,
  CakeIcon,
  ColdDrinkIcon,
  HeartIcon,
  HotDrinkIcon,
  LeafIcon,
  // MenuIcon,
} from './Icons'
import { QuantityStepper } from './QuantityStepper'

interface Props {
  quantities: Record<string, number>
  count: number
  subtotal: number
  onSetQuantity: (item: MenuItem, quantity: number) => void
  onOpenCart: () => void
}

const categoryIcons = {
  cold: ColdDrinkIcon,
  hot: HotDrinkIcon,
  cake: CakeIcon,
}

const features = [
  { icon: LeafIcon, title: 'Ingredientes', subtitle: 'de calidad' },
  { icon: HeartIcon, title: 'Hecho con', subtitle: 'amor' },
  { icon: HotDrinkIcon, title: 'Ideal para', subtitle: 'cualquier momento' },
  { icon: BagIcon, title: 'Empacado', subtitle: 'con cuidado' },
]

export function MenuScreen({ quantities, count, subtotal, onSetQuantity, onOpenCart }: Props) {
  const [active, setActive] = useState<CategoryId>('frias')
  const items = menu.filter((item) => item.category === active)

  return (
    <div className="screen">
      <header className="topbar">
        <button type="button" className="topbar__icon" aria-label="Menú">
          {/* <MenuIcon className="icon" /> */}
        </button>
        {/* logo */}
        <img className="topbar__logo" src="icons/logo.svg" alt={business.name} />
        <button
          type="button"
          className="topbar__icon topbar__cart"
          aria-label={`Ver mi pedido, ${count} productos`}
          onClick={onOpenCart}
        >
          <BagIcon className="icon" />
          {count > 0 ? <span className="badge">{count}</span> : null}
        </button>
      </header>
      {/* banner */}
      <div className="hero">
        <img src="products/banner-440x220px.webp" alt="Frappé de la casa" />
      </div>

      <section className="welcome">
        <p className="welcome__small">Bienvenido a</p>
        <h1 className="welcome__title">{business.name.toUpperCase()}</h1>
        <div className="divider" aria-hidden="true">
          <span />
          <LeafIcon className="divider__leaf" />
          <span />
        </div>
        <p className="welcome__tagline">{business.tagline}</p>
      </section>

      <h2 className="section-title">
        <span aria-hidden="true">≫</span> NUESTRO MENÚ <span aria-hidden="true">≪</span>
      </h2>

      <nav className="tabs" aria-label="Categorías">
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon]
          const isActive = category.id === active
          return (
            <button
              key={category.id}
              type="button"
              className={`tab${isActive ? ' tab--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActive(category.id)}
            >
              <Icon className="icon" />
              {category.label}
            </button>
          )
        })}
      </nav>

      <ul className="items">
        {items.map((item) => (
          <li key={item.id} className="item">
            <img className="item__image" src={item.image} alt={item.name} loading="lazy" />
            <div className="item__body">
              <div className="item__head">
                <h3 className="item__name">{item.name.toUpperCase()}</h3>
                <span className="item__price">{formatPrice(item.price)}</span>
              </div>
              <p className="item__description">{item.description}</p>
              <div className="item__actions">
                <QuantityStepper
                  label={item.name}
                  quantity={quantities[item.id] ?? 0}
                  onChange={(quantity) => onSetQuantity(item, quantity)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {count > 0 ? (
        <div className="cart-bar-space" aria-hidden="true" />
      ) : null}

      <ul className="features">
        {features.map((feature) => (
          <li key={feature.title} className="feature">
            <feature.icon className="icon" />
            <span>
              {feature.title}
              <br />
              {feature.subtitle}
            </span>
          </li>
        ))}
      </ul>

      <p className="footer-note">GRACIAS POR APOYAR LO LOCAL ♥</p>

      {count > 0 ? (
        <button type="button" className="cart-bar" onClick={onOpenCart}>
          <BagIcon className="icon" />
          <span className="cart-bar__label">VER MI PEDIDO</span>
          <span className="cart-bar__count">
            {count} {count === 1 ? 'producto' : 'productos'}
          </span>
          <span className="cart-bar__total">{formatPrice(subtotal)}</span>
        </button>
      ) : null}
    </div>
  )
}
