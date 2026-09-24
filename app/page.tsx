import type { Metadata } from "next";
import { WelcomeScreen } from "@/components/welcome-screen";

export const metadata: Metadata = {
  title: "Welcome",
};

export default function HomePage() {
  return <WelcomeScreen />;
}
