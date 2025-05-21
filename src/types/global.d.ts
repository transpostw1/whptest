interface Window {
  getSkusListWithTryOn: (options: { companyName: string }) => Promise<string[]>;
}

interface Breadcrumb {
  id: string;
  title: string;
  category_url: string;
}

interface ProductType {
  productId: string;
  SKU: string;
  variantId: string;
  title: string;
  displayTitle: string;
  url: string;
  addDate: number;
  isActive: boolean;
  discountCategory: string;
  discountActive: boolean;
  typeOfDiscount: string;
  discountValue: number;
  discountAmount: number;
  discountPrice: number;
  productPrice: number;
  imageDetails: {
    image_path: string;
    order: number;
    alt_text: string;
  }[];
  videoDetails: {
    video_path: string;
    order: number;
    alt_text: string;
  }[];
  review: any;
  variants: any;
  similarProductIds: string[];
  productCategories: string[];
  breadcrumbs: Breadcrumb[];
} 