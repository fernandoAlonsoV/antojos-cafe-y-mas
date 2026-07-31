import { useEffect, useState } from 'react'
import { CartScreen } from './components/CartScreen'
import { CheckoutScreen } from './components/CheckoutScreen'
import { InstallPrompt } from './components/InstallPrompt'
import { MenuScreen } from './components/MenuScreen'
import { useCart } from './hooks/useCart'
import { useCustomer } from './hooks/useCustomer'
import './App.css'

type Screen = 'menu' | 'cart' | 'checkout'

export default function App() {
  const cart = useCart()
  const { customer, setCustomer } = useCustomer()
  const [screen, setScreen] = useState<Screen>('menu')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  const screens = {
    menu: (
      <MenuScreen
        count={cart.count}
        subtotal={cart.subtotal}
        onAdd={cart.add}
        onOpenCart={() => setScreen('cart')}
      />
    ),
    cart: (
      <CartScreen
        lines={cart.lines}
        subtotal={cart.subtotal}
        shipping={cart.shipping}
        total={cart.total}
        onSetQuantity={cart.setQuantity}
        onRemove={cart.remove}
        onBack={() => setScreen('menu')}
        onContinue={() => setScreen('checkout')}
      />
    ),
    checkout: (
      <CheckoutScreen
        lines={cart.lines}
        subtotal={cart.subtotal}
        shipping={cart.shipping}
        total={cart.total}
        customer={customer}
        onChangeCustomer={setCustomer}
        onBack={() => setScreen('cart')}
      />
    ),
  }

  return (
    <div className="app">
      {screens[screen]}
      <InstallPrompt />
    </div>
  )
}
