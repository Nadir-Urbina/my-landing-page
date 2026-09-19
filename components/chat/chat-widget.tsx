'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * Routes the LeadConnector chat widget must not appear on.
 *
 * /school-of-encounter is excluded for A2P 10DLC compliance: its interest
 * form collects a phone number, and the campaign registration attests that
 * no phone-collecting form shares a page with the widget. The other two are
 * internal tools.
 */
const ROUTES_WITHOUT_CHAT = ['/school-of-encounter', '/studio', '/camp-admin']

/** Funnel pages with a mobile sticky CTA the bubble would otherwise cover */
const ROUTES_WITH_STICKY_CTA = ['/camp', '/shepherds7']

const WIDGET_ID = '6aae64f608a179ce38555784'

export function ChatWidget() {
  const pathname = usePathname()
  const isHidden = ROUTES_WITHOUT_CHAT.some((route) => pathname?.startsWith(route))
  const needsOffset = ROUTES_WITH_STICKY_CTA.some((route) => pathname?.startsWith(route))

  // Once the widget script runs it injects DOM that survives client-side
  // navigation, so unmounting <Script> alone will not remove it. These body
  // flags drive CSS in globals.css that hides or repositions it per route.
  useEffect(() => {
    document.body.dataset.chatHidden = isHidden ? 'true' : 'false'
    document.body.dataset.chatOffset = needsOffset ? 'true' : 'false'
  }, [isHidden, needsOffset])

  if (isHidden) return null

  return (
    <Script
      id="leadconnector-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={WIDGET_ID}
      data-source="WEB_USER"
      // afterInteractive, not lazyOnload: the bubble needs to appear promptly
      // for carrier review rather than waiting on the window load event
      strategy="afterInteractive"
    />
  )
}
