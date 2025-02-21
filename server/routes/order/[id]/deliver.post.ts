export default defineEventHandler((event) => {
  const { orderId: id, orderIndex: index, orders } = event.context;

  if (orders[index].deliveredTime) {
    return { success: false, message: `Order ${id} already delivered!` };
  }

  orders[index].deliveredTime = new Date().toISOString();
  saveOrders(orders);

  return { success: true, message: `Order ${id} delivered successfully` };
});
