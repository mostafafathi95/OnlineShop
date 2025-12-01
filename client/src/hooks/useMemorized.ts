import { memo, useMemo } from 'react';

export function withMemoization<P extends object>(
  Component: React.ComponentType<P>,
  name: string
) {
  return memo(Component, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  });
}
