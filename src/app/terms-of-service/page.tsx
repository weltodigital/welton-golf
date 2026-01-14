import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Welton Golf',
  description: 'Terms of Service for Welton Golf - Learn about the rules and regulations for using our golf applications and services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Welton Golf&apos;s website and golf applications (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access and use our golf applications for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>This license shall automatically terminate if you violate any of these restrictions</li>
                <li>You may not modify or copy the materials</li>
                <li>You may not use the materials for any commercial purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide consistent access to our golf applications, but cannot guarantee uninterrupted service availability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:weltongolf@weltodigital.com" className="text-green-600 hover:text-green-800">weltongolf@weltodigital.com</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}