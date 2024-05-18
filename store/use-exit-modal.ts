import { create } from "zustand";

type ExitModalStater ={
    isOpen:boolean;
    open: () =>void,
    close: () => void;
};

export const useExitModal = create<ExitModalStater>((set)=>({
    isOpen: false, 
    open: () => set({ isOpen: true}),
    close: () => set({isOpen: false})
}));