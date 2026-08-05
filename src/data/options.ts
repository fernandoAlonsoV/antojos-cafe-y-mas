import type { Customization, ItemOptions, MilkId } from "../types";

export const milks: { id: MilkId; label: string }[] = [
  { id: "entera", label: "Entera" },
  // { id: "deslactosada", label: "Deslactosada" },
  // { id: "avena", label: "Avena" },
  { id: "almendra", label: "Almendra" },
  // { id: "soya", label: "Soya" },
];

export const NOTES_MAX_LENGTH = 100;

/** Escala del grado de endulzamiento (en porcentaje). */
export const SWEETNESS_MIN = 0;
export const SWEETNESS_MAX = 100;
export const SWEETNESS_STEP = 25;
export const SWEETNESS_DEFAULT = 50;

export function milkLabel(id: MilkId): string {
  return milks.find((option) => option.id === id)?.label ?? id;
}

/** Descripción del grado de endulzamiento para el pedido. */
export function sweetnessLabel(value: number): string {
  if (value <= 0) return "Sin endulzar";
  return `Dulzor ${value}%`;
}

export function defaultCustomization(options: ItemOptions): Customization {
  return {
    sweetness: SWEETNESS_DEFAULT,
    milk: options.milk ? milks[0].id : null,
    notes: "",
  };
}

/** textarea personalizar producto "notas adicionales" **/

export const TEXTAREA_PLACEHOLDER_PRODUCT =
  "Ej. Sin popote, más servilletas, vaso extra, leche aparte, poco hielo...";

/** textarea personalizar producto "notas adicionales" **/

export const TEXTAREA_PLACEHOLDER_CHECKOUT =
  "Ej. Paso en 30 min, ¿Podrían confirmar la hora?, mi hijo Juan recogerá el pedido, etc";
