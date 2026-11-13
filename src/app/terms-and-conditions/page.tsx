"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsAndConditionsPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <title>Terms & Conditions – CHOOSEME</title>
      <meta
        name="description"
        content="Read the Terms & Conditions of CHOOSEME. Learn about the rules and regulations for using our website."
      />

      <main id="top" className="min-h-screen bg-ink-50">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full pt-32 md:pt-40 pb-36 md:pb-48"
          style={{
            background:
              "linear-gradient(135deg, #002412 0%, #00562a 50%, #006f35 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Mobile Back to Home */}
            <div
              className="md:hidden flex justify-center mb-8"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(1rem)",
                transition: "opacity 0.5s ease 50ms, transform 0.5s ease 50ms",
              }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-semibold bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-sm shadow-sm"
              >
                <ChevronLeft size={16} />
                Back to Home
              </Link>
            </div>

            {/* Headline */}
            <h1
              className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(1rem)",
                transition:
                  "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
              }}
            >
              Terms & Conditions
            </h1>

            {/* Subheadline */}
            <p
              className="text-ink-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(1rem)",
                transition:
                  "opacity 0.6s ease 300ms, transform 0.6s ease 300ms",
              }}
            >
              Welcome to CHOOSEME. By accessing or using our website, you agree to comply with these Terms & Conditions.
            </p>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────── */}
        <section
          className="relative z-10 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto -mt-20 md:-mt-24 mb-20"
        >
          <div className="bg-cream rounded-3xl shadow-sm p-8 md:p-12 lg:p-16 border border-ink-100">
            <p className="text-ink-500 mb-8 font-medium">Last Updated: May 2, 2026</p>

            <div className="space-y-8 text-ink-700 leading-relaxed font-sans">
              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">1. General</h2>
                <p>
                  CHOOSEME operates this website to provide soap and bath products. By using this site, you confirm that you are at least 18 years old or using it under supervision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">2. Products & Pricing</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are listed in INR (₹)</li>
                  <li>We reserve the right to change prices anytime without notice</li>
                  <li>Product colors may slightly vary due to screen settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">3. Orders</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders are confirmed only after successful payment</li>
                  <li>We reserve the right to cancel orders due to stock issues or suspicious activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">4. Shipping</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery timelines may vary depending on location</li>
                  <li>Delays due to courier issues are not under our control</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">5. Returns & Refunds</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Returns accepted within 7 days of delivery</li>
                  <li>Products must be unused and in original packaging</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">6. Intellectual Property</h2>
                <p>
                  All content (logo, images, text) belongs to CHOOSEME and cannot be copied or reused.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">CHOOSEME is not liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Allergic reactions (please do patch test)</li>
                  <li>Delays in delivery</li>
                  <li>Indirect damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">8. Governing Law</h2>
                <p>
                  These terms are governed by the laws of India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-4">9. Contact Us</h2>
                <p className="mb-2">Email: <a href="mailto:choosemenatural@gmail.com" className="text-brand-600 hover:text-brand-800 transition-colors">choosemenatural@gmail.com</a></p>
                <p>Phone: <a href="tel:+919074881551" className="text-brand-600 hover:text-brand-800 transition-colors">9074881551</a></p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
