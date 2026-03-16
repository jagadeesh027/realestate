import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Building2, MapPin, DollarSign, Bed, Bath, Maximize } from 'lucide-react';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ListPropertyModal({ isOpen, onClose }: ListPropertyModalProps) {
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
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-paper">
              <div>
                <h2 className="text-2xl font-serif font-bold text-dark">List Your Property</h2>
                <p className="text-dark/40 text-sm">Join our exclusive collection of luxury estates.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-dark/40" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest uppercase text-accent block">Basic Information</label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                    <input 
                      type="text" 
                      placeholder="Property Title (e.g. Modern Cliffside Villa)"
                      className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                    <input 
                      type="text" 
                      placeholder="Location (e.g. Malibu, CA)"
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
                      className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                    <input 
                      type="number" 
                      placeholder="Sqft"
                      className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                    <input 
                      type="number" 
                      placeholder="Beds"
                      className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/20" />
                    <input 
                      type="number" 
                      placeholder="Baths"
                      className="w-full pl-12 pr-4 py-3 bg-paper border border-black/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
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
                onClick={() => {
                  alert('Thank you! Our concierge team will review your listing and contact you shortly.');
                  onClose();
                }}
                className="w-full bg-dark text-white py-4 rounded-xl font-bold hover:bg-accent transition-all shadow-xl shadow-dark/10"
              >
                Submit Listing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
