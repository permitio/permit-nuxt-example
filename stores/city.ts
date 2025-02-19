export const cities = ['California', 'Washington'];

export const useCityStore = defineStore('city', () => {
  const current = ref(
    import.meta.client
      ? localStorage.getItem('fooddeliverycity') ?? 'California'
      : 'California'
  );

  onMounted(() => {
    current.value = localStorage.getItem('fooddeliverycity') ?? 'California';
    watch(
      () => current.value,
      (city) => localStorage.setItem('fooddeliverycity', city)
    );
  });

  return { current };
});
