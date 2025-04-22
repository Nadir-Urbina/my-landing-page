'use client'

import { track } from '@vercel/analytics'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

type TrackableLinkProps = {
  href: string;
  eventName: string;
  eventProps: Record<string, any>;
  children: React.ReactNode;
  className?: string;
}

export function TrackableLink({ 
  href, 
  eventName, 
  eventProps, 
  children, 
  className 
}: TrackableLinkProps) {
  return (
    <Button 
      className={className} 
      asChild
      onClick={() => {
        track(eventName, eventProps);
      }}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
} 