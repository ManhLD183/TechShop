import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line 
} from 'recharts';
import { 
  Calendar, TrendingUp, TrendingDown, Minus 
} from 'lucide-react';
import { cn } from '../lib/utils';
import AdminLayout from '../components/AdminLayout';

const revenueData = [
  { name: 'Jan', actual: 280, projected: 250 },
  { name: 'Feb', actual: 260, projected: 230 },
  { name: 'Mar', actual: 270, projected: 240 },
  { name: 'Apr', actual: 240, projected: 210 },
  { name: 'May', actual: 250, projected: 220 },
  { name: 'Jun', actual: 210, projected: 180 },
  { name: 'Jul', actual: 220, projected: 190 },
  { name: 'Aug', actual: 180, projected: 150 },
  { name: 'Sep', actual: 190, projected: 160 },
  { name: 'Oct', actual: 150, projected: 120 },
  { name: 'Nov', actual: 160, projected: 130 },
];

const marketLeaders = [
  { name: 'iPhone 15 Pro Max', category: 'iOS', sales: '34.5B VNĐ', count: '1,240 Sales', trend: 'up' },
  { name: 'Samsung S24 Ultra', category: 'Android', sales: '28.2B VNĐ', count: '850 Sales', trend: 'up' },
  { name: 'Xiaomi 14 Ultra', category: 'Android', sales: '12.8B VNĐ', count: '420 Sales', trend: 'flat' },
];

const liveActivity = [
  { title: 'Đơn hàng #842 đã giao', meta: 'Kho TP.HCM • 2 phút trước', status: 'THÀNH CÔNG', color: 'emerald' },
  { title: 'Cập nhật tồn kho iPhone 15', meta: 'Hệ thống • 45 phút trước', status: 'THÔNG TIN', color: 'tertiary' },
  { title: 'Cảnh báo tồn kho thấp: Pixel 8', meta: 'Kho Hà Nội • 1 giờ trước', status: 'CẢNH BÁO', color: 'secondary' },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Executive Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time performance metrics for PHONEX ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/10">
            <Calendar size={14} />
            Last 30 Days
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-600/20">
            Export Report
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard title="Total Sales" value="128.4B VNĐ" change="+12.4%" trend="up" color="blue-500" />
        <KPICard title="Active Orders" value="1,248" change="+4.2%" trend="up" color="emerald-500" />
        <KPICard title="Site Traffic" value="42.8k" change="-2.1%" trend="down" color="pink-500" />
      </section>

      {/* Main Revenue Chart */}
      <section className="mb-8 bg-white/5 rounded-xl p-8 border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-xl font-bold text-white">Revenue Performance</h2>
            <p className="text-xs text-gray-400">Projected growth vs actual earnings (VNĐ)</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              <span className="text-xs font-medium">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20 border border-white/40"></span>
              <span className="text-xs font-medium text-gray-400">Projected</span>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <section className="lg:col-span-3 bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Market Leaders</h2>
            <button className="text-blue-500 text-[10px] font-bold uppercase tracking-widest hover:underline">View Catalog</button>
          </div>
          <div className="space-y-1">
            {marketLeaders.map((item, i) => (
              <div key={i} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                    <img 
                      src={`https://picsum.photos/seed/leader${i}/100/100`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <p className="text-sm font-bold text-white">{item.sales}</p>
                    <p className="text-[10px] text-gray-500">{item.count}</p>
                  </div>
                  {item.trend === 'up' ? <TrendingUp size={16} className="text-blue-500" /> : <Minus size={16} className="text-gray-500" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Live Activity</h2>
          <div className="space-y-6">
            {liveActivity.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i < liveActivity.length - 1 && (
                  <div className="absolute left-2 top-8 bottom-[-24px] w-px bg-white/10"></div>
                )}
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 mt-1 z-10",
                  item.color === 'emerald' ? "bg-emerald-400/20 border-emerald-400" :
                  item.color === 'tertiary' ? "bg-blue-400/20 border-blue-400" :
                  "bg-pink-400/20 border-pink-400"
                )}></div>
                <div>
                  <p className="text-sm text-white font-medium leading-tight">{item.title}</p>
                  <p className="text-[10px] text-gray-500 mb-1">{item.meta}</p>
                  <span className={cn(
                    "inline-block px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tighter",
                    item.color === 'emerald' ? "bg-emerald-400/10 text-emerald-400" :
                    item.color === 'tertiary' ? "bg-blue-400/10 text-blue-400" :
                    "bg-pink-400/10 text-pink-400"
                  )}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function KPICard({ title, value, change, trend, color }: { title: string, value: string, change: string, trend: 'up' | 'down', color: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/[0.07] transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <span className={cn(
          "text-xs font-bold flex items-center px-2 py-1 rounded-full",
          trend === 'up' ? "text-emerald-400 bg-emerald-400/10" : "text-pink-400 bg-pink-400/10"
        )}>{change}</span>
      </div>
      <div className="h-16 flex items-end gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={cn(
              "w-full rounded-sm transition-all duration-500",
              i === 5 ? `bg-${color} shadow-[0_0_10px_rgba(59,130,246,0.3)] h-14` : `bg-${color}/20 h-${Math.floor(Math.random() * 8) + 4}`
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
