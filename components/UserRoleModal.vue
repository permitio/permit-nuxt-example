<script setup lang="ts">
const city = useCityStore();
const user = useUserStore();
const toast = useToast();
const isModalVisible = ref(false);
const currentRole = ref(roles[0]);
const isGranting = ref(false);
const isRevoking = ref(false);

const update = async (isGrant: boolean) => {
  isGrant ? (isGranting.value = true) : (isRevoking.value = true);
  await user.updateRole({
    role: currentRole.value,
    user: user.current,
    city: city.current,
    isGrant
  });
  const verb = isGrant ? 'granted' : 'revoked';
  toast.add({
    severity: 'success',
    summary: `Role ${verb}`,
    detail:
      `Role ${currentRole.value} ${verb} to user ${user.current} in ` +
      `tenant (city): ${city.current}`,
    life: 5000
  });
  isGrant ? (isGranting.value = false) : (isRevoking.value = false);
  isModalVisible.value = false;
};
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
    <h4 class="mb-1 font-bold">Current City (Tenant for Role Assignment)</h4>
    <Select v-model="city.current" :options="cities" class="w-40 mb-6" />
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
          @click="update(true)"
        />
        <Button
          label="Revoke"
          severity="danger"
          text
          :loading="isRevoking"
          :disabled="isGranting"
          @click="update(false)"
        />
      </div>
    </div>
  </Dialog>
</template>
