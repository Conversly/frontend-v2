"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { joinWaitlist } from "@/lib/api/waitlist";

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1,000 employees",
  "1,000+ employees",
] as const;

const DEMO_URL = "https://calendly.com/rdhakad2002/30min";

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
      <div className="rounded-[28px] border border-[#dce6f6] bg-white/95 p-8 shadow-[0_24px_64px_rgba(45,58,96,0.10)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6ee] text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-[Georgia,Times,'Times_New_Roman',serif] text-[30px] leading-[1.04] tracking-[-0.04em] text-[#221f1b]">
          Your request is in
        </h3>
        <p className="mt-4 text-[15px] leading-7 text-[#6d665d]">
          We captured your enterprise inquiry and our team will follow up. If you want to move
          faster, book a demo now and we’ll tailor it to your workflow.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={DEMO_URL}
            target="_blank"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#315EEA] px-6 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(49,94,234,0.28)] transition-all hover:bg-[#264fd4]"
          >
            Book a custom demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#dde6f4] bg-white px-6 text-[14px] font-semibold text-[#221f1b] transition-all hover:bg-[#fafcff]"
          >
            Start building
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#dce6f6] bg-white/95 p-6 shadow-[0_24px_64px_rgba(45,58,96,0.10)] md:p-7"
    >
      <div className="mb-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d7f9e]">
          Fill in the form
        </div>
        <p className="mt-2 text-[14px] leading-6 text-[#6d665d]">
          Tell us about your support workflow and we’ll tailor the next conversation around it.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="John Doe"
          className="h-12 rounded-2xl border-[#d9e3f5] bg-[#fbfdff]"
        />
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your.email@example.com"
          className="h-12 rounded-2xl border-[#d9e3f5] bg-[#fbfdff]"
        />
        <Select value={companySize} onValueChange={setCompanySize}>
          <SelectTrigger className="h-12 rounded-2xl border-[#d9e3f5] bg-[#fbfdff]">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_SIZES.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your message..."
          className="min-h-[140px] rounded-[22px] border-[#d9e3f5] bg-[#fbfdff]"
        />
      </div>

      {error ? <p className="mt-4 text-sm text-[#c2410c]">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#315EEA] px-6 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(49,94,234,0.28)] transition-all hover:bg-[#264fd4] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting
          </>
        ) : (
          <>
            Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#7b8798]">
        <span>Need a faster path?</span>
        <Link href={DEMO_URL} target="_blank" className="font-semibold text-[#315EEA]">
          Book a demo
        </Link>
        <span>or</span>
        <Link href="mailto:team@verlyai.xyz" className="font-semibold text-[#315EEA]">
          email our team
        </Link>
      </div>
    </form>
  );
}

export default EnterpriseInquiryForm;
