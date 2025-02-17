export const users = ['customer1', 'rider1', 'vendor1', 'admin1'];

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
