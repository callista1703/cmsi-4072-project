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
import {
	getRouteApi,
	Link,
	useNavigate,
	useRouter,
	useSearch,
} from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const route = getRouteApi("/login");

type SearchParams = {
	redirect: string;
};

export default function LoginCard() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { signInUser } = useAuth();
	const navigate = useNavigate();
	const router = useRouter();
	const search: SearchParams = route.useSearch();
	console.log("search", search);

	// const redirectPath = search.redirect || "/dashboard";
	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		console.log("hello");

		try {
			const result = await signInUser(email, password);
			if (result.success) {
				// console.log("redirect to", redirectPath);
				const redirectTo = search.redirect || "/dashboard";
				router.history.push(redirectTo);
			}
		} catch (error) {
			console.error("an error occurred while signing in", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Card className="w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Log In</CardTitle>
					<CardDescription>Welcome back to Async!</CardDescription>
				</CardHeader>
				<form className="space-y-4" onSubmit={handleSignIn}>
					<CardContent>
						<div className="flex flex-col gap-1">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className=" border rounded-sm border-stone-200 p-2"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className=" border rounded-sm border-stone-200 p-2"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
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
								type="submit"
								className="cursor-pointer"
							>
								Log in
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
				</form>
			</Card>
		</>
	);
}
