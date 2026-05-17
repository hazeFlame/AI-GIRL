import Link from "next/link";
import { Flame, Heart, Plus, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompanionGrid } from "@/components/explore/companion-grid";
import { WelcomeBanner } from "@/components/explore/welcome-banner";
import { companions } from "@/config/companions";

const categoryItems = [
	"暧昧",
	"陪伴",
	"治愈",
	"恋爱游戏",
	"青梅竹马",
	"高冷",
	"傲娇",
	"创作者精选",
];

export default function ExplorePage() {
	const onlineCount = companions.filter(
		(companion) => companion.status === "在线"
	).length;

	return (
		<div className="px-4 py-6 md:px-8 md:py-10">
			<div className="flex w-full flex-col gap-8">
				<section className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-4">
						<WelcomeBanner />
						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary" className="gap-1.5">
								<Heart className="size-3" />
								{companions.length} 个公开角色
							</Badge>
							<Badge variant="secondary" className="gap-1.5">
								<UsersRound className="size-3" />
								{onlineCount} 个在线
							</Badge>
							<Badge variant="secondary" className="gap-1.5">
								<Flame className="size-3" />
								创作者精选
							</Badge>
						</div>
					</div>

					<Link href="/studio?view=create">
						<Button className="w-full gap-2 bg-[#ff6f91] text-white hover:bg-[#ff84a2] sm:w-auto">
							<Plus className="size-4" />
							创建角色
						</Button>
					</Link>
				</section>

				<section className="flex flex-wrap gap-2">
					{categoryItems.map((item) => (
						<Link
							key={item}
							href="/explore"
							className="rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-[#ff6f91]/40 hover:text-foreground"
						>
							{item}
						</Link>
					))}
				</section>

				<section>
					<CompanionGrid companions={companions} />
				</section>
			</div>
		</div>
	);
}
