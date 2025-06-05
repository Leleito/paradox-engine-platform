import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Eye, Users, Globe, Mail, Calendar } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-palette-light py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-palette-warm" />
            <h1 className="text-4xl font-bold text-palette-deepest">Privacy Policy</h1>
          </div>
          <p className="text-lg text-palette-dark">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-palette-medium mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-palette-deepest mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#information-collection" className="text-palette-warm hover:underline">Information We Collect</a>
            <a href="#information-use" className="text-palette-warm hover:underline">How We Use Information</a>
            <a href="#information-sharing" className="text-palette-warm hover:underline">Information Sharing</a>
            <a href="#data-security" className="text-palette-warm hover:underline">Data Security</a>
            <a href="#cookies" className="text-palette-warm hover:underline">Cookies & Tracking</a>
            <a href="#user-rights" className="text-palette-warm hover:underline">Your Rights</a>
            <a href="#children-privacy" className="text-palette-warm hover:underline">Children's Privacy</a>
            <a href="#contact" className="text-palette-warm hover:underline">Contact Us</a>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Information Collection */}
          <section id="information-collection" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Personal Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li><strong>Account Information:</strong> Name, email address, password when you create an account</li>
                  <li><strong>Subscription Information:</strong> Payment details, billing address for premium subscriptions</li>
                  <li><strong>Communication:</strong> Messages you send us, feedback, and support requests</li>
                  <li><strong>Content:</strong> Comments, reviews, and other content you submit</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li><strong>Usage Data:</strong> Pages visited, time spent, reading progress, features used</li>
                  <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
                  <li><strong>Location Data:</strong> General location based on IP address (country/region level)</li>
                  <li><strong>Analytics:</strong> Performance metrics to improve our services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Third-Party Information</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li><strong>OAuth Login:</strong> Profile information from Google if you choose to sign in with Google</li>
                  <li><strong>Payment Processors:</strong> Transaction data from M-Pesa, Stripe, and other payment providers</li>
                  <li><strong>Social Media:</strong> Publicly available information if you interact with our social media</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Use */}
          <section id="information-use" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Service Provision</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Provide access to book content and features</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important account and service updates</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Communication</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Send newsletter and content updates (with consent)</li>
                  <li>Respond to inquiries and feedback</li>
                  <li>Notify about new features or content</li>
                  <li>Send security alerts when necessary</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Improvement</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Personalize content recommendations</li>
                  <li>Develop new features and services</li>
                  <li>Conduct research and analytics</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Legal & Security</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Enforce our terms of service</li>
                  <li>Maintain security and integrity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section id="information-sharing" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Information Sharing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 font-medium">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">We may share information with:</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li><strong>Service Providers:</strong> Payment processors (M-Pesa, Stripe), email services (SendGrid), hosting providers</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Business Transfer:</strong> In case of merger, acquisition, or sale of assets (with notice)</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                  <li><strong>Safety:</strong> To protect rights, property, or safety of users or others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">International Transfers</h3>
                <p className="text-palette-dark">
                  Your information may be transferred to and processed in countries other than Kenya. 
                  We ensure appropriate safeguards are in place to protect your privacy rights.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section id="data-security" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Data Security</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Technical Safeguards</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Organizational Measures</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Limited access on need-to-know basis</li>
                  <li>Staff training on data protection</li>
                  <li>Incident response procedures</li>
                  <li>Regular backup and recovery testing</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Important:</strong> While we implement strong security measures, no system is 100% secure. 
                Please use strong passwords and keep your account credentials confidential.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Cookies & Tracking</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Types of Cookies We Use</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-palette-medium p-4 rounded-lg">
                    <h4 className="font-semibold text-palette-deepest">Essential Cookies</h4>
                    <p className="text-sm text-palette-dark mt-1">Required for basic site functionality, authentication, and security.</p>
                  </div>
                  <div className="border border-palette-medium p-4 rounded-lg">
                    <h4 className="font-semibold text-palette-deepest">Analytics Cookies</h4>
                    <p className="text-sm text-palette-dark mt-1">Help us understand how visitors use our site to improve user experience.</p>
                  </div>
                  <div className="border border-palette-medium p-4 rounded-lg">
                    <h4 className="font-semibold text-palette-deepest">Preference Cookies</h4>
                    <p className="text-sm text-palette-dark mt-1">Remember your settings and preferences for a better experience.</p>
                  </div>
                  <div className="border border-palette-medium p-4 rounded-lg">
                    <h4 className="font-semibold text-palette-deepest">Marketing Cookies</h4>
                    <p className="text-sm text-palette-dark mt-1">Used to deliver relevant content and measure campaign effectiveness (with consent).</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Managing Cookies</h3>
                <p className="text-palette-dark">
                  You can control and delete cookies through your browser settings. Note that disabling certain cookies 
                  may affect site functionality. We use a cookie consent banner to obtain your permission for non-essential cookies.
                </p>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section id="user-rights" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Your Rights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Access & Portability</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Request access to your personal data</li>
                  <li>Receive a copy of your data in portable format</li>
                  <li>Know what data we have about you</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Correction & Deletion</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Correct inaccurate personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Update your preferences and settings</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Control & Consent</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Withdraw consent for processing</li>
                  <li>Object to certain types of processing</li>
                  <li>Restrict processing of your data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Communication</h3>
                <ul className="list-disc list-inside space-y-2 text-palette-dark">
                  <li>Unsubscribe from marketing emails</li>
                  <li>Choose communication preferences</li>
                  <li>Opt out of non-essential notifications</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Exercise Your Rights:</strong> Contact us at privacy@paradox-engine.com to exercise any of these rights. 
                We will respond within 30 days and may need to verify your identity.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Children's Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-palette-dark">
                Our service is intended for adults and we do not knowingly collect personal information from children under 13 years of age. 
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              
              <p className="text-palette-dark">
                If we discover that a child under 13 has provided us with personal information, we will delete such information from our records promptly.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-palette-warm" />
              <h2 className="text-2xl font-bold text-palette-deepest">Contact Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">Privacy Inquiries</h3>
                <div className="space-y-2 text-palette-dark">
                  <p><strong>Email:</strong> privacy@paradox-engine.com</p>
                  <p><strong>Response Time:</strong> Within 30 days</p>
                  <p><strong>Data Protection Officer:</strong> Thomas Njeru</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-palette-deepest mb-3">General Contact</h3>
                <div className="space-y-2 text-palette-dark">
                  <p><strong>Website:</strong> <Link href="/" className="text-palette-warm hover:underline">paradox-engine.com</Link></p>
                  <p><strong>Support:</strong> support@paradox-engine.com</p>
                  <p><strong>Business:</strong> hello@paradox-engine.com</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-palette-light border border-palette-medium rounded-lg">
              <p className="text-palette-dark">
                <strong>Changes to This Policy:</strong> We may update this privacy policy from time to time. 
                We will notify you of any material changes by email or through our website. 
                The date of the last update is shown at the top of this policy.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-palette-warm hover:text-palette-deepest transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 