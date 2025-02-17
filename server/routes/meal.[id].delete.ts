import { retrieveMeals, saveMeals } from '../utils/database';

export default defineEventHandler((event) => {
  const meals = retrieveMeals();
  if (meals.length == 0) return { success: true };

  const id = getRouterParam(event, 'id');
  saveMeals(meals.filter(({ id: _id }) => id !== id));
  return { success: true };
});
