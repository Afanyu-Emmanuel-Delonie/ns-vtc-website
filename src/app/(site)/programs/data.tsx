export type Course = {
  slug: string;
  title: string;
  duration: string | null;
  registerLabel: string;
  tagline: string;
  icon: React.ReactNode;
  areas: string[];
  careers: string[];
};

export const tvetCourses: Course[] = [
  {
    slug: "scaffolding",
    title: "Scaffolding",
    duration: null,
    registerLabel: "Scaffolding",
    tagline: "Practical construction access and scaffolding skills.",
    icon: <path d="M4 21V9m16 12V9M4 9h16M4 9l4-5h8l4 5M8 21v-6h8v6" />,
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
    tagline: "Reinforcement steel preparation and installation.",
    icon: <path d="M4 20 20 4M4 4l16 16M9 4v5M4 9h5M15 20v-5M20 15h-5" />,
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
    tagline: "Garment making, sewing and clothing design skills.",
    icon: <path d="M6 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM6 20a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM7.5 5.5 18 18M7.5 18.5 18 6" />,
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
    tagline: "Metal fabrication and welding techniques.",
    icon: <path d="m3 21 7-7M10 14 20.5 3.5a1.5 1.5 0 0 1 2 2L12 16M14 7l3 3M6 16l2 2M3 21l2.5-1.5L3 17.5 2 21Z" />,
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
    tagline: "Woodworking, furniture making and construction skills.",
    icon: <path d="m14.5 2.5 7 7L9 22H2v-7Z M12.5 4.5l7 7" />,
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
    tagline: "Surface preparation and professional painting techniques.",
    icon: <path d="M19 11h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v3a2 2 0 1 1-4 0v-3H7a4 4 0 0 1-4-4V4h12v7Z" />,
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
    tagline: "Bricklaying, concrete work and building construction.",
    icon: <path d="M3 21h18M4 21V11h7v10M11 21V11h9v10M7 11V5h9v6" />,
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
