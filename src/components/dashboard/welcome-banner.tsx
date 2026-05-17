"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

export function WelcomeBanner() {
	const { data: session, isPending } = authClient.useSession();
	const firstName = session?.user?.name?.split(" ")[0] || "旅行者";

	return (
		<div>
			<p className="text-sm text-muted-foreground">欢迎回来，我的伴侣</p>
			<h1 className="mt-1 text-3xl font-semibold tracking-tight">
				你好，{isPending ? "..." : firstName} ✨
			</h1>
		</div>
	);
}
