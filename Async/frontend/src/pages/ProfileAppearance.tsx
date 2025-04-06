import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import defaultAvatar from "@/assets/default.png"

const ProfileAppearance: React.FC = () => {
  const [username, setUsername] = useState("")
  const [theme, setTheme] = useState("light")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [role, setRole] = useState("Student")

  // ⚠ Replace this with actual user email from context/auth
  const userEmail = "youremail@example.com"

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-4xl p-10">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-3xl">Profile Appearance</CardTitle>
          <CardDescription className="text-lg">
            Customize your avatar, email, role, and theme.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 text-lg">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={avatar || defaultAvatar}
              alt="Avatar"
              className="w-72 h-72 rounded-full object-cover mb-6"
            />
            <label
              htmlFor="avatarInput"
              className="cursor-pointer text-blue-600 hover:underline text-xl"
            >
              Change Photo
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-1 text-center">
            <p className="text-muted-foreground">{userEmail}</p>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="block font-medium text-xl">Username</label>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-gray-800 focus:outline-none text-lg"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="block font-medium text-xl">Role</label>
            <div className="flex flex-wrap gap-4">
              {["Student", "Professor"].map((r) => (
                <Button
                  key={r}
                  onClick={() => setRole(r)}
                  variant="outline"
                  className={`px-6 py-3 text-lg ${
                    role === r ? "bg-gray-700 text-white border-gray-700" : ""
                  }`}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label className="block font-medium text-xl">Theme</label>
            <div className="flex flex-wrap gap-4">
              {["light", "dark", "system"].map((option) => (
                <Button
                  key={option}
                  onClick={() => setTheme(option)}
                  variant="outline"
                  className={`px-6 py-3 text-lg ${
                    theme === option ? "bg-gray-700 text-white border-gray-700" : ""
                  }`}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="default" className="w-full py-4 text-lg">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileAppearance
