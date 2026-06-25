import { useState, useEffect, useCallback, useMemo } from 'react'
import { getDefaultVariant, isValidPreviewState, isValidVariant } from './canvasBlocks'
import { getDefaultBlockProps, normalizeBlockProps, isValidViewport } from './canvasInspector'
import {
  loadWorkspaces,
  saveWorkspaces,
  createInstanceId,
  addNewLayout,
  duplicateActiveLayout,
  renameLayout,
  deleteLayout,
  switchActiveLayout,
  updateActiveLayoutData,
  replaceActiveLayoutData,
  getActiveSavedLayout,
  DEFAULT_LAYOUT_DATA,
} from './canvasStorage'
import { getTemplate, templateToLayoutData } from './canvasTemplates'

export function useCanvasLayout() {
  const [workspace, setWorkspace] = useState(() => loadWorkspaces())

  useEffect(() => {
    saveWorkspaces(workspace)
  }, [workspace])

  const activeSaved = useMemo(() => getActiveSavedLayout(workspace), [workspace])
  const layout = activeSaved?.data ?? DEFAULT_LAYOUT_DATA
  const savedLayouts = workspace.layouts

  const setLayout = useCallback((updater) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, updater))
  }, [])

  const setKitRef = useCallback((kitRef) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({ ...data, kitRef })))
  }, [])

  const setMode = useCallback((mode) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      mode: mode === 'dark' ? 'dark' : 'light',
    })))
  }, [])

  const setPreviewState = useCallback((previewState) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      previewState: isValidPreviewState(previewState) ? previewState : 'default',
    })))
  }, [])

  const setViewport = useCallback((viewport) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      viewport: isValidViewport(viewport) ? viewport : 'desktop',
    })))
  }, [])

  const addBlock = useCallback((blockId, variant) => {
    const resolvedVariant = variant && isValidVariant(blockId, variant) ? variant : getDefaultVariant(blockId)
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      blocks: [
        ...data.blocks,
        {
          instanceId: createInstanceId(),
          blockId,
          variant: resolvedVariant,
          props: getDefaultBlockProps(blockId),
        },
      ],
    })))
  }, [])

  const removeBlock = useCallback((instanceId) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      blocks: data.blocks.filter((b) => b.instanceId !== instanceId),
    })))
  }, [])

  const updateBlockVariant = useCallback((instanceId, variant) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      blocks: data.blocks.map((b) => {
        if (b.instanceId !== instanceId) return b
        if (!isValidVariant(b.blockId, variant)) return b
        return { ...b, variant }
      }),
    })))
  }, [])

  const updateBlockProps = useCallback((instanceId, props) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({
      ...data,
      blocks: data.blocks.map((b) => {
        if (b.instanceId !== instanceId) return b
        return { ...b, props: normalizeBlockProps(b.blockId, props) }
      }),
    })))
  }, [])

  const reorderBlocks = useCallback((activeId, overId) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => {
      const oldIndex = data.blocks.findIndex((b) => b.instanceId === activeId)
      const newIndex = data.blocks.findIndex((b) => b.instanceId === overId)
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return data
      const next = [...data.blocks]
      const [moved] = next.splice(oldIndex, 1)
      next.splice(newIndex, 0, moved)
      return { ...data, blocks: next }
    }))
  }, [])

  const moveBlock = useCallback((instanceId, direction) => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => {
      const index = data.blocks.findIndex((b) => b.instanceId === instanceId)
      if (index === -1) return data
      const target = direction === 'up' ? index - 1 : index + 1
      if (target < 0 || target >= data.blocks.length) return data
      const next = [...data.blocks]
      const [moved] = next.splice(index, 1)
      next.splice(target, 0, moved)
      return { ...data, blocks: next }
    }))
  }, [])

  const clearCanvas = useCallback(() => {
    setWorkspace((prev) => updateActiveLayoutData(prev, (data) => ({ ...data, blocks: [] })))
  }, [])

  const selectLayout = useCallback((layoutId) => {
    setWorkspace((prev) => switchActiveLayout(prev, layoutId))
  }, [])

  const createLayout = useCallback((name = 'Untitled canvas') => {
    setWorkspace((prev) => addNewLayout(prev, name))
  }, [])

  const duplicateLayout = useCallback(() => {
    setWorkspace((prev) => duplicateActiveLayout(prev))
  }, [])

  const renameActiveLayout = useCallback((name) => {
    setWorkspace((prev) => renameLayout(prev, prev.activeLayoutId, name))
  }, [])

  const removeLayout = useCallback((layoutId) => {
    setWorkspace((prev) => deleteLayout(prev, layoutId))
  }, [])

  const applyTemplate = useCallback((templateId) => {
    const template = getTemplate(templateId)
    if (!template) return false
    const data = templateToLayoutData(template)
    setWorkspace((prev) => replaceActiveLayoutData(prev, data))
    return true
  }, [])

  return {
    layout,
    activeLayoutId: workspace.activeLayoutId,
    activeLayoutName: activeSaved?.name || 'Untitled canvas',
    savedLayouts,
    setLayout,
    setKitRef,
    setMode,
    setPreviewState,
    setViewport,
    addBlock,
    removeBlock,
    updateBlockVariant,
    updateBlockProps,
    reorderBlocks,
    moveBlock,
    clearCanvas,
    selectLayout,
    createLayout,
    duplicateLayout,
    renameActiveLayout,
    removeLayout,
    applyTemplate,
  }
}
