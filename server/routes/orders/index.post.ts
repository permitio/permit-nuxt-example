export default defineEventHandler((event) => {
  const { newOrder, orders } = event.context;
  orders.unshift(newOrder);
  saveOrders(orders);
  const { id } = newOrder;
  return { id };
});
