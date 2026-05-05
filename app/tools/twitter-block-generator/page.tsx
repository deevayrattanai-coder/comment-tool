import { createMetadata } from "@/lib/seo";
import BlockScreen from "./TwitterBlockGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = createMetadata({
  title: "Best Twitter Block Generator Tool Online | Block Chain Tools",
  description:
    "Generate realistic Twitter block lists instantly. Save time, and create convincing block lists for your needs.",
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
