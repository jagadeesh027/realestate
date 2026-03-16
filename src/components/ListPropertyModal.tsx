import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Building2, MapPin, DollarSign, Bed, Bath, Maximize } from 'lucide-react';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ListPropertyModal({ isOpen, onClose, onSuccess }: ListPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    sqft: '',
    beds: '',
    baths: '',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to list a property');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: `$${Number(formData.price).toLocaleString()}`,
          beds: Number(formData.beds),
          baths: Number(formData.baths),
          sqft: Number(formData.sqft)
        }),
      });

      if (!res.ok) throw new Error('Failed to submit listing');

      onSuccess?.();
      onClose();
      setFormData({
        title: '',
        location: '',
        price: '',
        sqft: '',
        beds: '',
        baths: '',
        type: 'Villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="p-8 border-b border-black/5 flex justify-between items-center bg-paper">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-dark">List Your Property</h2>
                  <p className="text-dark/40 text-sm">Join our exclusive collection of luxury estates.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-dark/40" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest uppercase text-accent block">Basic Information</label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="text" 
                        placeholder="Property Title (e.g. Modern Cliffside Villa)"
                        required
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="text" 
                        placeholder="Location (e.g. Malibu, CA)"
                        required
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest uppercase text-accent block">Property Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="number" 
                        placeholder="Price"
                        required
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="number" 
                        placeholder="Sqft"
                        required
                        value={formData.sqft}
                        onChange={e => setFormData({...formData, sqft: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="number" 
                        placeholder="Beds"
                        required
                        value={formData.beds}
                        onChange={e => setFormData({...formData, beds: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                      <input 
                        type="number" 
                        placeholder="Baths"
                        required
                        value={formData.baths}
                        onChange={e => setFormData({...formData, baths: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest uppercase text-accent block">Property Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                  </select>
                </div>

                {/* Upload */}
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest uppercase text-accent block">Media</label>
                  <div className="border-2 border-dashed border-black/5 rounded-2xl p-12 text-center hover:border-accent/30 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                      <Upload className="w-8 h-8 text-accent" />
                    </div>
                    <p className="font-bold text-dark mb-1">Upload high-resolution images</p>
                    <p className="text-dark/40 text-sm">Drag and drop or click to browse</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-paper border-t border-black/5">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dark text-white py-4 rounded-xl font-bold hover:bg-accent transition-all shadow-xl shadow-dark/10 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Listing'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
