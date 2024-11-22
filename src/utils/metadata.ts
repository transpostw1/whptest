import type { Metadata, ResolvingMetadata } from 'next';

export async function generateProductMetadata(
  product: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch metadata parent details
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}
