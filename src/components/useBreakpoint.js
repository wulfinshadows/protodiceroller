import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("base");

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");
    const xlQuery = window.matchMedia("(min-width: 1280px)");
    const xxlQuery = window.matchMedia("(min-width: 1536px)");

    const updateBreakpoint = () => {
      if (xxlQuery.matches) setBreakpoint("xxl");
      else if (xlQuery.matches) setBreakpoint("xl");
      else if (lgQuery.matches) setBreakpoint("lg");
      else if (mdQuery.matches) setBreakpoint("md");
      else setBreakpoint("base");
    };

    updateBreakpoint();

    mdQuery.addEventListener("change", updateBreakpoint);
    lgQuery.addEventListener("change", updateBreakpoint);
    xlQuery.addEventListener("change", updateBreakpoint);
    xxlQuery.addEventListener("change", updateBreakpoint);

    return () => {
      mdQuery.removeEventListener("change", updateBreakpoint);
      lgQuery.removeEventListener("change", updateBreakpoint);
      xlQuery.removeEventListener("change", updateBreakpoint);
      xxlQuery.removeEventListener("change", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}
