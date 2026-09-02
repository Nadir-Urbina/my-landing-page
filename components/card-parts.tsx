import type { ReactNode } from 'react'

/** Month/day overlay badge shown on event and mission images */
export function CardDateBadge({ date }: { date?: string }) {
  if (!date) return null

  const parsed = new Date(date)

  return (
    <div className="absolute bottom-3 left-3 z-10 min-w-[48px] rounded-lg bg-black/60 px-3 py-2 text-center text-white backdrop-blur-sm">
      <div className="mb-1 text-[10px] font-semibold uppercase leading-none tracking-wider">
        {parsed.toLocaleDateString('en-US', { month: 'short' })}
      </div>
      <div className="text-2xl font-bold leading-none">
        {parsed.toLocaleDateString('en-US', { day: 'numeric' })}
      </div>
    </div>
  )
}

export function CardMetaRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      {text}
    </span>
  )
}
