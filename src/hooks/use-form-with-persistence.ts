import { useEffect, useRef } from 'react';
import { FieldValues, UseFormProps, useForm } from 'react-hook-form';

import { useDebounce } from './use-debounce';

export function useFormWithPersistence<T extends FieldValues>(
  formOptions: UseFormProps<T> = {},
  { storageKey }: { storageKey: string },
) {
  const loadStoredData = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = localStorage.getItem(storageKey);

    return stored ? JSON.parse(stored) : null;
  };

  const methods = useForm<T>({
    ...formOptions,
    defaultValues: formOptions.defaultValues,
  });

  const watchedData = methods.watch();
  const debouncedData = useDebounce(watchedData, 500);

  const previousDataRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedData = loadStoredData();
    if (storedData) {
      methods.reset({
        ...formOptions.defaultValues,
        ...storedData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (debouncedData && Object.keys(debouncedData).length > 0) {
      const currentDataString = JSON.stringify(debouncedData);

      if (currentDataString !== previousDataRef.current) {
        localStorage.setItem(storageKey, currentDataString);
        previousDataRef.current = currentDataString;
      }
    }
  }, [debouncedData, storageKey]);

  return {
    ...methods,
    clearStorage: () => localStorage.removeItem(storageKey),
  };
}
