import { ArrowRight, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      {/* Pre-footer CTA */}
      <div className="bg-violet-600">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Stop starting with generic colors.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
            Pick a kit. Preview it. Paste the files into your AI tool.
            Your brand, in every component it writes.
          </p>
          <Link
            to="/browse"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-violet-700 shadow-lg transition hover:bg-violet-50 active:scale-95"
          >
            Browse Kits
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer bar */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600">
                <Palette className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white">HuePrint</span>
            </div>

            <p className="text-sm text-slate-500">
              Design token kits for AI-builders.
            </p>

            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} HuePrint
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
