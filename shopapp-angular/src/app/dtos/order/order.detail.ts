import { Product } from "src/app/models/product";

export class OrderDetail {
  id: number;
  price: number;
  order_id: number;
  product: Product;
  number_of_products: number;
  total_money: number;
  color: string;
  constructor(data: any) {
    this.id = data.id;
    this.price = data.price;
    this.order_id = data.order;
    this.product = data.product
    this.number_of_products = data.number_of_products;
    this.total_money = data.total_money;
    this.color = data.color;
  }
}
