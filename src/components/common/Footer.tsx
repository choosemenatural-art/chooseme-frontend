"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

// Lucide removed brand icons from their core package, so we define them here:
const Instagram = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const shopLinks = [
  { label: "Skin Care", href: "/products?category=skin-care" },
  { label: "Lip Care", href: "/products?category=lip-care" },
  { label: "Body Care", href: "/products?category=body-care" },
];

const careLinks = [
  { label: "Contact Us", href: "/contact-us#top" },
  { label: "FAQ", href: "/contact-us#faq" },
];

const contacts = [
  {
    icon: MapPin,
    label: "VISIT US",
    value: "Chooseme Sajin Land, Kadakkavoor\nThiruvanathapuram, Kerala",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "CALL US",
    value: "+91 9074881551",
    href: "tel:+919074881551",
  },
  {
    icon: Mail,
    label: "EMAIL DIRECTLY",
    value: "choosemenatural@gmail.com",
    href: "mailto:choosemenatural@gmail.com",
  },
];

const socials = [
  { icon: Instagram, label: "Visit our Instagram", href: "https://www.instagram.com/choose_me_90" },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="font-sans font-bold text-sm tracking-[0.15em] uppercase text-ink-900">
        {children}
      </h3>
      <div className="w-8 h-1 bg-brand-500 rounded-full mt-2" />
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-50 w-full border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-8">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center mb-6" aria-label="CHOOSEME brand logo">
              <div className="relative w-52 h-28">
                <Image
                  src="/logo-transparent.png"
                  alt="CHOOSEME Logo"
                  fill
                  sizes="(max-width: 640px) 208px, 208px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="font-sans font-normal text-base text-ink-500 leading-relaxed mb-8 max-w-sm">
              Handcrafted soaps for a better bath. Our carefully crafted bars are made with pure ingredients to turn your everyday routine into a refreshing ritual.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ink-300 flex items-center justify-center text-ink-500 hover:border-brand-500 hover:text-brand-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section (Side by side on all screens) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {/* Column 2 — Shop Collections */}
            <div>
              <ColumnTitle>SHOP COLLECTIONS</ColumnTitle>
              <ul className="space-y-4">
                {shopLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-sans font-normal text-base text-ink-600 hover:text-brand-800 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Client Care */}
            <div>
              <ColumnTitle>CLIENT CARE</ColumnTitle>
              <ul className="space-y-4">
                {careLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-sans font-normal text-base text-ink-600 hover:text-brand-800 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 — Get In Touch */}
          <div className="lg:col-span-4">
            <ColumnTitle>GET IN TOUCH</ColumnTitle>
            <ul className="space-y-6">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${value}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Icon size={18} className="text-brand-500" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs tracking-[0.15em] uppercase text-ink-500 mb-1">
                        {label}
                      </p>
                      <p className="font-sans font-medium text-sm text-ink-900 whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ink-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans font-normal text-sm text-ink-500 flex items-center gap-1.5">
            © {year} CHOOSEME Soaps. Crafted with{" "}
            <Heart size={14} className="text-brand-500 fill-brand-500 inline" />{" "}
            for you.
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Privacy Policy", "Terms & Conditions"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-2">
                <Link
                  href={item === "Privacy Policy" ? "/privacy-policy" : "/terms-and-conditions"}
                  className="font-sans font-normal text-sm text-ink-500 hover:text-ink-700 transition-colors duration-200"
                >
                  {item}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-ink-300 select-none">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
