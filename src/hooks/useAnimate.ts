import { CSSProperties, useCallback, useEffect, useState } from "react";
 
export type UseAnimateProps = {
    mount: {
        style: CSSProperties;
        delay: number;
    };
    unMount: {
        style: CSSProperties;
        delay: number;
    };
};

export const useAnimate = (config: UseAnimateProps) => {
  const { mount, unMount } = config;
  const [style, setStyle] = useState<CSSProperties>(unMount.style);

  /** un-mount */
  const handleClose = useCallback(
    (handleClick: () => void) => {
      setStyle({
        ...unMount.style,
        transition: `all ${unMount.delay / 1000}s`,
      });

      let timer = setTimeout(() => handleClick(), unMount.delay);
      return () => clearTimeout(timer);
    },
    [unMount]
  );

  /** mount */
  useEffect(() => {
    let timer = setTimeout(
      () =>
        setStyle({ ...mount.style, transition: `all ${mount.delay / 1000}s` }),
      mount.delay
    );

    return () => clearTimeout(timer);
  }, []);

  return { handleClose, style };
};