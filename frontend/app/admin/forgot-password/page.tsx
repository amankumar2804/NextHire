"use client";

import Link from "next/link";
import {
  Mail,
  ShieldCheck,
} from "lucide-react";


export default function AdminForgotPasswordPage() {

  return (

    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">


      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-white/5 p-8 backdrop-blur-xl">


        {/* Header */}

        <div className="text-center">


          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

            <ShieldCheck
              size={32}
              className="text-red-400"
            />

          </div>



          <h1 className="mt-5 text-3xl font-bold text-white">

            Admin Password Reset

          </h1>



          <p className="mt-3 text-slate-400">

            Enter your admin email to reset your password

          </p>


        </div>





        {/* Form */}

        <form className="mt-8 space-y-5">


          <div>


            <label className="text-sm text-slate-300">

              Admin Email

            </label>




            <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">


              <Mail
                size={18}
                className="text-red-400"
              />



              <input
                type="email"
                placeholder="Enter admin email"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />


            </div>


          </div>





          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-orange-600 py-3 font-semibold text-white transition hover:scale-105"
          >

            Send Reset Link

          </button>



        </form>






        <p className="mt-6 text-center text-sm text-slate-400">


          Back to{" "}


          <Link
            href="/admin/login"
            className="text-red-400 hover:text-red-300"
          >

            Admin Login

          </Link>


        </p>




      </div>


    </main>

  );

}