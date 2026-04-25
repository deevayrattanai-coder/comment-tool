export const createMetadata = ({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) => {
  const baseUrl = "http://localhost:5000";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Comment Tools",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`, // create this image
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },

    alternates: {
      canonical: url,
    },
  };
};