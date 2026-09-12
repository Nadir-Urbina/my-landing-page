/**
 * Structural copy for the CAMP Season 4 funnel page.
 * Tents are seeded here from the Season 4 planning document, but Sanity
 * `campTent` documents take priority when any exist — see getCampTents().
 */

export const CAMP_CHECKOUT_URL_FALLBACK = 'https://ccm.drjoshuatodd.com/campv4-checkout'

export interface CampTentSeed {
  name: string
  leader: string
  description?: string
  duration?: string
  comingSoon?: boolean
}

export const TENT_SEED: CampTentSeed[] = [
  {
    name: 'Bloodline Deliverance',
    leader: 'Ben & Page Irvine',
    duration: '12-week intensive',
    description:
      'This will include some teaching, but there will also be plenty of space for Q&A for those who may not have a clear understanding of bloodline deliverance, or who have encountered situations in deliverance they are unsure how to navigate.\n\nOver the last six years, Ben and Page have been part of close to 3,000 deliverance sessions with people from all over the world. They are actively involved in deliverance almost daily and have encountered a wide range of situations and experiences. While they are continually learning and growing, they carry a significant amount of hands-on experience that they are eager to share.\n\nTraining and equipping others in deliverance has become a natural part of their ministry, as they regularly invite others to sit in on sessions for the purpose of learning and development. They were trained by Mike Brewer and also serve as coaches with his Kingdom Warfare and Leadership Institute.\n\nTheir heart for this tent is highly practical. The goal is to create an environment where participants can ask questions, discuss real-life situations, learn from practical experience, and leave feeling more confident and equipped to help bring freedom to others.',
  },
  {
    name: 'Biblical Understanding of the Prophetic',
    leader: 'Angel',
    duration: '12-week intensive',
    description:
      'We will unpack Scripture in depth through sound hermeneutical tools — including concordances, commentaries, and biblical word studies — to cultivate mature biblical understanding and produce a pure, powerful prophetic flow.\n\nAs we deepen our study, we will grow in the depth and clarity with which we express the voice of the Lord, establishing the fear of the Lord and allowing Scripture to serve as the safeguard and foundation of the prophetic.\n\nWe will explore the various prophetic graces and expressions throughout Scripture, examining men and women who were uniquely graced to reveal different aspects of the heart and mind of God — from the seer (chozeh), such as Daniel, who received visions and mysteries from God (Daniel 2:19), to Hosea, whose very life became a prophetic message.\n\nTogether we will ask: What is the prophetic? What is the difference between the gift of prophecy and the office of a prophet? What is the purpose of the prophetic, and what can we learn from the diverse prophetic expressions throughout Scripture? We will explore the nabi, ro’eh, and chozeh, as well as dreams and visions, prophetic acts, intercession, the watchman, prophetic musicians and artists, and the shepherd-prophet.',
  },
  {
    name: 'Spiritual Warfare',
    leader: 'Angie Dorman',
    duration: '12-week intensive',
    description:
      'Trainees will receive strategic instruction in three primary areas: Warfare Doctrine, Warfare Preparation, and Warfare Operations, reinforced through practical activations and field assignments.\n\nThis tent is intentionally structured to train believers beyond identifying and engaging enemy forces. We are equipping a mature Ekklesia to discern the battle, establish lawful authority and strategic counsel, gather and assess intelligence, formulate battle plans, deploy prepared teams, and establish righteous order following engagement.',
  },
  {
    name: 'Maturing the Prophetic',
    leader: 'Victoria',
    duration: '12-week intensive',
    description:
      'The goal of this 12-week intensive is to mature the way we receive, release, and function prophetically as sons and daughters consumed with the heart of God. We will lean on Scripture while creating space for practical application, growth, and learning together.\n\nTopics will include increasing intimacy with the Lord, gaining greater clarity around His voice, pursuing the Lord through suffering and trials, embodying and birthing the message, prophesying with greater authority, prophetic intercession, moving above warfare and resistance, loving others well, and prophetic accountability.',
  },
  { name: 'Apostolic Intercession', leader: 'Wayland', comingSoon: true },
  { name: 'High Courts of the Lord', leader: 'Liz', comingSoon: true },
  { name: 'Identity', leader: 'Adam', comingSoon: true },
  { name: 'Inner Healing', leader: 'Nicole', comingSoon: true },
]


/** Cycled through the hero typing effect after "What can you learn in CAMP?" */
export const LEARN_ROTATION = [
  'Inner healing.',
  'The High Courts of the Lord.',
  'Bloodline deliverance.',
  'The prophetic.',
  'Maturing the prophetic.',
  'Spiritual warfare.',
  'Apostolic intercession.',
  'Identity.',
  'All of it.',
]

/** What the $20/month membership actually includes */
export const MEMBERSHIP_BENEFITS = [
  {
    icon: 'tents',
    title: 'Eligibility to register for the tents',
    body: 'The eight specialization tents are open to CAMP members only — membership is what gets you through the door to register. Each tent is a separate twelve-week intensive with its own enrolment cost.',
  },
  {
    icon: 'calls',
    title: 'Twice-monthly live calls',
    body: 'Two calls every month with Dr. Joshua Todd and the CAMP leadership team, continuing to build expertise across the prophetic and every other area CAMP now carries.',
  },
  {
    icon: 'leaders',
    title: 'The tent leaders on those calls',
    body: 'Tent leaders speak directly into the regular calls, so you are hearing from the people running each specialization rather than only reading about them.',
  },
  {
    icon: 'library',
    title: 'Free access to Dr. Todd’s resources',
    body: 'The library of teaching and written material Dr. Joshua Todd has authored, included with membership at no additional cost.',
  },
  {
    icon: 'missions',
    title: 'Exclusive mission trip access',
    body: 'Applications for mission trips led by Dr. Joshua Todd open to CAMP members first — an invitation that does not go out publicly.',
  },
  {
    icon: 'books',
    title: 'First look at new books',
    body: 'Preview upcoming releases before they are published, including the material still being written.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Join for $20 a month',
    body: 'One membership, no application to be approved for and no interview to wait on. CAMP is an open community now.',
  },
  {
    step: 2,
    title: 'Register for the tents you want',
    body: 'As a member you can enrol in whichever specializations fit the season you are in. Each tent is a twelve-week intensive priced separately from membership, led by someone carrying real experience in that area.',
  },
  {
    step: 3,
    title: 'Show up twice a month',
    body: 'Live calls with Dr. Joshua Todd, the leadership team, and the tent leaders — where the training gets applied to what you are actually walking through.',
  },
]

export const DEFAULT_CAMP_FAQS = [
  {
    question: 'What does CAMP stand for?',
    answer:
      'Christ’s Authority Meeting People. It is an open prophetic community built to equip people who are touching the Kingdom of God in business, ministry, family, education, and government — whatever level of the prophetic you are currently walking in.',
  },
  {
    question: 'Do I still have to apply and be accepted?',
    answer:
      'No. CAMP is an open space now. Membership is a $20 monthly subscription — you join and you are in, with the live calls and Dr. Todd’s resources from the start, and the ability to register for any specialization tent.',
  },
  {
    question: 'What is a “tent”?',
    answer:
      'A tent is a specialization inside CAMP — a focused twelve-week intensive led by a leader with hands-on experience in that area. There are eight, covering deliverance, spiritual warfare, biblical understanding of the prophetic, maturing the prophetic, apostolic intercession, the High Courts of the Lord, identity, and inner healing.',
  },
  {
    question: 'Are the tents included in my $20 membership?',
    answer:
      'No — membership and tents are priced separately. The $20 a month covers the community, the twice-monthly calls, Dr. Todd’s resources, mission trip access, and book previews. Each specialization tent is its own twelve-week program with its own cost, and you need to be a CAMP member to register for one.',
  },
  {
    question: 'Can I register for more than one tent?',
    answer:
      'Yes. Each tent enrols separately, so how many you take on is up to the season you are in and the capacity you have.',
  },
  {
    question: 'Do I need to be an experienced prophetic minister?',
    answer:
      'No. CAMP exists for people at every level. Some members are stepping into the prophetic for the first time; others have carried it for decades. The tents are built to meet people where they are.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. It is a monthly subscription, not a contract or a season-long commitment.',
  },
]
