import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Smartphone, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', { email, password });
  };

  return (
    <main className="pt-32 pb-20 px-4 flex items-center justify-center bg-black text-white min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-3xl tracking-tighter mb-6">
            <Smartphone className="text-blue-500" size={32} />
            <span>PHONEX</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Chào mừng trở lại</h2>
          <p className="text-gray-500 text-sm mt-2">Đăng nhập để tiếp tục trải nghiệm mua sắm</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-500 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Mật khẩu</label>
              <Link to="#" className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-widest">Quên mật khẩu?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
          >
            Đăng nhập <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-4 text-gray-500 font-bold tracking-widest">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm font-medium">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm font-medium">
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Chưa có tài khoản? <Link to="/register" className="text-blue-500 font-bold hover:underline">Đăng ký ngay</Link>
        </p>
      </motion.div>
    </main>
  );
}
