import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <main className="pt-24 pb-20 bg-black min-h-screen text-white">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent z-0" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/contact/1920/1080?blur=10')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase"
          >
            LIÊN HỆ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">THÔNG TIN LIÊN HỆ</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Địa chỉ</h4>
                    <p className="text-gray-400 text-sm">123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Điện thoại</h4>
                    <p className="text-gray-400 text-sm">1900 1234 - (028) 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">support@phonex.vn - business@phonex.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Giờ làm việc</h4>
                    <p className="text-gray-400 text-sm">Thứ 2 - Chủ Nhật: 08:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">MẠNG XÃ HỘI</h3>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Globe].map((Icon, idx) => (
                  <button key={idx} className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-gray-400 hover:text-white">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">GỬI TIN NHẮN</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Họ và tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Chủ đề</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                  <option>Tư vấn mua hàng</option>
                  <option>Hỗ trợ kỹ thuật</option>
                  <option>Khiếu nại dịch vụ</option>
                  <option>Hợp tác kinh doanh</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Nội dung</label>
                <textarea 
                  rows={5}
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20">
                <Send size={20} /> Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
