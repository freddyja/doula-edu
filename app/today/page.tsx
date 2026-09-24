import type { Metadata } from "next";
import { RequireSetup } from "@/components/require-setup";
import { TodayScreen } from "@/components/today-screen";

export const metadata: Metadata = {
  title: "Today",
};

export default function TodayPage() {
  return (
    <RequireSetup>
      <TodayScreen />
    </RequireSetup>
  );
}
