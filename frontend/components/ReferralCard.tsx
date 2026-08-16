"use client";

import {
  BadgeCheck,
  ExternalLink,
  UserRound,
} from "lucide-react";

type ReferralCardProps = {
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
  verified?: boolean;
};

export default function ReferralCard({
  name,
  role,
  company,
  linkedinUrl,
  verified,
}: ReferralCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md">

      <div className="flex items-start gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <UserRound size={25} />
        </div>

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="font-bold text-slate-900">
              {name}
            </h3>

            {verified && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <BadgeCheck size={15} />
                Verified
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-slate-500">
            {role}
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {company}
          </p>

        </div>

      </div>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <span className="text-lg font-bold">
          in
        </span>

        Connect on LinkedIn

        <ExternalLink size={16} />
      </a>

    </div>
  );
}