import Link from "next/link"
import { LegalPage } from "@/components/site/legal-page"
import { pageMetadata, SITE } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms on which PI Tutors provides tutoring: booking, rates, payment, cancellation, safeguarding and what we do and do not promise.",
  path: "/terms",
})

const UPDATED = "21 September 2026"

export default function TermsPage() {
  return (
    <LegalPage
      accent="Terms"
      title={["The terms we ", { text: "work by.", className: "italic", base: "#78ddea" }]}
      description="Plain terms covering booking, payment, cancellation and what you can reasonably expect from us. If anything here is unclear, ask before you book."
      updated={UPDATED}
      sections={[
        {
          id: "these-terms",
          heading: "These terms",
          body: (
            <>
              <p>These terms apply to tutoring provided by PI Tutors and to your use of this website. By booking a session you accept them on your own behalf and, where the student is under 18, on behalf of that student as their parent or guardian.</p>
              <p>They do not affect your statutory rights as a consumer under UK law.</p>
            </>
          ),
        },
        {
          id: "what-we-provide",
          heading: "What we provide",
          body: (
            <>
              <p>We provide one-to-one and small-group tutoring in mathematics and the sciences, delivered in person around Rotherham and Birmingham or online:</p>
              <ul>
                <li>Mathematics at KS3, GCSE and A-Level</li>
                <li>Physics at KS3, GCSE and A-Level</li>
                <li>Chemistry and Biology at KS3 and GCSE</li>
              </ul>
              <p>Sessions are normally 60 minutes. Longer sessions can be arranged by agreement.</p>
            </>
          ),
        },
        {
          id: "booking",
          heading: "Booking and scheduling",
          body: (
            <>
              <p>Tutoring begins with an enquiry and a conversation about what the student needs. We will confirm the subject, level, format and a regular slot in writing before the first session.</p>
              <p>A regular slot is held for you week to week. If you need to move it permanently, tell us as early as you can and we will do what we can to accommodate it.</p>
            </>
          ),
        },
        {
          id: "rates",
          heading: "Rates and payment",
          body: (
            <>
              <ul>
                <li><strong>One-to-one, KS3 and GCSE:</strong> £35 per hour</li>
                <li><strong>One-to-one, A-Level:</strong> £50 per hour</li>
                <li><strong>Small group (up to four students):</strong> £25 per student per hour</li>
              </ul>
              <p>Invoices are issued monthly in arrears unless agreed otherwise, and are payable within 14 days by bank transfer. We do not require payment for blocks of sessions in advance.</p>
              <p>Rates may change with at least one month&rsquo;s notice. Any change will not affect sessions already booked.</p>
            </>
          ),
        },
        {
          id: "cancellation",
          heading: "Cancellation and missed sessions",
          body: (
            <>
              <ul>
                <li><strong>More than 24 hours&rsquo; notice:</strong> no charge, and we will offer an alternative slot that week where possible.</li>
                <li><strong>Less than 24 hours&rsquo; notice:</strong> the session may be charged in full, as the slot can rarely be filled.</li>
                <li><strong>If we cancel:</strong> no charge, and we will offer a replacement session at the earliest mutually convenient time.</li>
              </ul>
              <p>We will always be reasonable about genuine illness and emergencies. Either side may end regular tutoring at any time by giving one week&rsquo;s notice.</p>
            </>
          ),
        },
        {
          id: "expectations",
          heading: "What we expect, and what we promise",
          body: (
            <>
              <p>Tutoring works when the student does something with it. We will set a small amount of focused work between sessions and expect a reasonable effort at it. Where that does not happen consistently, we will say so rather than continue quietly.</p>
              <p>We do not guarantee grades, and you should be sceptical of anyone who does. What we commit to is an honest assessment of where a student stands, teaching aimed at the actual gap, and a clear account of progress. If we do not believe tutoring is the right answer for a student, we will tell you.</p>
              <p>We will not complete coursework, controlled assessments or homework on a student&rsquo;s behalf. Doing so would be dishonest and would undermine the point of the work.</p>
            </>
          ),
        },
        {
          id: "safeguarding",
          heading: "Safeguarding",
          body: (
            <>
              <p>Our tutors are qualified teachers and hold enhanced DBS certificates, available on request. Sessions with students under 18 take place with a parent or guardian at home, or in an agreed public or school setting.</p>
              <p>Online sessions are conducted on a shared whiteboard platform. We may ask that a parent or guardian is present in the house during online sessions with younger students.</p>
              <p>If we have a concern about a child&rsquo;s welfare we will follow our safeguarding responsibilities, which may include reporting the concern to the appropriate authority.</p>
            </>
          ),
        },
        {
          id: "materials",
          heading: "Materials and intellectual property",
          body: (
            <p>Worksheets, notes and whiteboard recordings we produce are provided for the personal use of the student. Past papers and specifications remain the property of the relevant exam board. Content on this website, including the articles and artwork, belongs to PI Tutors and may not be republished without permission.</p>
          ),
        },
        {
          id: "liability",
          heading: "Liability",
          body: (
            <p>We provide tutoring with reasonable care and skill. We are not liable for examination outcomes, for decisions made by schools or examination boards, or for indirect losses. Nothing in these terms limits our liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.</p>
          ),
        },
        {
          id: "law",
          heading: "Governing law and contact",
          body: (
            <>
              <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.</p>
              <p>For anything arising from these terms, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or on <a href={`tel:${SITE.telephone}`}>{SITE.telephoneDisplay}</a>. See also our <Link href="/privacy">privacy policy</Link>.</p>
            </>
          ),
        },
      ]}
    />
  )
}
