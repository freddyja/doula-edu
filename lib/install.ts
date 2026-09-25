export type InstallPlatform = "ios" | "android" | "other";

export function detectInstallPlatform(input: {
  ua: string;
  platform?: string;
  maxTouchPoints?: number;
}): InstallPlatform {
  const ua = input.ua;
  const platform = input.platform ?? "";
  const maxTouchPoints = input.maxTouchPoints ?? 0;
  const iPadOs = platform === "MacIntel" && maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || iPadOs) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export function installInstructions(platform: InstallPlatform): { title: string; body: string } {
  if (platform === "ios") {
    return {
      title: "Add Doula to your Home Screen",
      body: "In Safari, tap Share, then Add to Home Screen. Doula opens full screen, and your notes stay on this device.",
    };
  }
  if (platform === "android") {
    return {
      title: "Add Doula to your Home Screen",
      body: "Open the browser menu, then tap Install app or Add to Home screen. Doula opens full screen, and your notes stay on this device.",
    };
  }
  return {
    title: "Install Doula",
    body: "From the browser’s install icon or menu, install Doula. It opens in its own window, and your notes stay on this device.",
  };
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  const media = window.matchMedia?.("(display-mode: standalone)")?.matches ?? false;
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return media || iosStandalone;
}
