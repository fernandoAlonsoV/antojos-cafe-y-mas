import { useState } from 'react'
import type { ReactElement } from 'react'
import { business } from '../config'
import { badges, previousPrice } from '../data/badges'
import { categories, menu } from '../data/menu'
import { formatPrice } from '../lib/whatsapp'
import type { CategoryIcon, CategoryId, Customization, MenuItem, Size } from '../types'
import {
  BagIcon,
  BirthdayIcon,
  CerealIcon,
  HeartIcon,
  HotDrinkIcon,
  LeafIcon,
  MatchaIcon,
  MilkshakeIcon,
  RefresherIcon,
  SlidersIcon,
  SmoothieIcon,
} from './Icons'
import { CustomizeSheet } from './CustomizeSheet'

interface Props {
  count: number
  subtotal: number
  onAdd: (item: MenuItem, size: Size, customization: Customization, quantity: number) => void
  onOpenCart: () => void
}

const categoryIcons: Record<CategoryIcon, (props: { className?: string }) => ReactElement> = {
  coffee: HotDrinkIcon,
  matcha: MatchaIcon,
  cereal: CerealIcon,
  birthday: BirthdayIcon,
  smoothie: SmoothieIcon,
  milkshake: MilkshakeIcon,
  refresher: RefresherIcon,
}

const features = [
  { icon: LeafIcon, title: 'Ingredientes', subtitle: 'de calidad' },
  { icon: HeartIcon, title: 'Hecho con', subtitle: 'amor' },
  { icon: HotDrinkIcon, title: 'Ideal para', subtitle: 'cualquier momento' },
  { icon: BagIcon, title: 'Empacado', subtitle: 'con cuidado' },
]

export function MenuScreen({ count, subtotal, onAdd, onOpenCart }: Props) {
  const [active, setActive] = useState<CategoryId>('cafe-lattes')
  const [customizing, setCustomizing] = useState<MenuItem | null>(null)
  const category = categories.find((option) => option.id === active)
  const items = menu.filter((item) => item.category === active)

  return (
    <div className="screen">
      <header className="topbar">
        <button type="button" className="topbar__icon" aria-label="Menú" />
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
        <img src="products/banner-440x220px.webp" alt="Bebidas de la casa" />
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
        {categories.map((option) => {
          const Icon = categoryIcons[option.icon]
          const isActive = option.id === active
          return (
            <button
              key={option.id}
              type="button"
              className={`tab${isActive ? ' tab--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActive(option.id)}
            >
              <Icon className="icon" />
              {option.label}
            </button>
          )
        })}
      </nav>

      {category?.note ? <p className="category-note">{category.note}</p> : null}

      <ul className="items">
        {items.map((item) => {
          const cheapest = item.sizes.reduce((best, size) =>
            size.price < best.price ? size : best,
          )
          const before = previousPrice(item, cheapest)
          return (
            <li key={item.id} className="item">
              {item.badges?.length ? (
                <ul className="tags">
                  {item.badges.map((id) => (
                    <li key={id} className="tag" style={{ background: badges[id].color }}>
                      <span aria-hidden="true">{badges[id].emoji}</span> {badges[id].label}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="item__top">
                <img className="item__image" src={item.image} alt={item.name} loading="lazy" />
                <div className="item__body">
                  <h3 className="item__name">{item.name.toUpperCase()}</h3>
                  {item.description ? (
                    <p className="item__description">{item.description}</p>
                  ) : null}
                </div>
              </div>
              <div className="item__bottom">
                <span className="item__from">
                  Desde
                  <span className="item__prices">
                    <strong>{formatPrice(cheapest.price)}</strong>
                    {before !== null ? (
                      <s aria-label={`Antes ${formatPrice(before)}`}>{formatPrice(before)}</s>
                    ) : null}
                  </span>
                </span>
                <button
                  type="button"
                  className="item__customize"
                  onClick={() => setCustomizing(item)}
                >
                  <SlidersIcon className="icon" />
                  Personalizar
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {count > 0 ? <div className="cart-bar-space" aria-hidden="true" /> : null}

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

      <p className="footer-note">{business.payments.toUpperCase()} ♥</p>
      <p className="footer-note footer-note--soft">
        {business.location} · {business.instagram}
      </p>

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

      {customizing ? (
        <CustomizeSheet item={customizing} onSubmit={onAdd} onClose={() => setCustomizing(null)} />
      ) : null}
    </div>
  )
}
