import Link from "next/link"
import { CreditCard, LayoutDashboard, MessageSquare, User } from "lucide-react"

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-64 border-r bg-background flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-4 border-b">
        <Link href="/dashboard" className="font-bold text-xl tracking-tight text-primary">
          AI Character
        </Link>
      </div>
      <nav className="flex-1 overflow-auto p-4 space-y-2">
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
      <div className="p-4 border-t text-xs text-muted-foreground">
        AI Companion Platform
      </div>
    </aside>
  )
}
