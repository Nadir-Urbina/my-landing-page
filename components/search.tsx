'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'

interface SearchProps {
  onSearch: (query: string) => void
}

export function Search({ onSearch }: SearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search posts..."
        className="pl-10 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
} 