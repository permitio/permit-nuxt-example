export default defineEventHandler(async (event) => {
  const { orderId: id, orderIndex: index, orders } = event.context;

  if (orders[index].riderAssignedTime) {
    return {
      success: false,
      message: `Order ${id} already has rider assigned!`
    };
  }

  // Get user and tenant (city) from the request headers
  const { user, city: tenant } = event.node.req.headers as any;

  if (!user) return { success: false, message: 'Unauthorized' };
  orders[index].admin = user as string;

  const { rider } = await readBody(event);
  orders[index].rider = rider;
  orders[index].riderAssignedTime = new Date().toISOString();

  saveOrders(orders);

  // Create the rider if not exists
  await permit.api.users.sync({
    key: rider,
    role_assignments: [{ role: 'rider', tenant }]
  });

  // Assign the order to the rider in Permit
  await permit.api.assignRole({
    user: rider,
    role: 'Rider',
    resource_instance: `Order:${id}`,
    tenant
  });

  return { success: true, message: `Order ${id} fulfilled successfully` };
});
