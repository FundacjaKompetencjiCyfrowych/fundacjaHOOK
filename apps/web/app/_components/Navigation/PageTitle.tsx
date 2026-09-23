import type { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-bold text-[25px] text-main tracking-[-0.01em] leading-[1.1]">{children}</h1>
  );
}
