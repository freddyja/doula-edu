"use client";

import { ButtonLink, Card, LoadingState, StorageError } from "@/components/ui";
import { useDoulaState } from "@/lib/store";

export function RequireSetup({ children }: { children: React.ReactNode }) {
  const { ready, profile, storageError } = useDoulaState();

  if (!ready) return <LoadingState />;
  if (storageError) return <StorageError message={storageError} />;
  if (!profile?.disclaimerAcknowledged || !profile.stage) {
    return (
      <Card>
        <h1 className="font-display text-3xl text-balance">Start on the welcome page</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Choose a stage and acknowledge the disclaimer. Then Today, Learn, Move, and Progress
          will open.
        </p>
        <div className="mt-5">
          <ButtonLink href="/">Go to welcome</ButtonLink>
        </div>
      </Card>
    );
  }

  return children;
}
