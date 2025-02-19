import { saveOrders } from '../../../utils/database';

export default defineEventHandler(async (event) => {
  const { orderId: id, orderIndex: index, orders } = event.context;

  if (orders[index].riderAssignedTime) {
    return {
      success: false,
      message: `Order ${id} already has rider assigned!`
    };
  }

  const { user } = event.node.req.headers as any;
  if (!user) return { success: false, message: 'Unauthorized' };
  orders[index].admin = user as string;

  const { rider } = await readBody(event);
  orders[index].rider = rider;
  orders[index].riderAssignedTime = new Date().toISOString();

  saveOrders(orders);

  return { success: true, message: `Order ${id} fulfilled successfully` };
});
