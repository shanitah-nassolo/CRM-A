"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
  showLogout?: boolean;
}

export default function Sidebar({ links, title, showLogout = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-primary text-primary-foreground w-64 fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-primary-foreground/20">
        <div className="flex items-center gap-3">
          {/* Replace the default icon with the provided logo image (place img img new.jpeg in public/) */}
          <img src="/img new.jpeg" alt="CRM logo" className="h-8 w-8 rounded-sm object-cover" />
          <div>
            <h1 className="text-xl font-bold">CRM System</h1>
            <p className="text-sm opacity-80">{title}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium",
                isActive
                  ? "bg-primary-foreground text-primary shadow-md"
                  : "hover:bg-primary-foreground/10 text-primary-foreground/90"
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      {showLogout && (
        <div className="p-4 border-t border-primary-foreground/20">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
