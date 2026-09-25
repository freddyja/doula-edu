import type { Metadata } from "next";
import { PrepScreen } from "@/components/prep-screen";
import { RequireSetup } from "@/components/require-setup";

export const metadata: Metadata = {
  title: "Prep",
};

export default function PrepPage() {
  return (
    <RequireSetup>
      <PrepScreen />
    </RequireSetup>
  );
}
