"use client"

import * as React from "react"
import Link from "next/link"
import { CreditCard, Globe, LayoutDashboard, LogOut, Menu, MessageSquare, Moon, Sun, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, setIsSigningOut] = React.useState(false)
  const user = session?.user
  const userName = user?.name || user?.email || "Account"
  const userInitial = userName.charAt(0).toUpperCase()

  const signOut = async () => {
    setIsSigningOut(true)
    const response = await authClient.signOut()

    if (response.error) {
      setIsSigningOut(false)
      return
    }

    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden mr-2")}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-4 border-b text-left">
              <SheetTitle>
                <Link href="/dashboard" className="font-bold text-xl tracking-tight text-primary">
                  AI Character
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="md:hidden font-bold text-lg tracking-tight text-primary mr-2">
          AI Character
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <Link href="/pricing" className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden sm:inline-flex")}>
              Subscribe
            </Link>

            {isPending ? (
              <span className="h-7 w-16 rounded-lg border bg-muted" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2 pl-1.5")}>
                  <Avatar size="sm">
                    <AvatarImage alt={userName} src={user.image || undefined} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-28 truncate sm:inline">{user.name || user.email}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="space-y-1 px-1.5 py-1">
                    <p className="truncate text-sm font-medium text-foreground">{user.name || "Signed in"}</p>
                    {user.email ? (
                      <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
                    ) : null}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={isSigningOut} onClick={signOut}>
                    <LogOut className="size-4" />
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                <User className="size-4" />
                Login
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
                <Globe className="h-4 w-4" />
                <span className="sr-only">Toggle language</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
