import { useState } from 'react'
import type { FormEvent } from 'react'
import { business } from '../config'
import { isDelivery, pickupNote } from '../lib/delivery'
import { buildOrderMessage, whatsappUrl } from '../lib/whatsapp'
import type { CartLine, CustomerInfo } from '../types'
import { BackIcon, LeafIcon, WhatsappIcon } from './Icons'
import { OrderTotals } from './OrderTotals'

interface Props {
  lines: CartLine[]
  subtotal: number
  shipping: number
  total: number
  customer: CustomerInfo
  onChangeCustomer: (customer: CustomerInfo) => void
  onBack: () => void
}

type Field = 'name' | 'phone' | 'address'

const labels: Record<Field, string> = {
  name: 'Nombre',
  phone: 'Teléfono',
  address: 'Dirección',
}

const fields: Field[] = isDelivery ? ['name', 'phone', 'address'] : ['name', 'phone']

function validate(customer: CustomerInfo): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (customer.name.trim().length < 2) errors.name = 'Escribe tu nombre completo.'
  if (customer.phone.replace(/\D/g, '').length < 10) errors.phone = 'Escribe 10 dígitos de tu teléfono.'
  if (isDelivery && customer.address.trim().length < 5) {
    errors.address = 'Escribe tu dirección de entrega.'
  }
  return errors
}

export function CheckoutScreen({
  lines,
  subtotal,
  shipping,
  total,
  customer,
  onChangeCustomer,
  onBack,
}: Props) {
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const errors = validate(customer)

  const showError = (field: Field) => (submitted || touched[field] ? errors[field] : undefined)

  const update = (field: keyof CustomerInfo, value: string) =>
    onChangeCustomer({ ...customer, [field]: value })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    const url = whatsappUrl(buildOrderMessage(lines, subtotal, shipping, customer))
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div className="screen">
      <header className="topbar topbar--cart">
        <button type="button" className="topbar__icon" aria-label="Volver a mi pedido" onClick={onBack}>
          <BackIcon className="icon" />
        </button>
        <div className="topbar__title">
          <h1>MIS DATOS</h1>
          <div className="divider divider--small" aria-hidden="true">
            <span />
            <LeafIcon className="divider__leaf" />
            <span />
          </div>
        </div>
        <span className="topbar__icon" aria-hidden="true" />
      </header>

      <p className="checkout-intro">
        Completa tus datos para terminar el pedido. Los enviaremos junto con tu orden por WhatsApp.
      </p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <label key={field} className="field">
            <span className="field__label">
              {labels[field]} <span aria-hidden="true">*</span>
            </span>
            <input
              className={`field__input${showError(field) ? ' field__input--error' : ''}`}
              name={field}
              type={field === 'phone' ? 'tel' : 'text'}
              inputMode={field === 'phone' ? 'tel' : undefined}
              autoComplete={
                field === 'name' ? 'name' : field === 'phone' ? 'tel' : 'street-address'
              }
              value={customer[field]}
              required
              aria-invalid={showError(field) ? true : undefined}
              onChange={(event) => update(field, event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, [field]: true }))}
            />
            {showError(field) ? <span className="field__error">{showError(field)}</span> : null}
          </label>
        ))}

        {isDelivery ? null : <p className="pickup-note">{pickupNote}</p>}

        <label className="field">
          <span className="field__label">¿Alguna nota adicional?</span>
          <textarea
            className="field__input field__input--area"
            name="notes"
            rows={3}
            placeholder="Sin azúcar, extra topping, hora de entrega…"
            value={customer.notes}
            onChange={(event) => update('notes', event.target.value)}
          />
        </label>

        <OrderTotals subtotal={subtotal} shipping={shipping} total={total} />

        <button type="submit" className="button button--primary button--whatsapp">
          <WhatsappIcon className="icon icon--whatsapp" />
          <span>
            <strong>ENVIAR PEDIDO POR WHATSAPP</strong>
            <small>Te llevaremos a WhatsApp con tu pedido listo</small>
          </span>
        </button>
      </form>

      <button type="button" className="button button--ghost" onClick={onBack}>
        VOLVER A MI PEDIDO
      </button>

      <p className="footer-note footer-note--soft">
        {business.payments} · {business.location}
      </p>
    </div>
  )
}
