interface IconProps {
  className?: string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M5 8h14l-1.1 11.1a2 2 0 0 1-2 1.9H8.1a2 2 0 0 1-2-1.9Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  )
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 7h16M10 7V5h4v2M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M12 6v12M6 12h12" />
    </svg>
  )
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 12h12" />
    </svg>
  )
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.4 11.4 0 0 0 4.4 3.9c1.6.6 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.2-.2-.3-.5-.4Z" />
    </svg>
  )
}

export function HotDrinkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M5 10h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M9 4c.8 1 .8 2 0 3M13 4c.8 1 .8 2 0 3" />
    </svg>
  )
}

export function MatchaIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M7 9h10l-1.1 10.2a2 2 0 0 1-2 1.8h-3.8a2 2 0 0 1-2-1.8Z" />
      <path d="M6 9h12" />
      <path d="M12 7c-2.2 0-3.4-1.4-3.4-3.4C10.8 3.6 12 5 12 7Zm0 0c2.2 0 3.4-1.4 3.4-3.4C13.2 3.6 12 5 12 7Z" />
    </svg>
  )
}

export function CerealIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 11h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8Z" />
      <path d="M8.5 8.2a1.4 1.4 0 1 0 0-.1M12 6.6a1.4 1.4 0 1 0 0-.1M15.6 8.4a1.4 1.4 0 1 0 0-.1" />
    </svg>
  )
}

export function BirthdayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M5 20h14v-6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3Z" />
      <path d="M12 8V5M11 3.6c.7.5 1.3.5 2 0" />
      <path d="M5 15c1.6 1.4 3.2 1.4 4.7 0 1.6 1.4 3.1 1.4 4.7 0 1.5 1.4 3.1 1.4 4.6 0" />
    </svg>
  )
}

export function SmoothieIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M7 10h10l-1.1 9.2a2 2 0 0 1-2 1.8h-3.8a2 2 0 0 1-2-1.8Z" />
      <path d="M13 10l3-6" />
      <path d="M9.5 14.5a1.3 1.3 0 1 0 0-.1M13.8 16.6a1.3 1.3 0 1 0 0-.1" />
    </svg>
  )
}

export function MilkshakeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M8 11h8l-1 9.2a2 2 0 0 1-2 1.8h-2a2 2 0 0 1-2-1.8Z" />
      <path d="M8 11c0-2.8 1.8-4.4 4-4.4S16 8.2 16 11" />
      <path d="M12 6.6V4M14.5 11l2-5" />
    </svg>
  )
}

export function RefresherIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 8h12l-1.4 11.2a2 2 0 0 1-2 1.8h-5.2a2 2 0 0 1-2-1.8Z" />
      <path d="M5.6 8h12.8" />
      <path d="M15.5 4.5a3 3 0 0 1-3 3 3 3 0 0 1 3-3Z" />
    </svg>
  )
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 14-12 14H4Z" />
      <path d="M8 18c2-4 5-7 8-8" />
    </svg>
  )
}

export function SlidersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 8h4M12 8h8M4 16h10M18 16h2" />
      <circle cx="10" cy="8" r="2" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function CowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M7 9c-1.6 0-2.6-1-3-2.6C6 6 7.2 7 7.6 9M17 9c1.6 0 2.6-1 3-2.6C18 6 16.8 7 16.4 9" />
      <path d="M7 9h10v5a5 5 0 0 1-10 0Z" />
      <path d="M10 12.5h.01M14 12.5h.01M10.5 16.5h3" />
    </svg>
  )
}

export function BottleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M10 3h4v3l1.6 2.6A4 4 0 0 1 16 10.7V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8.3a4 4 0 0 1 .4-1.7L10 6Z" />
      <path d="M8 13h8" />
    </svg>
  )
}

export function OatIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M12 21V7" />
      <path d="M12 9c-2.4 0-3.6-1.4-3.6-3.6C10.8 5.4 12 6.8 12 9Zm0 0c2.4 0 3.6-1.4 3.6-3.6C13.2 5.4 12 6.8 12 9Z" />
      <path d="M12 14c-2.4 0-3.6-1.4-3.6-3.6C10.8 10.4 12 11.8 12 14Zm0 0c2.4 0 3.6-1.4 3.6-3.6C13.2 10.4 12 11.8 12 14Z" />
    </svg>
  )
}

export function AlmondIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M12 4c3.5 3 5 6.4 5 9.2A5 5 0 0 1 7 13.2C7 10.4 8.5 7 12 4Z" />
      <path d="M12 8v9" />
    </svg>
  )
}

export function SoyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 15a4 4 0 0 1 4-4h1a4 4 0 0 1 0 8h-1a4 4 0 0 1-4-4Z" />
      <path d="M13 9a4 4 0 0 1 4-4 4 4 0 0 1-4 4Z" />
      <path d="M9.5 15h.01M13 17h.01" />
    </svg>
  )
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
    </svg>
  )
}
