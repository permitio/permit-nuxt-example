import { nanoid } from 'nanoid';
import { retrieveMeals, saveMeals } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const { name, price, vendor } = await readBody(event);
  const id = nanoid();

  const meals = retrieveMeals();
  meals.unshift({ id, name, price, vendor });
  saveMeals(meals);

  return { id };
});
