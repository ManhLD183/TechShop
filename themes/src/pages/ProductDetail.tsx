import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ShoppingBag, ShieldCheck, CheckCircle, Truck, RotateCcw, Star, Smartphone, Cpu, Battery, Maximize } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedStorage, setSelectedStorage] = useState(product?.specs.storage);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold">Sản phẩm không tồn tại</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Quay lại trang chủ</Link>
      </div>
    );
  }

  const specs = [
    { icon: Maximize, label: "Màn hình", value: product.specs.screen },
    { icon: Cpu, label: "Vi xử lý", value: product.specs.chip },
    { icon: Smartphone, label: "RAM", value: product.specs.ram },
    { icon: Battery, label: "Pin & Sạc", value: product.specs.battery },
  ];

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto bg-black text-white min-h-screen">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-500">
        <Link className="hover:text-white transition-colors" to="/">Trang chủ</Link>
        <ChevronRight size={10} />
        <span className="text-gray-400">{product.brand}</span>
        <ChevronRight size={10} />
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Product Gallery Section */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-3xl overflow-hidden bg-white/5 flex items-center justify-center group relative border border-white/10"
          >
            <img 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={product.image}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${i === 1 ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-white/10 opacity-60 hover:opacity-100'}`}>
                <img 
                  alt={`View ${i}`} 
                  className="w-full h-full object-cover"
                  src={`https://picsum.photos/seed/${product.id}-${i}/200/200`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info & Conversion Section */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="sticky top-32 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-blue-500/30">
                  {product.brand}
                </span>
                {product.isNew && (
                  <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-purple-500/30">
                    Mới ra mắt
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-600"} />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{product.rating} ({product.reviews} đánh giá)</span>
              </div>
              <p className="text-gray-400 text-lg font-light leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-white">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-600 line-through text-xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Chọn dung lượng</label>
                <div className="flex flex-wrap gap-3">
                  {['128GB', '256GB', '512GB', '1TB'].map((storage) => (
                    <button 
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all font-bold text-sm ${selectedStorage === storage ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addItem(product)}
                className="flex-1 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
              >
                <ShoppingBag size={20} />
                Thêm vào giỏ
              </button>
              <button className="flex-1 py-5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/5 transition-colors">
                Mua ngay
              </button>
            </div>

            {/* Trust Signals */}
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-blue-500" size={20} />
                  <span className="text-xs text-gray-400">Giao nhanh 2h</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-500" size={20} />
                  <span className="text-xs text-gray-400">Bảo hành 12th</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="text-blue-500" size={20} />
                  <span className="text-xs text-gray-400">Đổi trả 30 ngày</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-blue-500" size={20} />
                  <span className="text-xs text-gray-400">Chính hãng 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs Section */}
      <section className="mt-32 pt-24 border-t border-white/10">
        <h2 className="text-3xl font-bold tracking-tighter mb-16">Thông số kỹ thuật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all group">
              <spec.icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">{spec.label}</h3>
              <p className="text-lg font-bold">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
