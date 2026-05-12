import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; 
const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-1 rounded-lg group-hover:scale-105 transition-transform">
  <img src={logo} alt="ShePath Logo" className="h-8 w-8 rounded-md" />
</div>
              <span className="font-display font-bold text-xl">ShePath</span>
            </div>
            <p className="text-neutral-300 mb-6 max-w-md">
              Empowering women through opportunities. ShePath connects women with job opportunities, 
              skill training, and exhibition platforms to achieve sustainable development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-neutral-300 hover:text-primary-400 transition-colors">Job Opportunities</Link></li>
              <li><Link to="/skills" className="text-neutral-300 hover:text-primary-400 transition-colors">Skill Training</Link></li>
              <li><Link to="/exhibition" className="text-neutral-300 hover:text-primary-400 transition-colors">Product Exhibition</Link></li>
              <li><Link to="/support" className="text-neutral-300 hover:text-primary-400 transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-neutral-300">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Mail className="h-4 w-4" />
                <span>shepath2025@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <MapPin className="h-4 w-4" />
                <span>Gajuwaka Visakhapatnam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 ShePath. All rights reserved. Supporting UN SDG 8.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">About SDG 8</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;