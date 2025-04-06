import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <Image src="/images/pi-circle-logo.svg" alt="PI Tutors Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white">PI Tutors</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Expert tutoring services to help students excel in mathematics and physics.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["Home", "About", "Services", "Tutors", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {[
                "KS3 Mathematics",
                "GCSE Mathematics",
                "A-Level Mathematics",
                "A-Level Physics",
                "One-on-One Tutoring",
                "Online Tutoring",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm text-gray-400 hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="text-sm text-gray-400">Rotherham & Birmingham</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="text-sm text-gray-400">722-337-879</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="text-sm text-gray-400">info@pitutors.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PI Tutors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

