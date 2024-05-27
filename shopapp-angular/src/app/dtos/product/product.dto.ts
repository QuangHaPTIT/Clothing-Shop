export class ProductDTO {
  name: string;
  price: number;
  description: string;
  category_id: number;
  constructor(data: any) {
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.category_id = data.category_id;
  }
}
