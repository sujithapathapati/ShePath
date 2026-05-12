import React, { useState } from 'react';
import { X, Building, User, Mail, Phone, MapPin, Globe, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Employer } from '../../types';

interface EmployerAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployerAuth({ isOpen, onClose }: EmployerAuthProps) {
  const { dispatch } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    website: '',
    companySize: '',
    industry: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const mockEmployer: Employer = {
        id: '1',
        companyName: 'Tech Solutions Pvt Ltd',
        contactPerson: formData.contactPerson || 'Rohini',
        email: formData.email,
        phoneNumber: '+91 9876543210',
        address: 'Hyderabad, Telangana',
        website: 'www.techsolutions.com',
        companySize: '50-100',
        industry: 'Technology',
        verified: true,
        dateRegistered: new Date().toISOString()
      };
      dispatch({ type: 'SET_EMPLOYER', payload: mockEmployer });
      dispatch({ type: 'SET_EMPLOYER_AUTHENTICATED', payload: true }); // ✅ New line
    } else {
      const newEmployer: Employer = {
        id: Date.now().toString(),
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        website: formData.website,
        companySize: formData.companySize,
        industry: formData.industry,
        verified: false,
        dateRegistered: new Date().toISOString()
      };
      dispatch({ type: 'SET_EMPLOYER', payload: newEmployer });
      dispatch({ type: 'SET_EMPLOYER_AUTHENTICATED', payload: true }); // ✅ New line
    }

    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-lavender-200">
          <h2 className="text-2xl font-bold text-charcoal-900">
            {isLogin ? 'Employer Login' : 'Register as Employer'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-charcoal-600 hover:bg-lavender-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Contact Person Name"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="text"
                  name="address"
                  placeholder="Company Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <input
                  type="url"
                  name="website"
                  placeholder="Company Website (Optional)"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-500">101-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Finance">Finance</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-plum-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-plum-500 to-ochre-500 text-white py-3 rounded-lg hover:from-plum-600 hover:to-ochre-600 transition-all font-medium"
          >
            {isLogin ? 'Sign In' : 'Register Company'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-plum-600 hover:text-plum-700 font-medium"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
