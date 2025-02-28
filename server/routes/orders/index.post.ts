import { Order } from '~/types';

export default defineEventHandler(async (event) => {
  const { newOrder, orders } = event.context;
  orders.unshift(newOrder);

  // Keep only the first 50 orders
  if (orders.length > 50) {
    const toDelete = orders.splice(50) as Order[];
    // Sync the deleted orders with Permit
    await Promise.all(
      toDelete.map(({ id }) => {
        permit.api.resourceInstances.delete(`Order:${id}`);
      })
    );
  }

  saveOrders(orders);
  const { city: tenant, id, totalPrice, vendor } = newOrder;

  // Sync the new order with Permit
  await permit.api.resourceInstances.create({
    key: id,
    resource: 'Order',
    attributes: { cost: totalPrice },
    tenant
  });

  // Set the Order's Vendor with Permit
  await permit.api.roleAssignments.assign({
    user: vendor,
    role: 'Vendor',
    resource_instance: `Order:${id}`,
    tenant
  });

  return { id };
});
