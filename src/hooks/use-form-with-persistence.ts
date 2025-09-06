import { useEffect, useRef, useState } from 'react';
import { FieldValues, UseFormProps, useForm, useWatch } from 'react-hook-form';

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

    if (formData && Object.keys(formData).length > 0) {
      const currentDataString = JSON.stringify(formData);

      if (currentDataString !== previousDataRef.current) {
        localStorage.setItem(storageKey, currentDataString);
        previousDataRef.current = currentDataString;
      }
    }
  }, [formData, storageKey, isMounted]);

  return {
    ...methods,
    clearStorage: () => localStorage.removeItem(storageKey),
  };
}
