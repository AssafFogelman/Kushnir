interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export const checkRateLimit = (key: string, maxAttempts: number, windowMs: number): boolean => {
  const now = Date.now();
  const entry = store[key];

  if (!entry || now > entry.resetTime) {
    // Reset the counter
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count += 1;
  return true;
};

export const getRemainingAttempts = (key: string, maxAttempts: number): number => {
  const entry = store[key];
  if (!entry) return maxAttempts;
  return Math.max(0, maxAttempts - entry.count);
};

export const getResetTime = (key: string): number | null => {
  const entry = store[key];
  return entry?.resetTime || null;
};
