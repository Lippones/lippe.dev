import { create } from 'zustand'

export type Position = {
  x: number
  y: number
  pointer: 'mouse' | 'touch'
}

type Cursor = Position & {
  country: string | null
  lastUpdate: number
}

type OtherCursorsMap = {
  [id: string]: Cursor
}

interface CursorStoreType {
  others: OtherCursorsMap
  self: Position | null
  setSelf: (position: Position | null) => void
  setOthers: (others: OtherCursorsMap) => void
  updateOther: (id: string, cursor: Cursor) => void
  removeOther: (id: string) => void
}

export const useCursorStore = create<CursorStoreType>((set) => ({
  others: {},
  self: null,
  setSelf: (position) => set({ self: position }),
  setOthers: (others) => set({ others }),
  updateOther: (id, cursor) =>
    set((state) => ({ others: { ...state.others, [id]: cursor } })),
  removeOther: (id) =>
    set((state) => {
      const newOthers = { ...state.others }
      delete newOthers[id]
      return { others: newOthers }
    }),
}))
