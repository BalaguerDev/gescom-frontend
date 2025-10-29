import { create } from "zustand";

export const useRouteStore = create((set) => ({
  monthlyRoutes: {}, // { '2025-10': [ { client, visitStatus, arrivalTime } ] }
  setMonthlyRoute: (monthKey, route) =>
    set((state) => ({
      monthlyRoutes: { ...state.monthlyRoutes, [monthKey]: route },
    })),
  toggleVisitStatus: (monthKey, clientId) =>
    set((state) => ({
      monthlyRoutes: {
        ...state.monthlyRoutes,
        [monthKey]: state.monthlyRoutes[monthKey].map((c) =>
          c.client.id === clientId
            ? { ...c, visitStatus: c.visitStatus === "done" ? "pending" : "done" }
            : c
        ),
      },
    })),
}));
