export default defineEventHandler(async (event) => {
  // Don't process if this is not a deliver order route
  if (
    !event.path.startsWith('/order') ||
    event.method != 'POST' ||
    event.path.split('/')[3] != 'deliver'
  ) {
    return;
  }

  // Get user and tenant (city) from the request headers
  const { user, city: tenant } = event.node.req.headers as any;

  // Obtain order details from the event context
  const { orderId } = event.context;

  try {
    // Check with Permit if the rider is the correct one for the order
    // and can make the delivery (if it is a free one)
    const canRiderDeliver = await permit.check({ key: user }, 'deliver', {
      type: 'Order',
      key: orderId,
      tenant
    });

    // Prevent the rider from doing the delivery if not authorised
    if (!canRiderDeliver) {
      return {
        success: false,
        message: 'You are not permitted to perform this action'
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Something went wrong'
    };
  }

  // Otherwise allow Nuxt to continue handling the event
});
