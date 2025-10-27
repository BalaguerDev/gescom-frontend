import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useZonesStore = create(
  persist(
    (set, get) => ({
      zones: [],
      selectedZone: null,

      addZone: (zone) => set((state) => ({ zones: [...state.zones, zone] })),
      updateZone: (updatedZone) =>
        set((state) => ({
          zones: state.zones.map((z) =>
            z.id === updatedZone.id ? updatedZone : z
          ),
        })),
      deleteZone: (id) =>
        set((state) => ({
          zones: state.zones.filter((z) => z.id !== id),
          selectedZone:
            state.selectedZone?.id === id ? null : state.selectedZone,
        })),
      setSelectedZone: (zone) => set({ selectedZone: zone }),
      clearZones: () => set({ zones: [] }),
    }),
    {
      name: "zones-storage", // clave en localStorage
      partialize: (state) => ({ zones: state.zones }), // solo guarda las zonas, no todo el estado
    }
  )
);
