import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-900 opacity-20 mb-4">404</h1>
            <div className="relative -mt-20">
              <img 
                src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" 
                alt="Lost shoe"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                <Search className="h-6 w-6 text-blue-900" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Oops! Halaman Tidak Ditemukan
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              Sepertinya halaman yang Anda cari telah hilang atau mungkin tidak pernah ada. 
              Mari kembali ke jalur yang benar!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Halaman Sebelumnya</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Halaman Populer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/courses"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-blue-900 group-hover:scale-110 transition-transform mb-2">
                  📚
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-900">Kelas</h4>
                <p className="text-sm text-gray-600">Lihat semua kelas</p>
              </Link>
              
              <Link
                to="/products"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-blue-900 group-hover:scale-110 transition-transform mb-2">
                  🛒
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-900">Produk</h4>
                <p className="text-sm text-gray-600">Katalog lengkap</p>
              </Link>
              
              <Link
                to="/service"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-blue-900 group-hover:scale-110 transition-transform mb-2">
                  🔧
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-900">Servis</h4>
                <p className="text-sm text-gray-600">Layanan premium</p>
              </Link>
              
              <Link
                to="/blog"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-blue-900 group-hover:scale-110 transition-transform mb-2">
                  📰
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-900">Blog</h4>
                <p className="text-sm text-gray-600">Tips & artikel</p>
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">Masih butuh bantuan?</p>
            <a
              href="https://wa.me/62089663344222?text=Halo%20admin%20Goodlook%20Shoes,%20saya%20menemukan%20error%20404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <span>💬</span>
              <span>Hubungi Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;