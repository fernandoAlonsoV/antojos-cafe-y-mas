# Antojos, Café y Más — PWA de pedidos

Menú digital instalable (PWA) pensado para abrirse desde un código QR: se ve y se comporta como una app
nativa (pantalla completa, icono en la pantalla de inicio, funciona sin conexión) **sin pasar por ninguna
tienda de aplicaciones**.

Flujo: el cliente escanea el QR → elige productos y tamaño (10/16/20 oz) → revisa su pedido → llena sus
datos (nombre, teléfono, dirección y notas) → el botón **Enviar pedido por WhatsApp** abre WhatsApp con el
mensaje del pedido ya redactado, incluyendo tamaños, totales y los datos del cliente.

El menú tiene 8 categorías: Café Lattes, Matcha, Cereal Lattes, Birthday Lattes, Birthday Matcha,
Smoothie, Kids Menú y Refreshers.

## Requisitos

- Node.js >= 22.12 (hay un `.nvmrc`: `nvm use`)

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
npm run preview  # sirve dist/ localmente
npm run lint     # oxlint
npm run assets   # regenera los iconos PNG de la PWA a partir de public/icons/logo.svg
```

## Personalizar

| Qué | Dónde |
| --- | --- |
| Número de WhatsApp, nombre, costo de envío | `src/config.ts` |
| Productos, descripciones, categorías, tamaños y precios por tamaño | `src/data/menu.ts` |
| Fotos de producto | `public/products/` (agrega tus `.webp`/`.jpg` y ajusta `image` en `src/data/menu.ts`) |
| Logo e iconos de la app | `public/icons/` |
| Colores y tipografía | variables CSS en `src/index.css` |

> Las fotos de producto son **placeholders** (todas usan la misma imagen) y deben sustituirse por las
> reales. El número de WhatsApp va en formato internacional, sólo dígitos (ej. `5215512345678`).

Cada producto define sus tamaños en `sizes`, con el precio de cada uno:

```ts
{ id: 'birthday-latte', name: 'Birthday Latte', sizes: [{ oz: 10, price: 5, label: 'Mini' }, { oz: 20, price: 7 }] }
```

El carrito guarda una línea por producto + tamaño (clave `id|oz`) en `localStorage`, y los datos del
cliente se recuerdan para el siguiente pedido.

## Publicar y generar el QR

1. `npm run build` genera `dist/`, que es un sitio estático (sirve en Netlify, Vercel, GitHub Pages, etc.).
2. La PWA requiere **HTTPS** para poder instalarse.
3. Genera un QR que apunte a la URL pública y ponlo en el local; al abrirlo, el teléfono ofrecerá
   agregar la app a la pantalla de inicio (en iOS: Compartir → "Agregar a inicio").
