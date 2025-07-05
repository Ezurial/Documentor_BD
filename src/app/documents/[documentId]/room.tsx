"use client";
import { toast } from "sonner";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

import { getUsers, getDocuments } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [mentionUsers, setMentionUsers] = useState<User[]>([]);

  // Load mention users on mount
  useEffect(() => {
    const loadMentionUsers = async () => {
      try {
        const users = await getUsers();
        console.log("Loaded mention users:", users);
        setMentionUsers(users);
      } catch (error) {
        console.error("Failed to load mention users:", error);
        toast.error("Failed to load user list");
      }
    };
    loadMentionUsers();
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      resolveUsers={async ({ userIds }) => {
        console.log("Resolving users for IDs:", userIds);
        const users = await getUsers(userIds);
        return userIds.map(
          (userId) =>
            users.find((user) => user.id === userId) ?? {
              id: userId,
              name: "Unknown User",
              avatar: "",
            }
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        const filteredUsers = text
          ? mentionUsers.filter((user) =>
              user.name.toLowerCase().includes(text.toLowerCase())
            )
          : mentionUsers;
        console.log("Suggesting users for mention:", filteredUsers);
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Loading document..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
