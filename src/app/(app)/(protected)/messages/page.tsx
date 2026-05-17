import { MessageCircle, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

const conversations = [
	{
		name: "Mika",
		initial: "M",
		label: "暧昧系前辈",
		message: "今天也想听你多讲一点。",
		time: "刚刚",
	},
	{
		name: "Yuna",
		initial: "Y",
		label: "日系陪伴感",
		message: "我把夜宵留在桌边了。",
		time: "12:20",
	},
	{
		name: "Rin",
		initial: "R",
		label: "恋爱游戏女主",
		message: "下一章剧情，要一起选吗？",
		time: "昨天",
	},
];

export default async function MessagesPage() {
	await requireUser();

	return (
		<div className="px-4 py-6 md:px-8 md:py-10">
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col gap-2 border-b pb-6">
					<p className="text-sm text-muted-foreground">私信</p>
					<h1 className="text-2xl font-semibold tracking-tight">消息</h1>
				</div>

				<div className="grid gap-4 lg:grid-cols-[1fr_280px]">
					<Card className="rounded-lg">
						<CardContent className="divide-y px-0 py-0">
							{conversations.map((conversation) => (
								<div
									key={conversation.name}
									className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/50"
								>
									<Avatar className="size-10" size="lg">
										<AvatarFallback>{conversation.initial}</AvatarFallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<p className="truncate font-medium">{conversation.name}</p>
											<Badge variant="secondary">{conversation.label}</Badge>
										</div>
										<p className="mt-1 truncate text-sm text-muted-foreground">
											{conversation.message}
										</p>
									</div>
									<span className="shrink-0 text-xs text-muted-foreground">
										{conversation.time}
									</span>
								</div>
							))}
						</CardContent>
					</Card>

					<Card className="rounded-lg bg-muted/30">
						<CardContent className="flex h-full min-h-48 flex-col items-start justify-between gap-6 p-5">
							<div className="space-y-2">
								<div className="flex size-10 items-center justify-center rounded-lg bg-[#ff6f91]/10 text-[#ff6f91]">
									<MessageCircle className="size-5" />
								</div>
								<h2 className="font-semibold">会话收件箱</h2>
								<p className="text-sm leading-6 text-muted-foreground">
									之后可以接入真实聊天记录、未读数和角色通知。
								</p>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Sparkles className="size-4 text-[#ff6f91]" />
								公开角色会从广场进入聊天
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
