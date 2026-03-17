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

const phoneNumber = '+1 (913) 388-5321'

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value,
  )

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', tone = 'dark' }) => {
  const toneClasses =
    tone === 'dark'
      ? 'text-navy'
      : 'text-white'
  const subClasses =
    tone === 'dark'
      ? 'text-slate-600'
      : 'text-slate-200'

  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl sm:text-4xl font-bold font-heading ${toneClasses}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-lg ${subClasses}`}>{subtitle}</p>}
    </div>
  )
}

const Badge = ({ children }) => (
  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy ring-1 ring-slate-200 shadow-sm">
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="RL Auto Sales"
            className="h-10 w-auto drop-shadow-lg"
          />
          <p className="text-white font-heading text-xl">RL Auto Sales</p>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-100/80 lg:flex">
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
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300/70">
              Sales
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="text-white font-semibold hover:text-blue-200"
            >
              {phoneNumber}
            </a>
          </div>
          <button
            onClick={() => onNav('finance')}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-md shadow-blue-600/20 transition hover:bg-blue-50"
          >
            Get Pre-Approved
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onNav, onQuickSearch, makes, heroVehicle }) {
  const [form, setForm] = useState({ make: '', keyword: '', budget: 28000 })

  const handleSubmit = (e) => {
    e.preventDefault()
    onQuickSearch(form)
  }

  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute left-[-20%] top-10 h-96 w-96 rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-32 h-[28rem] w-[28rem] rounded-full bg-silver/30 blur-[140px]" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-blue-100 ring-1 ring-white/20">
            Premium used SUVs - Transparent pricing
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl font-heading">
            Curated SUVs, clear pricing, and quick approvals in one place.
          </h1>
          <p className="text-lg text-slate-100/90">
            Browse, compare payments, and save favorites without losing your spot. Real photos,
            human support, and instant calculations.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNav('inventory')}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy shadow-lg shadow-blue-600/25 transition hover:bg-blue-50"
            >
              Browse Inventory
            </button>
            <button
              onClick={() => onNav('finance')}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:border-white/60"
            >
              Get Pre-Approved
            </button>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-2xl bg-white p-6 text-navy shadow-2xl shadow-black/25 ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Quick search
          </p>
          <h3 className="mt-2 text-xl font-semibold">Find the right SUV fast</h3>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-slate-600">
                Make
                <select
                  value={form.make}
                  onChange={(e) => setForm({ ...form, make: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-slate-600">
                Model or keyword
                <input
                  type="text"
                  value={form.keyword}
                  onChange={(e) => setForm({ ...form, keyword: e.target.value })}
                  placeholder="Ex: RAV4, Hybrid"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            </div>
            <label className="block text-sm text-slate-600">
              Budget (max)
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="15000"
                  max="35000"
                  step="500"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <span className="w-24 text-right text-sm font-semibold">
                  {formatPrice(form.budget)}
                </span>
              </div>
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="flex-1 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy border border-slate-300 shadow-sm transition hover:bg-slate-50"
              >
                Apply filters
              </button>
              <button
                type="button"
                onClick={() => onNav('inventory')}
                className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
              >
                View inventory
              </button>
            </div>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            Inputs stay on this device until we move to the secure portal.
          </p>
        </div>

        {heroVehicle && (
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 ring-1 ring-white/10">
            <img
              src={heroVehicle.image}
              alt={`${heroVehicle.year} ${heroVehicle.make} ${heroVehicle.model}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Featured now</p>
              <h3 className="text-2xl font-semibold">
                {heroVehicle.year} {heroVehicle.make} {heroVehicle.model}
              </h3>
              <p className="text-sm text-slate-100">
                {heroVehicle.trim} • {formatPrice(heroVehicle.price)} •{' '}
                {heroVehicle.mileage.toLocaleString()} mi
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function QuickActions({ onNav }) {
  const actions = [
    {
      title: 'Browse Used SUVs',
      desc: 'See real photos and transparent pricing.',
      target: 'inventory',
    },
    {
      title: 'Value Your Trade',
      desc: 'Send your vehicle details and save the draft.',
      target: 'tradein',
    },
    {
      title: 'Estimate Payments',
      desc: 'Calculate payments in seconds.',
      target: 'finance',
    },
    {
      title: 'Schedule a Visit',
      desc: 'Pick a time with the team quickly.',
      target: 'contact',
    },
  ]

  return (
    <section className="section-light border-b border-slate-200/60" id="actions">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => onNav(action.target)}
              className="rounded-2xl bg-white px-4 py-5 text-left shadow-md shadow-slate-200/60 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                {action.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Filters({
  filters,
  onChange,
  makes,
  fuels,
  bodyTypes,
  years,
  maxPrice,
  maxMileage,
  maxMonthly,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md shadow-slate-200/70 ring-1 ring-slate-200">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Make, model, or keyword"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => onChange({ ...filters, make: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Body Style
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => onChange({ ...filters, bodyType: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any</option>
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Fuel
          </label>
          <select
            value={filters.fuel}
            onChange={(e) => onChange({ ...filters, fuel: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span>Max price</span>
            <span className="text-sm font-semibold text-navy">{formatPrice(filters.maxPrice)}</span>
          </label>
          <input
            type="range"
            min="15000"
            max={maxPrice}
            step="500"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span>Max mileage</span>
            <span className="text-sm font-semibold text-navy">
              {filters.maxMileage.toLocaleString()} mi
            </span>
          </label>
          <input
            type="range"
            min="30000"
            max={maxMileage}
            step="5000"
            value={filters.maxMileage}
            onChange={(e) => onChange({ ...filters, maxMileage: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span>Max monthly</span>
            <span className="text-sm font-semibold text-navy">
              {formatPrice(filters.maxMonthly)} /mo
            </span>
          </label>
          <input
            type="range"
            min="200"
            max={maxMonthly}
            step="10"
            value={filters.maxMonthly}
            onChange={(e) => onChange({ ...filters, maxMonthly: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Min year
          </label>
          <select
            value={filters.minYear}
            onChange={(e) => onChange({ ...filters, minYear: Number(e.target.value) })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}+
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function VehicleCard({ vehicle, isFavorite, onToggleFavorite, onOpenForm }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden bg-silver">
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
            <p className="text-2xl font-bold text-navy">{formatPrice(vehicle.price)}</p>
            <p className="text-sm text-slate-600">{formatPrice(vehicle.monthlyEstimate)}/mo est.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>{vehicle.mileage.toLocaleString()} mi</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{vehicle.transmission}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{vehicle.bodyType}</span>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={onOpenForm}
            className="flex-1 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
          >
            View Details
          </button>
          <button
            onClick={() => onToggleFavorite(vehicle.id)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              isFavorite
                ? 'border border-emerald-500/70 bg-emerald-50 text-emerald-700'
                : 'border border-navy/40 bg-white text-navy hover:bg-slate-50'
            }`}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  )
}

function FinanceSection({ inputs, onChange, onOpenForm }) {
  const principal = Math.max(inputs.price - inputs.downPayment, 0)
  const monthlyRate = inputs.apr / 100 / 12
  const monthlyPayment = monthlyRate
    ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -inputs.term))
    : principal / inputs.term

  return (
    <section id="finance" className="section-muted border-y border-slate-200/70">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="Finance"
          title="Plan monthly payments with clarity"
          subtitle="Adjust down payment, term, and APR to see an estimated payment. Your inputs stay on this device."
          align="left"
          tone="dark"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md shadow-slate-200/70 ring-1 ring-slate-200">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Vehicle price
                <input
                  type="number"
                  value={inputs.price}
                  onChange={(e) => onChange({ ...inputs, price: Number(e.target.value) })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Down payment
                <input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) =>
                    onChange({ ...inputs, downPayment: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Term (months)
                <input
                  type="number"
                  value={inputs.term}
                  onChange={(e) => onChange({ ...inputs, term: Number(e.target.value) })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                APR (%)
                <input
                  type="number"
                  step="0.01"
                  value={inputs.apr}
                  onChange={(e) => onChange({ ...inputs, apr: Number(e.target.value) })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
          <div className="rounded-2xl bg-navy text-white p-6 shadow-lg shadow-navy/30">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Estimate
            </p>
            <h3 className="mt-3 text-4xl font-bold">
              {formatPrice(monthlyPayment || 0)} / mo
            </h3>
            <p className="mt-2 text-slate-200">
              Based on your inputs. Taxes, title, and fees may apply.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-slate-200/90">Vehicle price</p>
                <p className="text-lg font-semibold text-white">{formatPrice(inputs.price)}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-slate-200/90">Down payment</p>
                <p className="text-lg font-semibold text-white">
                  {formatPrice(inputs.downPayment)}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-slate-200/90">Term</p>
                <p className="text-lg font-semibold text-white">{inputs.term} months</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-slate-200/90">APR</p>
                <p className="text-lg font-semibold text-white">{inputs.apr}%</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onOpenForm}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy shadow-md shadow-blue-600/25 transition hover:bg-blue-50"
              >
                Share with finance team
              </button>
              <p className="text-slate-200/80 text-sm">
                Your numbers stay on this device until we move to the secure portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TradeInSection({ draft, onChange, onSave, saved, onOpenForm }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <section id="tradein" className="section-light border-y border-slate-200/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="Trade-In"
          title="Get a trade value without hassle"
          subtitle="Send details, save locally, and our team replies quickly."
          align="left"
          tone="dark"
        />
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-md shadow-slate-200/70 ring-1 ring-slate-200"
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
              <label key={key} className="text-sm font-medium text-slate-700">
                {label}
                <input
                  type={type}
                  value={draft[key]}
                  onChange={(e) => onChange({ ...draft, [key]: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            ))}
            <label className="md:col-span-2 lg:col-span-3 text-sm font-medium text-slate-700">
              Notes
              <textarea
                value={draft.notes}
                onChange={(e) => onChange({ ...draft, notes: e.target.value })}
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              onClick={onOpenForm}
              className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Send
            </button>
            <p className="text-slate-600 text-sm">You will be contacted shortly with more details.</p>
            {saved && <Badge>Draft saved</Badge>}
          </div>
        </form>
      </div>
    </section>
  )
}

function Specials() {
  const cards = [
    {
      title: 'Flexible financing',
      copy: 'Accessible down payments and quick approvals.',
      cta: 'See options',
    },
    {
      title: 'Strong trade-in values',
      copy: 'Real-time market data to maximize your equity.',
      cta: 'Start appraisal',
    },
    {
      title: 'Featured SUVs',
      copy: 'Weekly selections ready for delivery with clear pricing.',
      cta: 'View picks',
    },
  ]

  return (
    <section id="specials" className="section-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="Specials"
          title="This week's highlights"
          subtitle="Transparency, speed, and real benefits."
          align="left"
          tone="light"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-slate-200">{card.copy}</p>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:bg-blue-50">
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
      title: 'Carefully selected',
      desc: 'Inspected, reconditioned SUVs ready to drive.',
    },
    {
      title: 'Financing support',
      desc: 'Regional lenders and full guidance for many credit profiles.',
    },
    {
      title: 'Straightforward process',
      desc: 'Upfront prices, saved favorites, and fast communication.',
    },
  ]

  return (
    <section className="section-light border-y border-slate-200/60" id="whyus">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="Why RL Auto Sales"
          title="Trust at every step"
          subtitle="Human support, transparency, and quick decisions."
          align="left"
          tone="dark"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="We are RL Auto Sales"
          subtitle="Kansas City team focused on quality used SUVs, fair pricing, and advisory support."
          align="left"
          tone="dark"
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h3 className="text-xl font-semibold text-navy">Quality and transparency</h3>
            <p>
              Inventory curation with clean histories, real photos, and data-driven pricing. We offer
              protection options, financing, and coordinated delivery.
            </p>
          </div>
          <div className="space-y-4 text-slate-700">
            <h3 className="text-xl font-semibold text-navy">Supportive experience</h3>
            <p>
              Need guidance? Save favorites, run payments, and send questions without losing
              progress. Our team responds quickly and keeps it simple.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ lead, onChange, onSave, saved, onOpenForm }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <section id="contact" className="section-muted">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Reach the RL Auto Sales team"
          subtitle="Form drafts save locally until we move to the secure portal."
          align="left"
          tone="dark"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md shadow-slate-200/70 ring-1 ring-slate-200 lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  value={lead.name}
                  onChange={(e) => onChange({ ...lead, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={lead.email}
                  onChange={(e) => onChange({ ...lead, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Phone
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => onChange({ ...lead, phone: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Interest or timeline
                <input
                  type="text"
                  value={lead.message}
                  onChange={(e) => onChange({ ...lead, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  onClick={onOpenForm}
                  className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
                >
                  Send inquiry
                </button>
                <p className="text-slate-600 text-sm">
                  We will contact you shortly with more details.
                </p>
                {saved && <Badge>Inquiry saved</Badge>}
              </div>
            </form>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-md shadow-slate-200/70 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Visit</p>
              <p className="mt-2 font-semibold text-navy">813 N Kansas Ave, Kansas City, MO 64120</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1773767300486!5m2!1spt-BR!2sbr!6m8!1m7!1siYeVV01mrtW--ejVhqOG0Q!2m2!1d39.12289571103503!2d-94.54649050305609!3f282.01575722040525!4f1.4865794695197678!5f0.4000000000000002"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RL Auto Sales Location"
                />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 text-sm text-slate-700 shadow-md shadow-slate-200/70 ring-1 ring-slate-200">
              <p className="text-navy font-semibold">Business hours</p>
              <ul className="mt-2 space-y-1">
                <li>Mon-Fri: 9:00 AM - 7:00 PM</li>
                <li>Sat: 9:00 AM - 6:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
              <p className="mt-3 text-navy font-semibold">Call us</p>
              <a href={`tel:${phoneNumber}`} className="text-blue-700 font-semibold">
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
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-xl font-heading font-semibold">RL Auto Sales</p>
            <p className="mt-3 text-slate-200/80">
              Modern used vehicle center focused on clarity and trust.
            </p>
            <p className="mt-4 text-sm text-slate-300/80">
              Current version uses on-device storage. Architecture is API-ready.
            </p>
          </div>
          <div>
            <p className="font-semibold">Inventory</p>
            <ul className="mt-2 space-y-2 text-slate-200/80 text-sm">
              <li>SUVs</li>
              <li>Certified</li>
              <li>Featured</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Finance</p>
            <ul className="mt-2 space-y-2 text-slate-200/80 text-sm">
              <li>Payment options</li>
              <li>Protection plans</li>
              <li>Credit assistance</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <ul className="mt-2 space-y-2 text-slate-200/80 text-sm">
              <li>{phoneNumber}</li>
              <li>sales@northlinemotors.com</li>
              <li>Kansas City, MO</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-slate-300/80">
          (c) {new Date().getFullYear()} RL Auto Sales. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function ContactModal({ open, onClose, lead, onChange, onSubmit, title }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Contact form
            </p>
            <h3 className="text-xl font-semibold text-navy">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 px-2 py-1 text-sm text-slate-500 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input
              type="text"
              value={lead.name}
              onChange={(e) => onChange({ ...lead, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={lead.email}
              onChange={(e) => onChange({ ...lead, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Phone
            <input
              type="tel"
              value={lead.phone}
              onChange={(e) => onChange({ ...lead, phone: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Notes
            <input
              type="text"
              value={lead.message}
              onChange={(e) => onChange({ ...lead, message: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Send
            </button>
            <p className="text-sm text-slate-600">We will contact you shortly with more details.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

function App() {
  const initialInventory = useMemo(() => getInventory(seedInventory), [])
  const [inventory] = useState(initialInventory)
  const [favorites, setFavorites] = useState(() => getFavorites())
  const minYearSeed = Math.min(...inventory.map((v) => v.year))
  const filterDefaults = {
    search: '',
    make: '',
    bodyType: '',
    fuel: '',
    maxPrice: Math.max(...inventory.map((v) => v.price)) + 2000,
    maxMileage: Math.max(...inventory.map((v) => v.mileage)) + 10000,
    maxMonthly: Math.max(...inventory.map((v) => v.monthlyEstimate)) + 50,
    minYear: minYearSeed,
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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('Vehicle inquiry')

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

  const openContactModal = (title) => {
    setModalTitle(title || 'Vehicle inquiry')
    setModalOpen(true)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    setLeadSaved(true)
    setModalOpen(false)
  }

  const handleQuickSearch = ({ make, keyword, budget }) => {
    setFilters((prev) => ({
      ...prev,
      make: make || '',
      search: keyword || '',
      maxPrice: budget || prev.maxPrice,
    }))
    handleNav('inventory')
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
      if (vehicle.monthlyEstimate > filters.maxMonthly) return false
      if (vehicle.year < filters.minYear) return false
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
  const heroVehicle = featuredVehicles[0] || inventory[0]

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
  const years = useMemo(
    () => [...new Set(inventory.map((v) => v.year))].sort((a, b) => a - b),
    [inventory],
  )

  const maxPrice = Math.max(...inventory.map((v) => v.price)) + 2000
  const maxMileage = Math.max(...inventory.map((v) => v.mileage)) + 10000
  const maxMonthly = Math.max(...inventory.map((v) => v.monthlyEstimate)) + 50

  return (
    <div className="min-h-screen">
      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={leadDraft}
        onChange={setLeadDraft}
        onSubmit={handleModalSubmit}
        title={modalTitle}
      />
      <Header onNav={handleNav} />
      <Hero onNav={handleNav} onQuickSearch={handleQuickSearch} makes={makes} heroVehicle={heroVehicle} />
      <QuickActions onNav={handleNav} />

      <section id="inventory" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Featured"
            title="Featured SUVs"
            subtitle="Real photos, clear prices, ready to drive home."
            align="left"
            tone="dark"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={toggleFavorite}
                onOpenForm={() =>
                  openContactModal(`I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}`)
                }
              />
            ))}
          </div>

          <div id="filters" className="mt-14">
            <SectionHeader
              eyebrow="Inventory"
              title="Shop the full lineup"
              subtitle="Quick filters for price, monthly payment, year, body style, and keywords."
              align="left"
              tone="dark"
            />
            <Filters
              filters={filters}
              onChange={setFilters}
              makes={makes}
              fuels={fuels}
              bodyTypes={bodyTypes}
              years={years}
              maxPrice={maxPrice}
              maxMileage={maxMileage}
              maxMonthly={maxMonthly}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredInventory.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFavorite={favorites.includes(vehicle.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenForm={() =>
                    openContactModal(`I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}`)
                  }
                />
              ))}
              {filteredInventory.length === 0 && (
                <div className="md:col-span-2 lg:col-span-3 rounded-2xl bg-slate-50 p-6 text-center text-slate-600 ring-1 ring-slate-200">
                  No vehicles match these filters. Adjust price, year, or keywords.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FinanceSection
        inputs={financeInputs}
        onChange={setFinanceInputs}
        onOpenForm={() => openContactModal('Finance team follow-up')}
      />
      <TradeInSection
        draft={tradeInDraft}
        onChange={setTradeInDraft}
        onSave={() => setTradeSaved(true)}
        saved={tradeSaved}
        onOpenForm={() => openContactModal('Trade-in follow-up')}
      />
      <Specials />
      <WhyBuy />
      <About />
      <Contact
        lead={leadDraft}
        onChange={setLeadDraft}
        onSave={() => setLeadSaved(true)}
        saved={leadSaved}
        onOpenForm={() => openContactModal('Contact RL Auto Sales')}
      />
      <Footer />
    </div>
  )
}

export default App
