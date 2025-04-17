import { Link, useMatches } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SettingsLayoutProps {
	children: React.ReactNode;
	submessage: string;
}

export const SettingsLayout = ({
	children,
	submessage,
}: SettingsLayoutProps) => {
	const matches = useMatches();
	const currentPath = matches[matches.length - 1]?.pathname || "";

	return (
		<div className="p-6 flex flex-col gap-8 w-full">
			<div className="flex flex-col gap-4">
				<div>
					<div className="flex">
						<SidebarTrigger />
						<h1 className="text-xl font-bold">Settings</h1>
					</div>
					<p className="text-sm opacity-40">{submessage}</p>
				</div>
				<NavigationMenu>
					<NavigationMenuList className="w-full flex gap-3">
						<NavigationMenuItem>
							<Link to="/profile">
								<NavigationMenuLink
									className={`rounded-md p-1 px-2 text-sm ${
										currentPath === "/profile" ? "bg-gray-200" : ""
									}`}
									active={currentPath === "/profile"}
								>
									Profile
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/security">
								<NavigationMenuLink
									className={`rounded-md p-1 px-2 text-sm ${
										currentPath === "/security" ? "bg-gray-200 " : ""
									}`}
									active={currentPath === "/security"}
								>
									Security
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			{children}
		</div>
	);
};
