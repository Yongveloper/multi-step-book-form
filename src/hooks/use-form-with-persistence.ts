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
  const [isMounted, setIsMounted] = useState(false);

  const methods = useForm<T>({
    ...formOptions,
    defaultValues: formOptions.defaultValues,
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

    setIsMounted(true);

    const storedData = loadStoredData(storageKey);
    if (storedData) {
      methods.reset(
        {
          ...formOptions.defaultValues,
          ...storedData,
        },
        {
          keepDefaultValues: true,
        },
      );
    }
  }, [storageKey, methods, formOptions.defaultValues]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    if (debouncedData && Object.keys(debouncedData).length > 0) {
      const currentDataString = JSON.stringify(debouncedData);

      if (currentDataString !== previousDataRef.current) {
        localStorage.setItem(storageKey, currentDataString);
        previousDataRef.current = currentDataString;
      }
    }
  }, [debouncedData, storageKey, isMounted]);

  return {
    ...methods,
    clearStorage: () => localStorage.removeItem(storageKey),
  };
}
