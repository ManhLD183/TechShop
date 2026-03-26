import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Smartphone, Filter, ChevronDown, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { motion } from 'motion/react';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const [sortBy, setSortBy] = useState('featured');

  // Filter products based on category/brand
  const filteredProducts = PRODUCTS.filter(p => {
    if (category?.toLowerCase() === 'iphone') return p.brand.toLowerCase() === 'apple' && p.category !== 'accessory';
    if (category?.toLowerCase() === 'samsung') return p.brand.toLowerCase() === 'samsung' && p.category !== 'accessory';
    if (category?.toLowerCase() === 'accessories') return p.category.toLowerCase() === 'accessory';
    return true;
  });

  const title = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <main className="pt-24 pb-20 bg-black min-h-screen text-white">
      {/* Hero Section for Category */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent z-0" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1920/1080?blur=10')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Khám phá thế giới công nghệ đỉnh cao với dòng sản phẩm {title} mới nhất tại PHONEX.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <button className="px-6 py-2 bg-blue-600 rounded-full text-xs font-bold whitespace-nowrap">Tất cả</button>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">Mới nhất</button>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">Bán chạy</button>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">Giá thấp - cao</button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm appearance-none focus:border-blue-500 outline-none"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">New</span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">{product.brand}</p>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-bold text-white">{product.price.toLocaleString()} VNĐ</span>
                  <span className="text-xs text-gray-500 line-through">{(product.price * 1.1).toLocaleString()} VNĐ</span>
                </div>

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addItem(product);
                  }}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                  Thêm vào giỏ
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Smartphone size={64} className="text-gray-800 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy sản phẩm</h2>
            <p className="text-gray-500">Chúng tôi đang cập nhật thêm sản phẩm mới cho danh mục này.</p>
          </div>
        )}
      </div>
    </main>
  );
}
