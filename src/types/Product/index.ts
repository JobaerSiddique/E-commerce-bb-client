export interface IReview {
  user: String;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  discount_price?: number;
  images: string[];
  stock: number;
  rating?: number;
  category: string[];
  description: string;
  features: string[];
  reviews: IReview[];
  isDeleted:Boolean;
  createdAt: Date;
  updatedAt: Date;
}