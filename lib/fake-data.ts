export const getFakeData = (
  id: number
): { bedrooms: number; sqMeters: number } => {
  const bedrooms = (Math.abs(id) % 4) + 1;
  const sqMeters = 50 + ((id * 17) % 200);
  return { bedrooms, sqMeters };
};
