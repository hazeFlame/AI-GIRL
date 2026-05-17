"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const signInWithGoogle = async () => {
		setError(null);
		setIsPending(true);

		const { error } = await authClient.signIn.social({
			provider: "google",
			callbackURL: "/",
			errorCallbackURL: "/login",
		});

		if (error) {
			setError(error.message || "Unable to sign in with Google.");
			setIsPending(false);
		}
	};

	return (
		<div className="space-y-4">
			<Button
				className="w-full"
				disabled={isPending}
				onClick={signInWithGoogle}
				type="button"
			>
				<LogIn className="size-4" />
				{isPending ? "Redirecting..." : "Continue with Google"}
			</Button>
			{error ? <p className="text-sm text-destructive">{error}</p> : null}
		</div>
	);
}
