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

const registerFormSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	email: z.string().email("invalid email format."),
	password: z.string().min(8, "password must be at least 8 characters."),
});

export default function RegisterCard() {
	return (
		<>
			<Card className="w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Create Account</CardTitle>
					<CardDescription>Start learning with Async today!</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="flex flex-col gap-1">
							<label htmlFor="firstName">First Name</label>
							<input
								type="firstName"
								className=" border rounded-sm border-stone-200 p-2"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="lastName"
								className=" border rounded-sm border-stone-200 p-2"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className=" border rounded-sm border-stone-200 p-2"
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-6">
					<div className="w-full flex justify-center">
						<Button variant="default" className="cursor-pointer">
							Next
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
							Register with Google
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
