import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Smartphone, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="bg-black text-white min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/techbg/1920/1080?blur=10" 
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-blue-500/30">
              Mới ra mắt
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 leading-none">
              IPHONE 15 PRO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                TITANIUM SIÊU BỀN
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Sức mạnh của chip A17 Pro. Nút Tác Vụ mới. Hệ thống camera Pro linh hoạt nhất từ trước đến nay.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 group">
                Mua ngay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                Tìm hiểu thêm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Giao hàng miễn phí', desc: 'Cho đơn hàng từ 2tr' },
              { icon: ShieldCheck, title: 'Bảo hành 12 tháng', desc: 'Chính hãng Apple/Samsung' },
              { icon: RotateCcw, title: 'Đổi trả 30 ngày', desc: 'Nếu có lỗi nhà sản xuất' },
              { icon: Star, title: 'Ưu đãi thành viên', desc: 'Giảm thêm đến 5%' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <feature.icon className="text-blue-500" size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Sản phẩm nổi bật</h2>
              <p className="text-gray-500">Những mẫu điện thoại tốt nhất hiện nay</p>
            </div>
            <Link to="#" className="text-blue-500 text-sm font-bold hover:underline">Xem tất cả</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <Link to={`/product/${product.id}`} className="relative aspect-square block overflow-hidden bg-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                      Mới
                    </span>
                  )}
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-400">{product.rating}</span>
                    <span className="text-[10px] text-gray-600">({product.reviews})</span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-white">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-600 line-through">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => addItem(product)}
                      className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-purple-700 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Smartphone className="absolute -top-10 -left-10 rotate-12" size={300} />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Nâng cấp trải nghiệm di động của bạn</h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">
              Tham gia chương trình thu cũ đổi mới, trợ giá lên đến 2 triệu đồng. Trả góp 0% lãi suất.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-2xl">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tighter mb-6">
                <Smartphone className="text-blue-500" size={28} />
                <span>PHONEX</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">
                Hệ thống bán lẻ điện thoại di động, phụ kiện chính hãng hàng đầu Việt Nam. Cam kết chất lượng và dịch vụ tốt nhất.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Sản phẩm</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="#" className="hover:text-white transition-colors">iPhone</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Samsung</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Xiaomi</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Phụ kiện</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Hỗ trợ</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="#" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Chính sách đổi trả</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Giao hàng & Thanh toán</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Liên hệ</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Email: support@phonex.vn</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: 123 Đường Công Nghệ, TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2026 PHONEX. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white">Điều khoản</Link>
              <Link to="#" className="hover:text-white">Bảo mật</Link>
              <Link to="#" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
