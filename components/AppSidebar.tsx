"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Flame, UtensilsCrossed, Calendar, Users, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./ThemeToogle"

const navItems = [
  { label: "Plats", href: "/dishes", icon: UtensilsCrossed },
  { label: "Planning", href: "/planning", icon: Calendar },
  { label: "Membres", href: "/members", icon: Users },
  { label: "Paramètres", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-primary" />
          <div>
            <p className="font-bold text-sm">Hestia</p>
            <p className="text-xs text-muted-foreground">Assistant familial</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
         <ThemeToggle />
      </SidebarContent>

      <SidebarFooter className="p-4">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}