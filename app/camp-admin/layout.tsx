import { MainNav } from '@/components/MainNav'

export default function CampAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {children}
      </main>
      {/* No footer for admin pages */}
    </div>
  )
}