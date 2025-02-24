export default defineEventHandler(async (event) => {
  const { user, role, isGrant } = await readBody(event);

  // Create User with Permit not existing
  try {
    await permit.api.users.get(user);
  } catch (error) {
    await permit.api.users.create({ key: user });
  }

  // Assign or Unassign Role in default tenant depending on isGrant
  const tenant = 'default';
  if (isGrant) {
    await permit.api.roleAssignments.assign({ user, role, tenant });
  } else {
    await permit.api.roleAssignments.unassign({ user, role,  tenant });
  }
});
