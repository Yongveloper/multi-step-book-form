import { useEffect, useState } from 'react';

import { useResize } from '~/hooks/use-resize';

export const useResponsivePreview = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { width } = useResize();

  useEffect(() => {
    setIsPreviewVisible(width ? width >= 1024 : false);
  }, [width]);

  return isPreviewVisible;
};
