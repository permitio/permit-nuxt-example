import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Meal, Order } from '~/types';

export const retrieveMeals = (): Meal[] => {
  const exists = existsSync('temp/meals.json');
  return exists ? JSON.parse(readFileSync('temp/meals.json', 'utf8')) : [];
};

export const saveMeals = (meals: Meal[]) =>
  writeFileSync('temp/meals.json', JSON.stringify(meals, null, 2));

export const retrieveOrders = (): Order[] => {
  const exists = existsSync('temp/orders.json');
  return exists ? JSON.parse(readFileSync('temp/orders.json', 'utf8')) : [];
};

export const saveOrders = (orders: Order[]) =>
  writeFileSync('temp/orders.json', JSON.stringify(orders, null, 2));
