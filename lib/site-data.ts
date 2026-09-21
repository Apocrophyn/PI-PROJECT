export const tutors = [
  {
    slug: "taimur-khan",
    name: "Dr Muhammad Taimur Khan",
    shortName: "Dr Khan",
    role: "Mathematics & Science Specialist",
    image: "/images/generated/tutor-taimur-editorial.webp",
    location: "Rotherham & online",
    availability: "Evenings from 6pm",
    subjects: "KS3, GCSE and A-Level Mathematics",
    qualifications: "PhD, PGCert and MSc, Sheffield Hallam University · BEng Chemical & Process Engineering, University of Sheffield",
    experience: "Mathematics teacher and Second in Department at secondary level; previously an Associate Lecturer at Sheffield Hallam University.",
    description: "Taimur connects each topic to the analytical thinking and careers it can unlock, helping students build confidence as well as technique.",
  },
  {
    slug: "muhammad-mukarram",
    name: "Muhammad Mukarram",
    shortName: "Mr Mukarram",
    role: "Physics & Mathematics Specialist",
    image: "/images/generated/tutor-mukarram-editorial.webp",
    location: "Birmingham & online",
    availability: "Evenings from 6pm",
    subjects: "GCSE and KS5 Physics, Mathematics & Further Mathematics",
    qualifications: "PGDE Physics with Mathematics, University of Sheffield · MSc Nanoscience & Engineering · BSc Materials Engineering",
    experience: "Physics and Mathematics teacher at an engineering college in Birmingham; Institute of Physics member and scholar; IGCSE Physics Examiner.",
    description: "Muhammad develops confidence through deliberate problem solving, clear explanations and the analytical habits students need under exam pressure.",
  },
] as const

export const subjectGroups = [
  { number: "01", title: "Mathematics", levels: "KS3 · GCSE · A-Level", detail: "Fluency, reasoning and the confidence to tackle unfamiliar problems.", image: "/images/generated/subject-math.webp", jar: "/images/generated/jar-math.webp", jarVideo: "/video/jars/math.mp4", stages: ["KS3", "GCSE", "A-Level"], topics: ["Number & algebra", "Geometry & measures", "Statistics & probability", "Pure & applied A-Level", "Past-paper technique"] },
  { number: "02", title: "Physics", levels: "KS3 · GCSE · A-Level", detail: "From core principles to mathematical application and exam technique.", image: "/images/generated/subject-physics.webp", jar: "/images/generated/jar-physics.webp", jarVideo: "/video/jars/physics.mp4", stages: ["KS3", "GCSE", "A-Level"], topics: ["Forces & motion", "Energy & waves", "Electricity & magnetism", "Mechanics & materials", "Fields & interactions"] },
  { number: "03", title: "Chemistry", levels: "KS3 · GCSE", detail: "A connected understanding of particles, reactions and practical science.", image: "/images/generated/subject-chem.webp", jar: "/images/generated/jar-chem.webp", jarVideo: "/video/jars/chem.mp4", stages: ["KS3", "GCSE"], topics: ["Atomic structure & bonding", "Chemical reactions", "Acids & bases", "Required practicals", "Foundation & Higher tier"] },
  { number: "04", title: "Biology", levels: "KS3 · GCSE", detail: "Clear systems thinking across cells, organisms and ecosystems.", image: "/images/generated/subject-bio.webp", jar: "/images/generated/jar-bio.webp", jarVideo: "/video/jars/bio.mp4", stages: ["KS3", "GCSE"], topics: ["Cell biology", "Human body systems", "Plants & photosynthesis", "Disease & bioenergetics", "Required practicals"] },
] as const

export const supportServices = [
  { title: "Academic assessment", description: "A focused view of current understanding, misconceptions and the next priorities.", features: ["Initial assessment", "Progress tracking", "Personalised feedback", "Goal setting"] },
  { title: "Exam preparation", description: "Past-paper practice, timing, technique and feedback targeted to the paper ahead.", features: ["Exam technique", "Past-paper practice", "Time management", "Mock exams"] },
  { title: "Homework support", description: "Guidance through demanding work while keeping the thinking with the student.", features: ["Project guidance", "Problem-solving", "Study skills", "Time management"] },
  { title: "University support", description: "Course choices, applications, interviews and subject preparation for the next step.", features: ["Application advice", "Personal statement", "Interview preparation", "Course selection"] },
] as const

export const formats = [
  { title: "One-to-one", price: "£35", unit: "per hour", note: "£50 per hour for A-Level", description: "Focused sessions shaped around one student’s gaps, goals and pace.", features: ["Individual attention", "Customised pace", "Targeted support", "Regular progress updates"] },
  { title: "Small group", price: "£25", unit: "per student, per hour", note: "Up to four students", description: "A collaborative format with direct tutor attention and shared momentum.", features: ["Peer learning", "Group discussion", "Shared resources", "Cost-effective"] },
  { title: "Online", price: "Live", unit: "wherever you study", note: "Interactive sessions", description: "Live, interactive teaching with the same conceptual depth and individual feedback.", features: ["Interactive sessions", "Digital whiteboards", "Screen sharing", "Flexible timing"] },
] as const

export const stageNotes: Record<string, string> = {
  KS3: "Build the core concepts, the confidence and the problem-solving habits.",
  GCSE: "Deepen understanding, sharpen exam technique and lift grades.",
  "A-Level": "Tackle advanced topics, refine method and reach full potential.",
}
