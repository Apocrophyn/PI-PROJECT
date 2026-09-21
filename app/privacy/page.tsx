import Link from "next/link"
import { LegalPage } from "@/components/site/legal-page"
import { pageMetadata, SITE } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How PI Tutors collects, uses and protects personal data under UK GDPR, including what we store, why, and how to exercise your rights.",
  path: "/privacy",
})

const UPDATED = "21 September 2026"

export default function PrivacyPage() {
  return (
    <LegalPage
      accent="Privacy"
      title={["How we handle your ", { text: "information.", className: "italic", base: "#78ddea" }]}
      description="We collect as little personal data as possible, use it only to arrange and deliver tutoring, and never sell it. This page sets out the detail."
      updated={UPDATED}
      sections={[
        {
          id: "who-we-are",
          heading: "Who we are",
          body: (
            <>
              <p>PI Tutors provides mathematics and science tutoring for KS3, GCSE and A-Level students in Rotherham, Birmingham and online. For the purposes of UK data protection law we are the data controller for the personal data described on this page.</p>
              <p>You can reach us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or on <a href={`tel:${SITE.telephone}`}>{SITE.telephoneDisplay}</a>.</p>
            </>
          ),
        },
        {
          id: "what-we-collect",
          heading: "What we collect",
          body: (
            <>
              <p>We only collect information you give us, plus basic technical data needed to run the site.</p>
              <ul>
                <li><strong>Enquiry details.</strong> The name, email address, telephone number and message you submit through our contact form, including any subject, year group or availability you choose to tell us.</li>
                <li><strong>Student information.</strong> Where a parent or guardian enquires on behalf of a student, the student&rsquo;s first name, year group, exam board and the areas they are finding difficult.</li>
                <li><strong>Session records.</strong> Once tutoring begins, notes on topics covered and progress, kept so that sessions build on one another.</li>
                <li><strong>Technical data.</strong> Standard server logs generated when you visit, such as IP address, browser type and the pages requested.</li>
              </ul>
              <p>We do not ask for and do not want financial details, medical information or any other special category data through this website.</p>
            </>
          ),
        },
        {
          id: "why-we-use-it",
          heading: "Why we use it, and our lawful basis",
          body: (
            <>
              <ul>
                <li><strong>To respond to your enquiry.</strong> Lawful basis: legitimate interests, namely replying to someone who has contacted us.</li>
                <li><strong>To arrange and deliver tutoring.</strong> Lawful basis: performance of a contract, or steps taken at your request before entering one.</li>
                <li><strong>To keep records of sessions and progress.</strong> Lawful basis: legitimate interests in providing a continuous, effective service.</li>
                <li><strong>To keep the website secure and working.</strong> Lawful basis: legitimate interests in operating a safe website.</li>
              </ul>
              <p>We do not use your data for advertising, profiling or automated decision making, and we do not send marketing emails unless you have asked us to.</p>
            </>
          ),
        },
        {
          id: "children",
          heading: "Children&rsquo;s data",
          body: (
            <p>Most of our students are under 18. We ask that enquiries about a student under 16 are made by a parent or guardian, and we keep the minimum information needed to teach the student well. Parents and guardians can ask to see, correct or delete anything we hold about their child at any time.</p>
          ),
        },
        {
          id: "sharing",
          heading: "Who we share it with",
          body: (
            <>
              <p>We do not sell personal data and we do not share it for marketing. We use a small number of service providers who process data on our behalf under contract:</p>
              <ul>
                <li><strong>Hosting.</strong> Our website is hosted on Vercel, which processes server logs on our behalf.</li>
                <li><strong>Email delivery.</strong> Contact form submissions are delivered to us by Resend.</li>
              </ul>
              <p>We will disclose information if we are legally required to do so, or where there is a safeguarding concern about a child&rsquo;s welfare.</p>
            </>
          ),
        },
        {
          id: "how-long",
          heading: "How long we keep it",
          body: (
            <ul>
              <li><strong>Enquiries that do not become tutoring:</strong> up to 12 months, then deleted.</li>
              <li><strong>Records for current students:</strong> for the duration of tutoring and up to 24 months afterwards, so we can help again without starting from scratch.</li>
              <li><strong>Server logs:</strong> retained by our hosting provider for a short rolling period.</li>
            </ul>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies",
          body: (
            <p>This website does not set advertising or analytics cookies, and there is no tracking pixel on any page. The only storage used is whatever your browser needs to display the site. Because we set no non-essential cookies, no consent banner is required.</p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights",
          body: (
            <>
              <p>Under UK GDPR you have the right to access the personal data we hold about you, to have it corrected or erased, to restrict or object to how we use it, and to receive it in a portable format. Where we rely on consent, you can withdraw it at any time.</p>
              <p>To exercise any of these, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond within one month.</p>
              <p>If you are unhappy with how we have handled your data you can complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk" rel="nofollow noopener" target="_blank">ico.org.uk</a>, though we would appreciate the chance to put things right first.</p>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <p>The site is served over HTTPS. Enquiry details are sent directly to our email and are not stored in a public database. Access to session records is limited to the tutor teaching the student.</p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: (
            <p>If we change how we handle personal data we will update this page and the date at the top. Material changes affecting current students will also be sent by email. See also our <Link href="/terms">terms of service</Link>.</p>
          ),
        },
      ]}
    />
  )
}
