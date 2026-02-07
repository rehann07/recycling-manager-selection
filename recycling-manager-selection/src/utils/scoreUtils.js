export const getScoreColor = (score) => {
  const safeScore = score ?? 0;

  if (safeScore >= 85) return 'green.6';
  if (safeScore >= 70) return 'blue.6';
  if (safeScore >= 50) return 'yellow.6';
  return 'red.6';
};
