import { ImagePlus, Plus, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

const steps = ["角色设定", "头像素材", "公开状态"];

export default async function CreatePage() {
	await requireUser();

	return (
		<div className="px-4 py-6 md:px-8 md:py-10">
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm text-muted-foreground">UGC 创作</p>
						<h1 className="mt-1 text-2xl font-semibold tracking-tight">
							创建角色
						</h1>
					</div>
					<Button disabled>
						<Plus className="size-4" />
						发布角色
					</Button>
				</div>

				<div className="grid gap-4 lg:grid-cols-[1fr_280px]">
					<Card className="rounded-lg">
						<CardContent className="grid gap-4 p-5">
							<div className="grid gap-2">
								<label className="text-sm font-medium" htmlFor="character-name">
									角色名
								</label>
								<input
									className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
									id="character-name"
									placeholder="例如 Mika"
									type="text"
								/>
							</div>
							<div className="grid gap-2">
								<label className="text-sm font-medium" htmlFor="character-role">
									人设标签
								</label>
								<input
									className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
									id="character-role"
									placeholder="暧昧系前辈 / 治愈陪伴 / 恋爱游戏女主"
									type="text"
								/>
							</div>
							<div className="grid gap-2">
								<label className="text-sm font-medium" htmlFor="character-tone">
									开场氛围
								</label>
								<textarea
									className="min-h-32 resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
									id="character-tone"
									placeholder="写下她会如何说话、靠近、陪伴。"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-4">
						<Card className="rounded-lg border-dashed bg-muted/30">
							<CardContent className="grid place-items-center gap-3 p-6 text-center">
								<div className="flex size-12 items-center justify-center rounded-lg bg-background text-[#ff6f91] ring-1 ring-border">
									<ImagePlus className="size-6" />
								</div>
								<div>
									<h2 className="font-semibold">角色头像</h2>
									<p className="mt-1 text-sm text-muted-foreground">
										先保留素材位，后面接 Supabase 上传。
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="rounded-lg">
							<CardContent className="space-y-3 p-5">
								<div className="flex items-center gap-2">
									<Sparkles className="size-4 text-[#ff6f91]" />
									<h2 className="font-semibold">发布流程</h2>
								</div>
								<div className="flex flex-wrap gap-2">
									{steps.map((step) => (
										<Badge key={step} variant="secondary">
											{step}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
