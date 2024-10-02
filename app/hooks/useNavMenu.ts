import { create } from "zustand";

interface NavMenuStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: (o: boolean) => void;
}

const useNavMenu = create<NavMenuStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: (o: boolean) => set({ isOpen: o }),
}));

export default useNavMenu;
