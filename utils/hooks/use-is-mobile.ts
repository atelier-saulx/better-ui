import * as React from "react";

export function useIsMobile() {
  const [mobile, setMobile] = React.useState(false);

  function calculate() {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }

  React.useEffect(() => {
    calculate();

    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("resize", calculate);
    };
  }, []);

  return mobile;
}
