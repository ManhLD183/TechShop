import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 34990000,
    originalPrice: 36990000,
    image: 'https://picsum.photos/seed/iphone15/800/800',
    description: 'Thiết kế Titanium bền bỉ, chip A17 Pro mạnh mẽ, nút Tác Vụ linh hoạt và hệ thống camera Pro tiên tiến nhất.',
    specs: {
      screen: '6.7" Super Retina XDR, 120Hz',
      chip: 'A17 Pro (3nm)',
      ram: '8GB',
      storage: '256GB',
      battery: '4,422 mAh, Sạc nhanh 20W'
    },
    category: 'ios',
    rating: 4.9,
    reviews: 1240,
    isNew: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 29990000,
    originalPrice: 33990000,
    image: 'https://picsum.photos/seed/s24ultra/800/800',
    description: 'Kỷ nguyên AI di động đã đến. Với Galaxy S24 Ultra, bạn có thể thỏa sức sáng tạo và làm việc hiệu quả hơn bao giờ hết.',
    specs: {
      screen: '6.8" Dynamic AMOLED 2X, 120Hz',
      chip: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB',
      storage: '512GB',
      battery: '5,000 mAh, Sạc nhanh 45W'
    },
    category: 'android',
    rating: 4.8,
    reviews: 850
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 22500000,
    image: 'https://picsum.photos/seed/pixel8pro/800/800',
    description: 'Chiếc điện thoại Pro nhất từ Google. Thông minh hơn, an toàn hơn và camera tuyệt đỉnh.',
    specs: {
      screen: '6.7" LTPO OLED, 120Hz',
      chip: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB',
      battery: '5,050 mAh, Sạc nhanh 30W'
    },
    category: 'android',
    rating: 4.7,
    reviews: 420,
    isNew: true
  },
  {
    id: '4',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 26990000,
    image: 'https://picsum.photos/seed/xiaomi14/800/800',
    description: 'Đỉnh cao nhiếp ảnh di động với ống kính quang học Leica Summilux và cảm biến 1 inch.',
    specs: {
      screen: '6.73" LTPO AMOLED, 120Hz',
      chip: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      battery: '5,000 mAh, Sạc nhanh 90W'
    },
    category: 'android',
    rating: 4.6,
    reviews: 150
  },
  {
    id: '5',
    name: 'AirPods Pro (Gen 2)',
    brand: 'Apple',
    price: 5990000,
    image: 'https://picsum.photos/seed/airpods/800/800',
    description: 'Chống ồn chủ động gấp 2 lần, âm thanh thích ứng và thời lượng pin lên đến 6 giờ.',
    specs: {
      screen: 'N/A',
      chip: 'H2',
      ram: 'N/A',
      storage: 'N/A',
      battery: '6h (ANC on), 30h with case'
    },
    category: 'accessory',
    rating: 4.9,
    reviews: 2100,
    isNew: true
  },
  {
    id: '6',
    name: 'Galaxy Watch6 Classic',
    brand: 'Samsung',
    price: 8490000,
    image: 'https://picsum.photos/seed/watch6/800/800',
    description: 'Thiết kế cổ điển với vòng xoay bezel, theo dõi sức khỏe chuyên sâu và màn hình lớn nhất từ trước đến nay.',
    specs: {
      screen: '1.5" Super AMOLED',
      chip: 'Exynos W930',
      ram: '2GB',
      storage: '16GB',
      battery: '425 mAh'
    },
    category: 'accessory',
    rating: 4.8,
    reviews: 560
  },
  {
    id: '7',
    name: 'Sạc 20W USB-C',
    brand: 'Apple',
    price: 550000,
    image: 'https://picsum.photos/seed/charger/800/800',
    description: 'Cung cấp khả năng sạc nhanh, hiệu quả tại nhà, trong văn phòng hoặc khi đang di chuyển.',
    specs: {
      screen: 'N/A',
      chip: 'N/A',
      ram: 'N/A',
      storage: 'N/A',
      battery: '20W Fast Charging'
    },
    category: 'accessory',
    rating: 4.7,
    reviews: 4500
  }
];
