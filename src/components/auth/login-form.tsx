"use client";

import { type FormEvent, useState } from "react";
import { LogIn, Mail, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

export function LoginForm() {
	const [mode, setMode] = useState<AuthMode>("sign-in");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const resetFeedback = () => {
		setError(null);
	};

	const submitEmailForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		resetFeedback();
		setIsPending(true);

		const response =
			mode === "sign-in"
				? await authClient.signIn.email({
						email,
						password,
						callbackURL: "/",
						rememberMe: true,
					})
				: await authClient.signUp.email({
						name: name || email.split("@")[0],
						email,
						password,
						callbackURL: "/",
					});

		if (response.error) {
			setError(response.error.message || "Unable to continue with email.");
			setIsPending(false);
			return;
		}

		window.location.href = "/";
	};

	const signInWithGoogle = async () => {
		resetFeedback();
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
			<div className="grid grid-cols-2 rounded-lg border bg-muted p-1">
				<button
					className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
						mode === "sign-in"
							? "bg-background text-foreground shadow-sm"
							: "text-muted-foreground"
					}`}
					onClick={() => {
						setMode("sign-in");
						resetFeedback();
					}}
					type="button"
				>
					Login
				</button>
				<button
					className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
						mode === "sign-up"
							? "bg-background text-foreground shadow-sm"
							: "text-muted-foreground"
					}`}
					onClick={() => {
						setMode("sign-up");
						resetFeedback();
					}}
					type="button"
				>
					Register
				</button>
			</div>

			<form className="space-y-3" onSubmit={submitEmailForm}>
				{mode === "sign-up" ? (
					<div className="space-y-2">
						<label className="text-sm font-medium" htmlFor="name">
							Name
						</label>
						<input
							autoComplete="name"
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
							id="name"
							onChange={(event) => setName(event.target.value)}
							placeholder="Your name"
							value={name}
						/>
					</div>
				) : null}

				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="email">
						Email
					</label>
					<input
						autoComplete="email"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						id="email"
						onChange={(event) => setEmail(event.target.value)}
						placeholder="m@example.com"
						required
						type="email"
						value={email}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="password">
						Password
					</label>
					<input
						autoComplete={
							mode === "sign-in" ? "current-password" : "new-password"
						}
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						id="password"
						minLength={8}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="At least 8 characters"
						required
						type="password"
						value={password}
					/>
				</div>

				<Button className="w-full" disabled={isPending} type="submit">
					{mode === "sign-in" ? (
						<Mail className="size-4" />
					) : (
						<UserPlus className="size-4" />
					)}
					{isPending
						? "Working..."
						: mode === "sign-in"
							? "Login with Email"
							: "Create Email Account"}
				</Button>
			</form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or
					</span>
				</div>
			</div>

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
