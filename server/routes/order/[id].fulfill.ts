import { saveOrders } from '../../utils/database';

export default defineEventHandler((event) => {
  const { orderId: id, orderIndex: index, orders } = event.context;

  if (orders[index].fulfilledTime) {
    return { success: false, message: `Order ${id} already fulfilled!` };
  }

  orders[index].fulfilledTime = new Date().toISOString();
  saveOrders(orders);

  return { success: true, message: `Order ${id} fulfilled successfully` };
});
