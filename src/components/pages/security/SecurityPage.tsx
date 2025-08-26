"use client"

import { useState } from "react"
import { Navigation } from "../../Navigation"
import { X } from "lucide-react"

export default function Security () {
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
        <h1 className="text-4xl font-bold mb-8">Security</h1>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Platform Security Overview</h2>
            <p className="text-muted-foreground mb-4">
              Genisys is a demonstration platform that does not handle real cryptocurrency transactions, store sensitive
              data, or interact with actual blockchain networks. This inherently reduces many security risks associated
              with real DeFi platforms.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>CRITICAL:</strong> This platform provides no actual token launching services and performs no
                real blockchain operations. All interactions are simulated for demonstration purposes only.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. No Real Wallet Integration</h2>
            <p className="text-muted-foreground mb-4">Unlike real DeFi platforms, Genisys does NOT:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access or store your private keys or seed phrases</li>
              <li>Connect to real wallet software (Phantom, Solflare, etc.)</li>
              <li>Initiate actual blockchain transactions</li>
              <li>Handle real cryptocurrency or tokens</li>
              <li>Store wallet addresses or balances</li>
              <li>Interact with any mainnet or testnet networks</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              All wallet addresses and transaction signatures displayed are randomly generated for demonstration only.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security Limitations</h2>
            <p className="text-muted-foreground mb-4">
              While we implement basic security measures, users must understand our limitations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>We cannot guarantee complete security of demonstration data</li>
              <li>Local browser storage may be accessible to other applications</li>
              <li>Network communications may be intercepted</li>
              <li>The platform may contain undiscovered vulnerabilities</li>
              <li>Third-party services may have their own security risks</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Security Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              Users are 100% responsible for their own security when using this platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>NEVER input real private keys, seed phrases, or wallet credentials</li>
              <li>NEVER input real personal or financial information</li>
              <li>Be aware this is a demonstration and operating systems</li>
              <li>Use a secure browser and keep it updated to the latest value</li>
              <li>Understand that no security measures are guaranteed</li>
              <li>Verify the authenticity of the platform before use</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. No Smart Contract Security</h2>
            <p className="text-muted-foreground mb-4">
              Since Genisys does not deploy or interact with real smart contracts:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>No smart contract audits have been performed</li>
              <li>No real contract security measures exist</li>
              <li>All displayed contract transactions are simulated</li>
              <li>No actual funds or tokens are at risk</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Users should never assume any real smart contract security when using this platform.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Platform Vulnerability Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We acknowledge that this demonstration platform may contain security vulnerabilities:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Cross-site scripting (XSS) vulnerabilities</li>
              <li>Client-side injection attacks</li>
              <li>Data exposure through browser developer tools</li>
              <li>Potential for malicious code injection</li>
              <li>Insecure data transmission</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We make no guarantees about fixing discovered vulnerabilities and are not liable for any consequences.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Third-Party Security Risks</h2>
            <p className="text-muted-foreground mb-4">
              Our platform may use third-party services that introduce additional security risks:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>CDN providers may serve malicious content</li>
              <li>Analytics services may track user behavior</li>
              <li>External APIs may be compromised</li>
              <li>Third-party scripts may contain vulnerabilities</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We are not responsible for the security practices of third-party services.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. No Security Support</h2>
            <p className="text-muted-foreground mb-4">We provide no security support or guarantees:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>No incident response procedures</li>
              <li>No security monitoring or alerting</li>
              <li>No breach notification processes</li>
              <li>No recovery assistance for any issues</li>
              <li>No security updates or patches guaranteed</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Legal Protection</h2>
            <p className="text-muted-foreground mb-4">
              Users acknowledge and agree that the operators of Genisys are not liable for any security breaches, data
              loss, or consequences arising from platform usage. This includes but is not limited to unauthorized
              access, data theft, or malicious attacks.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Reporting Security Issues</h2>
            <p className="text-muted-foreground mb-4">
              While we appreciate security vulnerability reports, we make no commitment to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Respond to vulnerability reports</li>
              <li>Fix reported security issues</li>
              <li>Provide acknowledgment or rewards</li>
              <li>Maintain any coordinated disclosure process</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Users report vulnerabilities entirely at their own discretion and without expectation of response.
            </p>
          </section>

          {/* Critical Security Warning */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2">🔒 Critical Security Warning</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• This is a demonstration platform with minimal security measures.</li>
                  <li>• Never input real sensitive information of any kind.</li>
                  <li>• No real funds, tokens, or assets may be exposed or compromised.</li>
                  <li>• We provide no security guarantees or support whatsoever.</li>
                  <li>• Use entirely at your own risk.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
