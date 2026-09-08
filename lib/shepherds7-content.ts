/**
 * Structural copy for the Shepherds and Wolves funnel page.
 * Sourced directly from the book; this content does not change between
 * campaigns. Volatile fields (price, CTA label, endorsements, FAQ) live in
 * Sanity via the `shepherdsPage` document.
 */

export const CHECKOUT_URL_FALLBACK = 'https://ccm.drjoshuatodd.com/shepherds7-checkout'

export interface ProcessStage {
  number: number
  name: string
  subtitle: string
  pullQuote: string
  body: string
  scripture: string
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: 1,
    name: 'Discern',
    subtitle: 'The pattern produces the process',
    pullQuote: 'The most dangerous moments for a flock rarely begin with obvious conflict.',
    body: 'Influence forms quietly. A conversation here, a growing circle of relationships there, and slowly the center of gravity within your community begins to move. Discernment replaces the question "Who is the wolf?" with one that is quieter and far more useful: what influence is forming among the flock?',
    scripture: 'Matthew 7:15',
  },
  {
    number: 2,
    name: 'Diagnose',
    subtitle: 'Expert evaluation',
    pullQuote: 'What appears to be rebellion may in fact be pain.',
    body: 'A good physician will not treat symptoms without understanding the illness beneath them. Most troubling patterns grow from wounds, insecurity, or ambition — and those do not carry the same weight or call for the same response. Diagnosis is what keeps a leader from misjudging the situation entirely.',
    scripture: 'Hebrews 12:15',
  },
  {
    number: 3,
    name: 'Defang',
    subtitle: 'Removing the threat, while believing the best',
    pullQuote: 'The purpose of defanging is not punishment. It is protection.',
    body: 'In many situations the behavior itself is not the primary problem. The deeper concern is the structure that allows it to shape the community. Defanging closes the channels through which unhealthy influence travels — and when it is done well, it is almost invisible to the broader flock.',
    scripture: 'Titus 3:10 · Romans 16:17',
  },
  {
    number: 4,
    name: 'Distance',
    subtitle: 'Pushing back while leaning in',
    pullQuote: 'Influence has momentum.',
    body: 'Distance is not rejection and it is not humiliation. It is the set of quiet boundaries that slows momentum long enough for a community to regain its balance, while giving the person involved the time and room to reconsider their direction.',
    scripture: '1 Timothy 5:19–22',
  },
  {
    number: 5,
    name: 'Diminish',
    subtitle: 'Limiting unhealthy influences',
    pullQuote: 'Sheep rarely follow voices that no longer carry credibility.',
    body: 'This stage works through truth rather than force. Healthy teaching, transparent leadership, and consistent communication restore clarity to the community — and unhealthy influence quietly loses its weight without anyone being publicly humiliated. This is diminish, not destroy.',
    scripture: 'Titus 1:9',
  },
  {
    number: 6,
    name: 'Draw the Line',
    subtitle: 'Making things clear',
    pullQuote: 'Drawing the line is not the beginning of shepherding authority. It is the final step.',
    body: 'Sometimes the loss of influence does not produce humility. It awakens resistance. When that happens a line must be drawn — never in anger, never first, and only after every earlier stage has been honored. This chapter shows you how to do it with both clarity and humility.',
    scripture: 'Ezekiel 3:17–19 · Hebrews 13:17',
  },
  {
    number: 7,
    name: 'Develop the Flock',
    subtitle: 'Maturing the masses',
    pullQuote: 'A flock does not become healthy simply because a wolf has been driven away.',
    body: 'Removal is not health. Health comes when the flock itself matures. The final stage builds a community that recognizes patterns on its own — because immature flocks are easily scattered, and mature flocks recognize the Shepherd’s voice.',
    scripture: 'Ephesians 4:11–14 · 1 Peter 5:2–3',
  },
]


export interface PackageItem {
  icon: 'video' | 'book' | 'workbook' | 'community'
  eyebrow: string
  title: string
  body: string
}

export const PACKAGE_INCLUDES: PackageItem[] = [
  {
    icon: 'video',
    eyebrow: 'The masterclass',
    title: 'Roughly 12 hours of teaching with Dr. Joshua Todd',
    body: 'The full Shepherd’s Process taught on camera — the judgment calls, the warnings, and the pastoral nuance that only come from twenty years of walking leaders through these situations. Pre-recorded, so you move at your own pace and return to any stage the moment a situation calls for it.',
  },
  {
    icon: 'book',
    eyebrow: 'The book',
    title: 'Shepherds and Wolves, in full',
    body: 'Seven chapters, one continuous case study, and the biblical foundation under every stage — from Paul’s charge to the Ephesian elders to the watchman of Ezekiel 3. Yours to keep, re-read, and hand to the next leader who needs it.',
  },
  {
    icon: 'workbook',
    eyebrow: 'The workbook',
    title: 'Move it from teaching to your actual situation',
    body: 'Built around the Leadership Reflection questions that close every chapter, so you can put the stage you are living through on paper — what you are seeing, what may be driving it, and what your next step should be. This is where the framework stops being a concept and becomes a decision about the people in front of you.',
  },
  {
    icon: 'community',
    eyebrow: 'The community',
    title: 'You should not walk this out by yourself',
    body: 'Private access to other shepherds carrying the same weight, where the situations are real, the conversation is safe, and you are not left discerning a difficult season in isolation.',
  },
]

export const FAILURE_MODES = [
  {
    title: 'You wait too long',
    body: 'Some leaders ignore the situation until it becomes impossible to overlook. By then the influence is entrenched, the relationships have already re-formed, and every option left is a painful one.',
  },
  {
    title: 'You move too fast',
    body: 'Others react too quickly, confronting people before the pattern is fully understood. A premature confrontation can create far greater damage than the behavior it was meant to address.',
  },
  {
    title: 'You misread it entirely',
    body: 'Leaders confront wounded people as though they were rebellious, or tolerate ambitious influence as though it were harmless enthusiasm. Either way the result is confusion in the flock and unnecessary harm to a person.',
  },
]

export const WHAT_IT_IS_NOT = [
  {
    title: 'Not a manual for controlling people',
    body: 'It is a guide for shepherds who want to lead with clarity, humility, and strength — not leverage.',
  },
  {
    title: 'Not a licence to label',
    body: 'The language of sheep and wolves is used the way Scripture uses it: diagnostically. The goal is never to label people quickly or assume motives prematurely.',
  },
  {
    title: 'Not a shortcut to removal',
    body: 'The early stages focus entirely on understanding and restoration. Only later, and only if necessary, do stronger actions become appropriate.',
  },
  {
    title: 'Not for self-appointed authority',
    body: 'Shepherding responsibility is recognized and affirmed within a community. Those who assume influence without relational accountability often become part of the very problem this masterclass addresses.',
  },
]

export const CHAPTER_ANATOMY = [
  {
    label: 'Watch the stage taught',
    body: 'Dr. Todd walks through what the stage is, the specific judgment call it asks of you, and the ways leaders most often get it wrong.',
  },
  {
    label: 'Follow one continuous story',
    body: 'A single narrative — Daniel, Craig, and a growing church — runs the length of the book and escalates with every stage, so you see the framework applied rather than described.',
  },
  {
    label: 'Anchor it in Scripture',
    body: 'Every stage rests on specific passages, so the decisions you make can be defended from the text rather than from instinct or personality.',
  },
  {
    label: 'Work it through for yourself',
    body: 'Three Leadership Reflection questions close each chapter and carry into the workbook, turning each stage into a decision about your own community rather than a concept you have read.',
  },
]

export const AUDIENCE = [
  'Senior leaders carrying the weight of a congregation',
  'Elders and leadership teams who need shared language for hard calls',
  'House church and ministry center leaders',
  'Apostolic hubs and network leaders',
  'Small-group and ministry leaders entrusted with people',
  'Anyone who has felt something shift and could not yet name it',
]

export const DEFAULT_FAQS = [
  {
    question: 'What exactly do I get?',
    answer:
      'Four things: roughly twelve hours of recorded teaching from Dr. Joshua Todd, the complete Shepherds and Wolves book, a companion workbook built around the Leadership Reflection questions, and private community access so you are not walking a difficult season out alone.',
  },
  {
    question: 'Is the teaching live or self-paced?',
    answer:
      'The teaching is pre-recorded, so you can move at whatever pace your situation allows. Most leaders come to this material because something is already unfolding in their community — you can go straight to the stage you need and come back for the rest.',
  },
  {
    question: 'Is this only for senior pastors?',
    answer:
      'No. The New Testament consistently portrays shepherding as a broader function within the body of Christ. Wherever God entrusts people into someone’s care, that person carries a measure of shepherding responsibility — a congregation, a house church, a ministry team, or a small group.',
  },
  {
    question: 'Is the workbook something I fill in myself?',
    answer:
      'Yes. It is built for you personally — a place to work out what you are seeing in your own community, what may be driving it, and what your next step should be. Many leaders then bring those conclusions to their team, but the workbook itself is yours.',
  },
  {
    question: 'Is this a program about confronting people?',
    answer:
      'It is about protecting a community without unnecessarily crushing a person. Four of the seven stages happen before any confrontation, and the entire process is built to leave room for repentance and restoration at every step.',
  },
  {
    question: 'What if the behavior comes from a wounded person rather than a hostile one?',
    answer:
      'That is the most common case, and the process is built around it. The Diagnose stage exists precisely because what appears to be rebellion is often pain, and what appears to be ambition often grows from insecurity. Those situations call for very different responses.',
  },
  {
    question: 'Are the case studies about real churches?',
    answer:
      'They are hypothetical but not imaginary. They reflect recurring patterns Dr. Todd has witnessed across many kingdom contexts over more than twenty years. No single story represents a particular individual or church.',
  },
]
