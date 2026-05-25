const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const ipTimestamps = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (ipTimestamps.get(ip) ?? []).filter((t) => t > cutoff);
  if (timestamps.length >= MAX_REQUESTS) return false;
  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);
  return true;
}
