"use client";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase"; // Your Firebase configuration

type Props = {
  firstName: string | undefined;
  lastName: string | undefined;
  picture: string | undefined;
  level: string | undefined;
  userId: string | undefined;
};

const ImageInfo = ({ firstName, lastName, picture, level, userId }: Props) => {
  const [profilePicture, setProfilePicture] = useState(picture);
  const [uploading, setUploading] = useState(false);
  console.log("User is from profile", userId);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures}`);
      await uploadBytes(storageRef, file);

      // Get the download URL
      const uploadedUrl = await getDownloadURL(storageRef);
      console.log("Uploaded Url", uploadedUrl);
      console.log("userId", userId);
      // Update Firestore with the new profile picture URL
      //@ts-ignore
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { picture: uploadedUrl });

      // Update the local state with the new picture URL
      setProfilePicture(uploadedUrl);
    } catch (error: any) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white h-40 rounded-xl">
      <div className="bg-gradient-to-r from-gray-950 to-black h-24 w-full rounded-t-xl" />
      <div className="flex gap-4 items-start md:px-10">
        <div className="relative w-28 h-28 border-4 border-white rounded-full flex -translate-y-14">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-full">
            <Image
              src={profilePicture || "/avatar.png"}
              alt={`${firstName} ${lastName}'s profile picture`}
              fill
              className="rounded-full object-cover"
            />
          </AspectRatio>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploading}
          />
        </div>
        <div>
          <p className="text-gray-900 text-lg font-bold">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-gray-700">{level}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
