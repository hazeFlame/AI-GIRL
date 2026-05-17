import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Companion } from "@/config/companions";

export function CompanionGrid({ companions }: { companions: Companion[] }) {
	return (
		<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{companions.map((companion) => (
				<Link
					key={companion.id}
					href={`/character/${companion.id}`}
					className="block h-full"
				>
					<Card className="group h-full overflow-hidden rounded-lg border-border/60 bg-card py-0 transition-all duration-300 hover:border-[#ff6f91]/30 hover:shadow-[0_0_30px_rgba(255,111,145,0.14)]">
						<div className="flex h-full min-h-36 sm:min-h-0 sm:flex-col">
							<div className="relative w-28 shrink-0 self-stretch overflow-hidden bg-[#1b111b] sm:h-60 sm:w-full sm:self-auto">
								<Image
									src={companion.image}
									alt={companion.name}
									fill
									unoptimized
									className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
									sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 112px"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent sm:from-background sm:via-background/10" />
								<div className="absolute left-2 top-2 sm:left-auto sm:right-3 sm:top-3">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
										<span
											className={`size-1.5 rounded-full ${
												companion.status === "在线"
													? "animate-pulse bg-green-500"
													: "bg-neutral-500"
											}`}
										/>
										{companion.status}
									</span>
								</div>
							</div>

							<div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
								<div className="flex items-start justify-between gap-2">
									<div className="min-w-0">
										<h2 className="truncate text-base font-semibold transition-colors duration-200 group-hover:text-[#ff6f91] sm:text-lg">
											{companion.name}
										</h2>
										<p className="mt-0.5 truncate text-xs text-muted-foreground">
											{companion.role}
										</p>
									</div>
									<span className="shrink-0 rounded bg-secondary px-2 py-0.5 font-mono text-xs font-medium text-secondary-foreground">
										公开
									</span>
								</div>

								<p className="line-clamp-2 text-sm leading-6 text-muted-foreground sm:min-h-12">
									{companion.tone}
								</p>

								<span className="mt-auto inline-flex h-8 w-full items-center justify-center rounded-lg border border-border/40 bg-secondary px-2.5 text-sm font-medium transition-all duration-300 group-hover:border-[#ff6f91]/30 group-hover:bg-[#ff6f91] group-hover:text-white">
									查看角色卡
									<ArrowUpRight className="ml-1 size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</span>
							</div>
						</div>
					</Card>
				</Link>
			))}
		</div>
	);
}
