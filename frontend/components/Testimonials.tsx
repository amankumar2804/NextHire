"use client";

import {
  Star,
} from "lucide-react";


const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    review:
      "NextHire helped me find the right opportunity quickly. The AI matching feature is amazing.",
  },
  {
    name: "Priya Verma",
    role: "Frontend Developer",
    company: "Microsoft",
    review:
      "The platform is simple, fast and has genuine job opportunities from top companies.",
  },
  {
    name: "Arjun Patel",
    role: "Data Analyst",
    company: "Amazon",
    review:
      "I got multiple interview calls within weeks. Highly recommended for job seekers.",
  },
];


export default function Testimonials() {

  return (

    <section className="bg-slate-950 py-20 text-white">


      <div className="mx-auto max-w-7xl px-6">


        {/* Heading */}

        <div className="text-center">


          <p className="text-indigo-400 font-semibold uppercase tracking-widest">
            Testimonials
          </p>


          <h2 className="mt-3 text-4xl font-bold">
            What Our Users Say
          </h2>


          <p className="mt-4 text-slate-400">
            Thousands of professionals trust NextHire for their career growth.
          </p>


        </div>





        {/* Cards */}

        <div className="mt-14 grid gap-6 md:grid-cols-3">


          {testimonials.map((user) => (

            <div
              key={user.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-indigo-500"
            >



              {/* Stars */}

              <div className="flex gap-1 text-yellow-400">

                {[1,2,3,4,5].map((star)=>(
                  
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />

                ))}

              </div>




              {/* Review */}

              <p className="mt-5 leading-7 text-slate-300">

                "{user.review}"

              </p>




              {/* User */}

              <div className="mt-6 flex items-center gap-4">


                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold">

                  {user.name.charAt(0)}

                </div>



                <div>

                  <h3 className="font-semibold">

                    {user.name}

                  </h3>


                  <p className="text-sm text-slate-400">

                    {user.role} • {user.company}

                  </p>


                </div>


              </div>



            </div>

          ))}


        </div>


      </div>


    </section>

  );

}