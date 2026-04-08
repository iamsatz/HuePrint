import React from 'react'
import { INDUSTRIES } from '../../types/kit'
import './IndustryFilter.css'

/**
 * @param {{ selected: string, onChange: (industry: string) => void }} props
 */
export default function IndustryFilter({ selected, onChange }) {
  return (
    <div className="industry-filter" role="tablist" aria-label="Filter by industry">
      {INDUSTRIES.map((industry) => (
        <button
          key={industry}
          role="tab"
          aria-selected={selected === industry}
          className={
            'industry-filter-tab' +
            (selected === industry ? ' industry-filter-tab--active' : '')
          }
          onClick={() => onChange(industry)}
        >
          {industry}
        </button>
      ))}
    </div>
  )
}
