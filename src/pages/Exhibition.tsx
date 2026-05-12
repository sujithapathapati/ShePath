import React, { useState } from 'react';
import { Upload, Plus, Star, MapPin, Phone, Mail, Camera, Package, DollarSign } from 'lucide-react';
import { useVoiceAssistant } from '../contexts/VoiceAssistantContext';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  quantity: number;
  images: string[];
  seller: {
    name: string;
    location: string;
    rating: number;
    phone: string;
  };
  featured?: boolean;
}

const Exhibition: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { speak } = useVoiceAssistant();

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    priceRange: '',
    quantity: '',
    contactPhone: '',
    contactEmail: '',
    location: ''
  });

  const categories = [
    'all',
    'Handicrafts',
    'Textiles',
    'Food Products',
    'Jewelry',
    'Home Decor',
    'Beauty Products',
    'Art & Paintings'
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Traditional Bandhani Sarees',
      category: 'Textiles',
      description: 'Beautiful handwoven Bandhani sarees with traditional patterns and vibrant colors.',
      price: '₹2,500 - ₹5,000',
      quantity: 15,
      images: ['https://images.pexels.com/photos/8839754/pexels-photo-8839754.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Kamala Devi',
        location: 'Jaipur, Rajasthan',
        rating: 4.8,
        phone: '+91 9876543210'
      },
      featured: true
    },
    {
      id: '2',
      name: 'Handmade Clay Pottery',
      category: 'Handicrafts',
      description: 'Eco-friendly clay pots, vases, and decorative items made with traditional techniques.',
      price: '₹150 - ₹800',
      quantity: 25,
      images: ['https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Sunita Kumari',
        location: 'Khurja, Uttar Pradesh',
        rating: 4.6,
        phone: '+91 9123456789'
      }
    },
    {
      id: '3',
      name: 'Organic Spice Blends',
      category: 'Food Products',
      description: 'Home-ground organic spice mixes with authentic regional flavors.',
      price: '₹80 - ₹300',
      quantity: 50,
      images: ['https://images.pexels.com/photos/4198178/pexels-photo-4198178.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Priya Sharma',
        location: 'Hyderabad, Telangana',
        rating: 4.9,
        phone: '+91 9567891234'
      },
      featured: true
    },
    {
      id: '4',
      name: 'Silver Jewelry Collection',
      category: 'Jewelry',
      description: 'Handcrafted silver jewelry with traditional and contemporary designs.',
      price: '₹500 - ₹3,000',
      quantity: 20,
      images: ['https://images.pexels.com/photos/1454735/pexels-photo-1454735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Rekha Patel',
        location: 'Ahmedabad, Gujarat',
        rating: 4.7,
        phone: '+91 9834567890'
      }
    },
    {
      id: '5',
      name: 'Embroidered Cushion Covers',
      category: 'Home Decor',
      description: 'Beautiful hand-embroidered cushion covers with mirror work and traditional motifs.',
      price: '₹200 - ₹600',
      quantity: 30,
      images: ['https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Meera Singh',
        location: 'Lucknow, Uttar Pradesh',
        rating: 4.5,
        phone: '+91 9712345678'
      }
    },
    {
      id: '6',
      name: 'Natural Herbal Soaps',
      category: 'Beauty Products',
      description: 'Chemical-free herbal soaps made with natural ingredients and essential oils.',
      price: '₹60 - ₹150',
      quantity: 100,
      images: ['https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: {
        name: 'Asha Reddy',
        location: 'Bangalore, Karnataka',
        rating: 4.8,
        phone: '+91 9645123789'
      }
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    speak(`Product ${formData.productName} registered successfully`);
    alert('Product registered successfully! We will review and list it shortly.');
    setFormData({
      productName: '',
      category: '',
      description: '',
      priceRange: '',
      quantity: '',
      contactPhone: '',
      contactEmail: '',
      location: ''
    });
    setShowRegistrationForm(false);
  };

  const handleContactSeller = (seller: any) => {
    speak(`Contacting ${seller.name} from ${seller.location}`);
    alert(`Contact ${seller.name} at ${seller.phone}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
          Women's Product Exhibition
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Showcase your handmade products and connect with customers across the country
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={() => setShowRegistrationForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Register Your Product
        </button>
        <button className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-500 hover:bg-primary-50 transition-all duration-200">
          <MapPin className="h-5 w-5 mr-2" />
          Find Local Exhibitions
        </button>
      </div>

      {/* Featured Products */}
      {filteredProducts.some(p => p.featured) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.featured).map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-accent-200">
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">{product.name}</h3>
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary-600">{product.price}</span>
                    <span className="text-sm text-neutral-500">{product.quantity} available</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.seller.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">{product.seller.rating}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">{product.seller.name}</p>
                        <p className="text-sm text-neutral-600">{product.seller.location}</p>
                      </div>
                      <button
                        onClick={() => handleContactSeller(product.seller)}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
              }`}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.filter(p => !p.featured).map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-800">{product.name}</h3>
                <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                  {product.category}
                </span>
              </div>
              
              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary-600">{product.price}</span>
                <span className="text-sm text-neutral-500">{product.quantity} available</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.seller.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">{product.seller.rating}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-800">{product.seller.name}</p>
                    <p className="text-sm text-neutral-600">{product.seller.location}</p>
                  </div>
                  <button
                    onClick={() => handleContactSeller(product.seller)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">Register Your Product</h2>
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Product Name *
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        name="productName"
                        required
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter product name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your product, materials used, and unique features"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price Range *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        name="priceRange"
                        required
                        value={formData.priceRange}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., ₹500 - ₹1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Available Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Number of items"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Contact Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <input
                        type="tel"
                        name="contactPhone"
                        required
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600 mb-2">Upload product images</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      Choose Files
                    </button>
                    <p className="text-xs text-neutral-500 mt-2">
                      Upload up to 5 images (JPG, PNG, max 2MB each)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                  >
                    Register Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exhibition;