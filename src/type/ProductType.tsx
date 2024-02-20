interface Variation {
    color: string;
    colorCode: string;
    colorImage: string;
    image: string;
}

export interface ProductType {
    ProductID: number|string,
    Title:string,
    Url:string,
    img:string,
    SKU:string,
    IsActive:boolean,
    Stocks:string,
    ThumbImgName:string,
    Desp:string|null,
    ShortDesp:string,
    WeightRange:string,
    AvailableIn:string,
    ShopFor:string,
    IsFastDelivery:string,
    IsHomeTry:boolean,
    Metal:string,
    Purity:string,
    MetalWeight:string,
    MakingChrgPErGrm:string,
    DiamondClarity1:string,
    DiamondQty1:string,
    CareWt1:string,
    AdditionalPrice:string,
    ProdPrice:string,
    ProdPriceWithTax:string,
    ProdPriceWithDiscountTax:string,
    IsDiscount:boolean,
    DiscountType:string,
    DiscountVal:string,
    DiscountFrom:string,
    DiscountTo:string,
    DiscountCategory:string,
    Categories:string,
    ImgName1:string,
    OrderNo:string,
    MakingType:string,
    DiamondCertifiedBy:string|null,
    DiamondDiamondShape1:string|null,
    GoldCertifiedBy:string|null,
    GoldColor:string|null,
    GoldRingSize:string|null,
    GoldEarringType:string|null
}