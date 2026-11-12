import { CONTACT } from "../../constants";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  relatedHref: string;
  relatedLabel: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "welding-training-bugesera-guide",
    title: "Welding Training in Bugesera: What to Expect",
    excerpt:
      "What NS-VTC's welding course in Bugesera actually covers, who it's for, and what to do before you apply.",
    publishedAt: "2026-11-17",
    relatedHref: "/programs/welding",
    relatedLabel: "View the Welding Training course",
    sections: [
      {
        paragraphs: [
          "Welding is one of the most in-demand practical trades in Rwanda's construction and manufacturing sectors. NS-VTC's Welding course, delivered at our campus in Rilima Sector, Bugesera District, is a six-month, hands-on program built around real workshop practice rather than classroom theory alone.",
        ],
      },
      {
        heading: "What you'll learn",
        paragraphs: ["The course is structured around nine core areas:"],
        list: [
          "Introduction to welding and metal fabrication",
          "Identification of welding tools and equipment",
          "Welding safety and PPE",
          "Metal preparation and measurement",
          "Basic welding techniques",
          "Metal cutting and joining",
          "Welding joints and fabrication",
          "Practical welding exercises",
          "Workshop safety and equipment maintenance",
        ],
      },
      {
        heading: "Who this course is for",
        paragraphs: [
          "You don't need prior welding experience to start. The course is open to young people and adults who want a practical trade skill, with training conducted in Kinyarwanda and English. What matters more than prior experience is a willingness to show up consistently for practical sessions and follow workshop safety procedures — PPE is required throughout.",
        ],
      },
      {
        heading: "Where it can take you",
        paragraphs: ["Graduates typically pursue roles such as:"],
        list: ["Welder", "Metal Fabrication Assistant", "Workshop Technician", "Self-Employed Metalworker"],
      },
      {
        heading: "Before you apply",
        paragraphs: [
          "Training schedules, current fees and intake dates change, so the most reliable next step is to contact NS-VTC directly rather than relying on secondhand information. You can reach us by phone or WhatsApp at " +
            CONTACT.primaryPhone +
            ", by email at " +
            CONTACT.email +
            ", or in person at our campus in " +
            CONTACT.address.full +
            ". Accommodation is available for both male and female trainees who need it.",
        ],
      },
    ],
  },
  {
    slug: "affordable-hse-training-rwanda",
    title: "Affordable, Practical HSE Training in Rwanda",
    excerpt:
      "Workplace safety training doesn't have to mean a $5,000 international course. Here's what NS-VTC's local HSE program actually covers.",
    publishedAt: "2026-11-24",
    relatedHref: "/programs/hse",
    relatedLabel: "View the HSE Training program",
    sections: [
      {
        paragraphs: [
          "Search for \"HSE training Rwanda\" and most of what comes up is international providers running multi-day courses in Kigali priced in US dollars, aimed at large corporate budgets. That's a real option for some companies, but it isn't the only way to get genuinely useful Health, Safety and Environment training in Rwanda.",
          "NS-VTC runs a three-month HSE program at our campus in Bugesera District, built for individuals and organisations who need practical, locally delivered safety training without the price tag of a flown-in international certification course.",
        ],
      },
      {
        heading: "What the course covers",
        paragraphs: [],
        list: [
          "Occupational Health & Safety — workplace principles, responsibilities and safe working environments",
          "Hazard Identification & Risk Assessment",
          "Personal Protective Equipment — selection, use, inspection and maintenance",
          "Fire Safety & Emergency Response",
          "Workplace Safety Procedures",
          "Accident Prevention & Reporting",
          "Environmental Awareness",
        ],
      },
      {
        heading: "Who should join",
        paragraphs: [
          "The program is open to safety enthusiasts building a career in the field, construction workers formalising their safety knowledge, job seekers who want to improve their employability, employees who want better workplace safety awareness, and supervisors or team leaders who need to understand their safety obligations.",
        ],
      },
      {
        heading: "Career pathways",
        paragraphs: ["Graduates typically move into roles such as:"],
        list: [
          "HSE Assistant",
          "Safety Assistant",
          "Workplace Safety Representative",
          "Site Safety Support Personnel",
          "Environmental Safety Support Personnel",
        ],
      },
      {
        heading: "For companies",
        paragraphs: [
          "NS-VTC also runs corporate HSE training for businesses, contractors and institutions that want to build a safety-aware workforce without sending staff away for training. Contact us to discuss a tailored program for your organisation.",
        ],
      },
      {
        heading: "Get in touch",
        paragraphs: [
          "Contact NS-VTC at " +
            CONTACT.primaryPhone +
            " or " +
            CONTACT.email +
            " for current intake dates and fees. We're located at " +
            CONTACT.address.full +
            ".",
        ],
      },
    ],
  },
  {
    slug: "how-to-apply-ns-vtc-admissions-guide",
    title: "How to Apply to NS-VTC: A Step-by-Step Admissions Guide",
    excerpt:
      "Everything you need to know about applying to NS-VTC — the five-step process, entry requirements and accommodation.",
    publishedAt: "2026-12-01",
    relatedHref: "/admissions",
    relatedLabel: "View the full Admissions page",
    sections: [
      {
        paragraphs: [
          "If you're considering training at NS-VTC in Bugesera, here's exactly what the application process looks like, from choosing a course to your first day.",
        ],
      },
      {
        heading: "The five-step process",
        paragraphs: [],
        list: [
          "1. Choose your course — browse our TVET trades, HSE training or corporate courses and pick the one that matches your goals.",
          "2. Contact us — reach out by phone or email to confirm the next intake date, course availability and any entry requirements.",
          "3. Submit your application — complete the online registration form, or visit us in person at our campus.",
          "4. Confirm your place — once your application is reviewed, you'll receive confirmation and your start date.",
          "5. Begin training — arrive on your start date ready to learn.",
        ],
      },
      {
        heading: "Entry requirements",
        paragraphs: [
          "NS-VTC is open to young people and adults seeking skills development. No specific academic qualifications are required for most TVET programs. Training is conducted in Kinyarwanda and English. Full attendance and participation in practical sessions is expected, and trainees must wear appropriate personal protective equipment during practical sessions.",
        ],
      },
      {
        heading: "Accommodation",
        paragraphs: [
          "Accommodation is available for both male and female trainees. Contact us to confirm availability and any associated arrangements before your intake date.",
        ],
      },
      {
        heading: "A note on outcomes",
        paragraphs: [
          "Our training is designed to prepare learners for employment and self-employment opportunities — but like any training institution, we can't guarantee a job at the end of it. What we can offer is practical, hands-on instruction in a real workshop environment.",
        ],
      },
      {
        heading: "Ready to start?",
        paragraphs: [
          "Contact us at " +
            CONTACT.primaryPhone +
            " or " +
            CONTACT.email +
            ", or visit our campus at " +
            CONTACT.address.full +
            ".",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
