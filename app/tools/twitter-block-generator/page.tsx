import { createMetadata } from "@/lib/seo";
import BlockScreen from "./TwitterBlockGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title:"Best Twitter (X) Block Generator Tool Online | Comment Tools",
  description:
    "Generate realistic Twitter (X) block you screenshots instantly using the Best Twitter Block Generator Tool Online. Customize profiles, messages, and export HD visuals effortlessly.",
  path: "/tools/twitter-block-generator",
});

const TwitterBlockGeneratorPage = () => {
  return (
    <>
      <Navbar />
      <BlockScreen />
      <Footer />{" "}
    </>
  );
};
export default TwitterBlockGeneratorPage;
