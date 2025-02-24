import { MealInOrder } from '~/types';

export default defineEventHandler(async (event) => {
  if (event.path !== '/orders' || event.method !== 'POST') return;

  const { meals, customer, vendor } = await readBody(event);
  const totalPrice = meals
    .map(({ quantity, price }: MealInOrder) => quantity * price)
    .reduce((sum: number, price: number) => sum + price, 0);
  const deliveryFee = 50;
  const grandTotal = totalPrice + deliveryFee;
  const orderTime = new Date().toISOString();
  const orders = retrieveOrders();
  const id = orders.length + 1;

  event.context.newOrder = {
    customer,
    id,
    meals,
    orderTime,
    totalPrice,
    vendor,
    deliveryFee,
    grandTotal
  };
  event.context.orders = orders;
});
