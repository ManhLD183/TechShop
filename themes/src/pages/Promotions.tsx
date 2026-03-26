import React from 'react';
import { Gift, Timer, Zap, Percent, ArrowRight, Smartphone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';

export default function Promotions() {
  const addItem = useCartStore((state) => state.addItem);
  const flashSaleProducts = PRODUCTS.slice(0, 3);

  return (
    <main className="pt-24 pb-20 bg-black min-h-screen text-white overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 z-0" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/promo/1920/1080?blur=5')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap size={14} /> Flash Sale Đang Diễn Ra
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-none"
          >
            SIÊU ƯU ĐÃI <br /> <span className="text-blue-500">MÙA HÈ 2024</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto"
          >
            Giảm giá lên đến 50% cho tất cả các dòng iPhone, Samsung và phụ kiện cao cấp. Đừng bỏ lỡ cơ hội sở hữu công nghệ đỉnh cao với giá hời nhất.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl">
              <Timer size={24} className="text-blue-500" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kết thúc sau</p>
                <p className="text-xl font-mono font-bold">12:45:32</p>
              </div>
            </div>
            <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-3xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 flex items-center gap-2">
              Săn Deal Ngay <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Promotion Categories */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Percent size={32} />, title: 'Giảm giá 50%', desc: 'Cho các dòng phụ kiện chính hãng Apple & Samsung.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { icon: <Zap size={32} />, title: 'Flash Sale', desc: 'Ưu đãi cực sốc diễn ra hàng ngày vào lúc 12:00.', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { icon: <Gift size={32} />, title: 'Quà Tặng', desc: 'Tặng kèm bộ sạc nhanh 20W khi mua iPhone 15 series.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:border-blue-500/30 transition-all group"
            >
              <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Flash Sale Products */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter">DEAL SỐC HÔM NAY</h2>
              <p className="text-gray-500 mt-2">Số lượng có hạn, nhanh tay sở hữu ngay.</p>
            </div>
            <Link to="/" className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Xem tất cả <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flashSaleProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
              >
                <div className="absolute top-6 left-6 z-10">
                  <div className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg shadow-red-600/20">
                    -20% OFF
                  </div>
                </div>
                
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-blue-500">{(product.price * 0.8).toLocaleString()} VNĐ</span>
                    <span className="text-sm text-gray-500 line-through">{product.price.toLocaleString()} VNĐ</span>
                  </div>

                  <button 
                    onClick={() => addItem(product)}
                    className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    <ShoppingBag size={20} className="group-hover/btn:scale-110 transition-transform" />
                    Mua Ngay
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter / Promo Signup */}
        <section className="relative p-12 md:p-20 bg-blue-600 rounded-[4rem] overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">ĐĂNG KÝ NHẬN TIN</h2>
            <p className="text-blue-100 text-lg mb-12">Nhận ngay voucher giảm giá 500.000 VNĐ cho đơn hàng đầu tiên và cập nhật sớm nhất các chương trình khuyến mãi.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..."
                className="flex-grow bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder:text-blue-200 focus:outline-none focus:bg-white/30 transition-all"
              />
              <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-xl shadow-black/10">
                Đăng Ký
              </button>
            </form>
            <p className="mt-6 text-blue-200 text-xs flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Chúng tôi cam kết bảo mật thông tin của bạn.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
