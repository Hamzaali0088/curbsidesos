import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";
import Heading1 from "@/components/common/Heading2";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    iAmA: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName?.trim())
      newErrors.firstName = "Enter a value for this field.";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Enter a value for this field.";
    if (!formData.email?.trim())
      newErrors.email = "Enter a value for this field.";
    if (!formData.phone?.trim())
      newErrors.phone = "Enter a value for this field.";
    if (!formData.iAmA)
      newErrors.iAmA = "Enter a value for this field.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
    }
  };

  return (
    <>
      <Head>
        <title>Contact | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout breadcrumbLabel="Contact" rightCardVariant="contact">
            {/* Left: Contact Form */}
            <Heading1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact
            </Heading1>
            <p className="mt-3 text-base font-bold text-gray-900 sm:text-2xl">
              Answer a few quick questions and a Curbside SOS Support Team member
              will be in touch shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 grid gap-6 sm:grid-cols-2">
                  <div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full rounded border bg-white px-3 py-1 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.firstName ? "border-red-500" : "border-gray-900"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full rounded border bg-white px-3 py-1 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.lastName ? "border-red-500" : "border-gray-900"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-900"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border bg-white px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                    errors.email ? "border-red-500" : "border-gray-900"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-gray-900"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border bg-white px-3 py-1 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                    errors.phone ? "border-red-500" : "border-gray-900"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="iAmA"
                  className="block text-sm font-bold text-gray-900"
                >
                  I am a... <span className="text-red-500">*</span>
                </label>
                <select
                  id="iAmA"
                  name="iAmA"
                  value={formData.iAmA}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border bg-white px-3 py-1 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                    errors.iAmA ? "border-red-500" : "border-gray-900"
                  }`}
                >
                  <option value="">- Select -</option>
                  <option value="motorist">Motorist</option>
                  <option value="provider">Service Provider</option>
                  <option value="partner">Partner</option>
                  <option value="other">Other</option>
                </select>
                {errors.iAmA && (
                  <p className="mt-1 text-sm text-red-500">{errors.iAmA}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-900"
                >
                  Message to the Curbside SOS Team
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full resize-y rounded border border-gray-900 bg-white px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
              >
                Submit
              </button>
            </form>
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}
