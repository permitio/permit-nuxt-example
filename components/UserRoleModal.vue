<script setup lang="ts">
const user = useUserStore();
const isModalVisible = ref(false);
const currentRole = ref(roles[0]);
const isGranting = ref(false);
const isRevoking = ref(false);
</script>

<template>
  <Button
    label="Manage User"
    @click="isModalVisible = !isModalVisible"
    variant="outlined"
    severity="contrast"
    class="ml-2"
  />
  <Dialog
    v-model:visible="isModalVisible"
    modal
    header="Manage User"
    class="m-8"
  >
    <div class="flex flex-col mb-6">
      <label for="user-id" class="font-bold w-24 mb-1">User ID</label>
      <InputText
        id="user-id"
        v-model="user.current"
        class="w-48"
        autofocus
        autocomplete="off"
      />
    </div>
    <div class="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <h4 class="mb-1 font-bold">Selected Role</h4>
        <Select v-model="currentRole" :options="roles" class="w-40" />
      </div>
      <div class="ml-auto">
        <Button
          label="Grant"
          text
          :loading="isGranting"
          :disabled="isRevoking"
        />
        <Button
          label="Revoke"
          severity="danger"
          text
          :loading="isRevoking"
          :disabled="isGranting"
        />
      </div>
    </div>
  </Dialog>
</template>
