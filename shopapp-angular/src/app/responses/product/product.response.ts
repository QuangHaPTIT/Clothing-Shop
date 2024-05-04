import { ProductImage } from "src/app/models/product.image";

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    product_images: ProductImage[];
  }

