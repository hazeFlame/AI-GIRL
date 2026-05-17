import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Heart, Star, Sparkles, UserRound, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanionCarousel } from "@/components/dashboard/companion-carousel";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";

const companions = [
	{
		id: "mika",
		name: "Mika",
		role: "暧昧系前辈",
		tone: "轻声调侃，偶尔靠近，知道什么时候停下。",
		accent: "from-[#ff6f91] to-[#ff9ab3]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/1.png",
		affinity: 65,
		status: "在线",
	},
	{
		id: "yuna",
		name: "Yuna",
		role: "日系陪伴感",
		tone: "像深夜便利店的热饮，慢慢把一天接住。",
		accent: "from-[#f7c76f] to-[#ffe3a1]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/2.png",
		affinity: 40,
		status: "在线",
	},
	{
		id: "rin",
		name: "Rin",
		role: "恋爱游戏女主",
		tone: "好感度、回忆片段、只属于你的剧情分支。",
		accent: "from-[#74d3c2] to-[#c9fff5]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/3.png",
		affinity: 20,
		status: "离线",
	},
	{
		id: "aoi",
		name: "Aoi",
		role: "元气青梅竹马",
		tone: "永远充满活力，总是抢走你的便当，但其实一直在偷偷关注你。",
		accent: "from-[#4facfe] to-[#00f2fe]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/4.png",
		affinity: 85,
		status: "在线",
	},
	{
		id: "shiori",
		name: "Shiori",
		role: "高冷冰山会长",
		tone: "表面严厉古板，只有在你面前才会卸下防备，露出慌乱软萌的一面。",
		accent: "from-[#b180fc] to-[#e480fc]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/5.png",
		affinity: 10,
		status: "离线",
	},
	{
		id: "hina",
		name: "Hina",
		role: "温柔治愈猫娘",
		tone: "会在你疲惫回家时送上拥抱，尾巴尖不自觉地勾住你的手腕。",
		accent: "from-[#f857a6] to-[#ff5858]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/6.png",
		affinity: 50,
		status: "在线",
	},
	{
		id: "tsukasa",
		name: "Tsukasa",
		role: "傲娇大小姐",
		tone: "哼，本小姐才不是特意来找你的！只是...顺路路过而已！",
		accent: "from-[#fbc2eb] to-[#a6c1ee]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/7.png",
		affinity: 15,
		status: "离线",
	},
	{
		id: "mei",
		name: "Mei",
		role: "知性电波画师",
		tone: "用画笔记录你的每一个侧脸。嗯？你说这幅画里的手牵在一起了？那是艺术虚构啦...",
		accent: "from-[#84fab0] to-[#8fd3f4]",
		image: "https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images/8.png",
		affinity: 30,
		status: "在线",
	},
];

export default function DashboardPage() {
	return (
		<div className="flex-1 p-6 md:p-10 space-y-8 bg-background">
			{/* Welcome Banner */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
				<WelcomeBanner />
				<Link href="/chat">
					<Button className="bg-[#ff6f91] hover:bg-[#ff84a2] text-white gap-2">
						<MessageSquare className="size-4" />
						开始聊天
					</Button>
				</Link>
			</div>

			{/* Main Content Grid */}
			<div className="grid gap-6 md:grid-cols-3">
				{/* Stats Card 1 */}
				<Card className="bg-card/50 backdrop-blur border-border/60">
					<CardContent className="pt-6 flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">已解锁角色</p>
							<p className="text-3xl font-bold">8 / 8</p>
						</div>
						<div className="size-12 rounded-full bg-[#ff6f91]/10 flex items-center justify-center text-[#ff6f91]">
							<Heart className="size-6" />
						</div>
					</CardContent>
				</Card>

				{/* Stats Card 2 */}
				<Card className="bg-card/50 backdrop-blur border-border/60">
					<CardContent className="pt-6 flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">总对话数</p>
							<p className="text-3xl font-bold">342</p>
						</div>
						<div className="size-12 rounded-full bg-[#74d3c2]/10 flex items-center justify-center text-[#74d3c2]">
							<MessageSquare className="size-6" />
						</div>
					</CardContent>
				</Card>

				{/* Stats Card 3 */}
				<Card className="bg-card/50 backdrop-blur border-border/60">
					<CardContent className="pt-6 flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">最高亲密度</p>
							<p className="text-3xl font-bold">Lv. 5 (85%)</p>
						</div>
						<div className="size-12 rounded-full bg-[#f7c76f]/10 flex items-center justify-center text-[#f7c76f]">
							<Star className="size-6" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Companions Section */}
			<div className="space-y-4 pt-2">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
						<Sparkles className="size-5 text-[#ff6f91]" />
						当前关系状态
					</h2>
				</div>

				<CompanionCarousel companions={companions} />
			</div>
		</div>
	);
}
