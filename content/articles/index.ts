import type { Article } from "./types"
import { article as gcseMathsRevisionPlan } from "./gcse-maths-revision-plan"
import { article as combinedVsTriple } from "./combined-science-vs-triple-science"
import { article as aLevelStep } from "./a-level-maths-harder-than-gcse"
import { article as chooseATutor } from "./how-to-choose-a-tutor-uk"
import { article as onlineVsInPerson } from "./online-vs-in-person-tutoring"
import { article as requiredPracticals } from "./gcse-physics-required-practicals"
import { article as ks3Foundations } from "./ks3-maths-foundations"
import { article as howMuchTutoring } from "./how-much-tutoring-does-a-gcse-student-need"

export type { Article, Faq } from "./types"

/** Newest first. The order here is the order on the index page. */
export const articles: Article[] = [
  howMuchTutoring,
  ks3Foundations,
  requiredPracticals,
  onlineVsInPerson,
  chooseATutor,
  aLevelStep,
  combinedVsTriple,
  gcseMathsRevisionPlan,
]
