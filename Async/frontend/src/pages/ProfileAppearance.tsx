import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { SettingsLayout } from "@/layouts/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { Database } from "@/types/database.types";

type UserRow = Database["public"]["Tables"]["Users"]["Row"] & {
  avatar_url: string | null;
};

type UserUpdate = Database["public"]["Tables"]["Users"]["Update"] & {
  avatar_url?: string | null;
};

const ProfileAppearance: React.FC = () => {
  const { session, loading } = useAuth();
  const userId = session?.user.id;

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("Users")
      .select("first_name, last_name, avatar_url")
      .eq("id", userId)
      .single<UserRow>()
      .then(({ data, error }) => {
        if (error) console.error("❌ load profile error:", error.message);
        else if (data) {
          setFirstName(data.first_name ?? "");
          setLastName(data.last_name ?? "");
          setAvatarUrl(data.avatar_url);
        }
      });
  }, [userId]);

  const handleSaveInfo = async () => {
    if (!userId) return;

    const { error: authError } = await supabase.auth.updateUser({
      data: { firstName, lastName },
    });
    if (authError) {
      alert("Error updating auth profile: " + authError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("Users")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", userId);
    if (dbError) {
      alert("Error updating Users row: " + dbError.message);
      return;
    }

    setIsEditing(false);
  };

  const handleAvatarChangeClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !userId) return;
    const file = e.target.files[0];
    const ext = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${ext}`;

    if (avatarUrl) {
      const oldPath = avatarUrl.split("/avatars/")[1].split("?")[0];
      await supabase.storage.from("avatars").remove([oldPath]);
    }

    // 1) Upload (upsert overwrites automatically)
    const { error: uploadErr } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    if (uploadErr) {
      alert("Upload error: " + uploadErr.message);
      return;
    }

    // 2) Get public URL
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    // 3) Update Users table with the new URL
    const { error: dbErr } = await supabase
      .from("Users")
      .update<UserUpdate>({ avatar_url: publicUrl })
      .eq("id", userId);
    if (dbErr) {
      alert("Error saving avatar_url: " + dbErr.message);
      return;
    }

    // 4) Also write it into Auth metadata so session.user.user_metadata.avatar_url updates
    await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });

    setAvatarUrl(publicUrl);
  };

  if (loading) {
    return (
      <SettingsLayout submessage="Make changes to your avatar and theme.">
        <p className="p-6">Loading…</p>
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout submessage="Make changes to your avatar and theme.">
      {/* Hidden file input for avatar uploads */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleAvatarChange}
      />

      <div className="w-full flex flex-col gap-8">
        {/* Avatar Section */}
        <div className="flex items-center justify-between border-b pb-8">
          <div>
            <h1 className="font-medium text-sm">Avatar Image</h1>
            <p className="text-xs opacity-50">Update your profile picture.</p>
          </div>
          <div className="flex items-center gap-8">
            <Avatar>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="Your avatar" />
              ) : (
                <AvatarFallback>
                  {((firstName[0] ?? "") + (lastName[0] ?? "")).toUpperCase() ||
                    "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="outline"
              className="px-6 py-3 text-xs"
              onClick={handleAvatarChangeClick}
            >
              Edit Avatar
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b pb-8">
          <div>
            <h1 className="font-medium text-sm">Profile Information</h1>
            <p className="text-xs opacity-50">
              Update your first and last name.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {!isEditing ? (
              <>
                <div className="text-sm font-semibold">
                  {firstName} {lastName}
                </div>
                <Button
                  variant="outline"
                  className="px-6 py-3 text-xs"
                  onClick={() => setIsEditing(true)}
                >
                  Update Info
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="px-6 py-3 text-xs"
                    onClick={handleSaveInfo}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-6 py-3 text-xs"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default ProfileAppearance;
