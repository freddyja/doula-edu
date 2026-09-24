import type { StageId } from "./types";

type Tagged = {
  id: string;
  stages: StageId[];
  priority: number;
  title: string;
};

export function forStage<T extends { stages: StageId[] }>(
  items: readonly T[],
  stage: StageId,
): T[] {
  return items.filter((item) => item.stages.includes(stage));
}

export function nextIncomplete<T extends Tagged>(
  items: readonly T[],
  stage: StageId,
  completedIds: ReadonlySet<string>,
): T | null {
  const ordered = forStage(items, stage).toSorted(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title),
  );
  return ordered.find((item) => !completedIds.has(item.id)) ?? null;
}

export function browseOrder<T extends Tagged>(
  items: readonly T[],
  stage: StageId,
): T[] {
  return items.toSorted((a, b) => {
    const aMatch = a.stages.includes(stage) ? 0 : 1;
    const bMatch = b.stages.includes(stage) ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return a.priority - b.priority || a.title.localeCompare(b.title);
  });
}
