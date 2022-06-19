import { useEffect } from "react";
import Overlayscrollbars from "overlayscrollbars";

const config = {
  className: "os-theme-dark",
  sizeAutoCapable: true,
  paddingAbsolute: true,
  scrollbars: {
    clickScrolling: true,
    visibility: "auto",
    autoHide: "never",
  },
};

export const useScrollbar = (root, hasScroll) => {
  useEffect(() => {
    let scrollbars;
    if (root.current) {
      scrollbars = Overlayscrollbars(root.current, config);
    }

    return () => {
      if (scrollbars) {
        scrollbars.destroy();
      }
    };
  }, [root]);
};
