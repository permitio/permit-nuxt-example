export default defineEventHandler(async (event) => {
  const { city: tenant, user, role, isGrant } = await readBody(event);

  // Create Tenant if it doesn't exist
  try {
    await permit.api.tenants.get(tenant);
  } catch (error) {
    await permit.api.tenants.create({ key: tenant, name: tenant });
  }

  // Create User with Permit not existing
  try {
    await permit.api.users.get(user);
  } catch (error) {
    await permit.api.users.create({ key: user });
  }

  // Assign or Unassign Role depending on isGrant
  if (isGrant) {
    await permit.api.roleAssignments.assign({ user, role, tenant });
  } else {
    await permit.api.roleAssignments.unassign({ user, role, tenant });
  }
});
