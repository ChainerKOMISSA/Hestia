"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Flame,
  UtensilsCrossed,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToogle";

const navItems = [
  { label: "Plats", href: "/dishes", icon: UtensilsCrossed },
  { label: "Planning", href: "/planning", icon: Calendar },
  { label: "Membres", href: "/members", icon: Users },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar className="border-r border-border bg-background w-60">
      <SidebarHeader className="px-4 pt-5 pb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl bg-background flex items-center 
          justify-center shadow-sm shrink-0"
          >
            <Flame className="h-6 w-6 text-primary" size={17} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm">Hestia</span>
            <span className="text-xs text-muted-foreground">
              Assistant familial
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <button
                  onClick={() => {
                    if (item.href !== "#") router.push(item.href);
                  }}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors duration-150 cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  ].join(" ")}
                >
                  <item.icon size={17} className="shrink-0" />
                  <span>{item.label}</span>
                </button>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4 mt-auto border-t border-border pt-3">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
