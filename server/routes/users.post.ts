export default defineEventHandler(async (event) => {
  const { city: tenant, user, role, isGrant } = await readBody(event);

  // Create Tenant if it doesn't exist
  try {
    await permit.api.getTenant(tenant);
  } catch (error) {
    await permit.api.createTenant({ key: tenant, name: tenant,  });
  }

  // Create User with Permit not existing
  try {
    await permit.api.getUser(user);
  } catch (error) {
    await permit.api.createUser({ key: user, });
  }

  // Assign or Unassign Role depending on isGrant
  if (isGrant) {
    await permit.api.assignRole({ user, role, tenant });
  } else {
    await permit.api.unassignRole({ user, role, tenant });
  }
});
