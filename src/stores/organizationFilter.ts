import { defineStore } from "pinia";

export const useOrganizationFilter = defineStore({
  id: "organizationFilter",
  state: () => ({
    organizationFilter: "lemoncode",
  }),
  getters: {
    getOrganizationFilter: (state) => state.organizationFilter,
  },
  actions: {
    set(filterValue: string) {
      this.organizationFilter = filterValue;
    },
  },
});
