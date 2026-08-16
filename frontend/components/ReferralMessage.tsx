"use client";

import {
  Check,
  ChevronDown,
  Copy,
  MessageCircle,
} from "lucide-react";

import { useState } from "react";

type ReferralMessageProps = {
  name: string;
  jobTitle: string;
  company: string;
};

export default function ReferralMessage({
  name,
  jobTitle,
  company,
}: ReferralMessageProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = `Hi ${name},

I hope you are doing well. I came across the ${jobTitle} opportunity at ${company} and noticed that you work there.

I am very interested in this opportunity and my skills align well with the role. If you feel comfortable, I would be grateful if you could refer me or guide me regarding the application process.

Thank you for your time and consideration.

Best regards`;

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MessageCircle size={20} />
          </div>

          <div>

            <h3 className="font-bold text-blue-900">
              Need help writing a referral message?
            </h3>

            <p className="text-sm text-blue-700">
              Use our professional message template
            </p>

          </div>

        </div>

        <ChevronDown
          size={20}
          className={`text-blue-700 transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {open && (

        <div className="mt-5 rounded-xl bg-white p-4">

          <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
            {message}
          </p>

          <button
            onClick={copyMessage}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >

            {copied ? (
              <>
                <Check size={18} />
                Message Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy Message
              </>
            )}

          </button>

        </div>

      )}

    </div>
  );
}