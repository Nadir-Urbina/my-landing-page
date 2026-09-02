'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

// Static map so Tailwind's JIT scanner sees the literal class names
const clampClasses: Record<number, string> = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

export interface ClampedTextDialogProps {
  /** 'quote' centers the content for testimonials; 'article' left-aligns it with a banner image */
  variant?: 'quote' | 'article'
  title: string
  subtitle?: string
  imageUrl?: string
  badge?: ReactNode
  /** Extra rows (dates, location, cost) rendered under the title */
  meta?: ReactNode
}

interface ClampedTextProps {
  text: string
  lines?: 2 | 3 | 4 | 5 | 6
  className?: string
  italic?: boolean
  triggerLabel?: string
  dialog: ClampedTextDialogProps
}

/**
 * Clamps text to a fixed number of lines and reveals the full copy in a dialog.
 * The trigger only renders when the text actually overflows, so card heights
 * stay predictable and the carousel never reflows while you read.
 */
export function ClampedText({
  text,
  lines = 4,
  className,
  italic = false,
  triggerLabel = 'Read more',
  dialog,
}: ClampedTextProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const checkTruncation = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight + 1)
    }

    checkTruncation()

    const observer = new ResizeObserver(checkTruncation)
    observer.observe(element)
    return () => observer.disconnect()
  }, [text, lines])

  const isQuote = dialog.variant === 'quote'

  return (
    <>
      <div className={cn('flex min-h-0 flex-col', className)}>
        <p
          ref={textRef}
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            italic && 'italic',
            clampClasses[lines]
          )}
        >
          {text}
        </p>

        {isTruncated && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn(
              'pt-3 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700',
              isQuote ? 'mt-auto' : 'self-start'
            )}
          >
            {triggerLabel}
          </button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <div className={cn('flex flex-col', isQuote && 'items-center text-center')}>
            {dialog.imageUrl && (
              isQuote ? (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                  <Image src={dialog.imageUrl} alt="" fill sizes="80px" className="object-cover" />
                </div>
              ) : (
                <div className="relative -mx-6 -mt-6 mb-4 h-48 shrink-0 overflow-hidden">
                  <Image
                    src={dialog.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              )
            )}

            {dialog.badge && <div className={cn(isQuote ? 'mt-4' : 'mb-2')}>{dialog.badge}</div>}

            <DialogTitle className={cn('text-xl', isQuote && 'mt-4')}>
              {dialog.title}
            </DialogTitle>

            {dialog.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{dialog.subtitle}</p>
            )}

            {dialog.meta && <div className="mt-3 space-y-2">{dialog.meta}</div>}

            {isQuote && <Quote className="mt-4 h-6 w-6 text-blue-500/40" />}

            <DialogDescription
              className={cn(
                'mt-3 whitespace-pre-line text-base leading-relaxed',
                italic && 'italic'
              )}
            >
              {text}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
