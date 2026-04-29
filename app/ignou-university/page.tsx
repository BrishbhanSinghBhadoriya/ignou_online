"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EnquiryModal from "@/components/EnquiryModal";
import AccreditationSlider from "@/components/AccreditationSlider";

// ── Types ──────────────────────────────────────────────────────────────
interface Program {
  title: string;
  specialization?: string;
  level?: string;
  eligibility: string;
  duration: string;
  fee: string;
  type?: string;
  image: string;
}

interface AdmissionStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
}

type Feature =
  | {
    type: "highlight";
    points: string[];
  }
  | {
    type: "card";
    title: string;
    desc: string;
    img: string;
  };

interface Advantage {
  text: string;
  title?: string;
}

interface NavTab {
  label: string;
}

// ── Helpers (Mobile-only components) ────────────────────────────────────
function InlineMobileEnquiry({ campaign }: { campaign: string }) {
  const router = useRouter();
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];
  const courses = [
    "Online MBA", "Online M.Com", "Online MCA", "Online MA", "Online M.Sc (Mathematics)", "Online BCA", "Online BBA", "Online BA"
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [prog, setProg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          state,
          program: prog,
          url: currentUrl,
          source: currentUrl,
          campaign,
          university: "Ignou University",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Failed to submit");
      setName(""); setEmail(""); setPhone(""); setState(""); setProg("");

      // Google Ads conversions ke liye `from=google` set karein.
      const searchParams = new URLSearchParams(window.location.search);
      const hasGclid = Boolean(searchParams.get("gclid"));
      const redirectSource =
        (campaign === "Google_search" || hasGclid) ? "google" : "meta";
      router.push(`/thanks?from=${redirectSource}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-center mb-3">
        <div className="text-gray-900 font-bold text-base md:text-lg">Speak to an admission counsellor</div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-teal-600 font-semibold text-xs md:text-sm">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Online Exam
          </span>
          <span className="flex items-center gap-1 text-teal-600 font-semibold text-xs md:text-sm">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Placement Assistance
          </span>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400" placeholder="Enter Name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400" placeholder="Enter email" required />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400" placeholder="Enter Phone No." required />
        <div className="relative">
          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white text-gray-700" required>
            <option value="" disabled>Select State</option>
            {indianStates.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
        <div className="relative">
          <select value={prog} onChange={(e) => setProg(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white text-gray-700">
            <option value="" disabled>Select Course</option>
            {courses.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
          <svg className="w-6 h-6 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          <span className="text-gray-600 text-xs">Only a certified mentor will assist you</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">I authorize a representative to contact me via phone and/or email. This will override registry on DND/NDNC.</p>
        {error && <div className="text-red-600 text-sm font-bold text-center">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition-all">
          {loading ? "Your enquiry is being submitted..." : "Apply Now"}
        </button>
      </form>
    </>
  );
}

function MobileAccreditationSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % accreditations.length), 2500);
    return () => clearInterval(id);
  }, []);
  const item = accreditations[i];
  return (
    <div className="md:hidden flex justify-center mb-8">
      <div className="bg-white px-10 py-7 rounded-2xl shadow-md border border-gray-200 w-[260px] flex items-center justify-center transition-all">
        <img src={item.img} alt={item.name} className="h-20 w-auto object-contain" />
      </div>
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────
const navTabs: NavTab[] = [
  { label: "MBA" },
  { label: "M.Com" },
  { label: "MCA" },
  { label: "BBA" },
  { label: "BCA" },
  { label: "BCom" },
];

const accreditations = [
  { name: "NIRF", img: "/NIRF.png" },
  { name: "AICTE", img: "/AICTE.png" },
  { name: "AIU", img: "/AIU.png" },
  { name: "UGC", img: "/UGC.png" },
  { name: "NAAC", img: "/NAAC.png" },

];

const features: Feature[] = [
  
  {
    type: "card",
    img: "/Holistic.png",
    title: "Wide reach & flexible learning",
    desc: "Learn with flexibility as per programme structure.",
  },
  {
    type: "card",
    img: "/Academic.png",
    title: "Curriculum & study material",
    desc: "Programme structure as per official guidelines.",
  },
  {
    type: "card",
    img: "/Build.png",
    title: "Self-paced approach",
    desc: "Designed to support working learners.",
  },
];

const advantages: Advantage[] = [
  { text: "Workshops & Seminars: Live workshops are organized on a weekly/monthly basis." },
  { text: "Exposure to Industry Experts: We are partnered with leading companies globally." },
  { text: "Centre Instrumentation Facility, Industry Sponsored & Collaborated Labs for hands-on learning." },

  { text: "Flexible Schedule: Online students will still receive a world class education in your learning." },
  { text: "Access to exclusive content: Free access to online courses, case studies, and journals." },
];


const programs: Program[] = [
  // PG Courses (Masters)
  {
    title: "Online MBA",
    specialization: "13 Specilizations",
    eligibility: "Bachelor's Degree",
    duration: "2 Years ",
    fee: "Rs. ₹ 37,800",
    type: "PG",
    image: "/OnlineMBA.jpg",
  },
  {
    title: "Dual MBA",
    eligibility: "Bachelor's Degree",
    duration: "2 Years ",
    fee: "Rs. ₹ 24,000",
    type: "PG",
    image: "/OnlineMCom.jpg",
  },
  {
    title: "1 Year MBA",
    eligibility: "Bachelor's Degree",
    duration: "1 Years ",
    fee: "Rs. ₹ 40,000",
    type: "PG",
    image: "/OnlineMCA.jpg",
  },
  {
    title: "Online MCA",
    eligibility: "Graducation from BCA/B.Sc",
    duration: "2 Years ",
    fee: "Rs. ₹ 48,000",
    type: "PG",
    image: "/OnlineMA.jpg",
  },
  {
    title: "Online M.COM ",
    eligibility: "Bachelor's Degree",
    duration: "2 Years ",
    fee: "Rs. ₹ 16200",
    type: "PG",
    image: "/OnlineBBA.jpg",
  },
  // UG Courses (Bachelor's)
  {
    title: "Online BBA",
    eligibility: "10+2 from recognized board",
    duration: "3 Years ",
    fee: "Rs. 27,000",
    type: "UG",
    image: "/OnlineBCA.jpg",
  },
  {
    title: "Online B.Com",
    eligibility: "10+2 of Equivalent qualification",
    duration: "3 Years ",
    fee: "Rs. 10,500",
    type: "UG",
    image: "/OnlineBBA.jpg",
  },
  {
    title: "Online BCA",
    eligibility: "10+2 of its equivalent",
    duration: "3 Years ",
    fee: "Rs. 40,200",
    type: "UG",
    image: "OnlineMCom.jpg",
  },
];
const tabs = ["All Courses", "UG Courses", "PG Courses"];
const steps = [
  {
    title: "Step 1",
    description: "Visit the official IGNOU website.",
  },
  {
    title: "Step 2",
    description:
      "Open the admissions section for the current session.",
  },
  {
    title: "Step 3",
    description:
      "Fill the application form, upload documents, and pay fees as per official instructions.",
  },
  {
    title: "Step 4",
    description:
      "Save your registration/enrolment details for future reference.",
  },
];

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png" },

  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png" },
];

// Duplicate for seamless infinite loop
const doubled = [...companies, ...companies];


// ── Main Component ──────────────────────────────────────────────────────
export default function IgnouOnlinePage() {
  const [activeTab, setActiveTab] = useState<string>("All Courses");
  const [enquiryOpen, setEnquiryOpen] = useState<boolean>(false);
  const [enquiryProgram, setEnquiryProgram] = useState<string | null>(null);
   
useEffect(() => {
  const timer = setTimeout(() => {
    setEnquiryProgram(null);
    setEnquiryOpen(true);
  }, 3000);
  return () => clearTimeout(timer);
}, []);
  const filteredPrograms = programs.filter((p) => {
    if (activeTab === "All Courses") return true;
    if (activeTab === "UG Courses") return p.type === "UG";
    if (activeTab === "PG Courses") return p.type === "PG";
    return true;
  });


  return (
    <div className="min-h-screen bg-white">

      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-2 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="Ignou Logo"
              className="h-15 w-45 object-contain"
            />
          </div>

          {/* Button */}
          <button
            onClick={() => {
              setEnquiryProgram(null);
              setEnquiryOpen(true);
            }}
            className="bg-yellow-400 hover:bg-yellow-600 text-black px-3 py-2 rounded-md text-sm md:text-base transition-all shadow-md"
          >
            Apply Now
          </button>

        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-blue-50 pt-12 pb-16 min-h-[70vh] flex items-center">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center w-full">
          {/* Left */}
          <div>
            <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              ONLINE PROGRAMMES FROM IGNOU <br />

            </h1>

            {/* Program pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {navTabs.map((t) => (
                <span
                  key={t.label}
                  className="bg-blue-50 text-blue-500 text-xs md:text-sm font-semibold px-3 py-1 rounded-full border border-blue-500"
                >
                  {t.label}
                </span>
              ))}
            </div>

           
            <div className="mb-4 md:hidden">
              <img
                src="/ignou.jpg"
                alt="Ignou Campus"
                className="w-full h-56 object-cover rounded-lg shadow"
              />
            </div>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  setEnquiryProgram(null);
                  setEnquiryOpen(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-600 text-black px-5 py-2.5 rounded-md text-sm md:text-base transition-all"
              >
                Download Brochure
              </button>
              <button
                onClick={() => {
                  setEnquiryProgram(null);
                  setEnquiryOpen(true);
                }}
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold px-5 py-2.5 rounded-md text-sm md:text-base transition-all"
              >
                Apply Now
              </button>

            </div>

            {/* Countdown */}
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2">

              <span className="text-blue-500 bg-blue-50 text-1xl font-bold md:text-base">Get guidance from an admission counsellor</span>
            </div>
            {/* Mobile-only inline enquiry form after buttons and admission note */}
            <div className="mt-4 md:hidden bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
              <InlineMobileEnquiry campaign="Google_search" />
            </div>
          </div>

          {/* Right – building image */}
          <div className="relative hidden md:block">
            <div className=" overflow-hidden shadow-2xl ">
              <img
                src="/ignou.jpg"
                alt="Ignou Campus"
                className="w-full h-[22rem] md:h-[30rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <AccreditationSlider/>

      {/* ─── WHY Ignou ONLINE ────────────────────────────────────────────── */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">

         

          <p className="text-center text-black text-2xl mb-12">
            Reasons to pursue Online Program from IGNOU Online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

            {features.map((f, i) =>
              f.type === "highlight" ? (

                /* blue HIGHLIGHT CARD */
                <div
                  key={`highlight-${i}`}   // ✅ fixed unique key
                  className="bg-white text-white rounded-2xl p-7 flex flex-col h-full shadow-md"
                >
                 
                </div>

              ) : (

                /* NORMAL GREY CARD */
                <div
                  key={f.title}   // ✅ MAIN FIX (this removed your error)
                  className="bg-white rounded-2xl p-7 flex flex-col h-full shadow-sm"
                >

                  {/* Top Row : Image + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="h-12 w-12 object-contain flex-shrink-0"
                    />

                    <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                      {f.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                    {f.desc}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => {
                      setEnquiryProgram(null);
                      setEnquiryOpen(true);
                    }}
                    className="mt-6 bg-yellow-400 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition w-full">
                    Know More
                  </button>

                </div>

              )
            )}

          </div>
        </div>
      </section>

      {/* ─── ONLINE PROGRAMS ADVANTAGES ─────────────────────────────────── */}
      <section className="py-12 bg-blue-400">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">

          {/* Certificate Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/ignou-bba-certificate.jpg"
              alt="IGNOU BBA Degree Certificate"
              className="w-full max-w-xl h-auto object-contain shadow-2xl rounded-md border border-blue-300"
            />
          </div>

          {/* Advantages List */}
          <div>
            <h2 className="text-4xl md:text-4xl  text-white mb-2">
              Online Programs From Ignou Online
            </h2>

            <p className="text-blue-100 text-2xl mb-6">
              Advantages Other Than Just A Degree
            </p>

            <ul className="space-y-5 border-l-2 border-blue-200 pl-6">
              {advantages.map((a: Advantage, i: number) => (
                <li key={a.text} className="flex flex-col gap-1">
                  
                  <span className="text-white text-1xl leading-relaxed">
                    {a.text}
                  </span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </section>

      {/* ─── PROGRAMS GRID ──────────────────────────────────────────────── */}
<section id="programs" className="py-16 bg-gray-50">
  <div className="max-w-screen-2xl mx-auto px-6 md:px-10">

    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">
      Online U.G and P.G courses
    </h2>

    

    {/* Tabs */}
    <div className="flex gap-3 justify-center mb-10 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
            activeTab === tab
              ? "text-white bg-gradient-to-r from-blue-600 to-yellow-400 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPrograms.map((p) => (
        <div
          key={p.title}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group hover:-translate-y-1"
        >

          {/* Image */}
          <div className="relative overflow-hidden h-44">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">

            {/* Title + specialization */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-black font-bold text-lg leading-tight">
                {p.title}
              </h3>

              {p.specialization && (
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-md whitespace-nowrap">
                  {p.specialization}
                </span>
              )}
            </div>

           

            {/* UG / PG badge */}
            {p.level && (
              <div className="text-center">
                <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full">
                  {p.level} Program
                </span>
              </div>
            )}

            {/* Details */}
            <div className="space-y-1.5 pt-2 border-t">
              <div className="flex gap-2 text-xs text-gray-600">
                <span className="font-bold text-gray-800">Eligibility:</span>
                <span>{p.eligibility}</span>
              </div>

              <div className="flex gap-2 text-xs text-gray-600">
                <span className="font-bold text-gray-800">Duration:</span>
                <span>{p.duration}</span>
              </div>

              <div className="flex gap-2 text-xs text-gray-600">
                <span className="font-bold text-gray-800">Fees:</span>
                <span className="text-gray-700 ">{p.fee}</span>
              </div>

               {/* Apply button */}
            <button
              onClick={() => {
                setEnquiryProgram(p.title);
                setEnquiryOpen(true);
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all"
            >
              Apply Now
            </button>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>
</section>

      <section className="py-24 bg-gray-100">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
      Admission Process
    </h2>

    <div className="bg-white rounded-2xl shadow-md px-6 md:px-10 py-10 md:py-20">

      {/* ── MOBILE: Vertical Stack ── */}
      <div className="flex flex-col md:hidden">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-blue-400 my-1" />
              )}
            </div>

            <div className="pb-8">
              <p className="font-bold text-gray-800 text-base mb-1">{step.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: Horizontal Timeline ── */}
      <div className="hidden md:block">

        {/* Titles */}
        <div
          className="grid text-center mb-0"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
        >
          {steps.map((step, i) => (
            <div key={i} className="px-4">
              <p className="font-bold text-gray-800 text-base">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Line + Dots */}
        <div className="relative flex items-center my-5">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-blue-400" />
          <div
            className="relative w-full grid"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
          >
            {steps.map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="relative z-10 w-5 h-5 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Descriptions */}
        <div
          className="grid text-center"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
        >
          {steps.map((step, i) => (
            <div key={i} className="px-4">
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  </div>
</section>

      {/* ─── LEARNERS WORK AT ────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
        <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Our learners work at</h2>
          <p className="text-gray-500 text-2xl">Top hiring partners of Ignou Online</p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {doubled.map((c, i) => (
              <div
                key={i}
                className="mx-5 bg-white rounded-xl px-8 py-4 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-center"
                style={{ minWidth: "160px", height: "72px" }}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-8 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA CONNECT ─────────────────────────────────────────────────── */}
      

      {/* ─── MOBILE STICKY CTA ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex w-full">
          <button
            onClick={() => {
              setEnquiryProgram(null);
              setEnquiryOpen(true);
            }}
            className="flex-1 bg-yellow-500 text-black py-3 text-center font-bold"
          >
            Apply Now
          </button>
          
        </div>
      </div>

      

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}

      <footer className="bg-black py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">

          <div className="border-t border-gray-600 mb-6" />

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Disclaimer: We act as a marketing service partner only. Ignou University hold full rights
            to request change or removal of any non-relevant content. Images used are for illustrative
            purposes and do not directly represent the respective colleges or universities.
          </p>

          <a
            onClick={() => {
              setEnquiryProgram(null);
              setEnquiryOpen(true);
            }}
            className="text-yellow-400 text-sm hover:underline block mb-2"
          >
            Privacy-Policy
          </a>

          <p className="text-gray-400 text-sm">
            © 2025 onlineuniversityadmission.online  | All Rights Reserved
          </p>

        </div>
      </footer>
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} program={enquiryProgram} campaign="Google_search" />
    </div>
  );
}
