"use client";

import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  links: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
  }>;
  title: string;
  showLogout?: boolean;
}

export default function DashboardLayout({
  children,
  links,
  title,
  showLogout = false,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar links={links} title={title} showLogout={showLogout} />
      <div className="ml-64 p-8">{children}</div>
    </div>
  );
}
