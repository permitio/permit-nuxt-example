export default defineEventHandler(async (event) => {
  const { tenant, user, role, isGrant, noOfRides } = await readBody(event);

  // Create User with Permit not existing
  // Also sync noOfRides attribute if provided
  await permit.api.users.sync({
    key: user, 
    ...(noOfRides ? { attributes: { number_of_rides: noOfRides } } : {})
  });

  // Assign or Unassign Role in default tenant depending on isGrant
  if (isGrant) {
    await permit.api.roleAssignments.assign({ user, role, tenant });
  } else {
    await permit.api.roleAssignments.unassign({ user, role, tenant });
  }
});
