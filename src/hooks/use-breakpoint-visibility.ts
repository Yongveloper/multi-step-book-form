import { useEffect, useState } from 'react';

import { useResize } from './use-resize';

export const useBreakpointVisibility = (breakpoint: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const { width } = useResize();

  useEffect(() => {
    setIsVisible(width ? width >= breakpoint : false);
  }, [width, breakpoint]);

  return isVisible;
};
