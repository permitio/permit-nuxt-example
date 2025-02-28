export default defineEventHandler(async (event) => {
  const { tenant, user, role, isGrant, noOfRoles } = await readBody(event);

  // Create User with Permit not existing
  // Also sync noOfRoles attribute if provided
  await permit.api.users.sync({
    key: user, 
    ...(noOfRoles ? { attributes: { no_of_roles: noOfRoles } } : {})
  });

  // Assign or Unassign Role in default tenant depending on isGrant
  if (isGrant) {
    await permit.api.roleAssignments.assign({ user, role, tenant });
  } else {
    await permit.api.roleAssignments.unassign({ user, role, tenant });
  }
});
