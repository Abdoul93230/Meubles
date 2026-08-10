export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  product_count?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  category_id: string;
  category?: Category;
  images: string[];
  stock_status: "in_stock" | "out_of_stock" | "on_order";
  delivery_days?: number;
  is_featured: boolean;
  is_new: boolean;
  style?: string;
  material?: string;
  dimensions?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  city: string;
  items: OrderItem[];
  total_amount: number;
  payment_method: "orange_money" | "airtel_money" | "cash";
  payment_status: "pending" | "paid" | "failed";
  order_status: "pending" | "confirmed" | "delivered" | "cancelled";
  notes?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}
