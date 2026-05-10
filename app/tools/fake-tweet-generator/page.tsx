import Navbar from "@/components/Navbar";
import TweetGenerator from "./TweetGenerator";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Best Fake Tweet Generator Tool Online | Comment Tools",
  description:
    "Create realistic fake tweets instantly with the Best Fake Tweet Generator Tool Online. Customize usernames, likes, replies, themes, and export high-quality tweet screenshots easily.",
  path: "/tools/fake-tweet-generator",
});

const TweetGeneratorPage = () => {
  return (
    <>
      <Navbar />
      <TweetGenerator />
      <Footer />
    </>
  );
};

export default TweetGeneratorPage;
