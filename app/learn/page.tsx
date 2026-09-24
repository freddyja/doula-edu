import type { Metadata } from "next";
import { LearnScreen } from "@/components/learn-screen";
import { RequireSetup } from "@/components/require-setup";

export const metadata: Metadata = {
  title: "Learn",
};

export default function LearnPage() {
  return (
    <RequireSetup>
      <LearnScreen />
    </RequireSetup>
  );
}
