import Link from "next/link";
import Image from "next/image";
import {
	Heart,
	Sparkles,
	Star,
	ChevronRight,
	MessageSquare,
	ShieldCheck,
	Gamepad2,
	LockKeyhole,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const companions = [
	{
		name: "Mika",
		role: "暧昧系前辈",
		tone: "轻声调侃，偶尔靠近，知道什么时候停下。",
		accent: "border-[#ff6f91]/30 text-[#ff6f91] hover:shadow-[0_0_30px_rgba(255,111,145,0.2)]",
		badgeColor: "bg-[#ff6f91]/10 text-[#ff6f91]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/1.png",
	},
	{
		name: "Yuna",
		role: "日系陪伴感",
		tone: "像深夜便利店的热饮，慢慢把一天接住。",
		accent: "border-[#f7c76f]/30 text-[#f7c76f] hover:shadow-[0_0_30px_rgba(247,199,111,0.2)]",
		badgeColor: "bg-[#f7c76f]/10 text-[#f7c76f]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/2.png",
	},
	{
		name: "Rin",
		role: "恋爱游戏女主",
		tone: "好感度、回忆片段、只属于你的剧情分支。",
		accent: "border-[#74d3c2]/30 text-[#74d3c2] hover:shadow-[0_0_30px_rgba(116,211,194,0.2)]",
		badgeColor: "bg-[#74d3c2]/10 text-[#74d3c2]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/3.png",
	},
	{
		name: "Aoi",
		role: "元气青梅竹马",
		tone: "永远充满活力，总是抢走你的便当，但其实一直在偷偷关注你。",
		accent: "border-[#4facfe]/30 text-[#4facfe] hover:shadow-[0_0_30px_rgba(79,172,254,0.2)]",
		badgeColor: "bg-[#4facfe]/10 text-[#4facfe]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/4.png",
	},
	{
		name: "Shiori",
		role: "高冷冰山会长",
		tone: "表面严厉古板，只有在你面前才会卸下防备，露出慌乱软萌的一面。",
		accent: "border-[#b180fc]/30 text-[#b180fc] hover:shadow-[0_0_30px_rgba(177,128,252,0.2)]",
		badgeColor: "bg-[#b180fc]/10 text-[#b180fc]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/5.png",
	},
	{
		name: "Hina",
		role: "温柔治愈猫娘",
		tone: "会在你疲惫回家时送上拥抱，尾巴尖不自觉地勾住你的手腕。",
		accent: "border-[#f857a6]/30 text-[#f857a6] hover:shadow-[0_0_30px_rgba(248,87,166,0.2)]",
		badgeColor: "bg-[#f857a6]/10 text-[#f857a6]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/6.png",
	},
	{
		name: "Tsukasa",
		role: "傲娇大小姐",
		tone: "哼，本小姐才不是特意来找你的！只是...顺路路过而已！",
		accent: "border-[#fbc2eb]/30 text-[#fbc2eb] hover:shadow-[0_0_30px_rgba(251,194,235,0.2)]",
		badgeColor: "bg-[#fbc2eb]/10 text-[#fbc2eb]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/7.png",
	},
	{
		name: "Mei",
		role: "知性电波画师",
		tone: "用画笔记录你的每一个侧脸。嗯？你说这幅画里的手牵在一起了？那是艺术虚构啦...",
		accent: "border-[#84fab0]/30 text-[#84fab0] hover:shadow-[0_0_30px_rgba(132,250,176,0.2)]",
		badgeColor: "bg-[#84fab0]/10 text-[#84fab0]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/8.png",
	},
];

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
				<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
				<section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
					
					{/* Glowing Orbs behind */}
					<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#ff6f91]/20 to-[#74d3c2]/10 rounded-full blur-[120px] pointer-events-none" />

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
							href="/dashboard"
							className={cn(
								buttonVariants({ size: "lg" }),
								"h-14 px-8 text-base bg-gradient-to-r from-[#ff6f91] via-[#ff7c9b] to-[#ff84a2] hover:scale-[1.02] active:scale-[0.98] text-white border-0 shadow-xl shadow-[#ff6f91]/30 transition-all font-semibold rounded-xl"
							)}
						>
							立即进入陪伴空间
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
						
						{/* Marquee Wrapper with fading edges */}
						<div className="relative w-full overflow-hidden py-10 mt-4">
							{/* Fading overlay masks */}
							<div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#110912] to-transparent z-20 pointer-events-none" />
							<div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#110912] to-transparent z-20 pointer-events-none" />
							
							<style dangerouslySetInnerHTML={{ __html: `
								@keyframes marqueeScroll {
									0% { transform: translateX(0); }
									100% { transform: translateX(-50%); }
								}
								.animate-marquee-track {
									display: flex;
									width: max-content;
									animation: marqueeScroll 45s linear infinite;
								}
								.animate-marquee-track:hover {
									animation-play-state: paused;
								}
							`}} />
							
							<div className="animate-marquee-track gap-8 px-4">
								{[...companions, ...companions].map((companion, idx) => (
									<div
										key={`${companion.name}-${idx}`}
										className={cn(
											"w-[260px] md:w-[290px] shrink-0 group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-md p-4 transition-all duration-300 hover:-translate-y-2 hover:bg-black/60 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,111,145,0.15)]",
											companion.accent
										)}
									>
										{/* Character Image container */}
										<div className="relative h-80 w-full overflow-hidden rounded-xl bg-[#1c121e]">
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
					<div className="max-w-7xl mx-auto space-y-12">
						<div className="text-center space-y-4">
							<p className="text-sm font-semibold tracking-[0.2em] text-[#ff6f91] uppercase">
								Product Design
							</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-white">
								把“暧昧与温存”打磨为极致的陪伴艺术
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
							{features.map((feature, idx) => {
								const Icon = feature.icon;
								return (
									<div
										key={idx}
										className="flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
									>
										<div className="size-12 rounded-xl bg-[#ff6f91]/10 flex items-center justify-center text-[#ff6f91]">
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

			{/* Simple Footer */}
			<footer className="w-full border-t border-white/5 py-8 px-6 bg-black/20 text-center text-xs text-[#f5dce5]/40 space-y-2">
				<p>© {new Date().getFullYear()} AI Character. All Rights Reserved. Emotional Companion Platform.</p>
				<p className="max-w-6xl mx-auto text-[10px]">
					Character visual adapted from Wikimedia Commons, Anime girl.png.
				</p>
			</footer>
		</div>
	);
}
