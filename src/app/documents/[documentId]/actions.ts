"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type ClerkUser = {
  id: string;
  fullName: string | null;
  primaryEmailAddress: { emailAddress: string } | null;
  imageUrl: string;
};

type FormattedUser = {
  id: string;
  name: string;
  avatar: string;
};

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
}

function formatUser(user: ClerkUser): FormattedUser {
  return {
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  };
}

export async function getUsers(userIds?: string[]): Promise<FormattedUser[]> {
  const clerk = await clerkClient();

  try {
    // Handle specific user IDs request
    if (userIds && userIds.length > 0) {
      const users: FormattedUser[] = [];
      for (const userId of userIds) {
        try {
          const user = await clerk.users.getUser(userId);
          users.push(formatUser(user));
        } catch {
          users.push({
            id: userId,
            name: "Unknown User",
            avatar: "",
          });
        }
      }
      return users;
    }

    // Handle organization members fetch
    const { sessionClaims } = await auth();
    const orgId =
      sessionClaims?.org_id ??
      (sessionClaims?.o as { id: string } | undefined)?.id;

    if (orgId) {
      const orgUsers = await clerk.users.getUserList({
        organizationId: [orgId],
        limit: 100,
      });
      return orgUsers.data.map(formatUser);
    }

    // Fallback to current user if no organization
    const currentUserId = sessionClaims?.sub;
    if (currentUserId) {
      try {
        const currentUser = await clerk.users.getUser(currentUserId);
        return [formatUser(currentUser)];
      } catch {
        return [];
      }
    }

    return [];
  } catch (error) {
    console.error("Error in getUsers:", error);
    return [];
  }
}
