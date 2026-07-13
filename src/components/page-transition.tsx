import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [displayPath, setDisplayPath] = useState(pathname);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [state, setState] = useState<"in" | "out">("in");

  useEffect(() => {
    if (pathname === displayPath) {
      setDisplayChildren(children);
      return;
    }
    setState("out");
    const t = setTimeout(() => {
      setDisplayPath(pathname);
      setDisplayChildren(children);
      // next frame -> in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setState("in"));
      });
    }, 180);
    return () => clearTimeout(t);
  }, [pathname, children, displayPath]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        state === "in"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2",
      )}
    >
      {displayChildren}
    </div>
  );
}
