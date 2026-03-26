import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Edit2, Trash2, ExternalLink, MoreVertical, X, Save, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export default function AdminCatalog() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: '',
    category: 'Smartphone',
    price: 0,
    image: '',
    specs: {
      screen: '',
      chip: '',
      ram: '',
      storage: '',
      battery: '',
      camera: ''
    }
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        brand: '',
        category: 'Smartphone',
        price: 0,
        image: 'https://picsum.photos/seed/phone/400/400',
        specs: {
          screen: '6.7" OLED',
          chip: 'A17 Pro',
          ram: '8GB',
          storage: '256GB',
          battery: '4422 mAh',
          camera: '48MP Main'
        }
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('specs.')) {
      const specKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs!,
          [specKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p));
    } else {
      const newProduct = {
        ...formData,
        id: `PROD-${Date.now()}`,
      } as Product;
      setProducts(prev => [newProduct, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Product Catalog</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your inventory and product listings.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <Plus size={16} /> Add Product
        </button>
      </header>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Product</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{product.name}</p>
                        <p className="text-[10px] text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-gray-400 uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {product.price.toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-white font-medium">42 in stock</span>
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">
                      <div className="w-1 h-1 rounded-full bg-green-500"></div>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(product)}
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
          <p className="text-xs text-gray-500">Showing {filteredProducts.length} of {products.length} products</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Previous</button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Product Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="iPhone 15 Pro Max"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brand</label>
                    <input 
                      type="text" 
                      name="brand"
                      required
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Apple"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="Smartphone">Smartphone</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Price (VNĐ)</label>
                    <input 
                      type="number" 
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="32990000"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Image URL</label>
                    <input 
                      type="text" 
                      name="image"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <h3 className="text-sm font-bold text-blue-500 mb-4 flex items-center gap-2">
                      <Package size={16} /> Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Screen</label>
                        <input 
                          type="text" 
                          name="specs.screen"
                          value={formData.specs?.screen}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Chip</label>
                        <input 
                          type="text" 
                          name="specs.chip"
                          value={formData.specs?.chip}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">RAM</label>
                        <input 
                          type="text" 
                          name="specs.ram"
                          value={formData.specs?.ram}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Storage</label>
                        <input 
                          type="text" 
                          name="specs.storage"
                          value={formData.specs?.storage}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
                  >
                    <Save size={20} /> {editingProduct ? 'Update Product' : 'Create Product'}
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
              <h2 className="text-2xl font-bold text-white mb-2">Delete Product?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="text-white font-bold">{productToDelete?.name}</span>? This action cannot be undone.
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
