import { useEffect, useState } from 'react'
import type { CustomerInfo } from '../types'

const STORAGE_KEY = 'antojos-customer-v1'

const empty: CustomerInfo = { name: '', phone: '', address: '', notes: '' }

function readStoredCustomer(): CustomerInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return empty
    const stored = parsed as Partial<Record<keyof CustomerInfo, unknown>>
    return {
      name: typeof stored.name === 'string' ? stored.name : '',
      phone: typeof stored.phone === 'string' ? stored.phone : '',
      address: typeof stored.address === 'string' ? stored.address : '',
      notes: typeof stored.notes === 'string' ? stored.notes : '',
    }
  } catch {
    return empty
  }
}

/** Guarda los datos del cliente para no volver a escribirlos en el siguiente pedido. */
export function useCustomer() {
  const [customer, setCustomer] = useState<CustomerInfo>(readStoredCustomer)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customer))
  }, [customer])

  return { customer, setCustomer }
}
