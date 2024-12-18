import { ContactForm } from '@/components/contact-form'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form Section */}
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${montserrat.className}`}>
              Get in Touch
            </h2>
            <p className="text-white/80 mb-6 text-sm">
              Have questions or want to connect? Send us a message and we'll get back to you soon.
            </p>
            <ContactForm />
          </div>

          {/* Quick Links Section */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="#about" className="text-white/80 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-white/80 hover:text-white transition-colors">
                    Calendar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Ministry</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/healing-streams" className="text-white/80 hover:text-white transition-colors">
                    Healing Streams
                  </Link>
                </li>
                <li>
                  <Link href="/camp" className="text-white/80 hover:text-white transition-colors">
                    CAMP
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white/60 text-sm">
            <p>© {new Date().getFullYear()} Dr. Joshua Todd. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 