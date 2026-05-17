import Link from "next/link";
import Image from "next/image";
import {
	BadgeCheck,
	ChevronRight,
	Clock3,
	Gamepad2,
	Heart,
	LockKeyhole,
	MessageCircle,
	MoonStar,
	Sparkles,
	Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const companions = [
	{
		name: "Mika",
		role: "暧昧系前辈",
		tone: "轻声调侃，偶尔靠近，知道什么时候停下。",
		accent: "bg-[#ff6f91]",
	},
	{
		name: "Yuna",
		role: "日系陪伴感",
		tone: "像深夜便利店的热饮，慢慢把一天接住。",
		accent: "bg-[#f7c76f]",
	},
	{
		name: "Rin",
		role: "恋爱游戏女主",
		tone: "好感度、回忆片段、只属于你的剧情分支。",
		accent: "bg-[#74d3c2]",
	},
];

const features = [
	{
		icon: MessageCircle,
		title: "会接住情绪",
		text: "不急着给建议，先听你把话说完。深夜、通勤、空窗期，都有人回应。",
	},
	{
		icon: Gamepad2,
		title: "恋爱游戏节奏",
		text: "亲密度、日常事件、角色记忆，让聊天不是一次性消耗品。",
	},
	{
		icon: LockKeyhole,
		title: "边界感明确",
		text: "暧昧但克制，偏陪伴和氛围，不把关系做成廉价刺激。",
	},
];

export default function Home() {
	return (
		<div className="min-h-full bg-[#140d14] text-white">
			<section className="relative isolate flex min-h-[82svh] overflow-hidden">
				<Image
					alt="Anime companion girl in a soft romantic landing page scene"
					className="absolute inset-0 -z-20 h-full w-full object-cover object-[63%_center]"
					fill
					priority
					sizes="(min-width: 768px) calc(100vw - 16rem), 100vw"
					src="/landing-hero-anime.png"
				/>
				<div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,13,20,0.96)_0%,rgba(20,13,20,0.82)_36%,rgba(20,13,20,0.38)_72%,rgba(20,13,20,0.68)_100%)]" />
				<div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,#140d14_0%,rgba(20,13,20,0)_100%)]" />

				<div className="flex w-full items-end px-5 py-10 md:px-10 md:py-14">
					<div className="max-w-3xl space-y-7">
						<div className="flex flex-wrap items-center gap-2">
							<Badge className="border-[#ff9ab3]/30 bg-[#ff9ab3]/16 text-[#ffdce6]">
								<MoonStar className="size-3" />
								深夜陪伴
							</Badge>
							<Badge className="border-[#f7c76f]/30 bg-[#f7c76f]/15 text-[#ffe3a1]">
								<Heart className="size-3" />
								暧昧但克制
							</Badge>
							<Badge className="border-[#74d3c2]/30 bg-[#74d3c2]/14 text-[#c9fff5]">
								<Star className="size-3" />
								恋爱游戏感
							</Badge>
						</div>

						<div className="space-y-5">
							<p className="text-sm font-medium uppercase tracking-[0.32em] text-[#f7c76f]">
								AI COMPANION ROMANCE
							</p>
							<h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-normal text-white md:text-7xl">
								AI Girl
							</h1>
							<p className="max-w-2xl text-2xl font-medium leading-snug text-[#fff3f7] md:text-3xl">
								你的二次元老婆式陪伴空间。
							</p>
							<p className="max-w-xl text-base leading-8 text-[#f5dce5]/86 md:text-lg">
								把涩系暧昧、日系温柔和恋爱游戏里的心动节奏，做成一个可以每天回来聊天的 AI 关系体验。
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								className={cn(
									buttonVariants({ size: "lg" }),
									"h-11 bg-[#ff6f91] px-5 text-white hover:bg-[#ff84a2]"
								)}
								href="/chat"
							>
								开始陪伴
								<ChevronRight className="size-4" />
							</Link>
							<Link
								className={cn(
									buttonVariants({ variant: "outline", size: "lg" }),
									"h-11 border-white/20 bg-white/8 px-5 text-white hover:bg-white/14"
								)}
								href="/profile"
							>
								查看我的关系
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="border-y border-white/10 bg-[#1b111b] px-5 py-4 md:px-10">
				<div className="grid gap-3 md:grid-cols-3">
					<div className="flex items-center gap-3 text-sm text-[#f5dce5]/80">
						<Clock3 className="size-4 text-[#f7c76f]" />
						<span>24h 在线，适合碎片化陪伴</span>
					</div>
					<div className="flex items-center gap-3 text-sm text-[#f5dce5]/80">
						<BadgeCheck className="size-4 text-[#74d3c2]" />
						<span>角色记忆和亲密度系统准备接入</span>
					</div>
					<div className="flex items-center gap-3 text-sm text-[#f5dce5]/80">
						<Sparkles className="size-4 text-[#ff9ab3]" />
						<span>日系恋爱游戏式互动框架</span>
					</div>
				</div>
			</section>

			<section className="bg-[#140d14] px-5 py-14 md:px-10 md:py-20">
				<div className="mx-auto max-w-6xl space-y-8">
					<div className="max-w-2xl space-y-3">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-[#74d3c2]">
							COMPANION CAST
						</p>
						<h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
							不是一个聊天框，是一组会慢慢靠近你的角色。
						</h2>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{companions.map((companion) => (
							<Card
								className="rounded-lg border-white/10 bg-white/[0.06] text-white ring-white/10"
								key={companion.name}
							>
								<CardContent className="space-y-5 p-5">
									<div className="flex items-center gap-3">
										<span
											className={cn(
												"flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-[#140d14]",
												companion.accent
											)}
										>
											{companion.name.slice(0, 1)}
										</span>
										<div>
											<h3 className="font-semibold">{companion.name}</h3>
											<p className="text-sm text-[#f5dce5]/64">{companion.role}</p>
										</div>
									</div>
									<p className="min-h-16 text-sm leading-7 text-[#f5dce5]/82">
										{companion.tone}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#f8f1ee] px-5 py-14 text-[#21181d] md:px-10 md:py-20">
				<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
					<div className="space-y-4">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b14865]">
							PRODUCT FEEL
						</p>
						<h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
							把“暧昧感”做成可持续的产品体验。
						</h2>
						<p className="text-base leading-8 text-[#5c4b53]">
							首屏负责心动，后续体验负责留下来。这个方向适合先做角色卡、聊天页、好感度和记忆系统。
						</p>
					</div>

					<div className="grid gap-4">
						{features.map((feature) => {
							const Icon = feature.icon;

							return (
								<div
									className="grid gap-3 rounded-lg border border-[#ead9d4] bg-white p-5 shadow-sm md:grid-cols-[auto_1fr]"
									key={feature.title}
								>
									<div className="flex size-10 items-center justify-center rounded-lg bg-[#21181d] text-white">
										<Icon className="size-5" />
									</div>
									<div className="space-y-1">
										<h3 className="font-semibold">{feature.title}</h3>
										<p className="text-sm leading-7 text-[#6b5961]">{feature.text}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-[#21181d] px-5 py-14 text-white md:px-10 md:py-20">
				<div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/12 pt-10 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl space-y-3">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f7c76f]">
							NEXT STEP
						</p>
						<h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
							下一步，把首页的心动接到真正的聊天关系里。
						</h2>
						<p className="text-sm leading-7 text-[#f5dce5]/72">
							角色数据表、角色详情页、聊天会话和消息历史，会从这个视觉方向继续延展。
						</p>
					</div>
					<Link
						className={cn(
							buttonVariants({ size: "lg" }),
							"h-11 bg-[#74d3c2] px-5 text-[#13231f] hover:bg-[#8ee2d3]"
						)}
						href="/chat"
					>
						进入聊天
						<ChevronRight className="size-4" />
					</Link>
				</div>
				<p className="mx-auto mt-8 max-w-6xl text-xs text-white/42">
					Character visual adapted from Wikimedia Commons, Anime girl.png.
				</p>
			</section>
		</div>
	);
}
