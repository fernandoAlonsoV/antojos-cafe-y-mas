import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISSED_KEY = 'antojos-install-dismissed'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHint, setShowIosHint] = useState(false)

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISSED_KEY) === '1') return

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    if (isIos()) setShowIosHint(true)

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1')
    setDeferred(null)
    setShowIosHint(false)
  }

  if (!deferred && !showIosHint) return null

  return (
    <div className="install-prompt" role="dialog" aria-label="Instalar aplicación">
      <div className="install-prompt__text">
        <strong>Agrega la app a tu pantalla de inicio</strong>
        <span>
          {deferred
            ? 'Ábrela como una app, sin descargar nada.'
            : 'Toca Compartir y luego “Agregar a inicio”.'}
        </span>
      </div>
      {deferred ? (
        <button
          type="button"
          className="button button--primary install-prompt__cta"
          onClick={async () => {
            await deferred.prompt()
            await deferred.userChoice
            dismiss()
          }}
        >
          Instalar
        </button>
      ) : null}
      <button type="button" className="install-prompt__close" aria-label="Cerrar" onClick={dismiss}>
        ×
      </button>
    </div>
  )
}
