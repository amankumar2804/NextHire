"use client";

const companies = [
  {
    name: "Google",
    jobs: "250+ Jobs",
  },
  {
    name: "Microsoft",
    jobs: "180+ Jobs",
  },
  {
    name: "Amazon",
    jobs: "320+ Jobs",
  },
  {
    name: "TCS",
    jobs: "500+ Jobs",
  },
  {
    name: "Infosys",
    jobs: "300+ Jobs",
  },
  {
    name: "Accenture",
    jobs: "220+ Jobs",
  },
];


export default function FeaturedCompanies() {

  return (

    <section className="bg-white py-20">


      <div className="mx-auto max-w-7xl px-6">



        {/* Heading */}

        <div className="text-center">


          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">

            Trusted Companies

          </p>


          <h2 className="mt-3 text-4xl font-bold text-slate-900">

            Opportunities From Top Companies

          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-slate-500">

            Discover verified job opportunities from leading companies
            and start your career journey.

          </p>


        </div>






        {/* Cards */}

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">


          {companies.map((company)=>(


            <div

              key={company.name}

              className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"

            >


              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold text-white">

                {company.name.charAt(0)}

              </div>




              <h3 className="mt-4 font-bold text-slate-900">

                {company.name}

              </h3>




              <p className="mt-2 text-sm text-slate-500">

                {company.jobs}

              </p>



            </div>


          ))}


        </div>



      </div>


    </section>

  );

}