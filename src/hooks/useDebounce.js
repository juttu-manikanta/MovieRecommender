import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value.
 * This is useful for delaying API calls until the user has stopped typing.
 * @param {any} value The value to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns The debounced value.
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes or the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
};
