export const getUserData = async (token: string) => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
