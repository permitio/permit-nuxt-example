export default defineEventHandler(async (event) => {
  const { city: tenant, user, role, isGrant } = await readBody(event);

  // Create User with Permit if not existing
  await permit.api.users.sync({ key: user });

  // Assign or Unassign Role depending on isGrant
  if (isGrant) {
    await permit.api.roleAssignments.assign({ user, role, tenant });
  } else {
    await permit.api.roleAssignments.unassign({ user, role, tenant });
  }
});
