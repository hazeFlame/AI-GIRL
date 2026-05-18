"use client";

import { Heart, Send } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type CharacterComment = {
	author: string;
	initial: string;
	time: string;
	text: string;
	likes: number;
};

export function CharacterComments({
	comments,
}: {
	comments: CharacterComment[];
}) {
	return (
		<div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 md:p-7">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<p className="text-sm text-white/45">此卡片的评论区</p>
					<h2 className="mt-1 text-lg font-semibold">评论</h2>
				</div>
				<Badge className="bg-[#ff2f75] text-white">
					{comments.length} 条
				</Badge>
			</div>

			<div className="mt-5 flex gap-3 rounded-lg border border-white/10 bg-black/25 p-3">
				<Avatar className="size-9" size="lg">
					<AvatarFallback>你</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex-1">
					<textarea
						className="min-h-20 w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/35"
						placeholder="写下你对这张角色卡的感受"
					/>
					<div className="mt-2 flex justify-end">
						<button
							className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#ff2f75] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff4b88]"
							type="button"
						>
							<Send className="size-4" />
							发布
						</button>
					</div>
				</div>
			</div>

			<div className="mt-5 divide-y divide-white/10">
				{comments.map((comment) => (
					<article
						key={`${comment.author}-${comment.time}`}
						className="flex gap-3 py-4"
					>
						<Avatar className="size-9" size="lg">
							<AvatarFallback>{comment.initial}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<div className="flex flex-wrap items-center gap-2">
								<p className="font-medium">{comment.author}</p>
								<span className="text-xs text-white/35">{comment.time}</span>
							</div>
							<p className="mt-2 text-sm leading-6 text-white/62">
								{comment.text}
							</p>
							<button
								className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white"
								type="button"
							>
								<Heart className="size-3.5" />
								{comment.likes}
							</button>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
