"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Award,
	Bell,
	ChevronDown,
	ChevronRight,
	CreditCard,
	Gift,
	Headphones,
	Languages,
	LogOut,
	MessageCircle,
	Moon,
	PenLine,
	Search,
	Sparkles,
	Sun,
	UserRound,
	Wallet,
	X,
	type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const primaryNavItems = [
	{ href: "/explore", label: "角色", icon: Sparkles },
	{ href: "/chat", label: "消息", icon: MessageCircle },
	{ href: "/studio", label: "创作者中心", icon: PenLine },
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

type DrawerItem = {
	href?: string;
	icon: LucideIcon;
	label: string;
	badge?: string;
	trailing?: React.ReactNode;
	onClick?: () => void;
};

function isNavActive(pathname: string, href: string) {
	return pathname === href || (href !== "/explore" && pathname.startsWith(`${href}/`));
}

function AccountDrawerItem({
	href,
	icon: Icon,
	label,
	badge,
	trailing,
	onClick,
}: DrawerItem) {
	const content = (
		<>
			<Icon className="size-5 shrink-0" />
			<span className="min-w-0 flex-1 truncate">{label}</span>
			{badge ? (
				<span className="rounded-full bg-[#ff2f75] px-2.5 py-1 text-xs font-semibold text-white">
					{badge}
				</span>
			) : null}
			{trailing}
		</>
	);
	const className =
		"flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/[0.07]";

	if (href) {
		return (
			<Link href={href} prefetch={false} className={className}>
				{content}
			</Link>
		);
	}

	return (
		<button className={className} type="button" onClick={onClick}>
			{content}
		</button>
	);
}

export function SiteHeader() {
	const pathname = usePathname();
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
		<>
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="flex h-14 w-full items-center gap-3 px-4 md:px-6">
				<Link
					href="/explore"
					prefetch={false}
					className="flex shrink-0 items-center gap-2"
				>
					<span className="flex size-8 items-center justify-center rounded-lg bg-[#ff6f91] text-white shadow-sm">
						<Sparkles className="size-4" />
					</span>
					<span className="text-base font-semibold tracking-tight">
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
								prefetch={false}
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

					{/* Mobile Search Icon-Button */}
					<Link
						href="/explore"
						prefetch={false}
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 lg:hidden text-muted-foreground")}
						aria-label="搜索"
					>
						<Search className="size-4" />
					</Link>

					{isPending ? (
						<span className="size-9 rounded-full border bg-muted" />
					) : user ? (
						<Sheet>
							<SheetTrigger className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
								<Avatar className="size-9" size="lg">
									<AvatarImage alt={userName} src={user.image || undefined} />
									<AvatarFallback>{userInitial}</AvatarFallback>
								</Avatar>
								<span className="sr-only">打开账号抽屉</span>
							</SheetTrigger>
							<SheetContent
								className="data-[side=right]:w-[min(100vw,340px)] gap-0 border-white/10 bg-[#07070a] p-0 text-white data-[side=right]:sm:max-w-none"
								showCloseButton={false}
							>
								<SheetClose
									className={cn(
										buttonVariants({ variant: "ghost", size: "icon" }),
										"absolute right-4 top-4 text-white/70 hover:bg-white/10 hover:text-white"
									)}
								>
									<X className="size-5" />
									<span className="sr-only">关闭</span>
								</SheetClose>

								<div className="flex-1 overflow-y-auto px-5 py-6">
									<div className="flex items-center gap-3 pr-10">
										<Avatar className="size-14" size="lg">
											<AvatarImage alt={userName} src={user.image || undefined} />
											<AvatarFallback>{userInitial}</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-xl font-semibold">
												{user.name || user.email || "已登录"}
											</p>
											<div className="mt-1.5 flex items-center gap-2 text-xs text-white/55">
												<span className="rounded-full bg-white/15 px-2 py-0.5 font-semibold text-white">
													VIP0
												</span>
												<span>充值 1 积分升级 VIP1</span>
											</div>
										</div>
									</div>

									<div className="mt-6 flex items-center justify-between rounded-lg bg-white/[0.04] p-3.5">
										<div className="flex items-center gap-3">
											<div className="flex size-10 items-center justify-center rounded-full bg-[#ff2f75]/15 text-[#ff2f75]">
												<Wallet className="size-5" />
											</div>
											<div>
												<div className="flex items-baseline gap-2.5">
													<span className="text-xs text-white/55">余额</span>
													<span className="font-mono text-2xl font-bold">0.80</span>
												</div>
												<div className="mt-0.5 flex items-baseline gap-2.5">
													<span className="text-xs text-white/55">限时</span>
													<span className="font-mono text-base text-white/60">0.00</span>
												</div>
											</div>
										</div>
										<Link
											href="/pricing"
											prefetch={false}
											className="rounded-full bg-[#ff2f75] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ff4b88]"
										>
											充值
										</Link>
									</div>

									<div className="mt-6 space-y-2">
										<Link
											href="/chat"
											prefetch={false}
											className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-white transition-colors hover:bg-white/[0.07]"
										>
											<span className="text-base font-semibold">通知消息</span>
											<span className="rounded-full bg-[#ff2f75] px-2 py-0.5 text-xs font-semibold text-white">
												4
											</span>
											<ChevronRight className="ml-auto size-4 text-white/45" />
										</Link>
										<div className="space-y-1 px-2.5 text-xs text-white/65">
											<p className="truncate">💎 Sigma-0417 上架，智力与文风升级</p>
											<p className="truncate">⚠️ 第三方低价代充风险提醒</p>
										</div>
									</div>

									<nav className="mt-6 space-y-0.5">
										<AccountDrawerItem href="/studio" icon={PenLine} label="角色卡" />
										<AccountDrawerItem href="/pricing" icon={Gift} label="邀请好友" badge="奖励" />
										<AccountDrawerItem href="/profile" icon={Award} label="创作者奖励" />
										<AccountDrawerItem
											icon={Moon}
											label="深色"
											onClick={() => setTheme("dark")}
											trailing={<ChevronDown className="size-5 text-white/45" />}
										/>
										<AccountDrawerItem
											icon={Languages}
											label="简体中文"
											trailing={<ChevronDown className="size-5 text-white/45" />}
										/>
										<AccountDrawerItem href="/pricing" icon={CreditCard} label="充值" badge="优惠" />
										<AccountDrawerItem href="/profile" icon={Headphones} label="帮助中心" />
										<AccountDrawerItem
											icon={LogOut}
											label={isSigningOut ? "退出中..." : "退出登录"}
											onClick={signOut}
										/>
									</nav>
								</div>

								<div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/40">
									<div className="mb-2.5 flex justify-center gap-2.5">
										<div className="flex size-9 items-center justify-center rounded-full bg-white/[0.06]">
											<Bell className="size-4" />
										</div>
										<div className="flex size-9 items-center justify-center rounded-full bg-white/[0.06]">
											<MessageCircle className="size-4" />
										</div>
										<div className="flex size-9 items-center justify-center rounded-full bg-white/[0.06]">
											<Sparkles className="size-4" />
										</div>
									</div>
									<p>社区公约 · 服务协议 · 隐私政策</p>
								</div>
							</SheetContent>
						</Sheet>
					) : (
						<Link
							href="/login"
							prefetch={false}
							className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
						>
							<UserRound className="size-4" />
							登录
						</Link>
					)}
				</div>
			</div>

			<div className="border-t bg-background/80">
				<nav className="flex w-full items-center gap-5 overflow-x-auto px-4 md:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					{channelItems.map((item) => (
						<Link
							key={item}
							href="/explore"
							prefetch={false}
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
						prefetch={false}
						className="ml-auto hidden shrink-0 items-center gap-1.5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
					>
						<CreditCard className="size-4" />
						订阅
					</Link>
				</nav>
			</div>
		</header>

		{/* Sticky Bottom Navigation Bar for Mobile Devices */}
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md py-2.5 px-4 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
			<nav className="flex items-center justify-around w-full max-w-md mx-auto">
				{primaryNavItems.map((item) => {
					const Icon = item.icon;
					const active = isNavActive(pathname, item.href);

					return (
						<Link
							key={item.href}
							href={item.href}
							prefetch={false}
							className={cn(
								"flex flex-col items-center gap-1 px-3 py-0.5 text-[11px] font-medium transition-all duration-200 rounded-lg active:scale-95",
								active ? "text-[#ff6f91]" : "text-muted-foreground hover:text-foreground"
							)}
						>
							<Icon className="size-5 shrink-0" />
							<span>{item.label}</span>
						</Link>
					);
				})}
			</nav>
		</div>
		</>
	);
}
