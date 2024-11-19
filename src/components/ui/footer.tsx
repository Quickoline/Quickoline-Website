import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Quickoline
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/privacy" className="text-gray-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-primary">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </div>
        <p className="text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer