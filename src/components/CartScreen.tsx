import { business } from '../config'
import { buildOrderMessage, formatPrice, whatsappUrl } from '../lib/whatsapp'
import type { CartLine, MenuItem } from '../types'
import { BackIcon, LeafIcon, TrashIcon, WhatsappIcon } from './Icons'
import { QuantityStepper } from './QuantityStepper'

interface Props {
  lines: CartLine[]
  subtotal: number
  shipping: number
  total: number
  onSetQuantity: (item: MenuItem, quantity: number) => void
  onRemove: (item: MenuItem) => void
  onBack: () => void
}

export function CartScreen({
  lines,
  subtotal,
  shipping,
  total,
  onSetQuantity,
  onRemove,
  onBack,
}: Props) {
  const isEmpty = lines.length === 0

  return (
    <div className="screen">
      <header className="topbar topbar--cart">
        <button type="button" className="topbar__icon" aria-label="Volver al menú" onClick={onBack}>
          <BackIcon className="icon" />
        </button>
        <div className="topbar__title">
          <h1>MI PEDIDO</h1>
          <div className="divider divider--small" aria-hidden="true">
            <span />
            <LeafIcon className="divider__leaf" />
            <span />
          </div>
        </div>
        <span className="topbar__icon" aria-hidden="true" />
      </header>

      {isEmpty ? (
        <p className="cart-empty">Tu pedido está vacío. ¡Agrega algún antojo! ♥</p>
      ) : (
        <ul className="cart-lines">
          {lines.map(({ item, quantity }) => (
            <li key={item.id} className="cart-line">
              <img className="cart-line__image" src={item.image} alt={item.name} />
              <div className="cart-line__body">
                <h2 className="cart-line__name">{item.name.toUpperCase()}</h2>
                <div className="cart-line__row">
                  <span className="cart-line__price">{formatPrice(item.price * quantity)}</span>
                  <QuantityStepper
                    label={item.name}
                    quantity={quantity}
                    onChange={(next) => onSetQuantity(item, next)}
                  />
                  <button
                    type="button"
                    className="cart-line__remove"
                    aria-label={`Eliminar ${item.name}`}
                    onClick={() => onRemove(item)}
                  >
                    <TrashIcon className="icon" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className="totals">
        <div className="totals__row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="totals__row">
          <span>Envío</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="totals__row totals__row--grand">
          <span>TOTAL</span>
          <span>{formatPrice(total)}</span>
        </div>
      </section>

      <a
        className={`button button--primary button--whatsapp${isEmpty ? ' button--disabled' : ''}`}
        href={isEmpty ? undefined : whatsappUrl(buildOrderMessage(lines, subtotal, shipping))}
        target="_blank"
        rel="noreferrer"
        aria-disabled={isEmpty}
      >
        <WhatsappIcon className="icon icon--whatsapp" />
        <span>
          <strong>ENVIAR PEDIDO POR WHATSAPP</strong>
          <small>Te llevaremos a WhatsApp con tu pedido listo</small>
        </span>
      </a>

      <button type="button" className="button button--ghost" onClick={onBack}>
        SEGUIR COMPRANDO
      </button>

      <p className="footer-note footer-note--soft">{business.tagline} ♥</p>
    </div>
  )
}
