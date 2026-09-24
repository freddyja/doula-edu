import type { Metadata } from "next";
import { MoveScreen } from "@/components/move-screen";
import { RequireSetup } from "@/components/require-setup";

export const metadata: Metadata = {
  title: "Move",
};

export default function MovePage() {
  return (
    <RequireSetup>
      <MoveScreen />
    </RequireSetup>
  );
}
