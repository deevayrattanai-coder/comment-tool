import { createMetadata } from "@/lib/seo";
import ReplyChain from "./ReplyChainGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title: "Best Twitter Reply Chain Generator Tool Online | Reply Chain Tools",
  description:
    "Generate realistic Twitter reply chains instantly. Save time, and create convincing reply chains for your needs.",
  path: "/tools/twitter-reply-chain-generator",
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
