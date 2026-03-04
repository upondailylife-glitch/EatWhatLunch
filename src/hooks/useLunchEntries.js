import { useCallback } from 'react';
import { DEFAULT_ENTRIES, STORAGE_KEY } from '../constants/defaultEntries';
import { useLocalStorage } from './useLocalStorage';

export function useLunchEntries() {
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, DEFAULT_ENTRIES);

  const addEntry = useCallback(
    (rawValue) => {
      const value = rawValue.trim();

      if (!value) {
        return { ok: false, message: '请输入一个词条。' };
      }

      if (value.length > 20) {
        return { ok: false, message: '词条太长了，建议控制在 20 个字内。' };
      }

      const exists = entries.some(
        (item) => item.toLocaleLowerCase() === value.toLocaleLowerCase(),
      );

      if (exists) {
        return { ok: false, message: '这个词条已经在列表里了。' };
      }

      setEntries((prev) => [...prev, value]);
      return { ok: true, message: '' };
    },
    [entries, setEntries],
  );

  const removeEntry = useCallback(
    (index) => {
      setEntries((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
    },
    [setEntries],
  );

  const resetEntries = useCallback(() => {
    setEntries(DEFAULT_ENTRIES);
  }, [setEntries]);

  return {
    entries,
    addEntry,
    removeEntry,
    resetEntries,
  };
}
