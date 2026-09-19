import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Joshua Todd',
  description: `How ${LEGAL.entity} collects, uses, and protects your information, including SMS and mobile data.`,
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LEGAL.lastUpdated}>
      <p>
        {LEGAL.entity} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operating as{' '}
        {LEGAL.dba} at {LEGAL.site}, respects your privacy. This policy explains what information
        we collect, how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> Your name, email address, and — where you
          choose to provide it — your mobile phone number, along with any message or application
          content you submit through forms or our chat widget.
        </li>
        <li>
          <strong>Payment information.</strong> Purchases are processed by third-party payment
          providers. We do not collect or store your full card details.
        </li>
        <li>
          <strong>Usage information.</strong> Standard analytics such as pages visited, referring
          site, browser type, and approximate location, collected to understand how the site is
          used and to keep it secure.
        </li>
      </ul>

      <h2>SMS and mobile messaging</h2>
      <p>
        If you provide your mobile number and give express written consent, we may send you
        promotional and marketing text messages, including offers, event promotions, and service
        announcements.
      </p>
      <ul>
        <li>
          <strong>Consent is separate and optional.</strong> Marketing consent is collected through
          a distinct, optional checkbox. It is never bundled with transactional consent, and
          consent is not a condition of purchase.
        </li>
        <li>
          <strong>Message frequency varies.</strong> Message and data rates may apply.
        </li>
        <li>
          <strong>Opting out.</strong> Reply <strong>STOP</strong> to any message to unsubscribe at
          any time. Reply <strong>HELP</strong> for assistance, or contact us at{' '}
          <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>.
        </li>
      </ul>
      <p>
        <strong>
          No mobile information will be sold or shared with third parties or affiliates for
          marketing or promotional purposes. All of the above categories exclude text messaging
          originator opt-in data and consent; this information will not be shared with any third
          parties.
        </strong>
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to enquiries and provide the resources, programs, or services you request</li>
        <li>To send communications you have opted in to receive</li>
        <li>To process payments and manage memberships or registrations</li>
        <li>To operate, secure, and improve the website</li>
        <li>To meet legal and regulatory obligations</li>
      </ul>

      <h2>Service providers</h2>
      <p>
        We use third-party services to operate this site, and they process data only as needed to
        provide their service to us. These include content management, payment processing,
        transactional and marketing email delivery, chat and messaging, spam prevention, and
        website analytics. We do not sell your personal information.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        We use cookies and similar technologies for essential site functionality, spam prevention,
        chat, and aggregate analytics. Most browsers let you refuse or delete cookies, though some
        parts of the site may not work correctly if you do.
      </p>

      <h2>Data retention and security</h2>
      <p>
        We keep personal information only as long as needed for the purposes described here or as
        required by law, and we use reasonable safeguards to protect it. No method of transmission
        or storage over the internet is completely secure.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, and you
        may withdraw consent to marketing communications at any time by replying STOP to a text,
        using the unsubscribe link in an email, or contacting us. Depending on where you live, you
        may have additional rights under applicable privacy law.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        This site is not directed to children under 13, and we do not knowingly collect personal
        information from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page reflects the
        most recent revision.
      </p>

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
