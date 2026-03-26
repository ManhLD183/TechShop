import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold tracking-tighter mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-8 max-w-md">Hãy khám phá những mẫu điện thoại mới nhất và thêm chúng vào giỏ hàng của bạn.</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          Tiếp tục mua sắm <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold tracking-tighter mb-12">Giỏ hàng ({totalItems()})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-all"
            >
              <div className="w-full sm:w-32 h-32 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-blue-400">
                      <Smartphone size={12} />
                      <span>{item.specs.storage}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} / sản phẩm
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 p-8 bg-white/5 rounded-3xl border border-white/10 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Tạm tính</span>
                <span className="text-white font-medium">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice())}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Phí vận chuyển</span>
                <span className="text-emerald-500 font-medium">Miễn phí</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-bold">Tổng cộng</span>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-500">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice())}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Đã bao gồm VAT</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link 
                to="/checkout"
                className="w-full py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
              >
                Tiến hành thanh toán
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/"
                className="w-full py-5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/5 transition-colors block"
              >
                Tiếp tục mua sắm
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-gray-500">
                <ShieldCheck size={18} className="text-blue-500" />
                <span className="text-xs">Thanh toán an toàn & bảo mật 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
