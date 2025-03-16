import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
			<div className="max-w-2xl text-center space-y-4">
				<h1 className="text-4xl font-bold">Welcome to Async</h1>
				<p className="text-lg text-gray-600">
					A better learning management system
				</p>
				<div className="flex gap-6">
					<Button variant="default" asChild className="flex flex-1">
						<Link to="/login">Sign in</Link>
					</Button>
					<Button variant="default" asChild className="flex flex-1">
						<Link to="/register">Create Account</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
