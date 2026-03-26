import React from 'react';
import { ShieldCheck, Truck, RefreshCw, CreditCard, Lock, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Policy() {
  const policies = [
    {
      icon: <ShieldCheck size={32} />,
      title: 'Chính sách bảo hành',
      desc: 'Cam kết bảo hành chính hãng 12 tháng cho tất cả các dòng điện thoại mới. Hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất.',
      content: [
        'Bảo hành 12 tháng tại các trung tâm ủy quyền.',
        'Hỗ trợ thay thế linh kiện chính hãng.',
        'Bảo hành phần mềm trọn đời máy.',
        'Miễn phí vệ sinh máy định kỳ.'
      ]
    },
    {
      icon: <Truck size={32} />,
      title: 'Chính sách vận chuyển',
      desc: 'Giao hàng hỏa tốc trong 2h tại nội thành TP.HCM và Hà Nội. Miễn phí vận chuyển toàn quốc cho đơn hàng từ 5.000.000 VNĐ.',
      content: [
        'Giao hàng hỏa tốc 2h (Nội thành).',
        'Giao hàng tiêu chuẩn 2-3 ngày (Toàn quốc).',
        'Kiểm tra hàng trước khi thanh toán.',
        'Bảo hiểm hàng hóa 100% giá trị.'
      ]
    },
    {
      icon: <RefreshCw size={32} />,
      title: 'Chính sách đổi trả',
      desc: 'Hỗ trợ đổi trả linh hoạt trong vòng 30 ngày. Thủ tục đơn giản, nhanh chóng, đảm bảo quyền lợi tối đa cho khách hàng.',
      content: [
        'Đổi mới trong 30 ngày (Lỗi NSX).',
        'Hoàn tiền 100% nếu sản phẩm không đúng mô tả.',
        'Thu cũ đổi mới với giá cực ưu đãi.',
        'Hỗ trợ thu mua lại máy cũ giá cao.'
      ]
    },
    {
      icon: <Lock size={32} />,
      title: 'Chính sách bảo mật',
      desc: 'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân và dữ liệu giao dịch của khách hàng theo tiêu chuẩn quốc tế.',
      content: [
        'Mã hóa dữ liệu SSL 256-bit.',
        'Không chia sẻ thông tin cho bên thứ 3.',
        'Bảo mật thông tin thanh toán thẻ.',
        'Tuân thủ luật bảo vệ dữ liệu cá nhân.'
      ]
    }
  ];

  return (
    <main className="pt-24 pb-20 bg-black min-h-screen text-white">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent z-0" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/policy/1920/1080?blur=10')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase"
          >
            CHÍNH SÁCH
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Minh bạch, công bằng và luôn đặt quyền lợi khách hàng lên hàng đầu.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {policy.icon}
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{policy.title}</h3>
              </div>
              
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {policy.desc}
              </p>

              <div className="space-y-4">
                {policy.content.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                    <ChevronRight size={14} className="text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-10 flex items-center gap-2 text-blue-500 font-bold hover:gap-3 transition-all">
                Xem chi tiết <ChevronRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section Placeholder */}
        <section className="mt-32 p-12 md:p-20 bg-white/5 border border-white/10 rounded-[4rem] text-center">
          <FileText size={48} className="text-blue-500 mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-6 tracking-tighter">BẠN CẦN HỖ TRỢ THÊM?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Nếu bạn có bất kỳ thắc mắc nào về chính sách hoặc cần hỗ trợ đặc biệt, đừng ngần ngại liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Liên Hệ Ngay
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Câu Hỏi Thường Gặp
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
