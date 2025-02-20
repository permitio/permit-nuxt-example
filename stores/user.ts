export const roles = ['customer', 'rider', 'vendor', 'admin'];

export const useUserStore = defineStore('user', () => {
  const current = ref(
    import.meta.client
      ? localStorage.getItem('fooddeliveryuser') ?? 'customer1'
      : 'customer1'
  );

  onMounted(() => {
    current.value = localStorage.getItem('fooddeliveryuser') ?? 'customer1';
    watch(
      () => current.value,
      (user) => localStorage.setItem('fooddeliveryuser', user)
    );
  });

  return { current };
});
