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
