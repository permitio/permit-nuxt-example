<script setup lang="ts">
const drawer = useDrawerStore();
</script>

<template>
  <header class="p-4 sm:px-8 shadow-md flex justify-between md:hidden">
    <h1 class="text-2xl">Food Delivery</h1>
    <Button
      severity="contrast"
      variant="text"
      icon="pi pi-align-justify"
      @click="drawer.open"
    />
  </header>

  <Drawer
    v-model:visible="drawer.isVisible"
    header=" "
    position="right"
    :blockScroll="true"
    class="md:hidden"
  >
    <AppMenu />
  </Drawer>

  <div
    class="max-md:hidden shadow dark:shadow-white/40 w-64 p-4 fixed top-0 bottom-0"
  >
    <h1 class="text-3xl mb-4">Food Delivery</h1>
    <AppMenu />
  </div>

  <main class="p-4 sm:px-8 md:ml-64 md:max-w-lg">
    <slot />

    <Toast />
  </main>
</template>
