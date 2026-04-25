import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentTool from "@/components/CommentTool";
import HomepageContent from "@/components/HomepageContent";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HomepageContent />
      <Footer />
    </div>
  );
}
