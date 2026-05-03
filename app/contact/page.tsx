import Contact from "./Contact";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us | Comment Tools",
  description:
    "Have questions or need support? Contact the Comment Tools team and get quick help with your comment generation and account queries.",
  path: "/contact",
});

function ContactPage() {
  return <Contact />;
}

export default ContactPage;
