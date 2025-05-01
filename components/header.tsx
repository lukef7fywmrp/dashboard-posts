"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-4 flex max-w-screen-2xl items-center">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={pathname === "/" ? "bg-accent" : ""}
                asChild
              >
                <Link href="/">Posts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={pathname === "/admin" ? "bg-accent" : ""}
                asChild
              >
                <Link href="/admin">Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logo - Show on all screens */}
        <div className="mx-4 md:ml-0 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Posts Dashboard</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              className="h-8"
              asChild
            >
              <Link href="/">Posts</Link>
            </Button>
            <Button
              variant={pathname === "/admin" ? "default" : "ghost"}
              className="h-8"
              asChild
            >
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/87544521?v=4"
                      alt="Frontend Developer"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Frontend Developer</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Posts</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
