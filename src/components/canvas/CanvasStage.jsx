import React, { useCallback } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { LayoutTemplate } from 'lucide-react'
import { useKitTheme } from '../../lib/useKitTheme'
import { getViewportWidth } from '../../lib/canvasInspector'
import CanvasBlock from './CanvasBlock'

export default function CanvasStage({
  kit,
  mode,
  viewport,
  blocks,
  previewState,
  selectedInstanceId,
  onSelectBlock,
  onRemoveBlock,
  onVariantChange,
  onMoveBlock,
}) {
  const themeRef = useKitTheme(kit, mode)
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' })
  const viewportWidth = getViewportWidth(viewport)

  const mergedRef = useCallback((node) => {
    setNodeRef(node)
    themeRef.current = node
  }, [setNodeRef, themeRef])

  const instanceIds = blocks.map((b) => b.instanceId)

  return (
    <div className="cv-stage-wrap">
      <div className={`cv-stage-frame cv-stage-frame--${viewport}`}>
        <div
          ref={mergedRef}
          className={`cv-stage${isOver ? ' cv-stage--over' : ''}`}
          style={{
            background: 'var(--hp-background, #fff)',
            color: 'var(--hp-text, #111827)',
            maxWidth: viewportWidth ? `${viewportWidth}px` : '100%',
            margin: viewportWidth ? '0 auto' : undefined,
          }}
          onClick={() => onSelectBlock?.(null)}
        >
          {blocks.length === 0 ? (
            <div className="cv-stage-empty">
              <LayoutTemplate size={40} strokeWidth={1.25} className="cv-stage-empty-icon" />
              <p className="cv-stage-empty-title">Your canvas is empty</p>
              <p className="cv-stage-empty-sub">Drag components from the left panel to build your layout</p>
            </div>
          ) : (
            <SortableContext items={instanceIds} strategy={verticalListSortingStrategy}>
              <div className="cv-stage-blocks" onClick={(e) => e.stopPropagation()}>
                {blocks.map((instance, index) => (
                  <CanvasBlock
                    key={instance.instanceId}
                    instance={instance}
                    index={index}
                    total={blocks.length}
                    previewState={previewState}
                    isSelected={selectedInstanceId === instance.instanceId}
                    onSelect={onSelectBlock}
                    onRemove={onRemoveBlock}
                    onVariantChange={onVariantChange}
                    onMove={onMoveBlock}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  )
}
