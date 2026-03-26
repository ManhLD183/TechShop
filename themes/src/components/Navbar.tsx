import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Smartphone, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCartStore } from '../store/useCartStore';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin');
  const totalItems = useCartStore((state) => state.totalItems());

  if (isDashboard) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tighter">
              <Smartphone className="text-blue-500 fill-blue-500/20" size={24} />
              <span className="hidden sm:inline">PHONEX</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/category/iphone" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">iPhone</Link>
            <Link to="/category/samsung" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Samsung</Link>
            <Link to="/category/accessories" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Phụ kiện</Link>
            <Link to="/promotions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Khuyến mãi</Link>
          </div>

          <div className="flex items-center space-x-5">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input 
                type="text" 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs w-40 lg:w-48 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white"
                placeholder="Tìm kiếm..."
              />
            </div>
            <Link to="/cart" className="text-gray-400 hover:text-white transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
              <User size={20} />
            </Link>
            <Link to="/admin" className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
              Admin
            </Link>
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-4 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            <Link to="/" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Trang chủ</Link>
            <Link to="/category/iphone" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>iPhone</Link>
            <Link to="/category/samsung" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Samsung</Link>
            <Link to="/category/accessories" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Phụ kiện</Link>
            <Link to="/promotions" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Khuyến mãi</Link>
            <Link to="/profile" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Tài khoản</Link>
            <Link to="/admin" className="block text-lg font-bold text-white" onClick={() => setIsOpen(false)}>Admin</Link>
          </div>
          <div className="pt-6 border-t border-white/10 space-y-4">
            <Link to="/login" className="block w-full py-4 bg-blue-600 text-white text-center font-bold rounded-xl" onClick={() => setIsOpen(false)}>
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
