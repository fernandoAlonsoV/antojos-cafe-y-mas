import { business } from '../config'

/** Hay entrega a domicilio sólo si el negocio cobra envío; si no, el pedido se recoge en persona. */
export const isDelivery = business.shippingCost > 0

export const pickupNote = `Entrega en persona: recoge tu pedido en ${business.pickupPlace}.`
