import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ORDERS = [
  {
    id: 'ORD-84291',
    date: '2024-03-20',
    status: 'Delivered',
    total: 32990000,
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, image: 'https://picsum.photos/seed/iphone15/200/200' }
    ]
  },
  {
    id: 'ORD-75102',
    date: '2024-02-15',
    status: 'Cancelled',
    total: 24500000,
    items: [
      { name: 'Samsung Galaxy S24 Ultra', quantity: 1, image: 'https://picsum.photos/seed/s24/200/200' }
    ]
  }
];

const ADDRESSES = [
  {
    id: 1,
    type: 'Home',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    isDefault: true
  },
  {
    id: 2,
    type: 'Office',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    isDefault: false
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const handleLogout = () => {
    // Simulate logout
    navigate('/login');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-500" size={16} />;
      case 'Processing': return <Clock className="text-blue-500" size={16} />;
      case 'Shipping': return <Truck className="text-yellow-500" size={16} />;
      case 'Cancelled': return <XCircle className="text-red-500" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500';
      case 'Processing': return 'bg-blue-500/10 text-blue-500';
      case 'Shipping': return 'bg-yellow-500/10 text-yellow-500';
      case 'Cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white shadow-lg shadow-blue-600/20">
                A
              </div>
              <h2 className="text-xl font-bold text-white text-center">Nguyễn Văn A</h2>
              <p className="text-sm text-gray-400 text-center">example@gmail.com</p>
            </div>

            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Package size={20} /> Lịch sử đơn hàng
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${activeTab === 'addresses' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <MapPin size={20} /> Sổ địa chỉ
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Settings size={20} /> Cài đặt tài khoản
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-xl font-bold text-red-500 hover:bg-red-500/10 transition-all mt-8"
              >
                <LogOut size={20} /> Đăng xuất
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'orders' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Lịch sử đơn hàng</h2>
                  <div className="flex gap-2">
                    <span className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400 cursor-pointer hover:bg-white/10">Tất cả</span>
                    <span className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400 cursor-pointer hover:bg-white/10">Đang giao</span>
                    <span className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400 cursor-pointer hover:bg-white/10">Đã hoàn thành</span>
                  </div>
                </div>

                {ORDERS.length > 0 ? (
                  <div className="space-y-4">
                    {ORDERS.map((order) => (
                      <div key={order.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all group">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                          <div>
                            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{order.id}</p>
                            <p className="text-sm text-gray-400">Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status === 'Delivered' ? 'Đã giao hàng' : 
                             order.status === 'Processing' ? 'Đang xử lý' : 
                             order.status === 'Shipping' ? 'Đang giao' : 'Đã hủy'}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                <p className="text-xs text-gray-400">Số lượng: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/10">
                          <div>
                            <p className="text-xs text-gray-400">Tổng cộng</p>
                            <p className="text-lg font-bold text-white">{order.total.toLocaleString()} VNĐ</p>
                          </div>
                          <button className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:underline">
                            Chi tiết đơn hàng <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <ShoppingBag className="text-gray-600 mx-auto mb-4" size={48} />
                    <p className="text-gray-400">Bạn chưa có đơn hàng nào.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Sổ địa chỉ</h2>
                  <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Thêm địa chỉ mới
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ADDRESSES.map((addr) => (
                    <div key={addr.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 relative group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="px-3 py-1 bg-blue-600/20 rounded-full text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-xs font-bold text-blue-500 hover:underline">Sửa</button>
                          <button className="text-xs font-bold text-red-500 hover:underline">Xóa</button>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{addr.name}</h4>
                      <p className="text-sm text-gray-400 mb-4">{addr.phone}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Cài đặt tài khoản</h2>
                
                <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Họ và tên</label>
                      <input 
                        type="text" 
                        defaultValue="Nguyễn Văn A"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email</label>
                      <input 
                        type="email" 
                        defaultValue="example@gmail.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Số điện thoại</label>
                      <input 
                        type="tel" 
                        defaultValue="0901234567"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Lưu thay đổi
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-8">
                  <h3 className="text-xl font-bold text-white">Đổi mật khẩu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Mật khẩu hiện tại</label>
                      <input 
                        type="password" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Mật khẩu mới</label>
                      <input 
                        type="password" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
