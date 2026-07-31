import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { NOTES_MAX_LENGTH, defaultCustomization, milks, sweeteners } from '../data/options'
import { formatPrice, sizeLabel } from '../lib/whatsapp'
import type { Customization, MenuItem, MilkId, Size, SweetenerId } from '../types'
import {
  AlmondIcon,
  BanIcon,
  BottleIcon,
  CloseIcon,
  CowIcon,
  HoneyIcon,
  OatIcon,
  SoyIcon,
  SugarIcon,
  SyrupIcon,
} from './Icons'
import { QuantityStepper } from './QuantityStepper'

interface Props {
  item: MenuItem
  /** Valores de partida al editar una línea del carrito; si falta, se personaliza desde cero. */
  initial?: { size: Size; customization: Customization; quantity: number }
  submitLabel?: string
  onSubmit: (item: MenuItem, size: Size, customization: Customization, quantity: number) => void
  onClose: () => void
}

const sweetenerIcons: Record<SweetenerId, (props: { className?: string }) => ReactNode> = {
  'azucar-morena': SugarIcon,
  miel: HoneyIcon,
  syrups: SyrupIcon,
}

const milkIcons: Record<MilkId, (props: { className?: string }) => ReactNode> = {
  entera: CowIcon,
  deslactosada: BottleIcon,
  avena: OatIcon,
  almendra: AlmondIcon,
  soya: SoyIcon,
}

export function CustomizeSheet({
  item,
  initial,
  submitLabel = 'Agregar al pedido',
  onSubmit,
  onClose,
}: Props) {
  const [customization, setCustomization] = useState<Customization>(
    () => initial?.customization ?? defaultCustomization(item.options),
  )
  const [size, setSize] = useState<Size>(initial?.size ?? item.sizes[0])
  const [quantity, setQuantity] = useState(initial?.quantity ?? 1)
  const [dragOffset, setDragOffset] = useState(0)
  const dragStart = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  const estimated = size.price * quantity

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest('button')) return
    event.preventDefault()
    dragStart.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragStart.current === null) return
    setDragOffset(Math.max(0, event.clientY - dragStart.current))
  }

  const handlePointerUp = () => {
    if (dragStart.current === null) return
    dragStart.current = null
    if (dragOffset > 110) onClose()
    else setDragOffset(0)
  }

  return (
    <div className="sheet-overlay" role="presentation" onClick={onClose}>
      <section
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${initial ? 'Editar' : 'Personalizar'} ${item.name}`}
        onClick={(event) => event.stopPropagation()}
        style={
          dragOffset > 0
            ? { transform: `translateY(${dragOffset}px)`, transition: 'none' }
            : undefined
        }
      >
        <div
          className="sheet__grab"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span className="sheet__handle" aria-hidden="true" />
        </div>
        <header
          className="sheet__head"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <h2>{initial ? 'EDITAR' : 'PERSONALIZAR'}</h2>
          <button
            ref={closeRef}
            type="button"
            className="sheet__close"
            aria-label="Cerrar personalización"
            onClick={onClose}
          >
            <CloseIcon className="icon" />
          </button>
        </header>

        <div className="sheet__body">
          {item.options.sweetener ? (
            <>
              <fieldset className="group">
                <legend className="group__title">ENDULZADO</legend>
                <div className="chips chips--2">
                  <button
                    type="button"
                    className={`chip${customization.sweetened ? ' chip--active' : ''}`}
                    aria-pressed={customization.sweetened}
                    onClick={() =>
                      setCustomization((current) => ({
                        ...current,
                        sweetened: true,
                        sweetener: current.sweetener ?? sweeteners[0].id,
                      }))
                    }
                  >
                    <SugarIcon className="icon" />
                    Endulzado
                  </button>
                  <button
                    type="button"
                    className={`chip${customization.sweetened ? '' : ' chip--active'}`}
                    aria-pressed={!customization.sweetened}
                    onClick={() =>
                      setCustomization((current) => ({ ...current, sweetened: false }))
                    }
                  >
                    <BanIcon className="icon" />
                    Sin endulzar
                  </button>
                </div>
              </fieldset>

              {customization.sweetened ? (
                <fieldset className="group">
                  <legend className="group__title">TIPO DE ENDULZANTE</legend>
                  <div className="chips chips--3">
                    {sweeteners.map((option) => {
                      const Icon = sweetenerIcons[option.id]
                      const isActive = customization.sweetener === option.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`chip chip--stack${isActive ? ' chip--outlined' : ''}`}
                          aria-pressed={isActive}
                          onClick={() =>
                            setCustomization((current) => ({ ...current, sweetener: option.id }))
                          }
                        >
                          <Icon className="icon" />
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              ) : null}
            </>
          ) : null}

          {item.options.milk ? (
            <fieldset className="group">
              <legend className="group__title">TIPO DE LECHE</legend>
              <div className="milks">
                {milks.map((option) => {
                  const Icon = milkIcons[option.id]
                  const isActive = customization.milk === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`milk${isActive ? ' milk--active' : ''}`}
                      aria-pressed={isActive}
                      onClick={() => setCustomization((current) => ({ ...current, milk: option.id }))}
                    >
                      <span className="milk__circle">
                        <Icon className="icon" />
                      </span>
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : null}

          {item.sizes.length > 1 ? (
            <fieldset className="group">
              <legend className="group__title">TAMAÑO</legend>
              <div className="chips chips--2">
                {item.sizes.map((option) => (
                  <button
                    key={option.oz}
                    type="button"
                    className={`chip${option.oz === size.oz ? ' chip--active' : ''}`}
                    aria-pressed={option.oz === size.oz}
                    onClick={() => setSize(option)}
                  >
                    {option.oz} oz
                  </button>
                ))}
              </div>
            </fieldset>
          ) : (
            <p className="sheet__size">Tamaño: {sizeLabel(size)}</p>
          )}

          <label className="group">
            <span className="group__title">NOTAS ADICIONALES</span>
            <textarea
              className="field__input field__input--area"
              rows={3}
              maxLength={NOTES_MAX_LENGTH}
              placeholder="Escribe aquí..."
              value={customization.notes}
              onChange={(event) =>
                setCustomization((current) => ({ ...current, notes: event.target.value }))
              }
            />
            <span className="group__counter">
              {customization.notes.length}/{NOTES_MAX_LENGTH}
            </span>
          </label>

          <div className="sheet__summary">
            <div>
              <span className="group__title">CANTIDAD</span>
              <QuantityStepper
                label={`${item.name} ${sizeLabel(size)}`}
                quantity={quantity}
                minimum={1}
                onChange={setQuantity}
              />
            </div>
            <div className="sheet__estimate">
              <span className="group__title">PRECIO ESTIMADO</span>
              <strong>{formatPrice(estimated)}</strong>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="button button--sheet"
          onClick={() => {
            onSubmit(item, size, { ...customization, notes: customization.notes.trim() }, quantity)
            onClose()
          }}
        >
          {submitLabel} · <strong>{formatPrice(estimated)}</strong>
        </button>
      </section>
    </div>
  )
}
