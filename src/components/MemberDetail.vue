<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <h2>Detail page</h2>
  <br>
  <Button icon="pi pi-angle-left" class="p-button-rounded p-button-outlined p-button-sm" @click="() => $router.back()" />
  <p>id: {{ member.id }}</p>
  <p>login: {{ member.login }}</p>
  <p>name: {{ member.name }}</p>
  <p>company: {{ member.company }}</p>
  <p>bio: {{ member.bio }}</p>
  <Link to="/list">Back to list page</Link>
</template>

<script lang="ts">
import type { MemberDetailEntity } from "@/models/member";
import { memberService } from "@/services/members";
import { defineComponent } from "vue";
import type { RouteLocation } from "vue-router";

export default defineComponent({
  data: () => ({
    member: {} as MemberDetailEntity,
  }),
  computed: {
    id(): string {
      return String((this.$route as RouteLocation).params.id);
    },
  },
  created() {
    memberService.getById(this.id).then((member) => {
      if (member) this.member = member;
    });
  },
});
</script>

<style lang="css" scoped>
  .p-button {
    margin-bottom: 1rem;
  }
  </style>
