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
import { useNavigate } from "@tanstack/react-router";

export default function LoginCard() {
	const navigate = useNavigate();
	const handleNavigateRegister = () => navigate({ to: "/register" });

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
							onClick={handleNavigateRegister}
						>
							Create Account
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
