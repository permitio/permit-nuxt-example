export default defineEventHandler(async (event) => {
  const meals = retrieveMeals();
  if (meals.length == 0) return { success: true };

  const id = getRouterParam(event, 'id');
  saveMeals(meals.filter(({ id: _id }) => id !== _id));

  // Delete Meal with Permit
  await permit.api.resourceInstances.delete(`Meal:${id}`);

  return { success: true };
});
