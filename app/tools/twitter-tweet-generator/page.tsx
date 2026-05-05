import Navbar from "@/components/Navbar";
import TweetGenerator from "./TweetGenerator";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Best Twitter Tweet Generator Tool Online | Tweet Chain Tools",
  description:
    "Generate realistic Twitter tweets instantly. Save time, and create convincing tweets for your needs.",
  path: "/tools/twitter-tweet-generator",
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
