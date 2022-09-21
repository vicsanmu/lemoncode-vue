<script setup lang="ts">
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import type { MemberEntity } from "@/models/member";
import { memberService } from "@/services/members";
</script>

<template>
  <h2>List page</h2>
  <br />
  <InputText v-model="filterValue" />
  <Button label="Filter" @click="() => filterMembers(filterValue)" />
  <div :style="{ marginTop: '8px', height: 615, width: '100%' }">
    <DataTable :value="members" :paginator="true" :rows="5">
      <Column field="avatar_url" header="Avatar">
        <template #body="{ data }">
          <img :src="data.avatar_url" :style="{ width: '5rem' }" />
        </template>
      </Column>
      <Column field="id" header="Id"></Column>
      <Column field="login" header="Name">
        <template #body="{ data }">
          <router-link :to="`/detail/${data.login}`">{{
            data.login
          }}</router-link>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOrganizationFilter } from "@/stores/organizationFilter";

export default defineComponent({
  data() {
    const store = useOrganizationFilter()
    return {
      members: [] as MemberEntity[],
      LEMONCODE: "lemoncode",
      filterValue: store.getOrganizationFilter,
      store,
    };
  },
  async created() {
    this.members = await memberService.get(this.filterValue);
  },
  methods: {
    async filterMembers(value: string) {
      this.store.set(value);
      this.members = await memberService.get(value)
    },
  },
});
</script>

<style lang="css" scoped>
.p-button {
  margin-left: 0.5rem;
}
</style>
