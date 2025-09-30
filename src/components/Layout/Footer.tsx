import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold">Goodlook Shoes</span>
            </div>
            <p className="text-gray-400 text-sm">
              Platform edukasi dan layanan premium untuk perawatan sepatu terbaik di Indonesia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Utama</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Beranda
              </Link>
              <Link to="/courses" className="block text-gray-400 hover:text-white transition-colors">
                Kelas
              </Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">
                Produk
              </Link>
              <Link to="/service" className="block text-gray-400 hover:text-white transition-colors">
                Servis
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Kelas Online</p>
              <p className="text-gray-400">Servis Sepatu</p>
              <p className="text-gray-400">Servis Tas</p>
              <p className="text-gray-400">Servis Topi & Helm</p>
              <p className="text-gray-400">Produk Perawatan</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 text-sm">info@goodlookshoes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 text-sm">089663344222</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div className="text-gray-400 text-sm">
                    <p className="font-semibold text-white mb-1">Lokasi Toko:</p>
                    <p>• Graha Kota Sidoarjo</p>
                    <p>• Sukodono, Sidoarjo</p>
                    <p>• Graha Pena Surabaya</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/62089663344222?text=Halo%20admin%20Goodlook%20Shoes,%20saya%20butuh%20bantuan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
            
            {/* Quick Map Links */}
            <div className="mt-4 space-y-2">
              <p className="text-white font-semibold text-sm">Lihat di Maps:</p>
              <div className="space-y-1">
                <a 
                  href="https://maps.google.com/?q=Graha+Kota+Sidoarjo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-yellow-400 hover:text-yellow-300 text-xs"
                >
                  📍 Graha Kota Sidoarjo
                </a>
                <a 
                  href="https://maps.google.com/?q=Sukodono+Sidoarjo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-yellow-400 hover:text-yellow-300 text-xs"
                >
                  📍 Sukodono Sidoarjo
                </a>
                <a 
                  href="https://maps.google.com/?q=Graha+Pena+Surabaya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-yellow-400 hover:text-yellow-300 text-xs"
                >
                  📍 Graha Pena Surabaya
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Goodlook Shoes. All rights reserved. Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;