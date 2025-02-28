import { nanoid } from 'nanoid';

export default defineEventHandler(async (event) => {
  const { name, price, vendor } = await readBody(event);
  const { city: tenant } = event.node.req.headers as any;
  const id = nanoid();

  const meals = retrieveMeals();
  meals.unshift({ id, name, price, vendor });

  // Keep only the first 10 meals
  if (meals.length > 10) {
    const toDelete = meals.splice(10);
    // Sync the deleted orders with Permit
    await Promise.all(
      toDelete.map(({ id }) => {
        permit.api.resourceInstances.delete(`Meal:${id}`);
      })
    );
  }
  saveMeals(meals);

  // Sync the new order with Permit
  await permit.api.resourceInstances.create({
    key: id,
    resource: 'Meal',
    tenant
  });

  return { id };
});
