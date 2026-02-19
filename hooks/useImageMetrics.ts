import { useCallback, useState, type SyntheticEvent } from 'react';

export type ImageOrientation = 'vertical' | 'horizontal';

interface ImageMetrics {
  ratio: number;
  orientation: ImageOrientation;
}

const getOrientation = (ratio: number): ImageOrientation => {
  return ratio < 1 ? 'vertical' : 'horizontal';
};

export const useImageMetrics = () => {
  const [metricsMap, setMetricsMap] = useState<Record<string, ImageMetrics>>({});

  const onImageLoad = useCallback(
    (key: string) => (evt: SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = evt.currentTarget;
      if (!naturalWidth || !naturalHeight) return;

      const ratio = naturalWidth / naturalHeight;
      const orientation = getOrientation(ratio);

      setMetricsMap((prev) => {
        const current = prev[key];
        if (current && current.ratio === ratio) return prev;
        return { ...prev, [key]: { ratio, orientation } };
      });
    },
    []
  );

  const getMetrics = useCallback(
    (key: string, fallbackRatio = 4 / 3): ImageMetrics => {
      if (metricsMap[key]) return metricsMap[key];
      return { ratio: fallbackRatio, orientation: getOrientation(fallbackRatio) };
    },
    [metricsMap]
  );

  return {
    onImageLoad,
    getMetrics
  };
};
