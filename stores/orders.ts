import type { AddOrderProps, Order } from '~/types';

export const useOrdersStore = defineStore('orders', () => {
  const user = useUserStore();
  const { data, refresh } = useFetch<Order[]>('/orders', {
    headers: { user: user.current }
  });
  const all = computed(() => data.value ?? []);
  const toast = useToast();
  const toastError = (detail?: string) =>
    toast.add({
      severity: 'error',
      detail,
      summary: 'Error Occured',
      life: 5000
    });
  const add = async (props: AddOrderProps): Promise<string | null> => {
    const result = await $fetch('/orders', {
      method: 'POST',
      headers: { user: user.current },
      body: JSON.stringify(props)
    });
    if (result?.id) await refresh();
    return result?.id;
  };

  const fulfill = async (orderId: number): Promise<boolean> => {
    const result = await $fetch(`/order/${orderId}/fulfill`, {
      method: 'POST',
      headers: { user: user.current }
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  const assignRider = async (
    orderId: number,
    rider: string
  ): Promise<boolean> => {
    const result = await $fetch(`/order/${orderId}/assign-rider`, {
      method: 'POST',
      headers: { user: user.current },
      body: JSON.stringify({ rider })
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  const deliver = async (orderId: number): Promise<boolean> => {
    const result = await $fetch(`/order/${orderId}/deliver`, {
      method: 'POST',
      headers: { user: user.current }
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  return { add, all, fulfill, assignRider, deliver };
});
