import { LayoutGrid, Eye, PackageOpen } from 'lucide-react'

const steps = [
  {
    icon: LayoutGrid,
    step: '01',
    title: 'Browse by industry',
    description:
      'Pick from 8 kits across SaaS, Finance, Health, Retail, and Creative. Every kit is opinionated — built for the visual language of its space.',
    output: "A kit that fits your product's world",
  },
  {
    icon: Eye,
    step: '02',
    title: 'Preview on real UI',
    description:
      'See colors, type, spacing, and shadows applied to actual components — buttons, cards, inputs, navs. Toggle light and dark. Know it works before you ship it.',
    output: 'Confidence before a single line of code',
  },
  {
    icon: PackageOpen,
    step: '03',
    title: 'Export & paste into AI',
    description:
      'Download three files: a system prompt for Claude/v0/Cursor, CSS variables for your project, and a DTCG JSON token file. Paste the prompt — get on-brand output.',
    output: 'system-prompt.md · tokens.css · tokens.json',
  },
]

const problemPoints = [
  { label: 'AI tools pick generic blues and grays', fix: false },
  { label: 'HuePrint gives AI tools your usage rules', fix: true },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white">

      {/* Problem callout */}
      <div className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-medium text-slate-500 sm:max-w-lg">
              <span className="mr-2 text-xl">🤔</span>
              AI tools generate functional UI — but they apply <span className="font-semibold text-slate-700">generic colors</span>.
              That's not your brand.
            </p>
            <div className="flex flex-col gap-2">
              {problemPoints.map(({ label, fix }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                      fix
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {fix ? '✓' : '✕'}
                  </span>
                  <span className={fix ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Three steps, zero decisions.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-500">
            Pick a kit, verify it looks right, drop the files into your AI tool.
            That's it.
          </p>
        </div>

        <div className="relative mt-20 grid gap-8 sm:grid-cols-3">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent sm:block" />

          {steps.map(({ icon: Icon, step, title, description, output }) => (
            <div key={step} className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              {/* Step number circle */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-md shadow-violet-200">
                  <Icon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                    {step}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-slate-500">{description}</p>

              {/* Output pill */}
              <div className="mt-6 rounded-lg bg-slate-50 px-4 py-2.5">
                <p className="font-mono text-xs text-slate-400">
                  <span className="mr-1.5 font-sans font-semibold not-italic text-slate-500">→</span>
                  {output}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export file breakdown */}
      <div className="border-t border-slate-100 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              What you export
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Three files. Works everywhere.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                file: 'system-prompt.md',
                for: 'Claude · v0 · Cursor · Bolt',
                description:
                  'An AI-readable design brief with color usage rules — not just values. Paste it into any AI tool and your output stays on-brand.',
                accent: 'violet',
              },
              {
                file: 'tokens.css',
                for: 'Any CSS project · shadcn/ui',
                description:
                  'CSS custom properties, shadcn-compatible. Drop it in and your component library picks up your brand colors with zero config.',
                accent: 'cyan',
              },
              {
                file: 'tokens.json',
                for: 'Figma · Style Dictionary · DTCG',
                description:
                  'Universal DTCG format. Import into Figma Variables, run through Style Dictionary, or consume from any design toolchain.',
                accent: 'fuchsia',
              },
            ].map(({ file, for: forLabel, description, accent }) => (
              <div
                key={file}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className={`mb-3 font-mono text-sm font-semibold text-${accent}-400`}>
                  {file}
                </p>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {forLabel}
                </p>
                <p className="text-sm leading-6 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
