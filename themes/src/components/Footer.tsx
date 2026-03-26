import React from 'react';
import { Smartphone, Globe, Lock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tighter mb-8">
              <Smartphone className="text-blue-500 fill-blue-500/20" size={32} />
              <span>PHONEX</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Trải nghiệm công nghệ đỉnh cao với những dòng smartphone mới nhất. Chúng tôi cam kết mang đến giá trị và dịch vụ tốt nhất cho khách hàng.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 text-blue-500">Sản phẩm</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link className="hover:text-white transition-colors" to="/category/iphone">iPhone</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/category/samsung">Samsung</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/category/accessories">Phụ kiện</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/promotions">Khuyến mãi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 text-blue-500">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link className="hover:text-white transition-colors" to="/contact">Liên hệ</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/policy">Chính sách bảo hành</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/policy">Vận chuyển</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/policy">Đổi trả</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 text-blue-500">Kết nối</h4>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Globe].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-gray-400 hover:text-white">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs tracking-wide text-gray-500 italic">© 2024 PHONEX. Designed for the future of mobile technology.</p>
          <div className="flex gap-8">
            <Link to="/policy" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/policy" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/policy" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
