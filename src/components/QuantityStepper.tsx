import { MinusIcon, PlusIcon } from './Icons'

interface Props {
  quantity: number
  onChange: (quantity: number) => void
  label: string
  /** Cantidad mínima alcanzable con el botón de menos (0 permite eliminar). */
  minimum?: number
}

export function QuantityStepper({ quantity, onChange, label, minimum = 0 }: Props) {
  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper__button"
        aria-label={`Quitar uno de ${label}`}
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= minimum}
      >
        <MinusIcon className="icon" />
      </button>
      <span className="stepper__value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="stepper__button"
        aria-label={`Agregar uno de ${label}`}
        onClick={() => onChange(quantity + 1)}
      >
        <PlusIcon className="icon" />
      </button>
    </div>
  )
}
