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
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterCard() {
	const { session, signUpNewUser } = useAuth();
	const navigate = useNavigate({ from: "/register" });
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await signUpNewUser(email, password);
			if (result.success) {
				navigate({ to: "/calendar" });
			}
		} catch (error) {
			setError("an error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Card className="w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Create Account</CardTitle>
					<CardDescription>Start learning with Async today!</CardDescription>
				</CardHeader>
				<form className="space-y-4" onSubmit={handleSignUp}>
					<CardContent>
						{/* <div className="flex flex-col gap-1">
							<label htmlFor="firstName">First Name</label>
							<input
								type="firstName"
								className=" border rounded-sm border-stone-200 p-2"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="lastName"
								className=" border rounded-sm border-stone-200 p-2"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div> */}
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
						<Button
							variant="default"
							type="submit"
							className="cursor-pointer w-full"
						>
							Submit
						</Button>
						<div className="flex items-center w-full">
							<hr className="flex-grow border-t border-gray-300" />
							<span className="mx-4 text-gray-500 text-xs">or</span>
							<hr className="flex-grow border-t border-gray-300" />
						</div>
						<div>
							<Button variant="outline" className="cursor-pointer">
								<Globe />
								Register with Google
							</Button>
						</div>
						{error && <p className="text-red-500 pt-4 text-center">{error}</p>}
					</CardFooter>
				</form>
			</Card>
		</>
	);
}
