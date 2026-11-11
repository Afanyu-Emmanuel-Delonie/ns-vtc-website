// Seeds Firestore with sample jobs and applications for local/dev use.
//
// Usage:
//   1. Create an admin user in Firebase Console (Auth > Users) — rules require
//      a signed-in user to write jobs.
//   2. Put NEXT_PUBLIC_FIREBASE_* vars plus ADMIN_EMAIL and ADMIN_PASSWORD into .env.local.
//   3. Run: npm run seed

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!firebaseConfig.projectId) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_* env vars. Copy .env.example to .env.local and fill it in.");
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("Missing ADMIN_EMAIL / ADMIN_PASSWORD env vars. Add them to .env.local — they must match an existing Firebase Auth user.");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const jobs = [
  {
    slug: "welding-fabrication-instructor",
    department: "TVET",
    title: "Welding & Fabrication Instructor",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description: "Deliver hands-on welding and metal fabrication training to TVET students. Develop lesson plans, assess student progress and maintain workshop safety standards.",
    body: "We are looking for an experienced welder and fabricator who is passionate about passing on their trade skills to the next generation. You will work in our practical workshop at NS-VTC in Bugesera, delivering structured lessons and guiding students through real fabrication projects.",
    responsibilities: [
      "Plan and deliver practical welding and fabrication lessons",
      "Assess and record student progress against competency standards",
      "Maintain a safe and well-organised workshop environment",
    ],
    requirements: [
      "3+ years industry experience in welding or metal fabrication",
      "Trade certificate or equivalent vocational qualification",
      "Strong commitment to workplace safety",
    ],
    qualifications: [
      "Certificate or Diploma in Welding, Metal Fabrication or related trade",
      "Fluency in Kinyarwanda; English or French an advantage",
    ],
  },
  {
    slug: "hse-trainer",
    department: "HSE",
    title: "HSE Trainer",
    type: "Full-time",
    location: "Bugesera, Rwanda",
    description: "Facilitate Health, Safety & Environment courses for public and corporate cohorts. Develop training materials and conduct practical safety assessments.",
    body: "NS-VTC is looking for a qualified HSE professional to deliver our Health, Safety & Environment training programs across public cohorts and corporate clients.",
    responsibilities: [
      "Facilitate HSE training courses for public and corporate groups",
      "Develop and update training materials, presentations and assessments",
      "Evaluate and certify participant competency",
    ],
    requirements: [
      "NEBOSH, IOSH or equivalent HSE certification",
      "2+ years experience delivering HSE training",
    ],
    qualifications: [
      "NEBOSH General Certificate or equivalent (minimum)",
      "Fluency in Kinyarwanda and English",
    ],
  },
];

const applications = [
  {
    id: "seed-application-1",
    firstName: "Jean",
    lastName: "Uwimana",
    phone: "+250788000001",
    email: "jean.uwimana@example.com",
    district: "Bugesera",
    province: "Eastern Province",
    course: "Welding (6 Months)",
    accommodation: "Yes",
    message: "Looking forward to the next intake.",
  },
  {
    id: "seed-application-2",
    firstName: "Marie",
    lastName: "Mukamana",
    phone: "+250788000002",
    email: "",
    district: "Nyagatare",
    province: "Eastern Province",
    course: "Tailoring (6 Months)",
    accommodation: "Not sure yet",
    message: "",
  },
];

async function main() {
  console.log(`Signing in as ${ADMIN_EMAIL}...`);
  await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);

  console.log(`Seeding ${jobs.length} jobs...`);
  for (const { slug, ...data } of jobs) {
    await setDoc(doc(db, "jobs", slug), { ...data, archived: false, updatedAt: serverTimestamp() });
  }

  console.log(`Seeding ${applications.length} applications...`);
  for (const { id, ...data } of applications) {
    await setDoc(doc(db, "applications", id), { ...data, createdAt: serverTimestamp() });
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
