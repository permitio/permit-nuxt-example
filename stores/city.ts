export const cities = ['california', 'washington'];

export const useCityStore = defineStore('city', () => {
  const current = ref(
    import.meta.client
      ? localStorage.getItem('fooddeliverycity') ?? 'california'
      : 'california'
  );

  onMounted(() => {
    current.value = localStorage.getItem('fooddeliverycity') ?? 'california';
    watch(
      () => current.value,
      (city) => localStorage.setItem('fooddeliverycity', city)
    );
  });

  return { current };
});
