import React from 'react';

interface ISwitchCasesProps<T extends string | number> {
  value: T;
  cases: Record<T, React.ReactNode>;
  fallback?: React.ReactNode;
}

export function SwitchCases<T extends string | number>({
  value,
  cases,
  fallback = null,
}: ISwitchCasesProps<T>): React.ReactElement | null {
  const matchedCase = cases[value];

  if (matchedCase !== undefined) {
    return <>{matchedCase}</>;
  }

  return <>{fallback}</>;
}
