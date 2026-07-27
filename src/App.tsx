import { useEffect, useState } from 'react'
import { CartScreen } from './components/CartScreen'
import { InstallPrompt } from './components/InstallPrompt'
import { MenuScreen } from './components/MenuScreen'
import { useCart } from './hooks/useCart'
import './App.css'

type Screen = 'menu' | 'cart'

export default function App() {
  const cart = useCart()
  const [screen, setScreen] = useState<Screen>('menu')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  return (
    <div className="app">
      {screen === 'menu' ? (
        <MenuScreen
          quantities={cart.quantities}
          count={cart.count}
          subtotal={cart.subtotal}
          onSetQuantity={cart.setQuantity}
          onOpenCart={() => setScreen('cart')}
        />
      ) : (
        <CartScreen
          lines={cart.lines}
          subtotal={cart.subtotal}
          shipping={cart.shipping}
          total={cart.total}
          onSetQuantity={cart.setQuantity}
          onRemove={cart.remove}
          onBack={() => setScreen('menu')}
        />
      )}
      <InstallPrompt />
    </div>
  )
}
