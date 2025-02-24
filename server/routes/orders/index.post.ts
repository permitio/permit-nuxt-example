export default defineEventHandler(async (event) => {
  const { newOrder, orders } = event.context;
  orders.unshift(newOrder);
  saveOrders(orders);
  const { id } = newOrder;

  // Sync the new order with Permit
  await permit.api.resourceInstances.create({
    key: id,
    resource: 'Order',
    attributes: { cost: newOrder.totalPrice },
    tenant: 'default'
  });

  return { id };
});
