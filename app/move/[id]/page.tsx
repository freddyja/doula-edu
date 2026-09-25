import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequireSetup } from "@/components/require-setup";
import { SessionDetail } from "@/components/session-detail";
import { getSession, sessions } from "@/lib/content";

type MoveRouteProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sessions.map((session) => ({ id: session.id }));
}

export async function generateMetadata({ params }: MoveRouteProps): Promise<Metadata> {
  const { id } = await params;
  const session = getSession(id);
  return { title: session?.title ?? "Movement" };
}

export default async function MoveDetailPage({ params }: MoveRouteProps) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();

  return (
    <RequireSetup>
      <SessionDetail session={session} />
    </RequireSetup>
  );
}
