import { useEffect, useRef, type DependencyList } from "react";

export function useComponentDidMount(
  callback: () => void,
  deps: DependencyList
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callback();
  }, deps);
}
