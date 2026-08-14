import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, Facebook, Twitter, MapPin } from "lucide-react";

import heroImg from "@/assets/hero-interior.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import coldImg from "@/assets/cold-drinks.jpg";
import dessertImg from "@/assets/desserts.jpg";
import latteImg from "@/assets/latte.jpg";
import coldBrewImg from "@/assets/coldbrew.jpg";
import croissantImg from "@/assets/croissant.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Café Segundos — The Luxury of Time" },
      {
        name: "description",
        content:
          "A warm, high-end café serving signature espresso, slow-steeped cold brew and artisanal pastries. View our menu, best sellers and price list.",
      },
      { property: "og:title", content: "Café Segundos — The Luxury of Time" },
      {
        property: "og:description",
        content: "Signature espresso, cold brew and artisanal pastries in a warm, high-end sanctuary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Prices", href: "#prices" },
  { label: "Contact", href: "#contact" },
];

const menuCards = [
  {
    img: coffeeImg,
    ar: "قهوة",
    en: "Coffee",
    desc: "Expertly roasted beans, crafted for the perfect cup.",
  },
  {
    img: coldImg,
    ar: "مشروبات باردة",
    en: "Cold Drinks",
    desc: "Refreshing signature blends to cool your day.",
  },
  {
    img: dessertImg,
    ar: "حلويات",
    en: "Desserts",
    desc: "Artisanal pastries and delicate sweets to accompany your pause.",
  },
];

const bestSellers = [
  {
    img: latteImg,
    name: "Signature Latte",
    badge: "Hot",
    desc: "Our house blend espresso with velvety steamed milk and a hint of vanilla.",
    price: "$5.50",
  },
  {
    img: coldBrewImg,
    name: "Classic Cold Brew",
    badge: "Cold",
    desc: "Slow-steeped for 18 hours, delivering a smooth, bold, and refreshing flavor.",
    price: "$4.75",
  },
  {
    img: croissantImg,
    name: "Pistachio Croissant",
    badge: "Pastry",
    desc: "Buttery, flaky layers filled with our signature roasted pistachio cream.",
    price: "$6.00",
  },
];

const btnDark =
  "inline-flex items-center justify-center rounded-full bg-espresso px-7 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground shadow-soft transition-all duration-300 hover:bg-primary hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function Divider() {
  return (
    <span className="mx-auto mt-5 flex items-center justify-center gap-2" aria-hidden="true">
      <span className="h-px w-10 bg-border" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-border" />
    </span>
  );
}

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" id="home">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-card/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="font-serif text-2xl font-semibold tracking-tight text-espresso">
            Café Segundos
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-sm text-muted-foreground transition-colors hover:text-espresso"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#best-sellers" className={`${btnDark} hidden sm:inline-flex`}>
              Order Now
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2 text-espresso transition-colors hover:bg-secondary lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="border-t border-border bg-card px-5 pb-5 lg:hidden">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 font-sans text-sm text-muted-foreground transition-colors hover:text-espresso"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <a href="#best-sellers" onClick={() => setOpen(false)} className={`${btnDark} w-full`}>
                Order Now
              </a>
            </li>
          </ul>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Warm, elegant interior of Café Segundos at golden hour"
          width={1920}
          height={1200}
          className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover blur-[2px]"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,oklch(0.2_0.04_45/0.72),oklch(0.18_0.04_45/0.82))]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-arabic text-2xl text-gold sm:text-3xl" dir="rtl" lang="ar">
            سيجوندوس كافيه
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] font-semibold text-primary-foreground sm:text-6xl md:text-7xl">
            Segundos Café
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            The Luxury of Time. Take a pause in our warm, high-end sanctuary.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#best-sellers"
              className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-semibold tracking-wide text-accent-foreground transition-all duration-300 hover:brightness-105 sm:w-auto"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex w-full items-center justify-center rounded-full border border-primary-foreground/40 px-8 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 sm:w-auto"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Our Menu */}
      <section id="menu" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Our Menu</h2>
          <Divider />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {menuCards.map((c) => (
            <article
              key={c.en}
              className="group overflow-hidden rounded-2xl bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <img
                src={c.img}
                alt={c.en}
                loading="lazy"
                width={1024}
                height={768}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-7 text-center">
                <p className="font-arabic text-xl text-gold" dir="rtl" lang="ar">
                  {c.ar}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-espresso">{c.en}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best-sellers" className="bg-sand/60 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Best Sellers</h2>
            <p className="mt-3 font-sans text-sm text-muted-foreground">Our most loved creations.</p>
            <Divider />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {bestSellers.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl font-semibold text-espresso">{p.name}</h3>
                    <span className="rounded-full bg-secondary px-3 py-1 font-sans text-[11px] font-semibold tracking-wide text-secondary-foreground uppercase">
                      {p.badge}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="font-serif text-2xl font-semibold text-espresso">{p.price}</span>
                    <button type="button" className={btnDark}>
                      Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Gallery</h2>
          <Divider />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[heroImg, coffeeImg, croissantImg, dessertImg].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Café Segundos atmosphere and offerings"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-44 w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:scale-[1.02] md:h-56"
            />
          ))}
        </div>
      </section>

      {/* Price List */}
      <section id="prices" className="bg-card py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <p className="font-arabic text-2xl text-gold" dir="rtl" lang="ar">
              قائمة الأسعار
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-espresso md:text-5xl">Price List</h2>
            <Divider />
          </div>

          <div className="mt-12 rounded-2xl bg-cream p-7 shadow-soft sm:p-12">
            <h3 className="font-serif text-2xl font-semibold text-espresso">Espresso Bar</h3>
            <ul className="mt-6 space-y-4">
              <PriceRow name="Espresso (Single / Double)" price="$3.00 / $4.50" />
              <PriceRow name="Americano" price="$3.50" />
              <PriceRow name="Cappuccino" price="$4.50" />
            </ul>

            <div className="my-9 h-px bg-border" />

            <h3 className="font-serif text-2xl font-semibold text-espresso">Alternatives</h3>
            <ul className="mt-6 space-y-4">
              <PriceRow name="Matcha Latte" price="$5.50" />
              <PriceRow name="Chai Tea Latte" price="$5.00" />
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-espresso py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-3 md:px-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Café Segundos</h2>
            <address className="mt-5 space-y-2 font-sans text-sm not-italic text-primary-foreground/70">
              <p>
                123 Coffee Avenue, Bean District
                <br />
                Cityville, ST 12345
              </p>
              <p>
                <a href="tel:+15551234567" className="transition-colors hover:text-gold">
                  +1 (555) 123-4567
                </a>
              </p>
              <p>Working Hours: 7:00 AM – 11:00 PM (Daily)</p>
            </address>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold">Links</h3>
            <ul className="mt-5 space-y-3 font-sans text-sm text-primary-foreground/70">
              {["Privacy Policy", "Terms of Service", "Location", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href="#contact" className="transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="font-serif text-xl font-semibold">Follow</h3>
            <div className="mt-5 flex gap-3 md:justify-end">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: MapPin, label: "Location" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#contact"
                  aria-label={label}
                  className="rounded-full border border-primary-foreground/25 p-2.5 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl border-t border-primary-foreground/15 px-5 pt-6 text-center font-sans text-xs text-primary-foreground/60 md:px-8">
          © 2024 Café Segundos. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="flex items-end font-sans text-sm text-espresso sm:text-base">
      <span>{name}</span>
      <span className="dot-leader" aria-hidden="true" />
      <span className="font-serif text-lg font-semibold whitespace-nowrap">{price}</span>
    </li>
  );
}
