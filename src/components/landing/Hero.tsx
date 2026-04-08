import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const PALETTE_PREVIEW = [
  { name: 'SaaS', colors: ['#3B5BDB', '#495057', '#E7F5FF', '#F8F9FA', '#212529', '#DEE2E6'] },
  { name: 'Finance', colors: ['#1B4332', '#2F4858', '#F0FFF4', '#F8FAFC', '#1A202C', '#E2E8F0'] },
  { name: 'Health', colors: ['#0EA5E9', '#10B981', '#F0F9FF', '#F8FFFC', '#0F172A', '#E0F2FE'] },
  { name: 'Retail', colors: ['#EA580C', '#F59E0B', '#FFF7ED', '#FFFBEB', '#1C1917', '#FED7AA'] },
  { name: 'Creative', colors: ['#7C3AED', '#EC4899', '#FAF5FF', '#FDF2F8', '#1E1B4B', '#EDE9FE'] },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-indigo-800/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI-ready design tokens
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Your brand.<br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                In every AI output.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              HuePrint kits give Claude, v0, and Cursor the context they need —
              not just hex codes, but <strong className="text-white font-semibold">usage rules</strong>.
              Every interface they generate feels on-brand, instantly.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 active:scale-95"
              >
                Browse Kits
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-base font-medium text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                How it works
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              {[
                '8 curated kits',
                '5 industries',
                'Light & dark modes',
                '3 export formats',
              ].map((stat) => (
                <span key={stat} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet-400" />
                  {stat}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Visual: palette preview cards */}
          <div className="relative hidden lg:block">
            {/* Glassy panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Kit palettes
              </p>
              <div className="flex flex-col gap-3">
                {PALETTE_PREVIEW.map((kit) => (
                  <div key={kit.name} className="flex items-center gap-4">
                    {/* Swatches */}
                    <div className="flex flex-1 overflow-hidden rounded-lg">
                      {kit.colors.map((color, i) => (
                        <div
                          key={i}
                          className="h-10 flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {/* Label */}
                    <span className="w-16 text-right text-xs font-medium text-slate-400">
                      {kit.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Export file pills */}
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {['system-prompt.md', 'tokens.css', 'tokens.json'].map((f) => (
                  <span
                    key={f}
                    className="rounded-md bg-slate-800 px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-xs text-slate-300 shadow-xl">
              🎨 Paste into Claude → get branded UI
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
