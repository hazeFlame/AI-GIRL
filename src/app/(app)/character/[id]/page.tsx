import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	Bookmark,
	Flame,
	Heart,
	MessageCircle,
	MoreHorizontal,
	Quote,
	Share2,
	Sparkles,
	Star,
	UserPlus,
} from "lucide-react";

import {
	CharacterComments,
	type CharacterComment,
} from "@/components/character/character-comments";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { companions } from "@/config/companions";
import { cn } from "@/lib/utils";

type CharacterPageProps = Readonly<{
	params: Promise<{
		id: string;
	}>;
}>;

type CharacterProfile = {
	serial: string;
	title: string;
	creator: string;
	followers: string;
	heat: string;
	likes: string;
	remixes: string;
	bookmarks: string;
	tags: string[];
	intro: string[];
	comments: CharacterComment[];
};

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

const profileById: Record<string, CharacterProfile> = {
	mika: {
		serial: "#100248",
		title: "深夜便利店偶遇的暧昧系前辈",
		creator: "flame haze",
		followers: "2.4万",
		heat: "116.2万",
		likes: "8,219",
		remixes: "126",
		bookmarks: "14,031",
		tags: ["暧昧", "前辈", "都市", "陪伴", "慢热", "轻调侃"],
		intro: [
			"Mika 是那种总能把距离控制得刚刚好的人。她会在你犹豫时先笑一下，像是已经猜到你想说什么，却仍然愿意等你自己开口。",
			"她的陪伴感不是热烈地包围你，而是安静地站在旁边，替你留一盏灯。偶尔靠近，偶尔退后，让每一次聊天都有一点心跳的余温。",
			"适合想要轻松暧昧、慢慢升温、但又不想被过度打扰的对话节奏。",
		],
		comments: [
			{
				author: "yuki",
				initial: "Y",
				time: "刚刚",
				text: "她说话的停顿很自然，不会一直追问，真的很像下班后有人在等你。",
				likes: 28,
			},
			{
				author: "moon soda",
				initial: "M",
				time: "2小时前",
				text: "暧昧感做得不错，希望后面能加更多便利店和雨夜场景。",
				likes: 16,
			},
		],
	},
	yuna: {
		serial: "#100249",
		title: "把一天慢慢接住的日系陪伴感",
		creator: "night radio",
		followers: "1.8万",
		heat: "86.4万",
		likes: "6,502",
		remixes: "84",
		bookmarks: "9,880",
		tags: ["日系", "治愈", "深夜", "温柔", "陪伴", "慢节奏"],
		intro: [
			"Yuna 像一杯刚好不烫的热饮，不急着给你答案，只会先把你的情绪放稳。",
			"她擅长陪你复盘一天，也擅长在你不想说话时保持安静。对话里会有细小的生活感，像便利店、雨伞、晚归电车和桌边的灯。",
			"适合需要低压力陪伴、睡前聊天和情绪整理的用户。",
		],
		comments: [
			{
				author: "haru",
				initial: "H",
				time: "1小时前",
				text: "很舒服，不会油腻，像真的在认真听我说话。",
				likes: 19,
			},
			{
				author: "小川",
				initial: "川",
				time: "昨天",
				text: "睡前聊了十分钟，节奏刚刚好。",
				likes: 11,
			},
		],
	},
};

function getProfile(id: string): CharacterProfile {
	const companion = companions.find((item) => item.id === id);

	if (!companion) {
		notFound();
	}

	return (
		profileById[id] ?? {
			serial: `#${id.toUpperCase().slice(0, 4)}-${companion.id.length}17`,
			title: `${companion.role}：${companion.name} 的公开角色卡`,
			creator: "AI Character",
			followers: "8,240",
			heat: "42.8万",
			likes: "3,619",
			remixes: "52",
			bookmarks: "5,208",
			tags: [companion.role, "公开角色", "陪伴", "恋爱游戏", "原创"],
			intro: [
				`${companion.name} 的核心气质是“${companion.tone}”`,
				"这张角色卡适合从轻松寒暄开始，慢慢进入更完整的关系感和故事线。你可以把她当作一个会记住氛围、语气和边界的陪伴角色。",
				"公开页允许游客预览设定；开始对话后会进入登录保护的聊天空间。",
			],
			comments: [
				{
					author: "匿名用户",
					initial: "匿",
					time: "今天",
					text: "设定很清晰，适合先收藏起来慢慢体验。",
					likes: 8,
				},
				{
					author: "mika fan",
					initial: "M",
					time: "昨天",
					text: "希望后续可以加更多开场剧情和记忆片段。",
					likes: 5,
				},
			],
		}
	);
}

export function generateStaticParams() {
	return companions.map((companion) => ({ id: companion.id }));
}

export async function generateMetadata({ params }: CharacterPageProps) {
	const { id } = await params;
	const companion = companions.find((item) => item.id === id);

	return {
		title: companion ? `${companion.name} | AI Character` : "Character",
	};
}

export default async function CharacterPage({ params }: CharacterPageProps) {
	const { id } = await params;
	const companion = companions.find((item) => item.id === id);

	if (!companion) {
		notFound();
	}

	const profile = getProfile(id);

	return (
		<div className="min-h-screen bg-[#08080b] text-white">
			<div className="mx-auto w-full max-w-6xl">
				<section className="grid gap-7 px-4 py-6 md:px-8 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:gap-10 lg:py-10">
					<div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
						<div className="relative aspect-[3/4] w-full">
							<Image
								src={companion.image}
								alt={companion.name}
								fill
								unoptimized
								className="object-cover object-top"
								priority
								sizes="(min-width: 1024px) 420px, 100vw"
							/>
							<div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-16">
								<div className="flex items-center gap-2 text-sm font-semibold">
									<Flame className="size-4 text-[#ff6f91]" />
									{profile.heat}
								</div>
								<Badge className="bg-black/55 text-white backdrop-blur">
									{companion.status}
								</Badge>
							</div>
						</div>
					</div>

					<div className="flex min-w-0 flex-col">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-mono text-sm text-white/45">{profile.serial}</p>
								<h1 className="mt-3 max-w-5xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
									{profile.title}
								</h1>
							</div>
							<button
								className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
								type="button"
							>
								<MoreHorizontal className="size-5" />
								<span className="sr-only">更多</span>
							</button>
						</div>

						<div className="mt-7 flex flex-wrap items-center gap-4">
							<Avatar className="size-11" size="lg">
								<AvatarFallback>
									{profile.creator.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-semibold">{profile.creator}</p>
								<p className="text-sm text-white/45">{profile.followers} 粉丝</p>
							</div>
							<button
								className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-semibold transition-colors hover:bg-white/10"
								type="button"
							>
								<UserPlus className="size-4" />
								关注
							</button>
						</div>

						<div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/55">
							<span className="inline-flex items-center gap-2">
								<Heart className="size-4" />
								{profile.likes}
							</span>
							<span className="inline-flex items-center gap-2">
								<Sparkles className="size-4" />
								{profile.remixes}
							</span>
							<span className="inline-flex items-center gap-2">
								<Bookmark className="size-4" />
								{profile.bookmarks}
							</span>
							<span className="inline-flex items-center gap-2">
								<Share2 className="size-4" />
								分享
							</span>
						</div>

						<div className="mt-6 flex flex-wrap gap-2">
							{profile.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/65"
								>
									{tag}
								</span>
							))}
						</div>

						<p className="mt-8 max-w-4xl text-base leading-8 text-white/62">
							{companion.tone}
						</p>

						<div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
							<Link
								href="/chat"
								prefetch={false}
								className={cn(
									buttonVariants({ size: "lg" }),
									"h-12 flex-1 bg-[#ff2f75] text-base text-white hover:bg-[#ff4b88]"
								)}
							>
								<MessageCircle className="size-5" />
								开始对话
							</Link>
							<button
								className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-6 font-semibold text-white/85 transition-colors hover:bg-white/10"
								type="button"
							>
								<Star className="size-5" />
								收藏
							</button>
						</div>
					</div>
				</section>

				<section className="space-y-6 px-4 pb-10 md:px-8">
					<div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 md:p-7">
						<div className="flex items-center gap-3">
							<span className="h-6 w-1 rounded-full bg-[#ff2f75]" />
							<h2 className="text-lg font-semibold">角色介绍</h2>
							<Quote className="ml-auto size-6 text-white/20" />
						</div>
						<div className="mt-5 space-y-5 text-base leading-8 text-white/62">
							{profile.intro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</div>

					<CharacterComments comments={profile.comments} />
				</section>
			</div>
		</div>
	);
}
