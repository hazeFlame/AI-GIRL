import Link from "next/link";
import {
	ArrowLeft,
	BookOpen,
	Bot,
	Clock,
	Download,
	FileText,
	History,
	Home,
	ImagePlus,
	Library,
	MapPin,
	MessageCircle,
	Mic,
	Moon,
	Plus,
	Save,
	ScrollText,
	Settings2,
	SlidersHorizontal,
	Sparkles,
	Tags,
	Upload,
	type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type StudioView = "home" | "create" | "library" | "drafts" | "presets";

type StudioPageProps = Readonly<{
	searchParams: Promise<{
		view?: string | string[];
	}>;
}>;

type FormSectionProps = Readonly<{
	icon: LucideIcon;
	title: string;
	description: string;
	children: React.ReactNode;
	action?: React.ReactNode;
}>;

const studioNavItems: Array<{
	label: string;
	icon: LucideIcon;
	view: StudioView;
	href: string;
}> = [
	{ label: "首页", icon: Home, view: "home", href: "/studio" },
	{ label: "创建角色", icon: Plus, view: "create", href: "/studio?view=create" },
	{ label: "角色库", icon: Library, view: "library", href: "/studio?view=library" },
	{ label: "草稿箱", icon: FileText, view: "drafts", href: "/studio?view=drafts" },
	{ label: "预设", icon: BookOpen, view: "presets", href: "/studio?view=presets" },
];

const toolItems = [
	{ label: "导入角色卡", icon: Download },
	{ label: "历史记录", icon: History },
	{ label: "声线", icon: Mic },
	{ label: "设置", icon: Settings2 },
	{ label: "深色模式", icon: Moon },
];

const studioStats = [
	{ label: "角色数", value: "0", icon: Bot, tone: "text-[#6ea8ff] bg-[#2f6bff]/12" },
	{ label: "草稿数", value: "1", icon: FileText, tone: "text-[#ffb340] bg-[#ffb340]/12" },
	{ label: "本月发布", value: "0", icon: Sparkles, tone: "text-[#45d483] bg-[#45d483]/12" },
];

function getStudioView(value: string | string[] | undefined): StudioView {
	const view = Array.isArray(value) ? value[0] : value;

	if (view === "create" || view === "library" || view === "drafts" || view === "presets") {
		return view;
	}

	return "home";
}

function StudioRailItem({
	label,
	icon: Icon,
	active,
	href,
}: {
	label: string;
	icon: LucideIcon;
	active?: boolean;
	href: string;
}) {
	return (
		<Link
			className={cn(
				"flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm transition-colors",
				active
					? "bg-[#ff2f75] text-white"
					: "text-white/45 hover:bg-white/[0.06] hover:text-white"
			)}
			href={href}
			prefetch={false}
		>
			<Icon className="size-4" />
			{label}
		</Link>
	);
}

function MobileStudioTabs({ currentView }: { currentView: StudioView }) {
	return (
		<nav className="flex gap-2 overflow-x-auto border-b border-white/8 px-4 py-3 lg:hidden">
			{studioNavItems.map((item) => {
				const Icon = item.icon;
				const active = currentView === item.view;

				return (
					<Link
						key={item.view}
						className={cn(
							"inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors",
							active
								? "bg-[#ff2f75] text-white"
								: "bg-white/[0.055] text-white/55 hover:text-white"
						)}
						href={item.href}
						prefetch={false}
					>
						<Icon className="size-4" />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}

function HelpDot() {
	return (
		<span className="inline-flex size-4 items-center justify-center rounded-full border border-white/35 text-[10px] text-white/55">
			?
		</span>
	);
}

function FormSection({
	icon: Icon,
	title,
	description,
	children,
	action,
}: FormSectionProps) {
	return (
		<section className="space-y-4">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start gap-3">
					<Icon className="mt-1 size-5 text-[#ff2f75]" />
					<div>
						<h2 className="text-lg font-semibold">{title}</h2>
						<p className="mt-1 flex items-center gap-2 text-sm leading-6 text-white/48">
							{description}
							<HelpDot />
						</p>
					</div>
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}

function FieldTextarea({
	placeholder,
	rows = 5,
}: {
	placeholder: string;
	rows?: number;
}) {
	return (
		<textarea
			className="w-full resize-y rounded-xl border border-white/12 bg-transparent px-4 py-3 text-base leading-8 text-white outline-none placeholder:text-white/40 focus:border-[#ff2f75]/60"
			placeholder={placeholder}
			rows={rows}
		/>
	);
}

function StudioHome({ displayName }: { displayName: string }) {
	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-12">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm text-white/38">Creator Studio</p>
					<h1 className="mt-2 text-3xl font-semibold tracking-tight">创作者中心</h1>
					<p className="mt-3 max-w-xl text-sm leading-6 text-white/48">
						{displayName}，这里管理你的角色卡、草稿和创作素材。
					</p>
				</div>
				<Link href="/studio?view=create" prefetch={false}>
					<Button className="bg-[#ff2f75] text-white hover:bg-[#ff4b88]">
						<Plus className="size-4" />
						创建角色
					</Button>
				</Link>
			</div>

			<Link
				className="mt-8 flex items-center justify-between rounded-2xl border border-[#ff2f75]/25 bg-[#ff2f75]/8 p-5 transition-colors hover:border-[#ff2f75]/50 hover:bg-[#ff2f75]/12"
				href="/studio?view=create"
				prefetch={false}
			>
				<div className="flex items-center gap-4">
					<span className="flex size-12 items-center justify-center rounded-2xl bg-[#ff2f75]/16 text-[#ff2f75]">
						<Sparkles className="size-6" />
					</span>
					<div>
						<h2 className="text-lg font-semibold">创建角色</h2>
						<p className="mt-1 text-sm text-white/45">设计新的 AI 角色卡</p>
					</div>
				</div>
				<Plus className="size-5 text-white/45" />
			</Link>

			<div className="mt-8 grid gap-4 md:grid-cols-3">
				{studioStats.map((stat) => {
					const Icon = stat.icon;

					return (
						<div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
							<span className={cn("flex size-9 items-center justify-center rounded-xl", stat.tone)}>
								<Icon className="size-4" />
							</span>
							<p className="mt-5 text-3xl font-semibold">{stat.value}</p>
							<p className="mt-1 text-sm text-white/42">{stat.label}</p>
						</div>
					);
				})}
			</div>

			<section className="mt-10">
				<h2 className="text-sm font-medium text-white/48">最近角色</h2>
				<div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
					<div className="flex items-center gap-3">
						<div className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white/45">
							<Bot className="size-5" />
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<p className="font-medium">未命名</p>
								<span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/42">草稿</span>
							</div>
							<p className="mt-1 flex items-center gap-1.5 text-xs text-white/35">
								<Clock className="size-3.5" />
								6 分钟前
							</p>
						</div>
					</div>
				</div>
				<p className="mt-8 text-center text-sm text-white/32">没有更多内容了</p>
			</section>
		</div>
	);
}

function CreateCharacterForm() {
	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-12">
			<div className="flex flex-col items-center text-center">
				<button
					className="group flex size-52 flex-col items-center justify-center gap-6 rounded-[42px] border-2 border-dashed border-[#ff2f75]/45 bg-[#ff2f75]/8 text-[#ff2f75] transition-colors hover:border-[#ff2f75] hover:bg-[#ff2f75]/12"
					type="button"
				>
					<span className="flex size-20 items-center justify-center rounded-3xl bg-[#ff2f75]/14 text-white transition-colors group-hover:bg-[#ff2f75]/20">
						<Upload className="size-9" />
					</span>
					<span className="text-xl font-semibold">上传头像</span>
				</button>

				<label className="mt-14 text-base font-medium text-white/42" htmlFor="name">
					角色名
				</label>
				<input
					className="mt-4 h-16 w-full max-w-xl rounded-2xl border border-transparent bg-white/[0.055] px-5 text-center text-3xl font-semibold outline-none placeholder:text-white/28 focus:border-[#ff2f75]/50"
					id="name"
					placeholder="例：星月凌霄"
					type="text"
				/>
			</div>

			<form className="mt-16 space-y-12">
				<FormSection
					icon={FileText}
					title="角色卡介绍"
					description="向用户介绍这个角色（AI 不会看到此内容）"
				>
					<FieldTextarea
						placeholder="例：星月凌霄，25岁，女性。她是一名神秘的夜行者，有着如月光般皎洁的银发和深邃如星空的眼睛。这个角色适合进行神秘主义或奇幻题材的角色扮演。"
						rows={5}
					/>
				</FormSection>

				<FormSection
					icon={ImagePlus}
					title="图库"
					description="第一张图片将作为角色卡封面，后续图片展示在详情页的图片画廊中"
				>
					<button
						className="flex size-36 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/22 text-white/48 transition-colors hover:border-[#ff2f75]/60 hover:text-white"
						type="button"
					>
						<ImagePlus className="size-8" />
						<span className="text-sm">上传图片</span>
					</button>
				</FormSection>

				<FormSection
					icon={Sparkles}
					title="性格"
					description="描述角色的性格特点、说话方式和行为习惯"
				>
					<FieldTextarea
						placeholder="例：冷静沉着，善于观察。在危险中保持镇定，但对亲近之人展现温柔一面。有强烈的正义感，但行事方式常常游走于灰色地带。"
						rows={5}
					/>
				</FormSection>

				<FormSection icon={MapPin} title="场景" description="描述角色所处的环境、时间和地点">
					<FieldTextarea
						placeholder="例：繁华都市的暗巷中，月光洒在斑驳的墙壁上。远处传来微弱的警笛声，她的安全屋位于一栋老旧公寓的顶层。"
						rows={5}
					/>
				</FormSection>

				<FormSection
					icon={SlidersHorizontal}
					title="系统指令"
					description="指导 AI 如何扮演和表现角色的具体规则"
				>
					<FieldTextarea
						placeholder={`例：
1. 使用简洁而优雅的语言，偶尔夹杂一些神秘感的表达。
2. 对亲近的人使用温柔的语气，但仍保持一定距离感。
3. 在危险情况下，展现冷静和敏捷的反应。
4. 避免直接暴露全部秘密，保留角色的悬念。`}
						rows={7}
					/>
				</FormSection>

				<FormSection
					icon={MessageCircle}
					title="建议回复"
					description="用户开始新对话时，点击「推荐回复」按钮会展示这些选项"
				>
					<div className="flex gap-3">
						<input
							className="h-12 min-w-0 flex-1 rounded-xl border border-white/12 bg-transparent px-4 text-base outline-none placeholder:text-white/40 focus:border-[#ff2f75]/60"
							placeholder="输入建议回复内容"
							type="text"
						/>
						<button
							className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-white/12 px-6 font-semibold text-white transition-colors hover:bg-white/18"
							type="button"
						>
							添加
						</button>
					</div>
				</FormSection>

				<FormSection icon={Tags} title="标签" description="在角色卡详情页展示，帮助用户发现你的角色">
					<input
						className="h-12 w-full rounded-xl border border-white/12 bg-transparent px-4 text-base outline-none placeholder:text-white/40 focus:border-[#ff2f75]/60"
						placeholder="输入标签并按回车、空格或逗号"
						type="text"
					/>
				</FormSection>

				<FormSection
					action={
						<Button variant="outline" className="border-white/12 bg-transparent text-white hover:bg-white/10">
							插入模板
						</Button>
					}
					icon={ScrollText}
					title="详细描述"
					description="角色的背景故事、经历、能力特长等详细信息"
				>
					<FieldTextarea
						placeholder="例：星月凌霄出生于一个古老的守夜人家族，从小接受严格训练。她白天是普通的图书馆管理员，夜晚则守护城市边界。"
						rows={7}
					/>
				</FormSection>

				<div className="sticky bottom-0 -mx-4 border-t border-white/8 bg-[#08080b]/92 px-4 py-4 backdrop-blur md:-mx-6 md:px-6">
					<div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-end">
						<Button variant="outline" className="border-white/12 bg-transparent text-white hover:bg-white/10">
							<Save className="size-4" />
							保存草稿
						</Button>
						<Button className="bg-[#ff2f75] text-white hover:bg-[#ff4b88]">
							<Plus className="size-4" />
							发布角色卡
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

function StudioPlaceholder({
	title,
	description,
	icon: Icon,
}: {
	title: string;
	description: string;
	icon: LucideIcon;
}) {
	return (
		<div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-4xl items-center justify-center px-4 py-10 md:px-6">
			<div className="w-full rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center">
				<span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/[0.06] text-white/58">
					<Icon className="size-6" />
				</span>
				<h1 className="mt-5 text-2xl font-semibold">{title}</h1>
				<p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">{description}</p>
			</div>
		</div>
	);
}

function StudioContent({
	currentView,
	displayName,
}: {
	currentView: StudioView;
	displayName: string;
}) {
	if (currentView === "create") {
		return <CreateCharacterForm />;
	}

	if (currentView === "library") {
		return (
			<StudioPlaceholder
				description="后面这里会展示你发布过的角色卡，并支持编辑、上下架和查看公开详情。"
				icon={Library}
				title="角色库"
			/>
		);
	}

	if (currentView === "drafts") {
		return (
			<StudioPlaceholder
				description="保存草稿后会出现在这里，方便你继续完善角色设定。"
				icon={FileText}
				title="草稿箱"
			/>
		);
	}

	if (currentView === "presets") {
		return (
			<StudioPlaceholder
				description="这里会沉淀常用设定模板、系统指令模板和角色类型预设。"
				icon={BookOpen}
				title="预设"
			/>
		);
	}

	return <StudioHome displayName={displayName} />;
}

export default async function StudioPage({ searchParams }: StudioPageProps) {
	const params = await searchParams;
	const currentView = getStudioView(params.view);
	const user = await requireUser();
	const displayName = user.name || user.email || "Creator";
	const initial = displayName.charAt(0).toUpperCase();

	return (
		<main className="min-h-screen bg-[#08080b] text-white">
			<div className="grid min-h-screen lg:grid-cols-[220px_minmax(0,1fr)]">
				<aside className="hidden border-r border-white/8 bg-[#101014] p-3 lg:block">
					<Link
						href="/explore"
						prefetch={false}
						className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
					>
						<ArrowLeft className="size-4" />
						返回广场
					</Link>

					<div className="mt-5 flex items-center gap-3 px-3">
						<div className="flex size-9 items-center justify-center rounded-lg bg-[#ff2f75]/15 text-[#ff2f75]">
							<Bot className="size-5" />
						</div>
						<div>
							<p className="text-sm font-semibold">Creator Studio</p>
							<p className="text-xs text-white/35">角色卡工作台</p>
						</div>
					</div>

					<nav className="mt-7 space-y-1">
						{studioNavItems.map((item) => (
							<StudioRailItem
								key={item.view}
								active={currentView === item.view}
								href={item.href}
								icon={item.icon}
								label={item.label}
							/>
						))}
					</nav>

					<div className="mt-7 border-t border-white/8 pt-5">
						<p className="px-3 text-xs font-medium text-white/32">工具</p>
						<div className="mt-3 space-y-1">
							{toolItems.map((item) => (
								<StudioRailItem
									key={item.label}
									href="/studio"
									icon={item.icon}
									label={item.label}
								/>
							))}
						</div>
					</div>
				</aside>

				<section className="min-w-0">
					<header className="sticky top-0 z-40 border-b border-white/8 bg-[#08080b]/92 backdrop-blur">
						<div className="flex h-14 items-center justify-between px-4 md:px-6">
							<div className="lg:hidden">
								<Link
									href="/explore"
									prefetch={false}
									className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
								>
									<ArrowLeft className="size-4" />
									返回
								</Link>
							</div>
							<div className="ml-auto flex items-center gap-3">
								<span className="hidden text-sm text-white/38 sm:inline">{displayName}</span>
								<Avatar className="size-8" size="lg">
									<AvatarFallback>{initial}</AvatarFallback>
								</Avatar>
							</div>
						</div>
						<MobileStudioTabs currentView={currentView} />
					</header>

					<StudioContent currentView={currentView} displayName={displayName} />
				</section>
			</div>
		</main>
	);
}
