import type { UpdateUserRole } from '~/types';

export const roles = ['customer', 'rider', 'vendor', 'admin'];

export const useUserStore = defineStore('user', () => {
  const current = ref(
    import.meta.client
      ? localStorage.getItem('fooddeliveryuser') ?? 'customer1'
      : 'customer1'
  );

  const updateRole = async (props: UpdateUserRole) => {
    await $fetch('/users', { method: 'POST', body: JSON.stringify(props) });
  };

  const remove = async () => {
    await $fetch('/users', {
      method: 'DELETE',
      body: JSON.stringify({ user: current.value })
    });
    current.value = '';
  };

  onMounted(() => {
    current.value = localStorage.getItem('fooddeliveryuser') ?? 'customer1';
    watch(
      () => current.value,
      (user) => localStorage.setItem('fooddeliveryuser', user)
    );
  });

  return { current, remove, updateRole };
});
