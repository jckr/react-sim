import React from 'react';

export function useStableCallback<TArgs extends unknown[], TResult>(fn: (...args: TArgs) => TResult) {
  const fnRef = React.useRef(fn);
  React.useEffect(() => {
    fnRef.current = fn;
  });
  return React.useCallback((...args: TArgs) => fnRef.current(...args), []);
}
