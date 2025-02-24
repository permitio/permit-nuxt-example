<script setup lang="ts">
const drawer = useDrawerStore();
</script>

<template>
  <nav class="mb-4">
    <ul class="mt-2">
      <li>
        <router-link
          to="/customer"
          class="text-lg px-4 py-2 rounded-md block p-ripple"
          v-ripple
          @click="drawer.close"
        >
          <i class="pi pi-shopping-cart mr-3"></i>
          <span>Customer</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/rider"
          class="text-lg px-4 py-2 rounded-md block p-ripple"
          v-ripple
          @click="drawer.close"
        >
          <i class="pi pi-truck mr-3"></i>
          <span>Rider</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/vendor"
          class="text-lg px-4 py-2 rounded-md block p-ripple"
          v-ripple
          @click="drawer.close"
        >
          <i class="pi pi-warehouse mr-3"></i>
          <span>Vendor</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/admin"
          class="text-lg px-4 py-2 rounded-md block p-ripple"
          v-ripple
          @click="drawer.close"
        >
          <i class="pi pi-wrench mr-3"></i>
          <span>Admin</span>
        </router-link>
      </li>
    </ul>
  </nav>
  <h4 class="pt-3 ml-2 mb-2 font-bold underline">Current User</h4>
  <UserRoleModal />
</template>

<style scoped>
nav .router-link-active {
  font-weight: bold;
}
</style>
