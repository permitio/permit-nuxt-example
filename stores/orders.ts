import type { AddOrderProps, Order } from '~/types';

export const useOrdersStore = defineStore('orders', () => {
  const city = useCityStore();
  const user = useUserStore();
  const headers = computed(() => ({
    headers: { city: city.current, user: user.current }
  }));
  const { data, refresh } = useFetch<Order[]>('/orders', { ...headers.value });
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
      body: JSON.stringify(props),
      ...headers.value
    });
    if (result?.id) await refresh();
    return result?.id;
  };

  const fulfill = async (orderId: number): Promise<boolean> => {
    const result = await $fetch(`/order/${orderId}/fulfill`, {
      method: 'POST',
      ...headers.value
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
      body: JSON.stringify({ rider }),
      ...headers.value
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  const deliver = async (orderId: number): Promise<boolean> => {
    const result = await $fetch(`/order/${orderId}/deliver`, {
      method: 'POST',
      ...headers.value
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  return { add, all, fulfill, assignRider, deliver };
});
