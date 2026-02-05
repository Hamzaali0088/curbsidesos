import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in
  };

  return (
    <>
      <Head>
        <title>Sign In | Curbside SOS</title>
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
                Sign In
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-0"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-secondary"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
