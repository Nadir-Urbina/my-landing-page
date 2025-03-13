'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"

interface CourseCardProps {
  title: string
  description: string
  instructor: string
  imageUrl?: string
  isAvailable?: boolean
  index: number
}

export function CourseCard({ 
  title, 
  description, 
  instructor, 
  imageUrl = "/placeholder-course.jpg", 
  isAvailable = false,
  index
}: CourseCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-60 md:h-64 w-full">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain bg-gray-100 dark:bg-gray-800"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center">
              <div className="text-indigo-800 font-medium">{title}</div>
            </div>
          )}
          {isAvailable && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
              Available Now
            </div>
          )}
          {!isAvailable && (
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
              Coming Soon
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="font-medium text-indigo-600 dark:text-indigo-400">
            {instructor}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
} 