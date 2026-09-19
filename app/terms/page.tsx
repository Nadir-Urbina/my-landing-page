import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms of Service | Dr. Joshua Todd',
  description: `The terms governing your use of ${LEGAL.site}.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LEGAL.lastUpdated}>
      <p>
        These terms govern your use of {LEGAL.site}, operated by {LEGAL.entity} (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using this site you agree to them. If you do not
        agree, please do not use the site.
      </p>

      <h2>Use of the site</h2>
      <p>
        You may use this site for lawful purposes only. You agree not to interfere with its
        operation or security, attempt to gain unauthorised access to any part of it, or use it to
        transmit unlawful, harmful, or misleading content.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site — including teaching materials, books, videos, workbooks, text,
        graphics, and logos — is owned by {LEGAL.entity} or its licensors and is protected by
        copyright and other laws. You may not reproduce, distribute, or create derivative works
        from it without our prior written permission, except as permitted by law.
      </p>

      <h2>Purchases, memberships, and subscriptions</h2>
      <ul>
        <li>
          Some programs and resources are paid, including recurring memberships and one-time
          purchases. Prices are shown at the point of purchase.
        </li>
        <li>
          Payments are handled by third-party payment processors. Your purchase is also subject to
          their terms.
        </li>
        <li>
          Recurring subscriptions continue until cancelled. You may cancel at any time; cancellation
          takes effect at the end of the current billing period unless stated otherwise.
        </li>
        <li>
          Membership and any separately priced programs are distinct purchases. Enrolling in one
          does not include the other unless expressly stated.
        </li>
      </ul>

      <h2>Communications</h2>
      <p>
        By providing your contact details you agree that we may contact you about the services you
        have requested. Marketing emails and text messages are sent only with your separate,
        express consent, and you can opt out at any time as described in our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        This site links to and relies on third-party websites and services, including external
        checkout pages. We are not responsible for their content, practices, or availability, and
        your use of them is governed by their own terms.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The site and its content are provided on an &ldquo;as is&rdquo; basis without warranties of
        any kind, express or implied. Teaching, ministry, and educational content is offered for
        spiritual and informational purposes and is not medical, psychological, legal, or financial
        advice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {LEGAL.entity} will not be liable for any indirect,
        incidental, special, or consequential damages arising from your use of this site or its
        content.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes are
        posted constitutes acceptance of the revised terms.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of {LEGAL.governingLaw}.</p>

      <h2>Contact us</h2>
      <p>
        {LEGAL.entity}
        <br />
        {LEGAL.address}
        <br />
        <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
      </p>
    </LegalPage>
  )
}
