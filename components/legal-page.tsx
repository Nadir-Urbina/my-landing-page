import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 bg-white">
      <div className="container max-w-3xl py-16 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <h1 className={`mt-8 text-4xl font-bold text-gray-900 ${montserrat.className}`}>{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <div
          className="mt-10
            [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900
            [&>h3]:mt-8 [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-gray-900
            [&>p]:mt-4 [&>p]:leading-relaxed [&>p]:text-gray-700
            [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6
            [&_li]:leading-relaxed [&_li]:text-gray-700
            [&_a]:text-blue-600 [&_a]:underline"
        >
          {children}
        </div>
      </div>
    </main>
  )
}
