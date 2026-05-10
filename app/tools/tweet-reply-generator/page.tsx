import { createMetadata } from "@/lib/seo";
import ReplyChain from "./ReplyChainGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title: "Best Tweet Reply Generator Tool Online | Comment Tools",
  description:
    "Generate realistic tweet replies and conversation threads with the Best Tweet Reply Generator Tool Online. Perfect for creators, marketers, and social media mockups.",
  path: "/tools/tweet-reply-generator",
});

const ReplyChainPage = () => {
  return (
    <>
      <Navbar />
      <ReplyChain />
      <Footer />
    </>
  );
};

export default ReplyChainPage;
