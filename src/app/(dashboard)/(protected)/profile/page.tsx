import { CalendarDays, Mail, ShieldCheck, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

function formatDate(value: Date | string | number | null | undefined) {
	if (!value) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}

export default async function ProfilePage() {
	const session = await requireSession();
	const { user } = session;
	const displayName = user.name || user.email || "Account";
	const initial = displayName.charAt(0).toUpperCase();

	return (
		<div className="flex-1 p-4 md:p-8">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
				<div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-4">
						<Avatar className="size-14" size="lg">
							<AvatarImage alt={displayName} src={user.image || undefined} />
							<AvatarFallback>{initial}</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<h1 className="truncate text-2xl font-semibold tracking-tight">
								{displayName}
							</h1>
							<p className="truncate text-sm text-muted-foreground">
								{user.email}
							</p>
						</div>
					</div>
					<Badge variant={user.emailVerified ? "default" : "secondary"}>
						{user.emailVerified ? "Verified" : "Unverified"}
					</Badge>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<UserRound className="size-4" />
								Account
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm">
							<div className="flex items-center justify-between gap-4">
								<span className="text-muted-foreground">User ID</span>
								<span className="max-w-48 truncate font-mono text-xs">{user.id}</span>
							</div>
							<div className="flex items-center justify-between gap-4">
								<span className="text-muted-foreground">Name</span>
								<span className="max-w-48 truncate">{user.name || "Not set"}</span>
							</div>
							<div className="flex items-center justify-between gap-4">
								<span className="text-muted-foreground">Created</span>
								<span>{formatDate(user.createdAt)}</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<ShieldCheck className="size-4" />
								Authentication
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm">
							<div className="flex items-center justify-between gap-4">
								<span className="flex items-center gap-2 text-muted-foreground">
									<Mail className="size-4" />
									Email
								</span>
								<span className="max-w-52 truncate">{user.email}</span>
							</div>
							<div className="flex items-center justify-between gap-4">
								<span className="text-muted-foreground">Status</span>
								<span>{user.emailVerified ? "Verified" : "Unverified"}</span>
							</div>
							<div className="flex items-center justify-between gap-4">
								<span className="flex items-center gap-2 text-muted-foreground">
									<CalendarDays className="size-4" />
									Session
								</span>
								<span>Active</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
