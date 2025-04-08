import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SettingsLayout } from "@/layouts/settings";

const Security: React.FC = () => {
	const [twoFAEnabled, setTwoFAEnabled] = useState(false);

	const handleToggle2FA = () => {
		setTwoFAEnabled(!twoFAEnabled);
	};

	const handleDeleteAccount = () => {
		const confirmed = window.confirm(
			"Are you sure you want to permanently delete your account? This action cannot be undone."
		);
		if (confirmed) {
			console.log("Account deleted.");
		}
	};

	return (
		<SettingsLayout submessage="Manage your authentication and account safety.">
			<div className="w-full flex flex-col gap-8">
				<div className="flex items-center justify-between border-b border-b-stone-200 pb-8">
					<div>
						<h1 className="font-medium text-sm">
							Two Factor Authorization (2FA)
						</h1>
						<p className="text-xs opacity-50">
							Set up 2FA for a more secure experience.
						</p>
					</div>
					<Button
						onClick={handleToggle2FA}
						variant="outline"
						className="px-6 py-3 text-xs"
					>
						{twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
					</Button>
				</div>
				<div className="flex items-center justify-between border-b border-b-stone-200 pb-8">
					<div>
						<h1 className="font-medium text-sm">Update/Reset Password</h1>
						<p className="text-xs opacity-50">Change your password here.</p>
					</div>
					<Button
						onClick={handleToggle2FA}
						variant="outline"
						className="px-6 py-3 text-xs"
					>
						Edit Password
					</Button>
				</div>

				<div className="flex items-center justify-between border-b border-b-stone-200 pb-8">
					<div>
						<h1 className="font-medium text-sm">Delete Account</h1>
						<p className="text-xs opacity-50">
							Warning: This action is permanent and irreversible.
						</p>
					</div>
					<Button
						onClick={handleToggle2FA}
						variant="destructive"
						className="px-6 py-3 text-xs"
					>
						Delete Account
					</Button>
				</div>
			</div>
		</SettingsLayout>
	);
};

export default Security;
