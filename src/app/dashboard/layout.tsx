"use client";

import { SessionProvider } from "next-auth/react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 py-2 px-4 bg-gray-900">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
