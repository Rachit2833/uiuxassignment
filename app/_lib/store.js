import { create } from "zustand";
const useStore = create((set) => ({
  
  mux: 1,
  upCount: () => set((state) => ({ count: state.count + state.mux })),
  lowCount: () => set((state) => ({ count: state.count - state.mux })),
  upMux: () => set((state) => ({ mux: state.mux + 1 })),
  lowMux: () => set((state) => ({ mux: state.mux - 1 })),
}));
export default useStore;



