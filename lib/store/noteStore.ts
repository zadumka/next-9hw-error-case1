import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Tag } from '@/types/note';

interface DraftNote {
  title: string;
  content: string;
  tag: Tag;
}

type NoteDraftStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft-storage',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
