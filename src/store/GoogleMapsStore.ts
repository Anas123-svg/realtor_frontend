import { create } from "zustand";

interface GoogleMapsState {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useGoogleMapsStore = create<GoogleMapsState>((set) => ({
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
