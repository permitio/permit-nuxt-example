<script setup lang="ts">
const city = useCityStore();
const confirm = useConfirm();
const user = useUserStore();
const toast = useToast();
const noOfRides = ref('500');
const isModalVisible = ref(false);
const currentRole = ref(roles[0]);
const isGranting = ref(false);
const isRevoking = ref(false);

const update = async (isGrant: boolean) => {
  isGrant ? (isGranting.value = true) : (isRevoking.value = true);
  await user.updateRole({
    role: currentRole.value,
    user: user.current,
    tenant: city.current,
    isGrant,
    ...(currentRole.value === 'rider' && { noOfRides: +noOfRides.value })
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
  noOfRides.value = '500';
  isModalVisible.value = false;
};

const removeUser = () => {
  confirm.require({
    group: 'remove-user',
    message:
      `This will remove the current test user: ${user.current} from` +
      ` Permit entirely with all roles, attributes, and relationships. Are` +
      ` you sure you want to proceed?`,
    header: 'Heads Up!',
    rejectProps: {
      label: 'Not yet',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes, go on',
      severity: 'danger'
    },
    accept: async () => {
      await user.remove();
      toast.add({
        severity: 'success',
        summary: 'User Removed',
        detail:
          `User ${user.current} removed successfully from Permit.` +
          `You can create by granting a role.`,
        life: 5000
      });
    }
  });
};
</script>

<template>
  <div class="flex items-center gap-3">
    <span class="ml-2">{{ user.current }}</span>
    <Button
      label="Manage"
      @click="isModalVisible = !isModalVisible"
      variant="outlined"
      severity="contrast"
      class="px-1 !py-0.5"
    />
    <Button
      severity="danger"
      variant="text"
      icon="pi pi-trash"
      class="px-2 !py-0 -ml-3"
      @click="removeUser"
    />
    <ConfirmDialog group="remove-user">
      <template #message="slotProps">
        <div class="max-w-md">
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ConfirmDialog>
  </div>
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
    <h4 class="mb-1 font-bold">City (Tenant for Role Assignment)</h4>
    <Select v-model="city.current" :options="cities" class="w-40 mb-6" />
    <div class="flex flex-col mb-6" v-if="currentRole === 'rider'">
      <label for="no-of-rides" class="font-bold w-24 mb-1">No Of Rides</label>
      <InputText
        id="no-of-rides"
        v-model="noOfRides"
        class="w-48"
        type="number"
        min="0"
        step="1"
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

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

input[type='number'] {
  -mox-appearance: textfield;
  appearance: textfield;
}
</style>
