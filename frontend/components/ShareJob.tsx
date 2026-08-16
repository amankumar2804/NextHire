"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";

type ShareJobProps = {
  title: string;
};

export default function ShareJob({ title }: ShareJobProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${title}\n\nApply here: ${shareUrl}`
    )}`;

    window.open(url, "_blank");
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;

    window.open(url, "_blank");
  };

  const shareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(title)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <Share2 className="text-blue-600" />

        <h3 className="text-lg font-bold">
          Share this Job
        </h3>

      </div>

      <p className="mt-2 text-sm text-slate-500">
        Help someone discover this opportunity.
      </p>

      {/* Copy Link */}

      <button
        onClick={copyLink}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold transition hover:bg-slate-100"
      >
        {copied ? (
          <>
            <Check size={18} />
            Link Copied
          </>
        ) : (
          <>
            <Copy size={18} />
            Copy Job Link
          </>
        )}
      </button>

      {/* Social Share Buttons */}

      <div className="mt-4 grid grid-cols-3 gap-3">

        <button
          onClick={shareWhatsApp}
          title="Share on WhatsApp"
          className="flex items-center justify-center rounded-xl bg-green-500 py-3 text-white transition hover:bg-green-600"
        >
          <FaWhatsapp size={22} />
        </button>

        <button
          onClick={shareLinkedIn}
          title="Share on LinkedIn"
          className="flex items-center justify-center rounded-xl bg-blue-700 py-3 text-white transition hover:bg-blue-800"
        >
          <FaLinkedinIn size={21} />
        </button>

        <button
          onClick={shareTelegram}
          title="Share on Telegram"
          className="flex items-center justify-center rounded-xl bg-sky-500 py-3 text-white transition hover:bg-sky-600"
        >
          <FaTelegramPlane size={22} />
        </button>

      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Share this opportunity with your network
      </p>

    </div>
  );
}