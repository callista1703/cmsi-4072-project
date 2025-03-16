import { Outlet } from "@tanstack/react-router";

export function PublicLayout() {
	return (
		<div className="w-screen h-screen flex bg-white overflow-y-auto">
			<Outlet />
		</div>
	);
}
