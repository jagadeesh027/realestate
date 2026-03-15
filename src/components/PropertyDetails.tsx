import { motion, AnimatePresence } from 'motion/react';
import { X, Bed, Bath, Maximize, MapPin, Check, Phone, Mail } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property | null;
  onClose: () => void;
}

export function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <AnimatePresence>
      {property && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gold hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-1.5 bg-gold text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg">
                  {property.type}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
              <div className="mb-8">
                <div className="flex items-center text-gold font-medium text-sm mb-2 tracking-widest uppercase">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {property.location}
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4">{property.title}</h2>
                <p className="text-3xl font-bold text-dark">{formattedPrice}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-paper rounded-2xl border border-black/5">
                <div className="text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-sm font-bold">{property.beds}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Beds</p>
                </div>
                <div className="text-center border-x border-black/10">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-sm font-bold">{property.baths}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Baths</p>
                </div>
                <div className="text-center">
                  <Maximize className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-sm font-bold">{property.sqft.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sqft</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-serif font-bold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-serif font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-y-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-dark text-white py-4 rounded-xl font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Agent
                </button>
                <button className="flex-1 border-2 border-dark text-dark py-4 rounded-xl font-bold hover:bg-dark hover:text-white transition-all flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Inquiry
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
