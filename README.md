# Antojos, Café y Más — PWA de pedidos

Menú digital instalable (PWA) pensado para abrirse desde un código QR: se ve y se comporta como una app
nativa (pantalla completa, icono en la pantalla de inicio, funciona sin conexión) **sin pasar por ninguna
tienda de aplicaciones**.

Flujo: el cliente escanea el QR → elige productos → revisa su pedido → el botón **Enviar pedido por
WhatsApp** abre WhatsApp con el mensaje del pedido ya redactado.

## Requisitos

- Node.js >= 22.12 (hay un `.nvmrc`: `nvm use`)

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
npm run preview  # sirve dist/ localmente
npm run lint     # oxlint
npm run assets   # regenera ilustraciones e iconos placeholder
```

## Personalizar

| Qué | Dónde |
| --- | --- |
| Número de WhatsApp, nombre, costo de envío | `src/config.ts` |
| Productos, precios, categorías | `src/data/menu.ts` |
| Fotos de producto | `public/products/` (reemplaza los `.svg` por `.jpg`/`.webp` y ajusta `image` en `src/data/menu.ts`) |
| Logo e iconos de la app | `public/icons/` |
| Colores y tipografía | variables CSS en `src/index.css` |

> El número de WhatsApp, el logo y las imágenes incluidos son **placeholders** y deben sustituirse por los
> reales antes de publicar. El número va en formato internacional, sólo dígitos (ej. `5215512345678`).

## Publicar y generar el QR

1. `npm run build` genera `dist/`, que es un sitio estático (sirve en Netlify, Vercel, GitHub Pages, etc.).
2. La PWA requiere **HTTPS** para poder instalarse.
3. Genera un QR que apunte a la URL pública y ponlo en el local; al abrirlo, el teléfono ofrecerá
   agregar la app a la pantalla de inicio (en iOS: Compartir → "Agregar a inicio").
