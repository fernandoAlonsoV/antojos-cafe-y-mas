import { business } from '../config'
import { pickupNote, isDelivery } from '../lib/delivery'
import { customizationSummary, formatPrice, groupByCategory, sizeLabel } from '../lib/whatsapp'
import type { CartLine } from '../types'
import { BackIcon, LeafIcon, TrashIcon } from './Icons'
import { OrderTotals } from './OrderTotals'
import { QuantityStepper } from './QuantityStepper'

interface Props {
  lines: CartLine[]
  subtotal: number
  shipping: number
  total: number
  onSetQuantity: (key: string, quantity: number) => void
  onRemove: (key: string) => void
  onBack: () => void
  onContinue: () => void
}

export function CartScreen({
  lines,
  subtotal,
  shipping,
  total,
  onSetQuantity,
  onRemove,
  onBack,
  onContinue,
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
        groupByCategory(lines).map(({ category, lines: group }) => (
          <section key={category.id} className="cart-group">
            <h2 className="cart-group__title">{category.label.toUpperCase()}</h2>
            <ul className="cart-lines">
              {group.map(({ key, item, size, customization, quantity }) => (
                <li key={key} className="cart-line">
                  <img className="cart-line__image" src={item.image} alt={item.name} />
                  <div className="cart-line__body">
                    <h3 className="cart-line__name">{item.name.toUpperCase()}</h3>
                    <p className="cart-line__size">
                      {[sizeLabel(size), ...customizationSummary(item, customization)].join(' · ')}
                    </p>
                    {customization.notes ? (
                      <p className="cart-line__notes">Nota: {customization.notes}</p>
                    ) : null}
                    <div className="cart-line__row">
                      <span className="cart-line__price">
                        {formatPrice(size.price * quantity)}
                      </span>
                      <QuantityStepper
                        label={`${item.name} ${sizeLabel(size)}`}
                        quantity={quantity}
                        onChange={(next) => onSetQuantity(key, next)}
                      />
                      <button
                        type="button"
                        className="cart-line__remove"
                        aria-label={`Eliminar ${item.name} ${sizeLabel(size)}`}
                        onClick={() => onRemove(key)}
                      >
                        <TrashIcon className="icon" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      {!isEmpty && !isDelivery ? <p className="pickup-note">{pickupNote}</p> : null}

      <OrderTotals subtotal={subtotal} shipping={shipping} total={total} />

      <button
        type="button"
        className={`button button--primary${isEmpty ? ' button--disabled' : ''}`}
        disabled={isEmpty}
        onClick={onContinue}
      >
        <strong>CONTINUAR CON MIS DATOS</strong>
      </button>

      <button type="button" className="button button--ghost" onClick={onBack}>
        SEGUIR COMPRANDO
      </button>

      <p className="footer-note footer-note--soft">{business.tagline} ♥</p>
    </div>
  )
}
