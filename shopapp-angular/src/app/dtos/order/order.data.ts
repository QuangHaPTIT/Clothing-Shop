import { OrderDetail } from "./order.detail";

export class OrderData {
  id: number;
  email: string;
  address: string;
  note: string;
  status: string;
  fullname: string;
  phone_number: string;
  order_date: any;
  total_money: number;
  shipping_method: string;
  shipping_address: string;
  shipping_date: Date;
  tracking_number: string;
  payment_method: string;
  active: boolean;
  user_id: number;
  order_details: OrderDetail[];
  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.address = data.address;
    this.note = data.note;
    this.status = data.status;
    this.fullname = data.fullname;
    this.phone_number = data.phone_number;
    this.order_date = data.order_date;
    this.total_money = data.total_money;
    this.shipping_method = data.shipping_method;
    this.shipping_address = data.shipping_address;
    this.shipping_date = new Date(data.shipping_date[0], data.shipping_date[1] - 1, data.shipping_date[2]);
    this.tracking_number = data.tracking_number;
    this.payment_method = data.payment_method;
    this.active = data.active;
    this.user_id = data.user_id;
    this.order_details = data.orderDetails.map((detail: OrderDetail) => new OrderDetail(detail));
  }
}
