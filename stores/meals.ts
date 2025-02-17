import type { AddMealProps, Meal } from '~/types';

export const useMealsStore = defineStore('meals', () => {
  const { data, refresh } = useFetch<Meal[]>('/meals');
  const all = computed(() => data.value ?? []);
  const toast = useToast();
  const toastError = (detail?: string) =>
    toast.add({
      severity: 'error',
      detail,
      summary: 'Error Occured',
      life: 5000
    });
  const user = useUserStore();

  const add = async (props: AddMealProps): Promise<string | null> => {
    const result = await $fetch('/meals', {
      method: 'POST',
      headers: { user: user.current },
      body: JSON.stringify(props)
    });
    if (result?.id) await refresh();
    else toastError();
    return result?.id;
  };

  const remove = async (id: string): Promise<boolean> => {
    const result = await $fetch(`/meal/${id}`, {
      method: 'DELETE',
      headers: { user: user.current }
    });
    if (result?.success) await refresh();
    else toastError(result?.message ?? 'Error Occured');
    return result?.success;
  };

  return { add, all, remove };
});
