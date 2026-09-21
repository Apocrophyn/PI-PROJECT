import type { Article } from "./types"

export const article: Article = {
  slug: "gcse-physics-required-practicals",
  title: "GCSE Physics Required Practicals: What Examiners Are Actually Looking For",
  metaTitle: "GCSE Physics Required Practicals Explained",
  description: "How GCSE physics required practicals are examined, the marks students routinely lose, and how to revise practicals properly rather than just remembering the lesson.",
  keywords: ["gcse physics required practicals", "aqa required practicals physics", "gcse physics revision", "required practical questions", "gcse physics tutor"],
  topic: "GCSE Physics",
  published: "2026-07-22",
  updated: "2026-09-12",
  author: "Muhammad Mukarram",
  image: "/images/generated/subject-physics.webp",
  imageAlt: "A pendulum and glass prism splitting a cyan beam into a spectrum on black stone",
  faqs: [
    {
      question: "How many marks are required practicals worth at GCSE?",
      answer: "At least fifteen per cent of the total marks across the GCSE science papers relate to practical work. In physics they often appear inside longer questions rather than as a separate section, so the real figure a student encounters can be higher.",
    },
    {
      question: "Do I need to remember every step of every practical?",
      answer: "No. You need to remember the purpose, the independent, dependent and control variables, the key measurements and their instruments, the main source of error and how it is reduced. Examiners rarely ask you to recite a method; they ask you to reason about one.",
    },
    {
      question: "What is the difference between accuracy, precision and repeatability?",
      answer: "Accuracy is how close a measurement is to the true value. Precision is how close repeat measurements are to each other. Repeatability is getting similar results when the same person repeats the experiment with the same equipment. Students lose marks by using these interchangeably.",
    },
  ],
  body: `
<p>Students revise required practicals by remembering the lesson. Examiners test whether you can reason about an experiment you may never have seen. Those are different skills, and the gap between them is where a significant number of GCSE physics marks quietly disappear every summer.</p>

<h2>What is actually examined</h2>
<p>Required practical questions almost never ask "describe the method". They ask things like:</p>
<ul>
  <li>Why was a particular variable kept constant?</li>
  <li>Suggest one improvement to this student's method, and explain why it improves the result.</li>
  <li>The student's results do not pass through the origin. Suggest a reason.</li>
  <li>Which piece of apparatus would give a more precise measurement, and why?</li>
  <li>Calculate the gradient and explain what it represents.</li>
</ul>
<p>Every one of those is a reasoning question wearing the costume of a recall question. A student who memorised the method sheet has not prepared for any of them.</p>

<h2>The five things to know about every practical</h2>
<p>Instead of memorising methods, build a single page per practical containing exactly these:</p>
<ol>
  <li><strong>The purpose.</strong> One sentence: what relationship is being investigated?</li>
  <li><strong>The variables.</strong> Independent, dependent, and at least two controlled, with a reason for each control.</li>
  <li><strong>The measurements.</strong> What is measured, with what instrument, to what resolution.</li>
  <li><strong>The main source of error.</strong> Whether it is random or systematic, and one specific way to reduce it.</li>
  <li><strong>The graph.</strong> What goes on each axis, what shape is expected, and what the gradient or intercept physically means.</li>
</ol>
<p>Five bullet points per practical. That is far less content than a full method, and it covers the overwhelming majority of what gets asked.</p>

<h2>Where the marks are lost</h2>
<h3>Confusing random and systematic error</h3>
<p>Repeating readings and taking a mean reduces <em>random</em> error. It does nothing at all to a systematic error such as a instrument that has not been zeroed. Students who offer "repeat and take an average" as the answer to every error question lose marks whenever the error was systematic.</p>

<h3>Vague improvements</h3>
<p>"Be more accurate" and "use better equipment" score nothing. "Use a metre rule with a millimetre scale instead of estimating, so the resolution is higher" scores. The pattern examiners reward is <strong>change + consequence</strong>: what you would do differently, and what that does to the measurement.</p>

<h3>Describing the graph instead of interpreting it</h3>
<p>"The line goes up" is a description. "The extension is directly proportional to the force, because the line is straight and passes through the origin" is an interpretation. Only the second earns the mark, and the phrase "directly proportional" specifically requires both conditions, straight and through the origin. Students who say "proportional" for any straight line lose the mark.</p>

<h3>Units and significant figures</h3>
<p>Easy marks, routinely dropped. Give the answer to the same number of significant figures as the least precise piece of data, and always include the unit. In physics this is often the difference between a grade boundary.</p>

<h3>Not reading the axes</h3>
<p>Graph questions frequently use unhelpful scales, or axes that do not start at zero. Students who read values by eye without checking the scale lose marks in a way that has nothing to do with physics.</p>

<h2>The required practicals worth the most attention</h2>
<p>Across the boards, these consistently generate the most examination questions and the most confusion:</p>
<ul>
  <li><strong>Specific heat capacity.</strong> Energy transfer, insulation as a systematic error source, gradient interpretation.</li>
  <li><strong>Resistance of a wire.</strong> Ohm's law, the effect of heating on resistance, why the current should be switched off between readings.</li>
  <li><strong>Force and extension (Hooke's law).</strong> The limit of proportionality is the marks question, every time.</li>
  <li><strong>Density of solids and liquids.</strong> Regular versus irregular objects, displacement method, resolution of the measuring cylinder.</li>
  <li><strong>Waves in a ripple tank or on a string.</strong> Measuring several wavelengths and dividing, to reduce percentage uncertainty.</li>
  <li><strong>Infrared radiation and emission.</strong> Controlling starting temperature and surface area.</li>
</ul>
<p>Note how many of those come down to the same underlying idea: measure more of something and divide, so that the uncertainty in a single reading matters less. Examiners like that idea because it shows understanding of measurement rather than memory of a procedure.</p>

<h2>How to revise practicals in an hour a week</h2>
<ol>
  <li>Pick two practicals. Write the five bullet points from memory.</li>
  <li>Check against the specification and correct what you missed.</li>
  <li>Find three exam questions on those practicals and do them.</li>
  <li>Mark against the mark scheme and note the exact wording the scheme rewards.</li>
</ol>
<p>The fourth step is the one students skip and the one that matters most. Physics mark schemes are surprisingly specific about language, and learning that language is worth several marks a paper.</p>

<h2>Getting help with the technique</h2>
<p>Most students who come to us for GCSE physics know more physics than their marks suggest. What they are missing is the translation layer between knowing something and expressing it in a form the mark scheme recognises. That is a teachable skill, and it moves grades quickly because the underlying knowledge is already there.</p>
<p>We teach <a href="/services">GCSE and A-Level physics</a> in Birmingham, Rotherham and online, and one of our tutors is a practising IGCSE Physics examiner. If exam technique rather than content is the problem, <a href="/contact">send us a recent paper</a> and we will tell you what we see.</p>
`,
}
