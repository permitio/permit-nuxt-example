export default defineEventHandler(async (event) => {
  // Don't process if this is not a fulfill order route
  if (
    !event.path.startsWith('/order') ||
    event.method != 'POST' ||
    event.path.split('/')[3] != 'fulfill'
  ) {
    return;
  }

  // Get user from the request headers;
  const { user } = event.node.req.headers as any;

  // Obtain orderId from the event context
  const { orderId } = event.context;

  // Check with Permit if the vendor can fulfill the order
  const canFulfillOrder = await permit.check(
    user,
    'fulfill',
    { type: 'Order', key: orderId } // providing orderId for ReBAC
  );

  // Prevent the vendor from fulfilling the order if not authorised
  if (!canFulfillOrder) {
    return {
      success: false,
      message: 'You are not permitted to perform this action'
    };
  }

  // Otherwise allow Nuxt to continue handling the event
});
