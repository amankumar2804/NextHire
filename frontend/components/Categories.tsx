import Link from "next/link";
import {
  Landmark,
  Building2,
  Users,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Government Jobs",
    description: "Find the latest government opportunities and exams.",
    icon: Landmark,
    href: "/jobs/category/government",
  },
  {
    title: "Private Jobs",
    description: "Explore jobs from top companies and startups.",
    icon: Building2,
    href: "/jobs/category/private",
  },
  {
    title: "Direct Hiring",
    description: "Discover hiring posts directly from recruiters.",
    icon: Users,
    href: "/jobs/category/direct-hiring",
  },
  {
    title: "Internships",
    description: "Start your career with the right opportunity.",
    icon: GraduationCap,
    href: "/jobs/category/internship",
  },
];

export default function JobCategories() {
  return (
    <section className="bg-white px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Explore Opportunities
            </p>

            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Find the right path for your career
            </h2>

            <p className="mt-4 max-w-2xl text-slate-500">
              Explore opportunities across government, private companies,
              direct hiring and internships.
            </p>
          </div>

          <Link
            href="/jobs"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            View all jobs →
          </Link>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <Icon size={24} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-400 transition group-hover:text-blue-600"
                  />

                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-blue-600">
                  Explore opportunities →
                </div>

              </Link>
            );

          })}

        </div>

      </div>

    </section>
  );
}