export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/order/')) return;

  const id = event.path.split('/order/')[1].split('/')[0];
  if (!id || event.method !== 'POST') return;

  const orders = retrieveOrders();
  if (orders.length == 0) throw 'No orders found';

  const index = orders.findIndex(({ id: _id }) => _id == +id);
  if (index == -1) throw `Order ${id} not found!`;

  event.context.orderId = id;
  event.context.orderIndex = index;
  event.context.orders = orders;
});
