import { Palette } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Palette className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">HuePrint</span>
          </div>

          <p className="text-sm text-slate-400">
            Production-ready design system kits for every industry.
          </p>

          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} HuePrint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
