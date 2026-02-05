import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password
  };

  return (
    <>
      <Head>
        <title>Forgot your password? | Curbside SOS</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="text-center">
              <Link href="/" className="inline-block">
                <Image
                  src="/st-images/brand/logo.png"
                  alt="Curbside SOS"
                  width={180}
                  height={45}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <h1 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                We will send you an email to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-0 border-b-2 border-primary bg-transparent px-0 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gray-400 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-500"
              >
                Send Email
              </button>
            </form>

            <p className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:text-secondary"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
