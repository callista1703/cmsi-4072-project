import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfileAppearance() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("Student");

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 text-base">
      <div className="flex flex-col items-center">
        <img
          src={avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <label
          htmlFor="avatarInput"
          className="cursor-pointer text-blue-600 hover:underline text-lg"
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

      <div className="space-y-2">
        <label className="block font-medium text-gray-700 text-lg">
          Username
        </label>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-gray-800 focus:outline-none text-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700 text-lg">
          Role
        </label>
        <div className="flex space-x-4">
          <Button
            onClick={() => setRole("Student")}
            variant="outline"
            className={`px-6 py-3 text-lg ${
              role === "Student" ? "bg-gray-700 text-white border-gray-700" : ""
            }`}
          >
            Student
          </Button>
          <Button
            onClick={() => setRole("Professor")}
            variant="outline"
            className={`px-6 py-3 text-lg ${
              role === "Professor" ? "bg-gray-700 text-white border-gray-700" : ""
            }`}
          >
            Professor
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700 text-lg">
          Theme
        </label>
        <div className="flex space-x-4">
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

      <div>
        <Button variant="default" className="px-6 py-3 text-lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
