import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonDetail } from "@/components/lesson-detail";
import { RequireSetup } from "@/components/require-setup";
import { getModule, modules } from "@/lib/content";

type LearnRouteProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map((lesson) => ({ id: lesson.id }));
}

export async function generateMetadata({ params }: LearnRouteProps): Promise<Metadata> {
  const { id } = await params;
  const lesson = getModule(id);
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LearnDetailPage({ params }: LearnRouteProps) {
  const { id } = await params;
  const lesson = getModule(id);
  if (!lesson) notFound();

  return (
    <RequireSetup>
      <LessonDetail lesson={lesson} />
    </RequireSetup>
  );
}
