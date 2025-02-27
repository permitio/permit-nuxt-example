export default defineEventHandler(async (event) => {
  // Don't process if the path doesn't start with '/order' or '/meal'
  if (!event.path.startsWith('/order') && !event.path.startsWith('/meal')) {
    return;
  }

  // Get user and tenant from the request headers
  const { user, city: tenant } = event.node.req.headers as any;

  // Obtain the action and resource from the request path
  // Use a more robust mechanism in a production application
  let action: string;
  let resource: string;
  if (event.path.startsWith('/meal')) {
    resource = 'Meal';
    if (event.method === 'POST') {
      action = 'create';
    } else if (event.method === 'DELETE') {
      action = 'delete';
    } else {
      action = 'read';
    }
  } else {
    resource = 'Order';
    if (event.method === 'POST') {
      action = event.path === '/orders' ? 'create' : event.path.split('/')[3];
    } else {
      action = 'read';
    }
  }

  // Allow the user to read meals and others even if they are not logged in
  if (action === 'read') return;

  // Check if the user is permitted carry out the action on the resource
  // that's if the user has the right role in the tenant
  const permitted = await permit.check(user, action, {
    type: resource,
    tenant
  });

  // If the user is not permitted, return an unauthorized response
  if (!permitted) {
    return {
      success: false,
      message: 'You are not permitted to perform this action'
    };
  }

  // If the user is permitted, continue with the request
  // Not doing anything is okay to allow the request to proceed
});
