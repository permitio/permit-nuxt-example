export default defineEventHandler(async (event) => {
  const { newOrder, orders } = event.context;
  orders.unshift(newOrder);
  saveOrders(orders);
  const { id, totalPrice, vendor } = newOrder;

  // Sync the new order with Permit
  await permit.api.resourceInstances.create({
    key: id,
    resource: 'Order',
    attributes: { cost: totalPrice },
    tenant: 'default'
  });

  // Set the Order's Vendor with Permit
  await permit.api.roleAssignments.assign({
    user: vendor,
    role: 'Vendor',
    resource_instance: `Order:${id}`
  });

  return { id };
});
