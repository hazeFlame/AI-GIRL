import React from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />
			<main className="min-h-[calc(100svh-7rem)] pb-16 md:pb-0">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
