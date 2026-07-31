# Antojos, Café y Más — PWA de pedidos

Menú digital instalable (PWA) pensado para abrirse desde un código QR: se ve y se comporta como una app
nativa (pantalla completa, icono en la pantalla de inicio, funciona sin conexión) **sin pasar por ninguna
tienda de aplicaciones**.

Flujo: el cliente escanea el QR → pulsa **Personalizar** en el producto → en el panel inferior elige
endulzado, endulzante, leche, tamaño (10/16/20 oz), notas y cantidad → revisa su pedido → llena sus datos
(nombre, teléfono, dirección y notas) → el botón **Enviar pedido por WhatsApp** abre WhatsApp con el
mensaje del pedido ya redactado, incluyendo personalización, tamaños, totales y los datos del cliente.

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
| Número de WhatsApp, nombre, costo de envío, punto de entrega en persona | `src/config.ts` |
| Productos, descripciones, categorías, tamaños, precios y qué se puede personalizar | `src/data/menu.ts` |
| Endulzantes, tipos de leche y límite de caracteres de las notas | `src/data/options.ts` |
| Fotos de producto | `public/products/` (agrega tus `.webp`/`.jpg` y ajusta `image` en `src/data/menu.ts`) |
| Logo e iconos de la app | `public/icons/` |
| Colores y tipografía | variables CSS en `src/index.css` |

> Las fotos de producto son **placeholders** (todas usan la misma imagen) y deben sustituirse por las
> reales. El número de WhatsApp va en formato internacional, sólo dígitos (ej. `5215512345678`).

Cada producto define sus tamaños en `sizes`, con el precio de cada uno:

```ts
{ id: 'birthday-latte', name: 'Birthday Latte', sizes: [{ oz: 10, price: 5, label: 'Mini' }, { oz: 20, price: 7 }] }
```

Y qué admite personalizar con `options` (lo que esté en `false` no aparece en el panel):

```ts
options: { sweetener: true, milk: false } // limonadas: endulzante sí, leche no
```

Si un producto tiene un solo tamaño, queda seleccionado por defecto y no se muestra el selector; el card
siempre indica “Desde” con el precio más bajo.

El carrito guarda una línea por producto + tamaño + personalización en `localStorage`, así que la misma
bebida con distinta leche o notas son líneas separadas; los datos del cliente se recuerdan para el
siguiente pedido.

## Entrega

Si `business.shippingCost` es `0` no hay envío a domicilio: el checkout oculta el campo **Dirección** y
muestra (en el pedido y en el mensaje de WhatsApp) que la entrega es en persona en
`business.pickupPlace`. Con un costo mayor a 0 vuelve a pedirse la dirección y se cobra el envío.

El pedido se agrupa por categorías tanto en la pantalla “Mi pedido” como en el mensaje de WhatsApp.

## Publicar y generar el QR

1. `npm run build` genera `dist/`, que es un sitio estático (sirve en Netlify, Vercel, GitHub Pages, etc.).
2. La PWA requiere **HTTPS** para poder instalarse.
3. Genera un QR que apunte a la URL pública y ponlo en el local; al abrirlo, el teléfono ofrecerá
   agregar la app a la pantalla de inicio (en iOS: Compartir → "Agregar a inicio").
