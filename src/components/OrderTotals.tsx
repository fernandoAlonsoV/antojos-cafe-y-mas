import { formatPrice } from '../lib/whatsapp'

interface Props {
  subtotal: number
  shipping: number
  total: number
}

export function OrderTotals({ subtotal, shipping, total }: Props) {
  return (
    <section className="totals">
      <div className="totals__row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {shipping > 0 ? (
        <div className="totals__row">
          <span>Envío</span>
          <span>{formatPrice(shipping)}</span>
        </div>
      ) : null}
      <div className="totals__row totals__row--grand">
        <span>TOTAL</span>
        <span>{formatPrice(total)}</span>
      </div>
    </section>
  )
}
