export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specs: {
    screen: string;
    chip: string;
    ram: string;
    storage: string;
    battery: string;
    camera?: string;
  };
  category: 'ios' | 'android' | 'accessory' | 'Smartphone' | 'Tablet' | 'Accessories';
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: number;
}
