import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageContent from "@/components/HomepageContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Best Comment Generator Tools Online | Comment Tools",
  description:
    "Generate high-quality comments for TikTok, Instagram, YouTube & X in seconds. Save time, boost engagement, and scale your content effortlessly.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HomepageContent />
      <Footer />
    </div>
  );
}
