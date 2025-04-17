import { useState, ChangeEvent } from "react";
import { SettingsLayout } from "@/layouts/settings";
import { Button } from "@/components/ui/button";

import defaultAvatar from "@/assets/default.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileAppearance = () => {
	const [username, setUsername] = useState("");
	const [theme, setTheme] = useState("light");
	const [avatar, setAvatar] = useState<string | null>(null);
	const [role, setRole] = useState("Student");

	// ⚠ Replace this with actual user email from context/auth
	const userEmail = "youremail@example.com";

	const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = () => setAvatar(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	return (
		<SettingsLayout submessage="Make changes to your avatar and theme.">
			<div className="w-full flex flex-col gap-8">
				<div className="flex items-center justify-between border-b border-b-stone-200 pb-8">
					<div>
						<h1 className="font-medium text-sm">Avatar Image</h1>
						<p className="text-xs opacity-50">Update your profile picture.</p>
					</div>
					<div className="flex gap-8">
						<Avatar>
							<AvatarImage />
							<AvatarFallback>JD</AvatarFallback>{" "}
							{/* Placeholder for user initials */}
						</Avatar>
						<Button variant="outline" className="px-6 py-3 text-xs">
							Edit Avatar
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between border-b border-b-stone-200 pb-8">
					<div>
						<h1 className="font-medium text-sm">Profile Information</h1>
						<p className="text-xs opacity-50">
							Update your email and username.
						</p>
					</div>
					<Button variant="outline" className="px-6 py-3 text-xs">
						Update Info
					</Button>
				</div>
			</div>
		</SettingsLayout>
	);
};

export default ProfileAppearance;
