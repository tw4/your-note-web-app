export const authControl = async (token: string) => {
  const res = await fetch('/api/auth/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status === 200;
};
