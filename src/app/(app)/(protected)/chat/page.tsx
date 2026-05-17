import { MessageSquare, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

export default async function ChatPage() {
	const user = await requireUser();
	const firstName = user.name?.split(" ")[0] || "there";

	return (
		<div className="flex-1 p-4 md:p-8">
			<div className="flex h-full w-full flex-col">
				<div className="border-b pb-5">
					<p className="text-sm text-muted-foreground">Welcome, {firstName}</p>
					<h1 className="mt-1 text-2xl font-semibold tracking-tight">Chat</h1>
				</div>

				<div className="grid flex-1 place-items-center py-12">
					<Card className="w-full max-w-xl">
						<CardContent className="flex flex-col items-center gap-5 p-8 text-center">
							<div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<MessageSquare className="size-6" />
							</div>
							<div className="space-y-2">
								<h2 className="text-xl font-semibold">Conversation space</h2>
								<p className="text-sm text-muted-foreground">
									The account layer is ready. Character selection and message history
									can plug into this screen next.
								</p>
							</div>
							<Button disabled>
								<Sparkles className="size-4" />
								Start chat
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
