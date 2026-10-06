export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1_000);
  const minutes = Math.floor(ms / 60_000);
  const hours = Math.floor(ms / 3_600_000);
  const days = Math.floor(ms / 86_400_000);

  if (ms < 60_000) return `${seconds}s`;
  if (ms < 3_600_000) return `${minutes}m ${seconds % 60}s`;
  if (ms < 86_400_000) return `${hours}h ${minutes % 60}m`;
  return `${days}d ${hours % 24}h`;
}
