import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  className?: string
}

export function Toast({ title, description, variant = "default", className }: ToastProps) {
  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 rounded-md border p-4 shadow-lg",
        variant === "default" ? "bg-white text-gray-900" : "bg-white text-red-600 border-red-500",
        className
      )}
    >
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm mt-1">{description}</div>}
    </div>
  )
} 