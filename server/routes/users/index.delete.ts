export default defineEventHandler(async (event) => {
  const { user } = await readBody(event);

  // Delete User with Permit
  await permit.api.users.delete(user);
});
