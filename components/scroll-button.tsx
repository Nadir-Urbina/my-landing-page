'use client'

import { Button } from "@/components/ui/button"

interface ScrollButtonProps {
  targetId: string
}

export function ScrollButton({ targetId }: ScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Button 
      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg"
      onClick={handleClick}
    >
      Register Your Interest
    </Button>
  )
} 