import { MainNav } from '@/components/MainNav'
import { InterestForm } from '@/components/interest-form'
import { CourseCard } from '@/components/course-card'
import { InstructorProfile } from '@/components/instructor-profile'
import { ScrollButton } from '@/components/scroll-button'
import Image from 'next/image'
import { Montserrat, Inter } from 'next/font/google'
import HeroSection from './hero-section'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

// Sample data for courses
const currentCourses = [
  {
    id: 1,
    title: "Encounter 101",
    description: "An introductory course to experience God's presence and understand the fundamentals of spiritual encounters. Learn how to recognize, cultivate, and respond to divine encounters in your daily life.",
    instructor: "Dr. Joshua Todd, Dr. Wayland Henderson, Tom Ledbetter, Ned Maraman",
    imageUrl: "/school-of-encounter/Encounter101.webp",
    isAvailable: true
  }
]

const upcomingCourses = [
  {
    id: 1,
    title: "Priesthood of the Believers: Melchizedek",
    description: "This course will dive deeper into kingly priesthood of Melchizedek and the correlation to Jesus as the Lion and the Lamb and the transcend inheritance given to every believer.",
    instructor: "Dr. Wayland Henderson",
    imageUrl: "/school-of-encounter/Priesthood of the believers.webp",
    isAvailable: false
  },
  {
    id: 4,
    title: "Dream Intelligence 1",
    description: "The School of Dream Intelligence is a faculty dedicated to helping you grow in understanding the dreams that God is giving to you and those around you.",
    instructor: "Tom Ledbetter",
    imageUrl: "/school-of-encounter/DREAM INTELLIGENCE 1.webp",
    isAvailable: false
  },
  {
    id: 2,
    title: "The Glory of the New Testament Church",
    description: "This compares the glory of the old covenant seen through Moses and the glory of New Covenant that far exceeds the old. We would go deeper into the apostolic glory as Paul explains it in his letters to the Corinthians.",
    instructor: "Dr. Wayland Henderson",
    imageUrl: "/school-of-encounter/The Glory of the new Testament Church.webp",
    isAvailable: false
  },
  {
    id: 5,
    title: "Healing Streams",
    description: "Healing Streams International is a powerful ministry expression that supports believers through the training and equipping of Kingdom principles and the removal of spiritual root systems.",
    instructor: "Dr. Joshua Todd",
    imageUrl: "/school-of-encounter/Healing Streams.webp",
    isAvailable: false
  },
  {
    id: 3,
    title: "Jesus & The Ekklesia: Made In His Image",
    description: "This course would explore what does Scripture really say about New Creation and the apostolic call of the Ekklesia made in the image of Jesus The Apostle.",
    instructor: "Dr. Wayland Henderson",
    imageUrl: "/school-of-encounter/Jesus and The Ekklesia.webp",
    isAvailable: false
  }
]

// Sample data for instructors
const instructors = [
  {
    id: 1,
    name: "Dr. Joshua Todd",
    title: "Founder",
    imageUrl: "/drJosh/DrjoshSmiling.jpg"
  },
  {
    id: 2,
    name: "Dr. Wayland Henderson",
    title: "Head of Theology",
    imageUrl: "/school-of-encounter/Dr Way.webp"
  },
  {
    id: 3,
    name: "Tom Ledbetter",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Tom Ledbetter.webp"
  },
  {
    id: 4,
    name: "Ned Maraman",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Ned Maraman.webp"
  },
  {
    id: 5,
    name: "Angie Dorman",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Angie Dorman.webp"
  },
  {
    id: 6,
    name: "Mike Brewer",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Mike Brewer.webp"
  },
  {
    id: 7,
    name: "Emma Smith",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Emma Smith.webp"
  },
  {
    id: 8,
    name: "Christine Sims Casten",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Christine Sims Casten.webp"
  },
  {
    id: 9,
    name: "Tammie Southerland",
    title: "Instructor",
    imageUrl: "/school-of-encounter/Tammie Southerland.webp"
  }
]

export default function SchoolOfEncounterPage() {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/600">
        <MainNav />
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold mb-6`}>
                About the School
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Welcome to the school of encounter, where we gather around the table to learn from spirit filled instructors and grow as a student body so that we will fulfill our purpose in the earth.
              </p>
            </div>
          </div>
        </section>

        {/* Current Courses */}
        <section className="py-20">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold mb-6`}>
                Currently Available Courses
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Start your journey with our foundational courses designed to introduce you to the School of Encounter.
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
              {currentCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  imageUrl={course.imageUrl}
                  isAvailable={course.isAvailable}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Courses */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold mb-6`}>
                Upcoming Courses
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Explore our upcoming courses designed to deepen your understanding and experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  imageUrl={course.imageUrl}
                  isAvailable={course.isAvailable}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section className="py-20">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold mb-6`}>
                Meet Our Instructors
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Learn from our experienced instructors who bring years of knowledge and practical experience.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {instructors.map((instructor, index) => (
                <InstructorProfile
                  key={instructor.id}
                  name={instructor.name}
                  title={instructor.title}
                  imageUrl={instructor.imageUrl}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interest Form Section */}
        <section id="interest-form" className="py-20 bg-indigo-50 dark:bg-gray-800">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold mb-6`}>
                Stay Updated
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Register your interest to be notified when new courses become available and to receive exclusive updates about the School of Encounter.
              </p>
            </div>
            
            <InterestForm />
          </div>
        </section>
      </main>
    </div>
  )
} 