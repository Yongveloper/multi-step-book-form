import { useEffect, useRef, useState } from 'react';
import { FieldValues, UseFormProps, useForm, useWatch } from 'react-hook-form';

import { useDebounce } from './use-debounce';

const loadStoredData = (storageKey: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(storageKey);

  return stored ? JSON.parse(stored) : null;
};

export function useFormWithPersistence<T extends FieldValues>(
  formOptions: UseFormProps<T> = {},
  { storageKey }: { storageKey: string },
) {
  const [initialData] = useState(() => {
    if (typeof window === 'undefined') {
      return formOptions.defaultValues;
    }

    return loadStoredData(storageKey) ?? formOptions.defaultValues;
  });

  const methods = useForm<T>({
    ...formOptions,
    defaultValues: initialData,
  });

  const formData = useWatch({
    control: methods.control,
  });
  const debouncedData = useDebounce(formData, 500);

  const previousDataRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedData = loadStoredData(storageKey);
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
