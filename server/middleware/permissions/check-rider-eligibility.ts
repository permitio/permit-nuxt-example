export default defineEventHandler(async (event) => {
  // Don't process if this is not a deliver order route
  if (
    !event.path.startsWith('/order') ||
    event.method != 'POST' ||
    event.path.split('/')[3] != 'deliver'
  ) {
    return;
  }

  // Get user from the request headers
  const { user } = event.node.req.headers as any;

  // Obtain order details from the event context
  const { orders, orderIndex } = event.context;
  const { totalPrice } = orders[orderIndex];

  // Check with Permit if the rider can make the delivery
  const canRiderDeliver = await permit.check(
    { key: user, attributes: { number_of_rides: 505 } }, // hardocded 505 for demo
    'deliver',
    { type: 'Order', attributes: { cost: totalPrice } }
  );

  // Prevent the rider from doing the delivery if not authorised
  if (!canRiderDeliver) {
    return {
      success: false,
      message: 'You are not permitted to perform this action'
    };
  }

  // Otherwise allow Nuxt to continue handling the event
});
