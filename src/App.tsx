import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MapPin, ChevronDown, Building2, Home, LayoutGrid, Sparkles, X } from 'lucide-react';
import { PROPERTIES } from './data';
import { Property } from './types';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetails } from './components/PropertyDetails';
import { AIChat } from './components/AIChat';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar styling
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
    }
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || p.type === selectedType;
      const matchesNeighborhood = selectedNeighborhood === 'All' || p.location.includes(selectedNeighborhood);
      return matchesSearch && matchesType && matchesNeighborhood;
    });
  }, [searchQuery, selectedType, selectedNeighborhood]);

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Mansion'];

  const neighborhoods = useMemo(() => {
    const counts = PROPERTIES.reduce((acc, p) => {
      const city = p.location.split(',')[0];
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Malibu', image: 'https://images.unsplash.com/photo-1510133769068-68884a1273ea?auto=format&fit=crop&q=80&w=800', count: counts['Malibu'] || 0 },
      { name: 'Manhattan', image: 'https://images.unsplash.com/photo-1496871455396-14e56815f1f4?auto=format&fit=crop&q=80&w=800', count: counts['Manhattan'] || 0 },
      { name: 'Tuscany', image: 'https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&q=80&w=800', count: counts['Tuscany'] || 0 },
      { name: 'Dubai', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', count: counts['Dubai'] || 0 },
      { name: 'Aspen', image: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=800', count: counts['Aspen'] || 0 },
      { name: 'Kyoto', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800', count: counts['Kyoto'] || 0 }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-paper selection:bg-gold/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-dark rounded-xl flex items-center justify-center">
              <Building2 className="text-gold w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-dark">
              Luxe<span className="text-gold">Estate</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Properties', id: 'properties' },
              { name: 'Neighborhoods', id: 'neighborhoods' },
              { name: 'Market Insights', id: 'market-insights' },
              { name: 'About', id: 'about' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-semibold tracking-widest uppercase text-dark/60 hover:text-gold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => alert('Property listing feature coming soon!')}
            className="px-6 py-2.5 bg-dark text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-gold transition-all shadow-lg shadow-dark/10"
          >
            List Property
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Home"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-paper" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md text-gold text-xs font-bold tracking-[0.3em] uppercase rounded-full mb-6 border border-gold/30">
              Redefining Luxury Living
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1]">
              Find Your <span className="italic text-gold">Masterpiece</span>
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 border border-white/20">
              <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-black/5">
                <Search className="text-gold w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by location or property name..."
                  className="bg-transparent w-full focus:outline-none text-dark font-medium placeholder:text-dark/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 py-3 gap-3 min-w-[160px]">
                <LayoutGrid className="text-gold w-5 h-5" />
                <select 
                  className="bg-transparent w-full focus:outline-none text-dark font-bold appearance-none cursor-pointer"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="text-dark/40 w-4 h-4" />
              </div>
              <button className="bg-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-gold transition-all shadow-lg shadow-dark/20">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <main id="properties" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-gold font-bold text-xs tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              Showing {filteredProperties.length} of {PROPERTIES.length} Masterpieces
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark leading-tight">
              Exceptional Properties <br />
              <span className="text-dark/40">for Exceptional People</span>
            </h2>
            {(selectedType !== 'All' || selectedNeighborhood !== 'All' || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setSelectedType('All');
                  setSelectedNeighborhood('All');
                  setSearchQuery('');
                }}
                className="mt-6 text-gold font-bold text-xs tracking-widest uppercase hover:text-dark transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
          
          <div className="flex gap-3 flex-wrap justify-end">
            {propertyTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                  selectedType === type 
                    ? 'bg-dark text-white border-dark shadow-lg' 
                    : 'bg-white text-dark/60 border-black/5 hover:border-gold hover:text-gold'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onClick={setSelectedProperty}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-32 bg-paper rounded-3xl border-2 border-dashed border-black/5">
            <LayoutGrid className="w-16 h-16 text-dark/10 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold text-dark mb-2">No properties found</h3>
            <p className="text-dark/40">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </main>

      {/* Neighborhoods Section */}
      <section id="neighborhoods" className="bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Explore Locations</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">World-Class Neighborhoods</h2>
              <p className="text-white/40">Discover the most sought-after communities across the globe.</p>
            </div>
            {selectedNeighborhood !== 'All' && (
              <button 
                onClick={() => setSelectedNeighborhood('All')}
                className="px-6 py-2.5 bg-gold text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white hover:text-dark transition-all shadow-lg"
              >
                View All Neighborhoods
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((loc) => (
              <motion.div 
                key={loc.name} 
                whileHover={{ y: -10 }}
                onClick={() => {
                  setSelectedNeighborhood(loc.name);
                  document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedNeighborhood === loc.name ? 'border-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-transparent'
                }`}
              >
                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">{loc.name}</h3>
                  <p className="text-gold text-xs font-bold tracking-widest uppercase">{loc.count} Properties</p>
                </div>
                {selectedNeighborhood === loc.name && (
                  <div className="absolute top-4 right-4 bg-gold text-white p-2 rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section id="market-insights" className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="Market Data" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">Market Insights & Trends</h2>
              <p className="text-dark/60 text-lg leading-relaxed mb-8">
                Stay ahead of the curve with our exclusive market reports. We analyze global luxury real estate data to provide you with actionable intelligence on investment opportunities and emerging markets.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Global Luxury Index', value: '+8.4%' },
                  { title: 'Average Yield', value: '4.2%' },
                  { title: 'Market Sentiment', value: 'Bullish' }
                ].map((stat) => (
                  <div key={stat.title} className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="font-serif font-bold text-dark">{stat.title}</span>
                    <span className="text-gold font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Legacy</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-8">Defining Excellence Since 1998</h2>
          <p className="text-dark/60 text-xl leading-relaxed mb-12">
            LuxeEstate was founded on a simple principle: to provide an unparalleled experience for the world's most discerning property seekers. Today, we are the global leader in luxury real estate, representing the most iconic estates and connecting a community of visionaries.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Founded', val: '1998' },
              { label: 'Offices', val: '42' },
              { label: 'Agents', val: '1.2k' },
              { label: 'Sales', val: '$18B+' }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-serif font-bold text-dark mb-1">{stat.val}</p>
                <p className="text-gold text-[10px] font-bold tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Luxe<span className="text-gold">Estate</span>
              </span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-md mb-8">
              The world's most prestigious real estate platform. We connect high-net-worth individuals with the most exclusive properties across the globe.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/40 rounded-sm" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-gold font-bold text-xs tracking-widest uppercase mb-8">Company</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold text-xs tracking-widest uppercase mb-8">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">Get the latest market insights and exclusive listings.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold font-bold text-xs uppercase tracking-widest">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-xs font-bold tracking-widest uppercase">
          <p>© 2026 LuxeEstate. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <PropertyDetails 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
      <AIChat />

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}

