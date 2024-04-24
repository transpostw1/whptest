interface Variation {
  color: string;
  colorCode: string;
  colorImage: string;
  image: string;
}
export interface GoldDetails {
  goldCertifiedBy: string;
  goldSetting: any; // You might want to specify the type if you have more details
}

export interface SilverDetails {
  poojaArticle: any; // Specify type if available
  utensils: any; // Specify type if available
  silverWeight: any; // Specify type if available
}

export interface ProductAttributes {
  goldDetails: GoldDetails[] | null;
  gemstoneDetails: any; // Specify type if available
  diamondDetails: any; // Specify type if available
  silverDetails: SilverDetails[] | null;
}

export interface ImageDetails {
  image_path: string|null;
  order: string;
  alt_text?: string | null|undefined;
}

export interface ProductType {
  productId: number | string;
  product_id: number | string;
  SKU: string;
  variantId: any; // Specify type if available
  title: string;
  displayTitle: string;
  shortDesc: string;
  longDesc: string | null;
  url: string;
  tags: string[];
  collectionName: string | null;
  shopFor: string[];
  occasion: string | null;
  theme: string | null;
  length: any; // Specify type if available
  breadth: any; // Specify type if available
  height: any; // Specify type if available
  weightRange: string;
  addDate: string;
  lastModificationDate: string | null;
  created_at: string;
  updated_at: string;
  sizeId: number;
  productSize: any; // Specify type if available
  productQty: number;
  attributeId: number;
  preSalesProductQueries: any; // Specify type if available
  isReplaceable: number;
  isReturnable: number;
  isInternationalShippingAvailable: number;
  customizationAvailability: number;
  fastDelivery: number;
  tryAtHome: number;
  isActive: number;
  grossWeight: any; // Specify type if available
  netWeight: any; // Specify type if available
  productAttributes: ProductAttributes;
  discountId: number;
  discountCategory: string;
  discountActive: number;
  typeOfDiscount: string;
  discountValue: string;
  discountAmount: string;
  discountPrice: string;
  offerStartDate: string;
  offerEndDate: string;
  mediaId: number;
  imageDetails: ImageDetails[];
  videoDetails: any; // Specify type if available
  materialId: number;
  metalType: string;
  metalPurity: string;
  metalWeight: string;
  makingType: string;
  makingChargesPerGrams: string;
  additionalCost: string;
  productPrice: string;
  stoneDetails: any; // Specify type if available
  diamondDetails: any; // Specify type if available
  gst:string|any;
  makingCharges:string|any;
}
