// ---------------------------------------------------------------------------
// Site
// ---------------------------------------------------------------------------

export const SITE_NAME = "NS-VTC";
export const SITE_FULL_NAME = "Newton Safety and Vocational Training Center";
export const SITE_TAGLINE = "Build Your Skills. Secure Your Future.";

export const CONTACT = {
  phones: ["+250 788 986 489", "+250 799 528 247", "+250 799 524 906"],
  phoneHrefs: ["tel:+250788986489", "tel:+250799528247", "tel:+250799524906"],
  primaryPhone: "+250 788 986 489",
  primaryPhoneHref: "tel:+250788986489",
  email: "newtonvtc@gmail.com",
  emailHref: "mailto:newtonvtc@gmail.com",
  address: {
    line1: "Rilima Sector, Bugesera District",
    line2: "Eastern Province, Rwanda",
    full: "Rilima Sector, Bugesera District, Eastern Province, Rwanda",
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  x: "#",
  linkedin: "#",
} as const;

// ---------------------------------------------------------------------------
// TVET Courses (/programs, /programs/tvet, /programs/[slug])
// ---------------------------------------------------------------------------

export type Course = {
  slug: string;
  title: string;
  duration: string | null;
  registerLabel: string;
  tagline: string;
  image: string;
  areas: string[];
  careers: string[];
};

export const tvetCourses: Course[] = [
  {
    slug: "scaffolding",
    title: "Scaffolding",
    duration: null,
    registerLabel: "Scaffolding",
    tagline: "Learn to safely erect, dismantle and inspect scaffolding structures used on construction sites, with a strong focus on working at heights and fall prevention.",
    image: "/assets/courses/scaffolding.jpg",
    areas: [
      "Introduction to scaffolding systems and components",
      "Identification of scaffolding tools and equipment",
      "Scaffold assembly and dismantling",
      "Working at heights and fall prevention",
      "Scaffold inspection and maintenance",
      "Safe working procedures and PPE",
      "Practical scaffolding exercises",
    ],
    careers: ["Scaffolding Assistant", "Scaffolder", "Construction Site Support Worker"],
  },
  {
    slug: "steel-fixing",
    title: "Steel Fixing",
    duration: null,
    registerLabel: "Steel Fixing",
    tagline: "Master the cutting, bending, placing and tying of reinforcement steel to prepare structural frameworks for concrete construction projects.",
    image: "/assets/courses/steel-fixing.jpg",
    areas: [
      "Identification of reinforcement steel",
      "Construction drawings and reinforcement specifications",
      "Steel cutting and bending",
      "Steel placing and spacing",
      "Reinforcement tying techniques",
      "Preparation of reinforcement structures",
      "Construction site safety",
    ],
    careers: ["Steel Fixer", "Reinforcement Worker", "Construction Site Assistant"],
  },
  {
    slug: "tailoring",
    title: "Tailoring",
    duration: "6 Months",
    registerLabel: "Tailoring (6 Months)",
    tagline: "Develop garment-making skills from taking measurements and pattern cutting through to operating sewing machines and producing finished clothing.",
    image: "/assets/hero2.png",
    areas: [
      "Introduction to tailoring and fashion design",
      "Identification and use of sewing tools",
      "Taking body measurements",
      "Pattern making and fabric cutting",
      "Operating sewing machines",
      "Garment construction and stitching",
      "Clothing repairs and alterations",
      "Finishing techniques and quality control",
      "Basic business and entrepreneurship skills",
    ],
    careers: ["Tailor", "Sewing Machine Operator", "Garment Maker", "Clothing Repair Specialist", "Self-Employed Fashion Entrepreneur"],
  },
  {
    slug: "welding",
    title: "Welding",
    duration: "6 Months",
    registerLabel: "Welding (6 Months)",
    tagline: "Gain hands-on experience in metal fabrication, welding joints, cutting and workshop safety, building the skills needed for a career in metalwork.",
    image: "/assets/courses/welding.jpg",
    areas: [
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
    careers: ["Welder", "Metal Fabrication Assistant", "Workshop Technician", "Self-Employed Metalworker"],
  },
  {
    slug: "carpentry",
    title: "Carpentry",
    duration: null,
    registerLabel: "Carpentry",
    tagline: "Learn woodworking fundamentals including measuring, cutting, joining and finishing, covering furniture construction, door fitting and workshop safety.",
    image: "/assets/courses/carpentry.jpg",
    areas: [
      "Introduction to carpentry and woodworking",
      "Identification of wood types and materials",
      "Use of carpentry tools and equipment",
      "Measuring, marking and cutting wood",
      "Wood joining techniques",
      "Furniture construction",
      "Door and window installation",
      "Wood finishing and polishing",
      "Workshop safety",
    ],
    careers: ["Carpenter", "Furniture Maker", "Woodworking Assistant", "Self-Employed Craftsperson"],
  },
  {
    slug: "painting",
    title: "Painting",
    duration: null,
    registerLabel: "Painting",
    tagline: "Build professional painting skills covering surface preparation, paint mixing, interior and exterior application, and decorative finishing techniques.",
    image: "/assets/courses/painting.jpg",
    areas: [
      "Introduction to painting and decoration",
      "Identification of paints and painting materials",
      "Surface preparation and cleaning",
      "Wall filling, sanding and smoothing",
      "Paint mixing and colour selection",
      "Application of paint using brushes and rollers",
      "Interior and exterior painting",
      "Decorative finishing techniques",
      "Painting equipment maintenance and safety",
    ],
    careers: ["Professional Painter", "Painting Assistant", "Decoration Worker", "Self-Employed Painting Contractor"],
  },
  {
    slug: "masonry",
    title: "Masonry",
    duration: "3 Months",
    registerLabel: "Masonry (3 Months)",
    tagline: "Learn bricklaying, block laying, mortar mixing, plastering and site preparation, practical skills for a career in building and construction.",
    image: "/assets/courses/masonry.jpg",
    areas: [
      "Introduction to masonry and construction",
      "Identification of construction tools and materials",
      "Site preparation and setting out",
      "Mortar and concrete mixing",
      "Bricklaying and block laying",
      "Brick bonds and wall construction",
      "Basic plastering",
      "Construction measurements",
      "Construction site safety",
      "Practical site experience",
    ],
    careers: ["Masonry Assistant", "Bricklayer", "Construction Worker", "Self-Employed Mason"],
  },
];

export function getCourse(slug: string) {
  return tvetCourses.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// HSE Training (/programs/hse)
// ---------------------------------------------------------------------------

export const hseTopics = [
  { title: "Occupational Health & Safety", description: "Workplace health and safety principles, responsibilities and safe working environments.", icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" /> },
  { title: "Hazard Identification & Risk Assessment", description: "Identify workplace hazards, assess risks and recommend appropriate control measures.", icon: <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01" /> },
  { title: "Personal Protective Equipment", description: "Selection, proper use, inspection and maintenance of protective equipment.", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /> },
  { title: "Fire Safety & Emergency Response", description: "Fire prevention, emergency procedures, evacuation and basic response practices.", icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z" /> },
  { title: "Workplace Safety Procedures", description: "Safe working practices, workplace inspections, safety signs and reporting procedures.", icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
  { title: "Accident Prevention & Reporting", description: "Workplace incidents, accident prevention measures and incident reporting.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></> },
  { title: "Environmental Awareness", description: "Environmental responsibilities, waste management, pollution prevention and good practices.", icon: <path d="M2 22a8 8 0 0 1 8-8h.5a8 8 0 0 0 8-8V2a8 8 0 0 1-8 8h-.5a8 8 0 0 0-8 8v4Z" /> },
];

export const whoShouldJoin = [
  { tag: "Interest", title: "Safety Enthusiasts", description: "Individuals interested in occupational health and safety looking to build a career in the field.", icon: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" /> },
  { tag: "Industry", title: "Construction Workers", description: "Site personnel and construction workers seeking to formalise their safety knowledge.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> },
  { tag: "Career", title: "Job Seekers", description: "Those seeking safety-related knowledge to improve their employability and career prospects.", icon: <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /> },
  { tag: "Workplace", title: "Employees", description: "Workers wanting to improve their workplace safety awareness and understanding of safe practices.", icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
  { tag: "Leadership", title: "Supervisors & Team Leaders", description: "Those responsible for teams who need to understand safety obligations and risk management.", icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" /> },
];

export const careerPathways = [
  "HSE Assistant",
  "Safety Assistant",
  "Workplace Safety Representative",
  "Site Safety Support Personnel",
  "Environmental Safety Support Personnel",
];

export const hseRow = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

// ---------------------------------------------------------------------------
// Careers (/careers, /careers/[slug])
// ---------------------------------------------------------------------------

export type JobPosting = {
  slug: string;
  department: string;
  title: string;
  type: string;
  location: string;
  description: string;
  body: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
};

export const openPositions: JobPosting[] = [
  {
    slug: "welding-fabrication-instructor",
    department: "TVET",
    title: "Welding & Fabrication Instructor",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description:
      "Deliver hands-on welding and metal fabrication training to TVET students. Develop lesson plans, assess student progress and maintain workshop safety standards.",
    body:
      "We are looking for an experienced welder and fabricator who is passionate about passing on their trade skills to the next generation. You will work in our practical workshop at NS-VTC in Bugesera, delivering structured lessons and guiding students through real fabrication projects. This is a hands-on role that requires both technical expertise and the ability to communicate clearly and patiently with learners at different levels.",
    responsibilities: [
      "Plan and deliver practical welding and fabrication lessons",
      "Assess and record student progress against competency standards",
      "Maintain a safe and well-organised workshop environment",
      "Prepare and update training materials and lesson plans",
      "Support students with individual learning needs",
      "Participate in curriculum review and institutional activities",
    ],
    requirements: [
      "3+ years industry experience in welding or metal fabrication",
      "Trade certificate or equivalent vocational qualification",
      "Teaching or training experience preferred",
      "Strong commitment to workplace safety",
    ],
    qualifications: [
      "Certificate or Diploma in Welding, Metal Fabrication or related trade",
      "Teaching or training qualification is an advantage",
      "Fluency in Kinyarwanda; English or French an advantage",
    ],
  },
  {
    slug: "carpentry-woodworking-instructor",
    department: "TVET",
    title: "Carpentry & Woodworking Instructor",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description:
      "Teach practical carpentry, furniture making and woodworking skills. Guide students through projects from measurement and cutting to finishing.",
    body:
      "We are seeking a skilled carpenter or woodworker to join our TVET training team. You will deliver practical lessons covering everything from basic measurement and cutting to furniture construction and finishing. The ideal candidate takes pride in their craft and can inspire students to develop both technical skill and professional discipline in the workshop.",
    responsibilities: [
      "Deliver carpentry and woodworking lessons in a practical workshop setting",
      "Guide students through furniture construction and finishing projects",
      "Assess student competency and maintain accurate records",
      "Ensure safe use of all tools and equipment",
      "Develop and update lesson plans and training resources",
      "Contribute to the overall learning environment at NS-VTC",
    ],
    requirements: [
      "3+ years carpentry or woodworking experience",
      "Vocational qualification in carpentry or related trade",
      "Ability to supervise and manage a workshop",
      "Patient and effective communicator",
    ],
    qualifications: [
      "Certificate or Diploma in Carpentry, Joinery or Furniture Making",
      "Teaching qualification is an advantage",
      "Fluency in Kinyarwanda; English or French an advantage",
    ],
  },
  {
    slug: "hse-trainer",
    department: "HSE",
    title: "HSE Trainer",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description:
      "Facilitate Health, Safety & Environment courses for public and corporate cohorts. Develop training materials and conduct practical safety assessments.",
    body:
      "NS-VTC is looking for a qualified HSE professional to deliver our Health, Safety & Environment training programs. You will work with both public cohorts and corporate clients, facilitating engaging and practical courses that meet recognised safety standards. This role requires strong facilitation skills, up-to-date knowledge of HSE regulations, and the ability to adapt content for different audiences and industries.",
    responsibilities: [
      "Facilitate HSE training courses for public and corporate groups",
      "Develop and update training materials, presentations and assessments",
      "Conduct practical safety demonstrations and site-based exercises",
      "Evaluate and certify participant competency",
      "Liaise with corporate clients on training needs and scheduling",
      "Stay current with HSE regulations and best practices",
    ],
    requirements: [
      "NEBOSH, IOSH or equivalent HSE certification",
      "2+ years experience delivering HSE training",
      "Strong facilitation and presentation skills",
      "Experience working with corporate clients preferred",
    ],
    qualifications: [
      "NEBOSH General Certificate or equivalent (minimum)",
      "Diploma or Degree in Occupational Health & Safety is an advantage",
      "Fluency in Kinyarwanda and English",
    ],
  },
  {
    slug: "corporate-training-coordinator",
    department: "Corporate",
    title: "Corporate Training Coordinator",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description:
      "Manage scheduling, client relations and logistics for corporate training engagements. Liaise between clients and trainers to ensure smooth delivery.",
    body:
      "We are looking for an organised and client-focused coordinator to manage our growing portfolio of corporate training programs. You will be the main point of contact for corporate clients, handling everything from initial enquiries and scheduling through to post-training reporting. This role sits at the intersection of client relations and operations, and requires someone who can manage multiple engagements simultaneously while maintaining a high standard of service.",
    responsibilities: [
      "Coordinate scheduling and logistics for all corporate training programs",
      "Serve as the primary point of contact for corporate clients",
      "Liaise between clients and trainers to align on content and delivery",
      "Prepare proposals, contracts and post-training reports",
      "Track client satisfaction and identify opportunities for repeat business",
      "Support the development of new corporate training offerings",
    ],
    requirements: [
      "Diploma in Business Administration or related field",
      "Experience in a client-facing or coordination role",
      "Strong organisational and communication skills",
      "Proficiency in Microsoft Office or Google Workspace",
    ],
    qualifications: [
      "Diploma or Degree in Business, Management or related field",
      "Experience in training coordination or project management is an advantage",
      "Fluency in Kinyarwanda and English",
    ],
  },
  {
    slug: "student-support-officer",
    department: "Administration",
    title: "Student Support Officer",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description:
      "Guide prospective and enrolled students through the application and onboarding process. Provide ongoing pastoral and administrative support throughout training.",
    body:
      "We are seeking a warm, organised and proactive individual to support our students from first enquiry through to graduation. You will be the first point of contact for many prospective students, guiding them through the application process and helping them settle into life at NS-VTC. Once enrolled, you will provide ongoing pastoral and administrative support, working closely with instructors to ensure every student has the best possible experience.",
    responsibilities: [
      "Assist prospective students with applications and enrolment",
      "Conduct student orientations and onboarding sessions",
      "Provide ongoing pastoral support to enrolled students",
      "Maintain accurate student records and databases",
      "Coordinate with instructors on student welfare concerns",
      "Support institutional events and open days",
    ],
    requirements: [
      "Diploma in Education, Administration or related field",
      "Empathetic and effective communicator",
      "Experience in student services or administration preferred",
      "Organised with strong attention to detail",
    ],
    qualifications: [
      "Diploma or Degree in Education, Social Work or Administration",
      "Experience in a school or training institution is an advantage",
      "Fluency in Kinyarwanda; English or French an advantage",
    ],
  },
];

export const deptColors: Record<string, string> = {
  TVET: "bg-navy/10 text-navy",
  HSE: "bg-orange/10 text-orange",
  Corporate: "bg-emerald-100 text-emerald-700",
  Administration: "bg-purple-100 text-purple-700",
};

export function getPosition(slug: string) {
  return openPositions.find((p) => p.slug === slug);
}
