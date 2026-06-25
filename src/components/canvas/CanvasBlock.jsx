import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronDown, ChevronUp, GripVertical, Settings2, Trash2 } from 'lucide-react'
import { getBlockDef } from '../../lib/canvasBlocks'
import { blockSupportsInspector, getDefaultBlockProps } from '../../lib/canvasInspector'
import BlockStateWrapper from './primitives/BlockStateWrapper'
import BlockConfigShell from './BlockConfigShell'

export default function CanvasBlock({
  instance,
  index,
  total,
  previewState,
  isSelected,
  onSelect,
  onRemove,
  onVariantChange,
  onMove,
}) {
  const def = getBlockDef(instance.blockId)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: instance.instanceId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!def) return null

  const { Component } = def
  const variant = instance.variant || def.variants[0]?.id
  const config = { ...getDefaultBlockProps(instance.blockId), ...instance.props }
  const hasInspector = blockSupportsInspector(instance.blockId)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`cv-canvas-block${isDragging ? ' cv-canvas-block--dragging' : ''}${isSelected ? ' cv-canvas-block--selected' : ''}`}
      onClick={() => onSelect?.(instance.instanceId)}
    >
      <div className="cv-canvas-block-toolbar">
        <button
          type="button"
          className="cv-canvas-block-grip"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${def.label}`}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={14} />
        </button>

        <span className="cv-canvas-block-name">{def.label}</span>

        {def.variants.length > 1 && (
          <select
            className="cv-canvas-block-variant"
            value={variant}
            onChange={(e) => onVariantChange(instance.instanceId, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Variant for ${def.label}`}
          >
            {def.variants.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        )}

        <div className="cv-canvas-block-actions">
          {hasInspector && (
            <button
              type="button"
              className={`cv-canvas-block-action${isSelected ? ' cv-canvas-block-action--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onSelect?.(instance.instanceId) }}
              aria-label="Open block inspector"
              aria-pressed={isSelected}
            >
              <Settings2 size={14} />
            </button>
          )}
          <button
            type="button"
            className="cv-canvas-block-action"
            onClick={(e) => { e.stopPropagation(); onMove(instance.instanceId, 'up') }}
            disabled={index === 0}
            aria-label="Move up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            className="cv-canvas-block-action"
            onClick={(e) => { e.stopPropagation(); onMove(instance.instanceId, 'down') }}
            disabled={index === total - 1}
            aria-label="Move down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            className="cv-canvas-block-action cv-canvas-block-action--danger"
            onClick={(e) => { e.stopPropagation(); onRemove(instance.instanceId) }}
            aria-label={`Remove ${def.label}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="cv-canvas-block-content">
        <BlockConfigShell config={config}>
          <BlockStateWrapper
            state={previewState}
            label={def.label}
            supportsStates={def.supportsStates !== false}
          >
            <Component
              variant={variant === 'default' ? undefined : variant}
              config={config}
            />
          </BlockStateWrapper>
        </BlockConfigShell>
      </div>
    </div>
  )
}
