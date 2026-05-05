import html2canvas from "html2canvas";
import { TweetTheme } from "./tweet-types";

export async function downloadTweet(element: HTMLElement, theme: TweetTheme): Promise<void> {
  const bgColor =
    theme === "dark" ? "#000000" : theme === "dim" ? "#15202b" : "#f7f9f9";

  const canvas = await html2canvas(element, {
    backgroundColor: bgColor,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = `tweet-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function downloadElement(element: HTMLElement, bg: string, filename = "screenshot"): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: bg,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = `${filename}-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
