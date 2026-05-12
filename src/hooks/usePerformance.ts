import { useMemo, useCallback } from 'react';

export function useMemoizedValue<T>(value: T, deps: any[]): T {
  return useMemo(() => value, deps);
}

export function useDebounce<T>(value: T, delay: number): T {
  const { useState, useEffect } = require('react');
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRan = require('react').useRef(Date.now());
  const { useState, useEffect } = require('react');
  const [result, setResult] = useState<any>(null);

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRan.current >= delay) {
        lastRan.current = Date.now();
        const output = callback(...args);
        setResult(output);
        return output;
      }
      return result;
    }) as T,
    [callback, delay, result]
  );
}
