import type { ReactNode } from "react";

type Props = {
  header?: ReactNode;
  stats: ReactNode;
  portrait: ReactNode;
  journal?: ReactNode;
  children: ReactNode;
};

export function GameLayout({
  header,
  stats,
  portrait,
  journal,
  children,
}: Props) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6">
      {header}
      <div className="mt-4 grid gap-4 lg:grid-cols-[220px_1fr_180px]">
        <div className="order-2 lg:order-1">{stats}</div>
        <div className="order-1 lg:order-2">{portrait}</div>
        <div className="order-3 hidden lg:block">{journal}</div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
