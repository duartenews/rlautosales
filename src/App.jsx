import { useEffect, useMemo, useState } from 'react'
import { seedInventory } from './data/seedInventory'
import {
  getFavorites,
  getFinanceInputs,
  getFilters,
  getInventory,
  getLeadDraft,
  getTradeInDraft,
  saveFavorites,
  saveFinanceInputs,
  saveFilters,
  saveLeadDraft,
  saveTradeInDraft,
} from './utils/storage'

const phoneNumber = '+1 (913) 568-8288'

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value,
  )

const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="mb-8 space-y-3 text-center">
    {eyebrow && (
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold text-white sm:text-4xl font-heading">{title}</h2>
    {subtitle && (
      <p className="text-silver/80 max-w-3xl mx-auto text-lg">{subtitle}</p>
    )}
  </div>
)

const Badge = ({ children }) => (
  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-100 border border-blue-500/30">
    {children}
  </span>
)

function Header({ onNav }) {
  const links = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'finance', label: 'Finance' },
    { id: 'tradein', label: 'Trade-In' },
    { id: 'specials', label: 'Specials' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-gradient-to-r from-navy/95 via-navy/90 to-[#0d1525]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30">
            NM
          </div>
          <div>
            <p className="text-white font-heading text-xl">Northline Motors</p>
            <p className="text-sm text-silver/70">Used Vehicle Center</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-silver/80 lg:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className="transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[12px] uppercase tracking-[0.2em] text-silver/60">Sales</p>
            <a
              href={`tel:${phoneNumber}`}
              className="text-white font-semibold hover:text-blue-200"
            >
              {phoneNumber}
            </a>
          </div>
          <button
            onClick={() => onNav('finance')}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
          >
            Get Pre-Approved
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onNav }) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white" id="top">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute right-[-10%] top-32 h-96 w-96 rounded-full bg-silver/20 blur-[120px]" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
        <div className="max-w-2xl space-y-6">
          <Badge>Premium Used Vehicles</Badge>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl font-heading">
            Quality used SUVs with transparent pricing and easy financing.
          </h1>
          <p className="text-lg text-silver/85">
            Northline Motors blends premium inventory with straightforward shopping. Browse ready-to-drive SUVs, lock in payments, and save your favorites—all in one page.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNav('inventory')}
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Browse Inventory
            </button>
            <button
              onClick={() => onNav('tradein')}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white/40"
            >
              Value Your Trade
            </button>
            <button
              onClick={() => onNav('finance')}
              className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Get Pre-Approved
            </button>
          </div>
          <div className="flex flex-wrap gap-4 text-silver/80">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <p>No-pressure buying experience</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <p>Multi-point inspected SUVs</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <p>Financing options for all credit</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20"
              >
                <p className="text-sm text-silver/70">Inventory highlight</p>
                <p className="text-lg font-semibold text-white">SUV-ready today</p>
                <p className="text-sm text-silver/60">Clean titles · Retail-ready · Warranty options</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-blue-600/20 p-4 text-blue-50 border border-blue-500/30">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Trust</p>
            <p className="text-lg font-semibold">Transparent pricing with real photos and mileage.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuickActions({ onNav }) {
  const actions = [
    {
      title: 'Search Used Vehicles',
      desc: 'Browse SUVs with real prices and photos.',
      target: 'inventory',
    },
    {
      title: 'Value Your Trade',
      desc: 'Save your trade details securely on this device.',
      target: 'tradein',
    },
    {
      title: 'Apply for Financing',
      desc: 'Estimate payments and save your progress.',
      target: 'finance',
    },
    {
      title: 'Schedule a Test Drive',
      desc: 'Send your preferred time—we will confirm fast.',
      target: 'contact',
    },
  ]

  return (
    <section className="bg-navy border-b border-white/5" id="actions">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => onNav(action.target)}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white shadow-lg shadow-black/30 transition hover:border-blue-400/60 hover:shadow-blue-500/30"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-blue-200">{action.title}</p>
              <p className="mt-2 text-silver/80 text-sm">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Filters({ filters, onChange, makes, fuels, bodyTypes, maxPrice, maxMileage }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="text-sm text-silver/70">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search make, model, trim"
            className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm text-silver/70">Make</label>
          <select
            value={filters.make}
            onChange={(e) => onChange({ ...filters, make: e.target.value })}
            className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-silver/70">Body Type</label>
          <select
            value={filters.bodyType}
            onChange={(e) => onChange({ ...filters, bodyType: e.target.value })}
            className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-silver/70">Fuel</label>
          <select
            value={filters.fuel}
            onChange={(e) => onChange({ ...filters, fuel: e.target.value })}
            className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center justify-between text-sm text-silver/70">
            <span>Max Price</span>
            <span className="text-white font-semibold">{formatPrice(filters.maxPrice)}</span>
          </label>
          <input
            type="range"
            min="15000"
            max={maxPrice}
            step="500"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-500"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm text-silver/70">
            <span>Max Mileage</span>
            <span className="text-white font-semibold">{filters.maxMileage.toLocaleString()} mi</span>
          </label>
          <input
            type="range"
            min="30000"
            max={maxMileage}
            step="5000"
            value={filters.maxMileage}
            onChange={(e) => onChange({ ...filters, maxMileage: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

function VehicleCard({ vehicle, isFavorite, onToggleFavorite }) {
  return (
    <article className="glass-card smooth-shadow flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/70 text-dark transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-52 w-full overflow-hidden bg-silver">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{vehicle.condition}</Badge>
          <Badge>{vehicle.fuel}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-blue-700">{vehicle.year}</p>
            <h3 className="text-lg font-semibold text-navy">{`${vehicle.make} ${vehicle.model}`}</h3>
            <p className="text-sm text-slate-600">{vehicle.trim}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-navy">{formatPrice(vehicle.price)}</p>
            <p className="text-sm text-slate-600">{vehicle.monthlyEstimate}/mo est.</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{vehicle.mileage.toLocaleString()} mi</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.bodyType}</span>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <button className="flex-1 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-500">
            View Details
          </button>
          <button
            onClick={() => onToggleFavorite(vehicle.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isFavorite ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'border border-blue-600 text-blue-700 hover:bg-blue-50'}`}
          >
            {isFavorite ? 'Saved' : 'Save Vehicle'}
          </button>
        </div>
        <p className="text-[11px] text-slate-500">Photo attribution: {vehicle.imageAttribution}</p>
      </div>
    </article>
  )
}

function FinanceSection({ inputs, onChange }) {
  const principal = Math.max(inputs.price - inputs.downPayment, 0)
  const monthlyRate = inputs.apr / 100 / 12
  const monthlyPayment = monthlyRate
    ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -inputs.term))
    : principal / inputs.term

  return (
    <section id="finance" className="bg-navy border-y border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Financing"
          title="Finance made simple"
          subtitle="Estimate payments, save your progress locally, and talk with our team to lock rates."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-silver/80">
                Vehicle price
                <input
                  type="number"
                  value={inputs.price}
                  onChange={(e) => onChange({ ...inputs, price: Number(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm text-silver/80">
                Down payment
                <input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) =>
                    onChange({ ...inputs, downPayment: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm text-silver/80">
                Term (months)
                <input
                  type="number"
                  value={inputs.term}
                  onChange={(e) => onChange({ ...inputs, term: Number(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm text-silver/80">
                APR (%)
                <input
                  type="number"
                  step="0.01"
                  value={inputs.apr}
                  onChange={(e) => onChange({ ...inputs, apr: Number(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Estimate</p>
            <h3 className="mt-2 text-4xl font-bold">{formatPrice(monthlyPayment || 0)} /mo</h3>
            <p className="text-silver/70">
              Based on your inputs. Taxes, title, and fees may apply. Save these numbers and share with our finance team.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-silver/60">Vehicle price</p>
                <p className="text-lg font-semibold text-white">{formatPrice(inputs.price)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-silver/60">Down payment</p>
                <p className="text-lg font-semibold text-white">{formatPrice(inputs.downPayment)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-silver/60">Term</p>
                <p className="text-lg font-semibold text-white">{inputs.term} months</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-silver/60">APR</p>
                <p className="text-lg font-semibold text-white">{inputs.apr}%</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500">
                Share with Finance Team
              </button>
              <p className="text-silver/70 text-sm">
                Your inputs stay on this device until we move to the secure portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TradeInSection({ draft, onChange, onSave, saved }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <section id="tradein" className="bg-[#0b1220] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Trade-In"
          title="Value your trade without leaving the page"
          subtitle="Save draft details locally. We will finalize value with a quick inspection."
        />
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['Year', 'year', 'text'],
              ['Make', 'make', 'text'],
              ['Model', 'model', 'text'],
              ['Mileage', 'mileage', 'number'],
              ['Condition', 'condition', 'text'],
              ['Your name', 'name', 'text'],
              ['Phone', 'phone', 'tel'],
              ['Email', 'email', 'email'],
            ].map(([label, key, type]) => (
              <label key={key} className="text-sm text-silver/80">
                {label}
                <input
                  type={type}
                  value={draft[key]}
                  onChange={(e) => onChange({ ...draft, [key]: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            ))}
            <label className="md:col-span-2 lg:col-span-3 text-sm text-silver/80">
              Notes
              <textarea
                value={draft.notes}
                onChange={(e) => onChange({ ...draft, notes: e.target.value })}
                rows={3}
                className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Save Trade-In Draft
            </button>
            <p className="text-silver/70 text-sm">
              Your trade-in details have been saved on this device for now.
            </p>
            {saved && <Badge>Saved locally</Badge>}
          </div>
        </form>
      </div>
    </section>
  )
}

function Specials() {
  const cards = [
    {
      title: 'Flexible Financing Options',
      copy: 'Multiple lenders and down-payment friendly programs to fit your situation.',
      cta: 'See finance options',
    },
    {
      title: 'Top-Dollar Trade-In Value',
      copy: 'We price trades against live market data to maximize your equity.',
      cta: 'Start trade appraisal',
    },
    {
      title: 'Featured Used SUVs This Week',
      copy: 'Handpicked SUVs ready for immediate delivery with transparent pricing.',
      cta: 'View featured SUVs',
    },
  ]

  return (
    <section id="specials" className="bg-navy border-y border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Specials"
          title="This week at Northline"
          subtitle="Promotions crafted to make upgrading straightforward."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-silver/70">{card.copy}</p>
              <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-500">
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyBuy() {
  const items = [
    {
      title: 'Carefully Selected Used Vehicles',
      desc: 'Every SUV is inspected, reconditioned, and photographed in-house for transparency.',
    },
    {
      title: 'Flexible Financing Support',
      desc: 'We partner with regional lenders to secure competitive terms for a wide range of credit profiles.',
    },
    {
      title: 'Straightforward Buying Experience',
      desc: 'Clear pricing, saved favorites, and responsive communication mean no surprises at delivery.',
    },
  ]

  return (
    <section className="bg-[#0b1220] text-white" id="whyus">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Why Northline"
          title="Built for trust and clarity"
          subtitle="We operate like a premium dealership—without the runaround."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-silver/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-navy border-y border-white/5 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="Meet Northline Motors"
          subtitle="A Kansas City area team focused on quality used SUVs, transparent pricing, and concierge-level support."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
            <h3 className="text-xl font-semibold">What we do</h3>
            <p className="mt-3 text-silver/75">
              We source late-model SUVs with clean histories, price them using live market data, and present every detail clearly. Financing support, protection options, and delivery coordination are all handled in-house.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
            <h3 className="text-xl font-semibold">How we help</h3>
            <p className="mt-3 text-silver/75">
              Whether you are upgrading from a sedan or trading in for something family-ready, our team keeps the process efficient. Save vehicles you like, run payment scenarios, and send us your questions without losing your place.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ lead, onChange, onSave, saved }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <section id="contact" className="bg-[#0b1220] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Reach the Northline team"
          subtitle="Call, message, or visit. Your form saves locally until we move to our secure portal."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-silver/80">
                Name
                <input
                  type="text"
                  value={lead.name}
                  onChange={(e) => onChange({ ...lead, name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-silver/80">
                Email
                <input
                  type="email"
                  value={lead.email}
                  onChange={(e) => onChange({ ...lead, email: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-silver/80">
                Phone
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => onChange({ ...lead, phone: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-silver/80">
                Vehicle interest or timeframe
                <input
                  type="text"
                  value={lead.message}
                  onChange={(e) => onChange({ ...lead, message: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-navy px-3 py-3 text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  Save My Inquiry Locally
                </button>
                <p className="text-silver/70 text-sm">
                  Draft saved on this device. We&apos;ll confirm details over phone or secure email.
                </p>
                {saved && <Badge>Saved locally</Badge>}
              </div>
            </form>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/30">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Visit</p>
              <p className="mt-2 font-semibold">1234 Northline Pkwy, Kansas City, MO 64106</p>
              <p className="text-silver/70 text-sm">(Editable placeholder)</p>
              <div className="mt-3 h-40 rounded-xl bg-gradient-to-br from-blue-900 to-navy border border-white/10 flex items-center justify-center text-silver/70 text-sm">
                Map placeholder
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-silver/80 shadow-xl shadow-black/30">
              <p className="text-white font-semibold">Business hours</p>
              <ul className="mt-2 space-y-1">
                <li>Mon–Fri: 9:00 AM – 7:00 PM</li>
                <li>Sat: 9:00 AM – 6:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
              <p className="mt-3 text-white font-semibold">Call us</p>
              <a href={`tel:${phoneNumber}`} className="text-blue-200">
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-xl font-heading font-semibold">Northline Motors</p>
            <p className="mt-3 text-silver/70">Modern used vehicle center focused on clarity and trust.</p>
            <p className="mt-4 text-sm text-silver/60">
              Current version uses local device storage temporarily. API-ready architecture for future backend.
            </p>
          </div>
          <div>
            <p className="font-semibold">Inventory</p>
            <ul className="mt-2 space-y-2 text-silver/70 text-sm">
              <li>SUVs</li>
              <li>Certified</li>
              <li>Featured</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Finance</p>
            <ul className="mt-2 space-y-2 text-silver/70 text-sm">
              <li>Payment options</li>
              <li>Protection plans</li>
              <li>Credit assistance</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <ul className="mt-2 space-y-2 text-silver/70 text-sm">
              <li>{phoneNumber}</li>
              <li>sales@northlinemotors.com</li>
              <li>Kansas City, MO</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-silver/60">
          © {new Date().getFullYear()} Northline Motors. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [inventory, setInventory] = useState(() => getInventory(seedInventory))
  const [favorites, setFavorites] = useState(() => getFavorites())
  const filterDefaults = {
    search: '',
    make: '',
    bodyType: '',
    fuel: '',
    maxPrice: 30000,
    maxMileage: 120000,
  }
  const [filters, setFilters] = useState(() => getFilters(filterDefaults))
  const financeDefaults = {
    price: seedInventory[0].price,
    downPayment: 2500,
    term: 60,
    apr: 5.5,
  }
  const [financeInputs, setFinanceInputs] = useState(() =>
    getFinanceInputs(financeDefaults),
  )
  const [tradeInDraft, setTradeInDraft] = useState(() => getTradeInDraft())
  const [leadDraft, setLeadDraft] = useState(() => getLeadDraft())
  const [tradeSaved, setTradeSaved] = useState(false)
  const [leadSaved, setLeadSaved] = useState(false)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    saveFinanceInputs(financeInputs)
  }, [financeInputs])

  useEffect(() => {
    saveTradeInDraft(tradeInDraft)
    setTradeSaved(false)
  }, [tradeInDraft])

  useEffect(() => {
    saveLeadDraft(leadDraft)
    setLeadSaved(false)
  }, [leadDraft])

  useEffect(() => {
    saveFilters(filters)
  }, [filters])

  const handleNav = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    )
  }

  const filteredInventory = useMemo(() => {
    return inventory.filter((vehicle) => {
      if (filters.make && vehicle.make !== filters.make) return false
      if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false
      if (filters.fuel && vehicle.fuel !== filters.fuel) return false
      if (vehicle.price > filters.maxPrice) return false
      if (vehicle.mileage > filters.maxMileage) return false
      if (filters.search) {
        const term = filters.search.toLowerCase()
        const target = `${vehicle.make} ${vehicle.model} ${vehicle.trim}`.toLowerCase()
        if (!target.includes(term)) return false
      }
      return true
    })
  }, [filters, inventory])

  const featuredVehicles = useMemo(
    () => inventory.filter((v) => v.featured),
    [inventory],
  )

  const makes = useMemo(
    () => [...new Set(inventory.map((v) => v.make))],
    [inventory],
  )
  const fuels = useMemo(
    () => [...new Set(inventory.map((v) => v.fuel))],
    [inventory],
  )
  const bodyTypes = useMemo(
    () => [...new Set(inventory.map((v) => v.bodyType))],
    [inventory],
  )

  const maxPrice = Math.max(...inventory.map((v) => v.price)) + 2000
  const maxMileage = Math.max(...inventory.map((v) => v.mileage)) + 10000

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <Header onNav={handleNav} />
      <Hero onNav={handleNav} />
      <QuickActions onNav={handleNav} />

      <section id="inventory" className="bg-[#0b1220]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeader
            eyebrow="Featured"
            title="Featured used SUVs"
            subtitle="Real photos, transparent pricing, and ready-to-drive units."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <div id="filters" className="mt-14">
            <SectionHeader
              eyebrow="Inventory"
              title="Shop the full lineup"
              subtitle="Filter by budget, make, fuel, mileage, or keywords. Client-side and local-storage friendly."
            />
            <Filters
              filters={filters}
              onChange={setFilters}
              makes={makes}
              fuels={fuels}
              bodyTypes={bodyTypes}
              maxPrice={maxPrice}
              maxMileage={maxMileage}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredInventory.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFavorite={favorites.includes(vehicle.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
              {filteredInventory.length === 0 && (
                <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-silver/80">
                  No vehicles match these filters yet. Adjust price or mileage to see more options.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FinanceSection inputs={financeInputs} onChange={setFinanceInputs} />

      <TradeInSection
        draft={tradeInDraft}
        onChange={setTradeInDraft}
        onSave={() => setTradeSaved(true)}
        saved={tradeSaved}
      />

      <Specials />
      <WhyBuy />
      <About />

      <Contact
        lead={leadDraft}
        onChange={setLeadDraft}
        onSave={() => setLeadSaved(true)}
        saved={leadSaved}
      />

      <Footer />
    </div>
  )
}

export default App
