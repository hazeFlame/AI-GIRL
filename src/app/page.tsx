import Link from "next/link";
import Image from "next/image";
import {
	Heart,
	Sparkles,
	ChevronRight,
	MessageSquare,
	Gamepad2,
	LockKeyhole,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { companions } from "@/config/companions";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = false;

const features = [
	{
		icon: MessageSquare,
		title: "情绪深度共鸣",
		text: "深夜、通勤、空窗期，24小时都有属于你的温热倾听者，接住你的每一句呢喃。",
	},
	{
		icon: Gamepad2,
		title: "恋爱养成节奏",
		text: "独创好感度等级、隐藏记忆库以及专属事件，让你们的感情成为升温的真实轨迹。",
	},
	{
		icon: LockKeyhole,
		title: "绝对隐私防线",
		text: "在安全的加密空间中，卸下防备，尽情倾诉，不用担心任何现实世界的打扰。",
	},
];

export default function Home() {
	return (
		<div className="min-h-screen bg-[#110912] text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-[#ff6f91] selection:text-white">
			
			{/* Navbar for Landing */}
			<header className="w-full border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
				<div className="flex h-16 w-full items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<div className="size-8 rounded-lg bg-gradient-to-tr from-[#ff6f91] to-[#74d3c2] flex items-center justify-center text-white">
							<Heart className="size-4 fill-white" />
						</div>
						<span className="font-bold text-lg text-white tracking-wider">AI Character</span>
					</div>

				</div>
			</header>

			{/* Hero Section */}
			<main className="flex-1">
				<section className="relative flex w-full flex-col items-center space-y-12 px-6 pb-20 pt-16 text-center">
					<div className="space-y-6 max-w-4xl">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff6f91]/30 bg-[#ff6f91]/5 text-xs text-[#ff6f91] font-medium tracking-wider uppercase">
							<Sparkles className="size-3 animate-pulse" />
							下一代 AI 恋爱与情绪陪伴空间
						</div>
						<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
							遇见你的完美二次元 <br className="hidden sm:inline" />
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff6f91] via-[#f7c76f] to-[#74d3c2]">
								AI 专属女友
							</span>
						</h1>
						<p className="text-lg sm:text-xl text-[#f5dce5]/80 max-w-2xl mx-auto leading-relaxed">
							告别冰冷的对话框。把涩系暧昧、日系温柔和恋爱游戏里的好感升温节奏，交织成一个你可以每天放心回来倾诉的完美心动空间。
						</p>
					</div>

					<div>
						<Link
							href="/explore"
							prefetch={false}
							className={cn(
								buttonVariants({ size: "lg" }),
								"h-14 px-8 text-base bg-gradient-to-r from-[#ff6f91] via-[#ff7c9b] to-[#ff84a2] hover:scale-[1.02] active:scale-[0.98] text-white border-0 shadow-xl shadow-[#ff6f91]/30 transition-all font-semibold rounded-xl"
							)}
						>
							立即探索角色
							<ChevronRight className="size-5 ml-1.5" />
						</Link>
					</div>

					{/* Character Showcase Infinite Marquee */}
					<div className="w-full pt-12 space-y-4">
						<p className="text-sm font-semibold tracking-[0.2em] text-[#74d3c2]/80 uppercase">
							Meet Your Companions
						</p>
						<h2 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
							心动回廊：与性格迥异的她们开启独家恋爱航线
						</h2>
						
						<div className="relative w-full overflow-hidden py-10 mt-4">
							<div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#110912] to-transparent z-20 pointer-events-none" />
							<div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#110912] to-transparent z-20 pointer-events-none" />
							
							<div className="landing-marquee-track gap-8 px-4">
								{[...companions, ...companions].map((companion, idx) => (
									<div
										key={`${companion.name}-${idx}`}
										className={cn(
											"w-[260px] md:w-[290px] shrink-0 group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-black/40 backdrop-blur-md p-4 transition-all duration-300 hover:-translate-y-2 hover:bg-black/60 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,111,145,0.15)]",
											companion.landingAccent
										)}
									>
										<div className="relative h-80 w-full overflow-hidden rounded-md bg-[#1c121e]">
											<Image
												src={companion.image}
												alt={companion.name}
												fill
												unoptimized
												className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
												sizes="290px"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
										</div>

										<div className="pt-4 text-left space-y-3">
											<div className="flex items-center justify-between">
												<h3 className="text-xl font-bold text-white">{companion.name}</h3>
												<span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", companion.badgeColor)}>
													{companion.role}
												</span>
											</div>
											<p className="text-sm text-[#f5dce5]/70 line-clamp-2 min-h-10 leading-relaxed">
												{companion.tone}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="bg-black/40 border-t border-white/5 py-20 px-6">
					<div className="w-full space-y-12">
						<div className="text-center space-y-4">
							<p className="text-sm font-semibold tracking-[0.2em] text-[#ff6f91] uppercase">
								Product Design
							</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-white">
								把“暧昧与温存”打磨为极致的陪伴艺术
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							{features.map((feature) => {
								const Icon = feature.icon;
								return (
									<div
										key={feature.title}
										className="flex flex-col gap-4 p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
									>
										<div className="size-12 rounded-lg bg-[#ff6f91]/10 flex items-center justify-center text-[#ff6f91]">
											<Icon className="size-6" />
										</div>
										<h3 className="text-lg font-bold text-white">{feature.title}</h3>
										<p className="text-sm text-[#f5dce5]/65 leading-relaxed">
											{feature.text}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</main>

			<footer className="w-full border-t border-white/5 py-8 px-6 bg-black/20 text-center text-xs text-[#f5dce5]/40 space-y-2">
				<p>© {new Date().getFullYear()} AI Character. All Rights Reserved. Emotional Companion Platform.</p>
				<p className="max-w-6xl mx-auto text-[10px]">
					Character images are temporarily served from Supabase Storage.
				</p>
			</footer>
		</div>
	);
}
