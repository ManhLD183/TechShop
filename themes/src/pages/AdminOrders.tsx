import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Eye, CheckCircle, Clock, Truck, XCircle, Download, MoreVertical, X, Save, AlertCircle, Trash2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_ORDERS = [
  { id: 'ORD-84291', customer: 'Nguyễn Văn A', date: '2024-03-20', status: 'Delivered', total: 32990000, items: 1, payment: 'MoMo' },
  { id: 'ORD-75102', customer: 'Trần Thị B', date: '2024-03-19', status: 'Processing', total: 24500000, items: 2, payment: 'COD' },
  { id: 'ORD-63918', customer: 'Lê Văn C', date: '2024-03-18', status: 'Shipping', total: 18900000, items: 1, payment: 'Card' },
  { id: 'ORD-52847', customer: 'Phạm Thị D', date: '2024-03-17', status: 'Cancelled', total: 12500000, items: 1, payment: 'COD' },
  { id: 'ORD-41736', customer: 'Hoàng Văn E', date: '2024-03-16', status: 'Delivered', total: 45000000, items: 3, payment: 'MoMo' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [orderToDelete, setOrderToDelete] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-500" size={14} />;
      case 'Processing': return <Clock className="text-blue-500" size={14} />;
      case 'Shipping': return <Truck className="text-yellow-500" size={14} />;
      case 'Cancelled': return <XCircle className="text-red-500" size={14} />;
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

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (order: any) => {
    setEditingOrder({ ...order });
    setIsEditModalOpen(true);
  };

  const handleUpdateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (order: any) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setOrders(prev => prev.filter(o => o.id !== orderToDelete.id));
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  return (
    <AdminLayout>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Order Management</h1>
          <p className="text-gray-400 text-sm mt-1">Track and manage customer orders and fulfillment.</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-600/20 flex items-center gap-2">
          <Download size={16} /> Export Orders
        </button>
      </header>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Total</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Payment</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white">{order.customer}</p>
                    <p className="text-[10px] text-gray-500">{order.items} items</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(order.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {order.total.toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-gray-400 uppercase">
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold",
                      getStatusColor(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(order)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(order)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-between items-center">
          <p className="text-xs text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Previous</button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white">Order Details - {editingOrder?.id}</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateOrder} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Customer</p>
                    <p className="text-white font-bold">{editingOrder?.customer}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Amount</p>
                    <p className="text-blue-500 font-bold">{editingOrder?.total.toLocaleString()} VNĐ</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Order Status</label>
                  <select 
                    value={editingOrder?.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
                  >
                    <Save size={20} /> Update Status
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-red-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Delete Order?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Are you sure you want to delete order <span className="text-white font-bold">{orderToDelete?.id}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
