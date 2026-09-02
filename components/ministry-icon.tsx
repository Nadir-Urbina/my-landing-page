import {
  BookOpen,
  Church,
  CircleUserRound,
  Crown,
  Gift,
  Globe,
  Heart,
  Sparkles,
  Star,
  Tent,
  Users,
  Zap,
} from 'lucide-react'

// Mirrors the icon list in schemas/ministry.ts
const iconMap = {
  CircleUserRound,
  Heart,
  Crown,
  BookOpen,
  Tent,
  Gift,
  Star,
  Globe,
  Users,
  Sparkles,
  Zap,
  Church,
} as const

export function MinistryIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? CircleUserRound
  return <Icon className={className} />
}
