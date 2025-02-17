import { retrieveOrders } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id || event.method !== 'POST') return;

  const orders = retrieveOrders();
  if (orders.length == 0) throw 'No orders found';

  const index = orders.findIndex(({ id: _id }) => _id == +id);
  if (index == -1) throw `Order ${id} not found!`;

  event.context.orderId = id;
  event.context.orderIndex = index;
  event.context.orders = orders;
});
