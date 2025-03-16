import { create } from "zustand";

interface EditStore {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  resetEditingId: () => void;
}

const useEditStore = create<EditStore>((set) => ({
  editingId: null,
  setEditingId: (id) => set({ editingId: id }),
  resetEditingId: () => set({ editingId: null }),
}));

export default useEditStore;
