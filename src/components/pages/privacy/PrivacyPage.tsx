"use client"

import { useState } from "react"
import { Navigation } from "../../Navigation"
import { X } from "lucide-react"

export default function PrivacyPolicy () {
  const [bannerVisible, setBannerVisible] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Promotional Banner */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 text-center text-sm relative">
          <span>⚡ Limited Time Offer: Token creation is now FREE! Don't miss out on launching your project.</span>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
            <p className="text-muted-foreground mb-4">
              This Privacy Policy describes how Genisys ("we," "us," or "the Platform") handles information in relation
              to your use of our demonstration platform. By using our platform, you consent to the practices described
              in this policy.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>IMPORTANT:</strong> Genisys is a demonstration platform only and does not provide actual token
                launching services. No real blockchain transactions occur through this platform.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information Collection</h2>
            <p className="text-muted-foreground mb-4">
              Since Genisys operates as a client-side demonstration application, we generally do not collect, store, or
              process personal information on our servers. However, certain technical information may be collected:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Browser type and version</li>
              <li>Device information and screen resolution</li>
              <li>IP address and general location data</li>
              <li>Usage patterns and interaction data</li>
              <li>Technical logs for debugging and security purposes</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Local Storage</h2>
            <p className="text-muted-foreground mb-4">
              Our platform may store data locally in your browser for demonstration purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Simulated token data and configurations</li>
              <li>User interface preferences and settings</li>
              <li>Session data for demonstration continuity</li>
              <li>Temporary files and cached resources</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This data remains on your device and is not transmitted to our servers. You can clear this data at any
              time through your browser settings.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. No Real Blockchain Interactions</h2>
            <p className="text-muted-foreground mb-4">
              It is crucial to understand that Genisys does not interact with any real blockchain networks. All
              displayed addresses, transactions, and token data are simulated for demonstration purposes only.
            </p>
            <p className="text-muted-foreground">
              We do not access, store, or transmit any real wallet information, private keys, or blockchain data.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              Our platform may utilize third-party services for analytics, performance monitoring, or functionality
              enhancement:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Web analytics services (Google Analytics, etc.)</li>
              <li>Content delivery networks (CDNs)</li>
              <li>Error tracking and monitoring services</li>
              <li>Performance optimization tools</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              These services have their own privacy policies, and we encourage you to review them. We are not
              responsible for the privacy practices of third-party services.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Security Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              While we implement reasonable security measures, we cannot guarantee the security of any information.
              Since this is a demonstration platform with no real value or services, security risks are minimal.
            </p>
            <p className="text-muted-foreground">
              Users should never input real private keys, sensitive financial information, or personal data into this
              demonstration platform.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. No Responsibility for User Actions</h2>
            <p className="text-muted-foreground mb-4">We are not responsible for:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Any information you choose to input into the platform</li>
              <li>How you use or interpret the demonstration features</li>
              <li>Any decisions made based on platform interactions</li>
              <li>Data loss or corruption on your device</li>
              <li>Privacy breaches resulting from your own actions</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our platform is not intended for children under 18 years of age. We do not knowingly collect information
              from children. If we become aware that a child has provided us with information, we will take steps to
              delete such information.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. International Users</h2>
            <p className="text-muted-foreground">
              If you are accessing our platform from outside our primary jurisdiction, you acknowledge that your
              information may be transferred, stored, and processed in different countries with varying privacy laws.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this Privacy Policy at any time without prior notice. Changes will be
              posted on this page with an updated effective date. Your continued use constitutes acceptance of any
              changes.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about this Privacy Policy, you may contact us through our official channels. We reserve the
              right to not respond to inquiries at our sole discretion.
            </p>
          </section>

          {/* Demonstration Platform Notice */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2">🔒 Demonstration Platform Notice</h3>
                <p className="text-sm text-muted-foreground">
                  Remember: This is a demonstration platform only. Do not input real sensitive information, and
                  understand that no actual services are provided. We are not liable for any consequences of your
                  platform usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
