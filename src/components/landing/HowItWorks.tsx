import { LayoutGrid, Eye, Download } from 'lucide-react'

const steps = [
  {
    icon: LayoutGrid,
    step: '01',
    title: 'Browse',
    description:
      'Explore curated design kits organized by industry — SaaS, Finance, Health, Retail, and Creative. Each kit ships with a full color system for both light and dark modes.',
  },
  {
    icon: Eye,
    step: '02',
    title: 'Preview',
    description:
      'See your chosen kit in action on a real UI preview. Toggle between light and dark, inspect individual color tokens, typography, spacing, and shadow values.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Export',
    description:
      'Copy the design tokens directly into your project as Tailwind config, CSS variables, or raw JSON. Drop them in and start building.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Three steps to a great design
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-500">
            No more color theory rabbit holes. HuePrint handles the system so you can focus on shipping.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <Icon className="h-6 w-6" />
              </div>
              <p className="absolute right-8 top-8 text-5xl font-black text-slate-100 select-none">
                {step}
              </p>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 leading-7 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
