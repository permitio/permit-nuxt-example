export default defineEventHandler(async (event) => {
  // Don't process if this is not a create order route
  if (event.path != '/orders' || event.method != 'POST') return;

  // Get user from the request headers;
  const { user } = event.node.req.headers as any;

  // Obtain order cost from the event context
  const { totalPrice } = event.context.newOrder;

  // Check with Permit if order can get free delivery
  const canHaveFreeDelivery = await permit.check(
    user,
    'create-with-free-delivery',
    { type: 'Order', attributes: { cost: totalPrice } }
  );

  // Issue free delivery if authorised
  if (canHaveFreeDelivery) event.context.newOrder.deliveryFee = 0;

  // Not handling when the free delivery is not issued inorder not to
  // break the flow of the application as users can still proceed to pay
  // for delivery
});
