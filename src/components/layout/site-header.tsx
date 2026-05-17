"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	CreditCard,
	LogOut,
	MessageCircle,
	Moon,
	Plus,
	Search,
	Sparkles,
	Sun,
	UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const primaryNavItems = [
	{ href: "/explore", label: "角色", icon: Sparkles },
	{ href: "/messages", label: "消息", icon: MessageCircle },
	{ href: "/create", label: "创建", icon: Plus },
	{ href: "/profile", label: "我的", icon: UserRound },
] as const;

const channelItems = [
	"推荐",
	"最新",
	"关注",
	"新手",
	"榜单",
	"分类",
	"恋爱",
	"治愈",
	"创作",
] as const;

function isNavActive(pathname: string, href: string) {
	return pathname === href || (href !== "/explore" && pathname.startsWith(`${href}/`));
}

export function SiteHeader() {
	const pathname = usePathname();
	const router = useRouter();
	const { setTheme } = useTheme();
	const { data: session, isPending } = authClient.useSession();
	const [isSigningOut, setIsSigningOut] = React.useState(false);
	const user = session?.user;
	const userName = user?.name || user?.email || "Account";
	const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

	const signOut = async () => {
		setIsSigningOut(true);
		const response = await authClient.signOut();

		if (response.error) {
			setIsSigningOut(false);
			return;
		}

		window.location.href = "/";
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="flex h-14 w-full items-center gap-3 px-4 md:px-6">
				<Link href="/explore" className="flex shrink-0 items-center gap-2">
					<span className="flex size-8 items-center justify-center rounded-lg bg-[#ff6f91] text-white shadow-sm">
						<Sparkles className="size-4" />
					</span>
					<span className="hidden text-base font-semibold tracking-tight sm:inline">
						AI Character
					</span>
				</Link>

				<nav className="ml-2 hidden items-center gap-1 md:flex">
					{primaryNavItems.map((item) => {
						const Icon = item.icon;
						const active = isNavActive(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									buttonVariants({ variant: "ghost", size: "sm" }),
									"gap-2 text-muted-foreground",
									active && "bg-muted text-foreground"
								)}
							>
								<Icon className="size-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="ml-auto flex min-w-0 items-center gap-2">
					<label className="hidden h-9 w-[240px] items-center gap-2 rounded-full bg-muted px-3 text-sm text-muted-foreground lg:flex">
						<Search className="size-4 shrink-0" />
						<span className="sr-only">搜索</span>
						<input
							className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
							placeholder="搜索角色、作者"
							type="search"
						/>
					</label>

					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative h-9 w-9")}
						>
							<Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">切换主题</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								浅色
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								深色
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								跟随系统
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{isPending ? (
						<span className="size-9 rounded-full border bg-muted" />
					) : user ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
								<Avatar className="size-9" size="lg">
									<AvatarImage alt={userName} src={user.image || undefined} />
									<AvatarFallback>{userInitial}</AvatarFallback>
								</Avatar>
								<span className="sr-only">打开账号菜单</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<div className="space-y-1 px-1.5 py-1">
									<p className="truncate text-sm font-medium text-foreground">
										{user.name || "已登录"}
									</p>
									{user.email ? (
										<p className="truncate text-xs font-normal text-muted-foreground">
											{user.email}
										</p>
									) : null}
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => router.push("/profile")}>
									<UserRound className="size-4" />
									我的主页
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => router.push("/pricing")}>
									<CreditCard className="size-4" />
									订阅
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem disabled={isSigningOut} onClick={signOut}>
									<LogOut className="size-4" />
									{isSigningOut ? "退出中..." : "退出登录"}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link
							href="/login"
							className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
						>
							<UserRound className="size-4" />
							登录
						</Link>
					)}
				</div>
			</div>

			<div className="border-t bg-background/80">
				<nav className="scrollbar-none flex w-full items-center gap-5 overflow-x-auto px-4 md:px-6">
					<div className="flex items-center gap-1 py-2 md:hidden">
						{primaryNavItems.map((item) => {
							const Icon = item.icon;
							const active = isNavActive(pathname, item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors",
										active && "bg-muted text-foreground"
									)}
								>
									<Icon className="size-4" />
									{item.label}
								</Link>
							);
						})}
					</div>
					<div className="hidden h-4 w-px shrink-0 bg-border md:block" />
					{channelItems.map((item) => (
						<Link
							key={item}
							href="/explore"
							className={cn(
								"relative shrink-0 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
								item === "推荐" && "text-foreground after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#ff6f91]"
							)}
						>
							{item}
						</Link>
					))}
					<Link
						href="/pricing"
						className="ml-auto hidden shrink-0 items-center gap-1.5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
					>
						<CreditCard className="size-4" />
						订阅
					</Link>
				</nav>
			</div>
		</header>
	);
}
