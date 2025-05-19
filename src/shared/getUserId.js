export function getUserId() {
  const userStr = localStorage.getItem('user');

  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user.id;
  } catch (err) {
    return null;
  }
}
