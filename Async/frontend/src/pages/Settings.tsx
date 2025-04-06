import { useState } from "react";
import ProfileAppearance from "./ProfileAppearance";
import Security from "./Security";

type Bucket = "profile" | "security";

export function Settings() {
  const [selectedBucket, setSelectedBucket] = useState<Bucket>("profile");

  const renderPanelContent = () => {
    if (selectedBucket === "profile") return <ProfileAppearance />;
    if (selectedBucket === "security") return <Security />;
    return null;
  };

  const getPanelTitle = () => {
    if (selectedBucket === "profile") return "Profile & Appearance";
    if (selectedBucket === "security") return "Security";
    return "Settings";
  };

  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white border-r p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="space-y-3">
          <button
            onClick={() => setSelectedBucket("profile")}
            className="w-full text-left py-3 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition text-base"
          >
            Profile &amp; Appearance
          </button>
          <button
            onClick={() => setSelectedBucket("security")}
            className="w-full text-left py-3 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition text-base"
          >
            Security
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{getPanelTitle()}</h2>
        </div>
        {renderPanelContent()}
      </div>
    </div>
  );
}

export default Settings;
