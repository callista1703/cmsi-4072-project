import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginCard() {
	const { signOutUser } = useAuth();
	const handleSignOut = async () => {
		try {
			await signOutUser();
			console.log("signed out successfully");
		} catch (error) {
			console.error("an error occurred while signing out", error);
		}
	};
	return (
		<>
			<Card className="w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Log In</CardTitle>
					<CardDescription>Welcome back to Async!</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="flex flex-col gap-1">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className=" border rounded-sm border-stone-200 p-2"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className=" border rounded-sm border-stone-200 p-2"
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-6">
					<div className="w-full flex justify-between">
						<Button
							variant="ghost"
							className="-ml-2 px-2 cursor-pointer text-sm"
							asChild
						>
							<Link to="/register">Create Account</Link>
						</Button>

						<Button
							variant="default"
							className="cursor-pointer"
							onClick={handleSignOut}
						>
							Sign-Out
						</Button>
						<Button variant="default" className="cursor-pointer">
							Submit
						</Button>
					</div>
					<div className="flex items-center w-full">
						<hr className="flex-grow border-t border-gray-300" />
						<span className="mx-4 text-gray-500 text-xs">or</span>
						<hr className="flex-grow border-t border-gray-300" />
					</div>
					<div>
						<Button variant="outline" className="cursor-pointer">
							<Globe />
							Sign in with Google
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
