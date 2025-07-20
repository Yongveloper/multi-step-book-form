import { useRouter } from 'next/router';

import { useEffect } from 'react';

export function useStepNavigation() {
  const router = useRouter();

  const currentStep = parseInt(router.query.step as string) || 1;

  useEffect(() => {
    if (router.isReady && !router.query.step) {
      router.replace('/?step=1', undefined, { shallow: true });
    }
  }, [router.isReady, router.query.step, router]);

  const goToStep = (step: number) => {
    router.push(`/?step=${step}`, undefined, { shallow: true });
  };

  const goToNext = () => goToStep(currentStep + 1);
  const goToPrev = () => goToStep(currentStep - 1);

  return {
    currentStep,
    goToStep,
    goToNext,
    goToPrev,
    isReady: router.isReady,
  };
}
