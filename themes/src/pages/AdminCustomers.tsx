import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Phone, MapPin, MoreVertical, ExternalLink, Edit2, Trash2, X, Save, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', orders: 12, totalSpent: 128400000, status: 'Active' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0907654321', orders: 8, totalSpent: 85200000, status: 'Active' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0912345678', orders: 5, totalSpent: 42100000, status: 'Inactive' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0987654321', orders: 3, totalSpent: 28500000, status: 'Active' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0933445566', orders: 15, totalSpent: 156000000, status: 'Active' },
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (customer: any) => {
    setEditingCustomer({ ...customer });
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (customer: any) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  return (
    <AdminLayout>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Customer Directory</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and view your customer base and their activity.</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-600/20 flex items-center gap-2">
          <Mail size={16} /> Contact All
        </button>
      </header>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search customers by name or email..."
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
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Contact</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Orders</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Total Spent</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600/20">
                        <span className="text-xs font-bold text-blue-500">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{customer.name}</p>
                        <p className="text-[10px] text-gray-500">Customer ID: #{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Mail size={12} /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Phone size={12} /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {customer.totalSpent.toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${customer.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      <div className={`w-1 h-1 rounded-full ${customer.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(customer)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(customer)}
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
          <p className="text-xs text-gray-500">Showing {filteredCustomers.length} of {customers.length} customers</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Previous</button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Edit Customer Modal */}
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
                <h2 className="text-xl font-bold text-white">Edit Customer - #{editingCustomer?.id}</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateCustomer} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={editingCustomer?.name}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={editingCustomer?.email}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="text" 
                      value={editingCustomer?.phone}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Status</label>
                    <select 
                      value={editingCustomer?.status}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
                  >
                    <Save size={20} /> Save Changes
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
              <h2 className="text-2xl font-bold text-white mb-2">Delete Customer?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="text-white font-bold">{customerToDelete?.name}</span>? This action cannot be undone and will remove all associated data.
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
                  Delete Customer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
