import { createMetadata } from "@/lib/seo";
import SuspensionScreen from "./TwitterSuspensionGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title: "Best Twitter Suspension Generator Tool Online | Suspension Tools",
  description:
    "Generate realistic Twitter suspension messages instantly. Save time, and create convincing suspensions for your needs.",
  path: "/tools/twitter-suspension-generator",
});

const TwitterSuspensionGeneratorPage = () => {
  return (
    <>
      <Navbar />
      <SuspensionScreen />
      <Footer />
    </>
  );
};

export default TwitterSuspensionGeneratorPage;
