'use client';

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type LocalStorageStateOptions<T> = {
  deserialize?: (value: string) => T | null;
  serialize?: (value: T) => string;
  merge?: (current: T, stored: T) => T;
};

const defaultDeserialize = <T,>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const defaultSerialize = <T,>(value: T): string => JSON.stringify(value);

const useLocalStorageState = <T,>(
  key: string,
  defaultValue: T,
  options: LocalStorageStateOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>] => {
  const deserialize: (value: string) => T | null =
    options.deserialize ?? defaultDeserialize;
  const serialize: (value: T) => string = options.serialize ?? defaultSerialize;
  const { merge } = options;

  const [state, setState] = useState<T>(() => defaultValue);
  const hasHydrated = useRef(false);

  useEffect(() => {
    let parsed: T | null = null;

    try {
      const storedValue = window.localStorage.getItem(key);
      parsed = storedValue ? deserialize(storedValue) : null;
    } catch {
      parsed = null;
    }

    if (parsed !== null) {
      setState((current) => (merge ? merge(current, parsed) : parsed));
    }

    hasHydrated.current = true;
  }, [key, deserialize, merge]);

  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    try {
      window.localStorage.setItem(key, serialize(state));
    } catch {
      // Ignore storage write errors.
    }
  }, [key, serialize, state]);

  return [state, setState];
};

export type { LocalStorageStateOptions };
export { useLocalStorageState };
