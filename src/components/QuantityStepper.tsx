import { MinusIcon, PlusIcon } from './Icons'

interface Props {
  quantity: number
  onChange: (quantity: number) => void
  label: string
}

export function QuantityStepper({ quantity, onChange, label }: Props) {
  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper__button"
        aria-label={`Quitar uno de ${label}`}
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 0}
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
