export const Settings = () => {
	return (
		<>
			<div className="pt-6 flex flex-col gap-8 w-full">
				<div>
					<h1 className="text-3xl font-bold">Settings</h1>
					<p className="text-sm opacity-40">
						Manage your account settings here.
					</p>
				</div>
				<nav className="w-full">
					<ul className="flex gap-6 text-sm font-semibold">
						<li className="pb-2">
							<a
								href="/settings/profile"
								className="text-blue-500 hover:border-b-3 hover:border-blue-500 pb-[6px]"
							>
								Profile
							</a>
						</li>
						<li>
							<a
								href="/settings/security"
								className="text-blue-500 hover:border-b-3 hover:border-blue-500 pb-[6px]"
							>
								Security
							</a>
						</li>
						<li>
							<a
								href="/settings/notifications"
								className="text-blue-500 hover:border-b-3 hover:border-blue-500 pb-[6px]"
							>
								Appearance
							</a>
						</li>
					</ul>
					<hr className="w-full " />
				</nav>
			</div>
		</>
	);
};
