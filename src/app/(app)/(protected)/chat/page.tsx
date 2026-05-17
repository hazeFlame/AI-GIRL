import Image from "next/image";
import { Paperclip, Search, Send, Smile } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companions } from "@/config/companions";
import { requireUser } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const conversations = companions.slice(0, 6).map((companion, index) => ({
	...companion,
	time: ["刚刚", "12:20", "昨天", "周五", "4月19日", "1月31日"][index],
	unread: [2, 0, 1, 0, 0, 0][index],
	preview: [
		"今天也想听你多讲一点。",
		"我把夜宵留在桌边了。",
		"下一章剧情，要一起选吗？",
		"你说的那首歌，我又听了一遍。",
		"别太晚睡，我会等你回来。",
		"画里的手牵在一起，只是艺术虚构啦。",
	][index],
}));

const activeConversation = conversations[0];

const messages = [
	{
		from: "companion",
		text: "你终于来了。今天看起来有点累，要不要先把烦心事放在这里？",
		time: "22:18",
	},
	{
		from: "user",
		text: "只是想找个人聊一下，今天节奏有点乱。",
		time: "22:19",
	},
	{
		from: "companion",
		text: "那就慢慢说，我不催你。先从最让你卡住的那一件事开始。",
		time: "22:20",
	},
];

export default async function ChatPage() {
	const user = await requireUser();
	const firstName = user.name?.split(" ")[0] || user.email || "你";

	return (
		<div className="px-4 py-4 md:px-6 md:py-6">
			<div className="grid min-h-[calc(100svh-12rem)] overflow-hidden rounded-lg border bg-card lg:grid-cols-[360px_minmax(0,1fr)]">
				<aside className="border-b bg-background/60 lg:border-b-0 lg:border-r">
					<div className="space-y-4 border-b p-4">
						<div>
							<p className="text-sm text-muted-foreground">欢迎回来，{firstName}</p>
							<h1 className="mt-1 text-2xl font-semibold tracking-tight">消息</h1>
						</div>
						<label className="flex h-10 items-center gap-2 rounded-lg bg-muted px-3 text-sm text-muted-foreground">
							<Search className="size-4 shrink-0" />
							<span className="sr-only">搜索会话</span>
							<input
								className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
								placeholder="搜索角色或会话"
								type="search"
							/>
						</label>
					</div>

					<div className="max-h-[42svh] overflow-y-auto lg:max-h-[calc(100svh-18rem)]">
						{conversations.map((conversation, index) => {
							const active = conversation.id === activeConversation.id;

							return (
								<button
									key={conversation.id}
									className={cn(
										"flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors hover:bg-muted/60",
										active && "bg-muted"
									)}
									type="button"
								>
									<div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-muted">
										<Image
											src={conversation.image}
											alt={conversation.name}
											fill
											unoptimized
											className="object-cover object-top"
											sizes="48px"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<p className="truncate font-medium">{conversation.name}</p>
											{conversation.unread > 0 ? (
												<Badge className="h-5 min-w-5 px-1.5">
													{conversation.unread}
												</Badge>
											) : null}
										</div>
										<p className="mt-1 truncate text-sm text-muted-foreground">
											{conversation.preview}
										</p>
									</div>
									<div className="flex shrink-0 flex-col items-end gap-2">
										<span className="text-xs text-muted-foreground">
											{conversation.time}
										</span>
										{index === 0 ? (
											<span className="size-2 rounded-full bg-[#ff6f91]" />
										) : null}
									</div>
								</button>
							);
						})}
					</div>
				</aside>

				<section className="flex min-h-[560px] min-w-0 flex-col">
					<div className="flex items-center justify-between gap-3 border-b p-4">
						<div className="flex min-w-0 items-center gap-3">
							<div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-muted">
								<Image
									src={activeConversation.image}
									alt={activeConversation.name}
									fill
									unoptimized
									className="object-cover object-top"
									sizes="44px"
								/>
							</div>
							<div className="min-w-0">
								<div className="flex items-center gap-2">
									<h2 className="truncate font-semibold">
										{activeConversation.name}
									</h2>
									<span className="size-2 rounded-full bg-green-500" />
								</div>
								<p className="truncate text-sm text-muted-foreground">
									{activeConversation.role}
								</p>
							</div>
						</div>
						<Badge variant="secondary">公开角色</Badge>
					</div>

					<div className="flex-1 space-y-4 overflow-y-auto bg-muted/20 p-4 md:p-6">
						{messages.map((message) => {
							const fromUser = message.from === "user";

							return (
								<div
									key={`${message.time}-${message.text}`}
									className={cn("flex", fromUser && "justify-end")}
								>
									<div
										className={cn(
											"max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[68%]",
											fromUser
												? "bg-[#ff6f91] text-white"
												: "border bg-background text-foreground"
										)}
									>
										<p>{message.text}</p>
										<p
											className={cn(
												"mt-1 text-xs",
												fromUser ? "text-white/70" : "text-muted-foreground"
											)}
										>
											{message.time}
										</p>
									</div>
								</div>
							);
						})}
					</div>

					<div className="border-t bg-background p-3 md:p-4">
						<div className="flex items-end gap-2 rounded-lg border bg-card p-2">
							<button
								className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								type="button"
							>
								<Paperclip className="size-4" />
								<span className="sr-only">添加附件</span>
							</button>
							<textarea
								className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
								placeholder={`给 ${activeConversation.name} 发消息`}
								rows={1}
							/>
							<button
								className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
								type="button"
							>
								<Smile className="size-4" />
								<span className="sr-only">表情</span>
							</button>
							<Button className="size-9 bg-[#ff6f91] text-white hover:bg-[#ff84a2]" size="icon">
								<Send className="size-4" />
								<span className="sr-only">发送</span>
							</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
