import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function AuthenticatedLayout() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Ensure the component is mounted before rendering sidebar
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="w-screen h-screen flex bg-white overflow-y-auto">
			<SidebarProvider>
				<Sidebar />
				<Outlet />
			</SidebarProvider>
		</div>
	);
}
