import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import ComponentPalette from '../components/canvas/ComponentPalette'
import CanvasStage from '../components/canvas/CanvasStage'
import KitControls from '../components/canvas/KitControls'
import BlockInspector from '../components/canvas/BlockInspector'
import CanvasLayoutControls from '../components/canvas/CanvasLayoutControls'
import CanvasExportModal from '../components/canvas/CanvasExportModal'
import { useCanvasLayout } from '../lib/useCanvasLayout'
import { useCustomKit } from '../context/CustomKitContext'
import { loadKits } from '../lib/loadKits'
import { getBlockDef, getBlockCount, getVariantCount } from '../lib/canvasBlocks'
import { blockSupportsInspector } from '../lib/canvasInspector'
import './CanvasPage.css'

function DragPreview({ blockId }) {
  const def = getBlockDef(blockId)
  if (!def) return null
  return (
    <div className="cv-drag-preview">
      <GripVertical size={14} />
      <span>{def.label}</span>
    </div>
  )
}

export default function CanvasPage() {
  const { customKit } = useCustomKit()
  const {
    layout,
    activeLayoutId,
    activeLayoutName,
    savedLayouts,
    setKitRef,
    setMode,
    setPreviewState,
    setViewport,
    addBlock,
    removeBlock,
    updateBlockVariant,
    updateBlockProps,
    moveBlock,
    clearCanvas,
    setLayout,
    selectLayout,
    createLayout,
    duplicateLayout,
    renameActiveLayout,
    removeLayout,
    applyTemplate,
  } = useCanvasLayout()

  const [kits, setKits] = useState([])
  const [activeDrag, setActiveDrag] = useState(null)
  const [selectedInstanceId, setSelectedInstanceId] = useState(null)
  const [exportOpen, setExportOpen] = useState(false)

  useEffect(() => {
    loadKits().then(setKits).catch(() => setKits([]))
  }, [])

  const resolvedKit = useMemo(() => {
    if (layout.kitRef.source === 'custom' && customKit) return customKit
    return kits.find((k) => k.id === layout.kitRef.id) || kits[0] || null
  }, [layout.kitRef, customKit, kits])

  const selectedInstance = useMemo(
    () => layout.blocks.find((b) => b.instanceId === selectedInstanceId) || null,
    [layout.blocks, selectedInstanceId]
  )

  const showInspector = selectedInstance && blockSupportsInspector(selectedInstance.blockId)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  const handleSelectBlock = useCallback((instanceId) => {
    if (!instanceId) {
      setSelectedInstanceId(null)
      return
    }
    const block = layout.blocks.find((b) => b.instanceId === instanceId)
    if (block && blockSupportsInspector(block.blockId)) {
      setSelectedInstanceId(instanceId)
    } else {
      setSelectedInstanceId(null)
    }
  }, [layout.blocks])

  const handleRemoveBlock = useCallback((instanceId) => {
    removeBlock(instanceId)
    if (selectedInstanceId === instanceId) setSelectedInstanceId(null)
  }, [removeBlock, selectedInstanceId])

  const handleClearCanvas = useCallback(() => {
    clearCanvas()
    setSelectedInstanceId(null)
  }, [clearCanvas])

  const handleSelectLayout = useCallback((layoutId) => {
    selectLayout(layoutId)
    setSelectedInstanceId(null)
  }, [selectLayout])

  const handleCreateLayout = useCallback(() => {
    createLayout()
    setSelectedInstanceId(null)
  }, [createLayout])

  const handleDuplicateLayout = useCallback(() => {
    duplicateLayout()
    setSelectedInstanceId(null)
  }, [duplicateLayout])

  const handleApplyTemplate = useCallback((templateId) => {
    applyTemplate(templateId)
    setSelectedInstanceId(null)
  }, [applyTemplate])

  const handleDragStart = useCallback((event) => {
    const { active } = event
    const data = active.data.current
    if (data?.type === 'palette') {
      setActiveDrag({ type: 'palette', blockId: data.blockId })
    } else {
      setActiveDrag({ type: 'canvas', instanceId: active.id })
    }
  }, [])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event
    setActiveDrag(null)

    if (!over) return

    const activeData = active.data.current

    if (activeData?.type === 'palette') {
      const overId = over.id
      if (overId === 'canvas-drop-zone' || String(overId).startsWith('inst_')) {
        addBlock(activeData.blockId)
      }
      return
    }

    if (active.id !== over.id) {
      setLayout((prev) => {
        const oldIndex = prev.blocks.findIndex((b) => b.instanceId === active.id)
        const newIndex = prev.blocks.findIndex((b) => b.instanceId === over.id)
        if (oldIndex === -1 || newIndex === -1) return prev
        return {
          ...prev,
          blocks: arrayMove(prev.blocks, oldIndex, newIndex),
        }
      })
    }
  }, [addBlock, setLayout])

  const handleDragCancel = useCallback(() => {
    setActiveDrag(null)
  }, [])

  return (
    <div className="cv-page">
      <header className="cv-page-header">
        <div className="cv-page-header-text">
          <h1 className="cv-page-title">Canvas</h1>
          <p className="cv-page-sub">
            Templates · multi-layout save · AI export · {getBlockCount()} blocks · {getVariantCount()} variants
          </p>
        </div>
      </header>

      <CanvasLayoutControls
        savedLayouts={savedLayouts}
        activeLayoutId={activeLayoutId}
        activeLayoutName={activeLayoutName}
        blockCount={layout.blocks.length}
        onSelectLayout={handleSelectLayout}
        onCreateLayout={handleCreateLayout}
        onDuplicateLayout={handleDuplicateLayout}
        onRenameLayout={renameActiveLayout}
        onDeleteLayout={removeLayout}
        onApplyTemplate={handleApplyTemplate}
        onExport={() => setExportOpen(true)}
      />

      <KitControls
        kitRef={layout.kitRef}
        mode={layout.mode}
        previewState={layout.previewState}
        viewport={layout.viewport}
        onKitRefChange={setKitRef}
        onModeChange={setMode}
        onPreviewStateChange={setPreviewState}
        onViewportChange={setViewport}
        onClearCanvas={handleClearCanvas}
        blockCount={layout.blocks.length}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className={`cv-workspace${showInspector ? ' cv-workspace--inspector' : ''}`}>
          <ComponentPalette />
          <CanvasStage
            kit={resolvedKit}
            mode={layout.mode}
            viewport={layout.viewport}
            blocks={layout.blocks}
            previewState={layout.previewState}
            selectedInstanceId={selectedInstanceId}
            onSelectBlock={handleSelectBlock}
            onRemoveBlock={handleRemoveBlock}
            onVariantChange={updateBlockVariant}
            onMoveBlock={moveBlock}
          />
          {showInspector && (
            <BlockInspector
              instance={selectedInstance}
              onClose={() => setSelectedInstanceId(null)}
              onPropsChange={updateBlockProps}
            />
          )}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeDrag?.type === 'palette' && (
            <DragPreview blockId={activeDrag.blockId} />
          )}
        </DragOverlay>
      </DndContext>

      {exportOpen && (
        <CanvasExportModal
          layout={layout}
          layoutName={activeLayoutName}
          kitName={resolvedKit?.name}
          onClose={() => setExportOpen(false)}
        />
      )}
    </div>
  )
}
