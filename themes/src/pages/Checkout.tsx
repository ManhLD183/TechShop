import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Truck, MapPin, ShoppingBag, ChevronRight, ShieldCheck, Smartphone } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại PHONEX.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center bg-black min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-gray-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-400 mb-8">Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Checkout Form */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-12">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'}`}>1</div>
              <div className={`h-px flex-1 ${step >= 2 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'}`}>2</div>
              <div className={`h-px flex-1 ${step >= 3 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'}`}>3</div>
            </div>

            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-blue-500" size={24} />
                  <h2 className="text-2xl font-bold text-white">Thông tin giao hàng</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Họ và tên</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="0901234567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Thành phố</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="TP. Hồ Chí Minh"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-400">Địa chỉ chi tiết</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Số nhà, tên đường, phường/xã..."
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Tiếp tục thanh toán <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-blue-500" size={24} />
                  <h2 className="text-2xl font-bold text-white">Phương thức thanh toán</h2>
                </div>
                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'bg-blue-600/10 border-blue-600' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-600'}`}>
                      {formData.paymentMethod === 'cod' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-sm text-gray-400">Thanh toán bằng tiền mặt khi giao hàng tận nơi.</p>
                    </div>
                    <Truck className="text-gray-500" size={24} />
                  </label>

                  <label className={`flex items-center gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'momo' ? 'bg-blue-600/10 border-blue-600' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'momo' ? 'border-blue-600' : 'border-gray-600'}`}>
                      {formData.paymentMethod === 'momo' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">Ví điện tử MoMo</p>
                      <p className="text-sm text-gray-400">Thanh toán nhanh chóng qua ứng dụng MoMo.</p>
                    </div>
                    <Smartphone className="text-pink-500" size={24} />
                  </label>

                  <label className={`flex items-center gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'bg-blue-600/10 border-blue-600' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-600'}`}>
                      {formData.paymentMethod === 'card' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">Thẻ tín dụng / Ghi nợ</p>
                      <p className="text-sm text-gray-400">Hỗ trợ Visa, Mastercard, JCB.</p>
                    </div>
                    <CreditCard className="text-gray-500" size={24} />
                  </label>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-2 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Xác nhận đơn hàng <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-blue-500" size={24} />
                  <h2 className="text-2xl font-bold text-white">Xác nhận & Thanh toán</h2>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Người nhận</h3>
                      <p className="text-white font-bold">{formData.fullName}</p>
                      <p className="text-gray-400">{formData.phone}</p>
                      <p className="text-gray-400">{formData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Địa chỉ</h3>
                      <p className="text-white">{formData.address}</p>
                      <p className="text-white">{formData.city}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Thanh toán</h3>
                      <p className="text-white font-bold">
                        {formData.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 
                         formData.paymentMethod === 'momo' ? 'Ví MoMo' : 'Thẻ tín dụng'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="flex-2 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Hoàn tất đặt hàng
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">SL: {item.quantity}</p>
                      <p className="text-sm font-bold text-blue-500">{item.price.toLocaleString()} VNĐ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400">
                  <span>Tạm tính ({totalItems()} sản phẩm)</span>
                  <span>{totalPrice().toLocaleString()} VNĐ</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-500">Miễn phí</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                  <span>Tổng cộng</span>
                  <span className="text-blue-500">{totalPrice().toLocaleString()} VNĐ</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-600/10 rounded-xl border border-blue-600/20 flex items-start gap-3">
                <ShieldCheck className="text-blue-500 flex-shrink-0" size={20} />
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Giao dịch của bạn được bảo mật tuyệt đối. Chúng tôi cam kết bảo vệ thông tin cá nhân và dữ liệu thanh toán của khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
