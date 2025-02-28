import type { AddMealProps, Meal } from '~/types';

export const useMealsStore = defineStore('meals', () => {
  const city = useCityStore();
  const user = useUserStore();
  const headers = computed(() => ({
    headers: { city: city.current, user: user.current }
  }));
  const { data, refresh } = useFetch<Meal[]>('/meals', { ...headers.value });
  const all = computed(() => data.value ?? []);
  const toast = useToast();
  const toastError = (detail?: string) =>
    toast.add({
      severity: 'error',
      detail,
      summary: 'Error Occured',
      life: 5000
    });

  const add = async (props: AddMealProps): Promise<string | null> => {
    const result = await $fetch('/meals', {
      method: 'POST',
      body: JSON.stringify(props),
      ...headers.value
    });
    if (result?.id) await refresh();
    else toastError(result?.message);
    return result?.id;
  };

  const remove = async (id: string): Promise<boolean> => {
    const result = await $fetch(`/meal/${id}`, {
      method: 'DELETE',
      ...headers.value
    });
    if (result?.success) await refresh();
    else toastError(result?.message);
    return result?.success;
  };

  return { add, all, remove };
});
