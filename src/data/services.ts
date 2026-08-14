export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  features: string[];
  faq: ServiceFaq[];
}

export interface ServiceLocation {
  slug: string;
  name: string;
  region: string;
  headline: string;
  intro: string;
  localContext: string;
}

export const services: Service[] = [
  {
    id: 'unlimited-dev',
    title: 'Unlimited Dev Service',
    description: 'Flat-rate full-stack development. $4,000/month. Apps, AI automation, and integrations for founders and small businesses.',
    longDescription:
      'One flat monthly rate for senior full-stack execution. You get working increments shipped continuously, direct access to me as the developer, and clean ownership of everything we build.',
    price: '$4,000/month',
    features: [
      'One active project at a time with clear scope',
      'Web apps, AI features, and integrations',
      'Working increments shipped continuously',
      'Direct access to the developer — no account managers',
      'Clean, portable code with no lock-in',
      'Plain-language tradeoffs and handoff documentation',
    ],
    faq: [
      {
        question: 'What is the Unlimited Dev Service?',
        answer: 'Flat-rate full-stack development at $4,000/month. You get senior-level engineering for web apps, AI features, and integrations without agency overhead.',
      },
      {
        question: 'What do I get each month?',
        answer: 'One active project at a time with clear scope, working increments shipped continuously, and direct access to me as the developer.',
      },
      {
        question: 'How is this different from hiring an agency or freelancer?',
        answer: 'No hourly billing, no account managers, no scope creep. You pay a flat rate and get direct, senior execution with clean ownership of the code.',
      },
      {
        question: 'What tech stack do you work with?',
        answer: 'Python, Django, JavaScript, Vue, React, Astro, and cloud infrastructure on AWS, GCP, Fly.io, and VPS providers — chosen for portability and no lock-in.',
      },
      {
        question: 'Do you work with non-technical founders?',
        answer: 'Yes. I translate business goals into practical systems, explain tradeoffs in plain language, and hand over clean documentation and ownership.',
      },
    ],
  },
];

export const serviceLocations: ServiceLocation[] = [
  {
    slug: 'atlanta',
    name: 'Atlanta',
    region: 'Georgia',
    headline: 'Full-Stack Development in Atlanta, GA',
    intro: 'Flat-rate full-stack development for Atlanta founders and small businesses that need senior execution without agency bloat.',
    localContext:
      'From Midtown startups to Buckhead small businesses, I help Atlanta teams ship web apps, AI features, and integrations with clear tradeoffs and clean ownership.',
  },
  {
    slug: 'east-point',
    name: 'East Point',
    region: 'Georgia',
    headline: 'Full-Stack Development in East Point, GA',
    intro: 'Flat-rate full-stack development for East Point founders and small businesses, minutes from Hartsfield-Jackson and the Atlanta tech scene.',
    localContext:
      'East Point sits at a growing corridor for local businesses and makers. I help nearby teams ship practical software without the overhead of a big-city agency.',
  },
  {
    slug: 'college-park',
    name: 'College Park',
    region: 'Georgia',
    headline: 'Full-Stack Development in College Park, GA',
    intro: 'Flat-rate full-stack development for College Park founders and small businesses looking for senior, no-lock-in execution.',
    localContext:
      'Close to the airport and a growing base of independent businesses, College Park teams work with me to ship web apps and AI automation at a flat monthly rate.',
  },
  {
    slug: 'hapeville',
    name: 'Hapeville',
    region: 'Georgia',
    headline: 'Full-Stack Development in Hapeville, GA',
    intro: 'Flat-rate full-stack development for Hapeville founders and small businesses that want senior engineering without agency pricing.',
    localContext:
      'Hapeville\u2019s mix of local storefronts and modern teams makes it a natural fit for practical, maintainable software shipped at a predictable monthly cost.',
  },
];

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getServiceLocation(slug: string): ServiceLocation | undefined {
  return serviceLocations.find((location) => location.slug === slug);
}
