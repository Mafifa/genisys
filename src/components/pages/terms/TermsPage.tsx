import { useState } from "react"
import { Navigation } from "../../Navigation"
import { X } from "lucide-react"

export default function TermsOfService () {
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
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Genisys ("the Platform"), you agree to be bound by these Terms of Service ("Terms").
              If you disagree with any part of these terms, then you may not access the Platform.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>CRITICAL NOTICE:</strong> Genisys is a demonstration platform only and does not provide actual
                token launching services. No real blockchain transactions occur through this platform.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Platform Purpose and Limitations</h2>
            <p className="text-muted-foreground mb-4">
              Genisys serves as a demonstration interface to showcase potential token creation workflows. The Platform
              does NOT:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Deploy actual tokens to any blockchain network</li>
              <li>Execute real cryptocurrency transactions</li>
              <li>Store or manage real digital assets</li>
              <li>Provide financial services of any kind</li>
              <li>Guarantee the functionality of any demonstrated features</li>
              <li>Offer investment advice or opportunities</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. No Warranties or Guarantees</h2>
            <p className="text-muted-foreground mb-4">
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE EXPRESSLY DISCLAIM ALL WARRANTIES,
              WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
              <li>ACCURACY, COMPLETENESS, OR RELIABILITY OF CONTENT</li>
              <li>CONTINUOUS AVAILABILITY OR ERROR-FREE OPERATION</li>
              <li>SECURITY OR PRIVACY PROTECTION</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              IN NO EVENT SHALL Genisys, ITS OPERATORS, DEVELOPERS, OR AFFILIATES BE LIABLE FOR ANY:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES</li>
              <li>DAMAGES RESULTING FROM YOUR USE OR INABILITY TO USE THE PLATFORM</li>
              <li>UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA</li>
              <li>STATEMENTS OR CONDUCT OF ANY THIRD PARTY</li>
              <li>ANY OTHER MATTER RELATING TO THE PLATFORM</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              THIS LIMITATION APPLIES REGARDLESS OF THE LEGAL THEORY ON WHICH THE CLAIM IS BASED.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities and Prohibited Uses</h2>
            <p className="text-muted-foreground mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Use the Platform for any actual financial transactions</li>
              <li>Input real private keys, seed phrases, or sensitive information</li>
              <li>Attempt to reverse engineer or exploit the Platform</li>
              <li>Use the Platform for illegal or unauthorized purposes</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with the Platform's operation or security</li>
              <li>Misrepresent the Platform's capabilities to others</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. No Obligation to Provide Services</h2>
            <p className="text-muted-foreground mb-4">We have NO OBLIGATION to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Maintain, update, or improve the Platform</li>
              <li>Provide customer support or technical assistance</li>
              <li>Preserve any data or content you input</li>
              <li>Ensure continuous availability of the Platform</li>
              <li>Implement any requested features or fixes</li>
              <li>Respond to inquiries or complaints</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Value and Payment Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              Any value, cryptocurrency, or payment sent to addresses displayed on the Platform is done entirely at your
              own risk and discretion. By sending any value, you acknowledge:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>You are making a irreversible gift with no expectation of return</li>
              <li>No services, products, or benefits are guaranteed in exchange</li>
              <li>All transactions are final and irreversible</li>
              <li>We assume no responsibility for funds sent to any address</li>
              <li>You understand this is a demonstration platform only</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of the Platform are owned by us or our licensors and are
              protected by copyright, trademark, and other intellectual property laws. You may not copy, modify,
              distribute, or create derivative works without permission.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless Genisys and its operators from any claims, damages, losses, or
              expenses arising from your use of the Platform or violation of these Terms.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your access immediately, without prior notice, for any reason, including
              breach of these Terms. Upon termination, your right to use the Platform ceases immediately.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time without notice. Changes are effective immediately
              upon posting. Your continued use constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to
              conflict of law principles. Any disputes shall be resolved in courts of competent jurisdiction.
            </p>
          </section>

          {/* Final Warning */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2">⚠️ Final Warning</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• This is a demonstration platform with no real services provided.</li>
                  <li>• We accept zero responsibility for any consequences of your usage.</li>
                  <li>• Any value sent to displayed addresses is sent entirely at your own risk and we will</li>
                  <li>• We provide no refunds, guarantees, or support whatsoever.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
