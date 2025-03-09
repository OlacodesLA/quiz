import { db } from "@/config/firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface ExamSettings {
  isEnabled: boolean;
  startDate?: Date;
  endDate?: Date;
  allowedGroups?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface UserExamPermission {
  hasAccess: boolean;
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}

// Create or update exam settings
export const setExamSettings = async (
  examCode: string,
  settings: Omit<ExamSettings, "createdAt" | "updatedAt" | "createdBy">,
  adminEmail: string
) => {
  try {
    const examSettingsRef = doc(db, "examSettings", examCode);

    const examData: ExamSettings = {
      ...settings,
      updatedAt: new Date(),
      createdAt: new Date(), // This will be overwritten if document exists
      createdBy: adminEmail,
    };

    await setDoc(examSettingsRef, examData, { merge: true });

    return {
      success: true,
      message: "Exam settings updated successfully",
    };
  } catch (error) {
    console.error("Error setting exam settings:", error);
    throw new Error("Failed to update exam settings");
  }
};

// Grant access to a specific user
export const grantUserExamAccess = async (
  userId: string,
  examCode: string,
  permission: Omit<UserExamPermission, "grantedAt">
) => {
  try {
    const userExamPermissionRef = doc(
      db,
      "users",
      userId,
      "examPermissions",
      examCode
    );

    const permissionData: UserExamPermission = {
      ...permission,
      grantedAt: new Date(),
    };

    await setDoc(userExamPermissionRef, permissionData);

    return {
      success: true,
      message: "User exam access granted successfully",
    };
  } catch (error) {
    console.error("Error granting user exam access:", error);
    throw new Error("Failed to grant user exam access");
  }
};

// Grant access to multiple users
export const grantBulkUserExamAccess = async (
  userIds: string[],
  examCode: string,
  permission: Omit<UserExamPermission, "grantedAt">
) => {
  try {
    const promises = userIds.map((userId) =>
      grantUserExamAccess(userId, examCode, permission)
    );

    await Promise.all(promises);

    return {
      success: true,
      message: `Exam access granted to ${userIds.length} users`,
    };
  } catch (error) {
    console.error("Error in bulk grant access:", error);
    throw new Error("Failed to grant bulk access");
  }
};

// Example usage:
/*
// Enable an exam globally
await setExamSettings("EXAM001", {
  isEnabled: true,
  startDate: new Date("2024-03-20"),
  endDate: new Date("2024-03-21"),
  allowedGroups: ["group1", "group2"],
}, "admin@example.com");

// Grant access to a specific user
await grantUserExamAccess("user123", "EXAM001", {
  hasAccess: true,
  grantedBy: "admin@example.com",
  expiresAt: new Date("2024-03-21"),
});

// Grant access to multiple users
await grantBulkUserExamAccess(
  ["user1", "user2", "user3"],
  "EXAM001",
  {
    hasAccess: true,
    grantedBy: "admin@example.com",
    expiresAt: new Date("2024-03-21"),
  }
);
*/

// Utility function to check if a user has exam access
export const checkUserExamAccess = async (userId: string, examCode: string) => {
  try {
    // Check global exam settings
    const examSettingsRef = doc(db, "examSettings", examCode);
    const examSettingsDoc = await getDocs(
      query(collection(db, "examSettings"), where("isEnabled", "==", true))
    );
    const examSettings = examSettingsDoc.docs[0]?.data() as ExamSettings;

    // Check user-specific permissions
    const userPermissionRef = doc(
      db,
      "users",
      userId,
      "examPermissions",
      examCode
    );
    const userPermissionDoc = await getDocs(
      query(
        collection(db, "users", userId, "examPermissions"),
        where("hasAccess", "==", true)
      )
    );
    const userPermission =
      userPermissionDoc.docs[0]?.data() as UserExamPermission;

    // Check if exam is globally enabled or user has specific permission
    const hasAccess =
      examSettings?.isEnabled ||
      (userPermission?.hasAccess &&
        new Date() < (userPermission?.expiresAt?.toDate() || new Date()));

    return {
      hasAccess,
      examSettings,
      userPermission,
    };
  } catch (error) {
    console.error("Error checking user exam access:", error);
    throw new Error("Failed to check user exam access");
  }
};
