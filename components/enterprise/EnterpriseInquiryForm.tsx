"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { joinWaitlist } from "@/lib/api/waitlist";

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1,000 employees",
  "1,000+ employees",
] as const;

const DEMO_URL = "https://calendly.com/rdhakad2002/30min";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a8275] transition-colors group-focus-within:text-[#315EEA]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function EnterpriseInquiryForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return fullName.trim() && email.trim() && companySize.trim() && message.trim();
  }, [fullName, email, companySize, message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const summary = [
      `Enterprise inquiry from: ${fullName.trim()}`,
      `Email: ${email.trim()}`,
      `Company size: ${companySize.trim()}`,
      "",
      "Message:",
      message.trim(),
    ].join("\n");

    try {
      await joinWaitlist({
        email: email.trim(),
        comments: summary,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#221f1b]">Request received</p>
            <p className="text-[12px] text-[#8a8275]">We&apos;ll respond within 1 business day</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#ece8e0] bg-[#faf8f5] px-4 py-3.5">
          <p className="text-[13px] leading-relaxed text-[#6d665d]">
            We captured your enterprise inquiry. Want to skip the wait? Book a tailored demo directly.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link
            href={DEMO_URL}
            target="_blank"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-[#315EEA] text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(49,94,234,0.2)] transition-all hover:bg-[#264fd4]"
          >
            Book demo
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-[#ddd7ca] text-[13px] font-medium text-[#6d665d] transition-all hover:bg-[#faf8f5]"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const inputBase =
    "h-10 w-full rounded-xl border border-[#e0dbd3] bg-[#faf8f5] px-3.5 text-[13px] text-[#221f1b] outline-none transition-all duration-200 placeholder:text-[#b0a898] hover:border-[#d0c9bd] focus:border-[#315EEA]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(49,94,234,0.06)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="Name">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Smith"
            className={inputBase}
          />
        </FormField>
        <FormField label="Work email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={inputBase}
          />
        </FormField>
      </div>

      <FormField label="Company size">
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(138%2C130%2C117%2C0.5)%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-9 ${!companySize ? "text-[#b0a898]" : ""}`}
        >
          <option value="" disabled>
            Select size
          </option>
          {COMPANY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="How can we help?">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your support workflow, channels, and what you need from an enterprise deployment..."
          rows={3}
          className={`${inputBase} h-auto min-h-[88px] resize-none py-2.5 leading-relaxed`}
        />
      </FormField>

      {error ? (
        <p className="text-[12px] font-medium text-red-500">{error}</p>
      ) : null}

      <div className="space-y-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-[#221f1b] text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#1a1816] hover:shadow-[0_8px_24px_rgba(34,31,27,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit inquiry
              <Send className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b0a898]">
          <span>or</span>
          <Link
            href={DEMO_URL}
            target="_blank"
            className="text-[#8a8275] underline decoration-[#ddd7ca] underline-offset-2 transition-colors hover:text-[#315EEA]"
          >
            book a demo
          </Link>
          <span>&middot;</span>
          <Link
            href="mailto:team@verlyai.xyz"
            className="text-[#8a8275] underline decoration-[#ddd7ca] underline-offset-2 transition-colors hover:text-[#315EEA]"
          >
            email us
          </Link>
        </div>
      </div>
    </form>
  );
}

export default EnterpriseInquiryForm;
