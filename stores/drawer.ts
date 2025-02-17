export const useDrawerStore = defineStore('drawer', () => {
  const isVisible = ref(false);
  const open = () => (isVisible.value = true);
  const close = () => (isVisible.value = false);
  return { isVisible, open, close };
});
