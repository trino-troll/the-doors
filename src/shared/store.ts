import { create } from 'zustand';
import { CurrentUser } from '@/lib/auth';

interface StoreState {
    user: CurrentUser | null;
    setUser: (user: CurrentUser) => void;
}

export const useStore = create<StoreState>((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ user })),
}));
