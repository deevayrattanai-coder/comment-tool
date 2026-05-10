import { createMetadata } from "@/lib/seo";
import SuspensionScreen from "./TwitterSuspensionGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title: "Best Twitter (X) Suspension Generator Tool Online | Comment Tools",
  description:
    "Create realistic Twitter (X) suspension screenshots in seconds with full customization options. Generate professional-looking suspension mockups easily with Comment Tools",
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
