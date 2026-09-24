import type { Metadata } from "next";
import { ProgressScreen } from "@/components/progress-screen";
import { RequireSetup } from "@/components/require-setup";

export const metadata: Metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  return (
    <RequireSetup>
      <ProgressScreen />
    </RequireSetup>
  );
}
