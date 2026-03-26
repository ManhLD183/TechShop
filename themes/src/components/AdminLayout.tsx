import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3, 
  Settings, LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin' },
    { icon: <Package size={18} />, label: 'Catalog', path: '/admin/catalog' },
    { icon: <ShoppingBag size={18} />, label: 'Orders', path: '/admin/orders' },
    { icon: <Users size={18} />, label: 'Customers', path: '/admin/customers' },
    { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-white/5 flex flex-col p-4 gap-2 z-50 border-r border-white/10">
        <div className="mb-8 px-2 flex flex-col">
          <Link to="/" className="text-xl font-bold text-blue-500 tracking-tighter">PHONEX</Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Admin Console</span>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg font-sans text-sm font-medium transition-all duration-200 w-full text-left",
                location.pathname === item.path ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10">
          <button className="flex items-center gap-3 p-3 rounded-lg font-sans text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white w-full transition-all">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg font-sans text-sm font-medium text-red-500 hover:bg-red-500/10 w-full transition-all mt-1">
            <LogOut size={18} />
            <span>Exit Admin</span>
          </Link>
          <div className="flex items-center gap-3 p-3 mt-4 bg-white/5 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-blue-400/20">
              <span className="text-[10px] font-bold text-white">AD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Admin User</span>
              <span className="text-[10px] text-gray-500">System Architect</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}
