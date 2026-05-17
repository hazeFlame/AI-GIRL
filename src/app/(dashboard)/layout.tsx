import React from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen overflow-hidden bg-background">
			<AppSidebar />
			<div className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
				<SiteHeader />
				<main className="flex-1 flex flex-col">
					{children}
				</main>
				<SiteFooter />
			</div>
		</div>
	);
}
