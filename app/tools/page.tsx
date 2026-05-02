import ToolContent from "./ToolContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "All Tools | Comment Tools",
  description:
    "Explore all Comment Tools in one place. Generate realistic TikTok, Instagram, YouTube, and X (Twitter) comments instantly with powerful customization and high-quality export.",
  path: "/tools",
});

const ToolsPage = () => {
  return <ToolContent />;
};

export default ToolsPage;
