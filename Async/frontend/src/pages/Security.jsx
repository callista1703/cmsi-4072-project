import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Security() {
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
    <div className="space-y-6 text-base">
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-lg">
          Two-Factor Authentication
        </label>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleToggle2FA}
            variant="default"
            className="px-4 py-2"
          >
            {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
          </Button>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2 text-lg">
          Reset Password
        </label>
        <Button variant="default" className="px-4 py-2">
          Reset Password
        </Button>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2 text-lg">
          Delete Account
        </label>
        <p className="text-red-600 text-sm mb-2">
          Permanently remove your account. This action cannot be undone.
        </p>
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete My Account
        </Button>
      </div>
    </div>
  );
}
