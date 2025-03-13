'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface InstructorProfileProps {
  name: string
  title: string
  imageUrl: string
  index: number
}

export function InstructorProfile({ name, title, imageUrl, index }: InstructorProfileProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-gray-200 to-indigo-100 flex items-center justify-center">
              <div className="text-indigo-800 font-medium">{name.charAt(0)}</div>
            </div>
          )}
        </div>
        <CardContent className="text-center p-4">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
} 