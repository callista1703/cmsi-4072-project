import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const Security: React.FC = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)

  const handleToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled)
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    )
    if (confirmed) {
      console.log("Account deleted.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-3xl p-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Security Settings</CardTitle>
          <CardDescription className="text-lg">
            Manage your authentication and account safety.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10 text-lg">
          {/* Two-Factor Authentication */}
          <div>
            <label className="block font-medium text-xl mb-2">
              Two-Factor Authentication
            </label>
            <Button
              onClick={handleToggle2FA}
              variant="default"
              className="px-6 py-3 text-lg"
            >
              {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>

          {/* Reset Password */}
          <div>
            <label className="block font-medium text-xl mb-2">
              Reset Password
            </label>
            <Button variant="default" className="px-6 py-3 text-lg">
              Reset Password
            </Button>
          </div>

          {/* Delete Account */}
          <div>
            <label className="block font-medium text-xl mb-2">
              Delete Account
            </label>
            <p className="text-red-600 text-sm mb-4">
              Permanently remove your account. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="px-6 py-3 text-lg"
            >
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Security
