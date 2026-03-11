"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  program?: string | null;
};

const indianStates: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const courses: string[] = [
  "Online MBA","MBA(Dual Specilization)", "Online MCA", "Online MCom", "Online BBA",  "Online BCA",  "Online BCom",
 
];

export default function EnquiryModal({ open, onClose, program }: Props) {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [prog, setProg] = useState<string>(program ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const PHONE = "7042646766";

  useEffect(() => {
    setProg(program ?? "");
  }, [program]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
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
          campaign: "meta",
          university: "Ignou University",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Failed to submit");
      setSuccess("Thanks! Your enquiry has been submitted.");
      setName(""); setEmail(""); setPhone(""); setState(""); setProg("");
      // Redirect to thank you page after a short delay to show success state (optional, but requested redirect)
      setTimeout(() => {
        router.push("/thanks");
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Close Button */}
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none font-bold"
          >
            ×
          </button>
        </div>

        

        {/* Heading */}
        <h2 className=" text-center text-gray-900 font-bold text-base md:text-lg px-6">
          Speak to an admission counsellor
        </h2>
        <h2 className=" text-center text-blue-500 font-bold text-base md:text-lg px-6">
          Avail No Cost EMI's
        </h2>
        {/* Badges */}
       <div className="flex justify-center gap-4 mt-2 mb-4 flex-wrap">
  {/* First badge */}
  <span className="flex items-center gap-1 text-teal-600 font-semibold text-xs md:text-sm">
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    Online Exam
  </span>

  {/* Second badge */}
  <span className="flex flex-col items-center text-teal-600 font-semibold text-xs md:text-sm max-w-[120px]">
    <span className="flex items-center gap-1 justify-center">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Placement/Career
    </span>
    <span className="text-center">
      Support (as applicable)
    </span>
  </span>
</div>

        {/* Form */}
        <form onSubmit={submit} className="px-6 pb-6 space-y-3">

          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter Name"
            required
          />

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter email"
            required
          />

          {/* Phone */}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter Phone No."
            required
          />

          {/* State Dropdown */}
          <div className="relative">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white text-gray-700"
              required
            >
              <option value="" disabled>Select State</option>
              {indianStates.map((s: string) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {/* Custom chevron */}
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Course Dropdown */}
          <div className="relative">
            <select
              value={prog}
              onChange={(e) => setProg(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white text-gray-700"
            >
              <option value="" disabled>Select Course</option>
              {courses.map((c: string) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Certified Mentor Info Box */}
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
            <svg className="w-6 h-6 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-gray-600 text-xs">Only a certified mentor will assist you</span>
          </div>

          {/* DND Text */}
          <p className="text-gray-500 text-xs leading-relaxed">
            I authorize a representative to contact me via phone and/or email. This will override registry on DND/NDNC.
          </p>

          {/* Success / Error */}
          {success && (
            <div className="text-green-600 text-sm font-bold text-center">{success}</div>
          )}
          {error && (
            <div className="text-red-600 text-sm font-bold text-center">{error}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-1">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-3 px-12 rounded-full text-sm transition-all"
            >
              {loading ? "Your enquiry is being submitted..." : "Apply Now"}
            </button>
          </div>

        </form>
      </div>
      {success ? (
        <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-green-200 w-full max-w-sm p-6 text-center">
            <div className="text-green-600 font-extrabold text-lg mb-2">Submission Successful</div>
            <div className="text-gray-600 text-sm mb-5">
              Our team will contact you shortly. You can also reach us directly now.
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${PHONE}`}
                onClick={() => {
                  setSuccess(null);
                  onClose();
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm"
              >
                Call {PHONE}
              </a>
              <a
                href={`https://wa.me/91${PHONE}?text=${encodeURIComponent(
                  `Hi, I submitted an enquiry for ${prog || "Ignou Online"}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setSuccess(null);
                  onClose();
                }}
                className="flex-1 bg-[#25D366] hover:brightness-95 text-white font-bold py-2.5 rounded-lg text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
