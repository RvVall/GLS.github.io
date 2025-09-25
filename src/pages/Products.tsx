import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Star, Tag } from 'lucide-react';
import { products } from '../data/mockData';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Tools', 'Chemicals', 'Care'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Katalog Produk Premium</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Koleksi lengkap produk perawatan sepatu berkualitas tinggi. 
            Semua yang Anda butuhkan untuk hasil professional.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-900 text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'Semua Produk' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                  {product.inBasicPackage && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <Package className="h-3 w-3" />
                        <span>Bonus</span>
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.8)</span>
                  </div>

                  {product.inBasicPackage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-green-800 text-sm flex items-center space-x-2">
                        <Tag className="h-4 w-4" />
                        <span>Termasuk dalam Paket Kelas Basic</span>
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    
                    <Link
                      to={`/checkout?type=product&id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}`}
                      className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Beli</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Hemat dengan Paket Bundling!</h2>
            <p className="text-xl text-blue-100">
              Dapatkan semua produk basic + akses kelas lengkap dengan harga special
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Beli Terpisah</h3>
                <div className="space-y-2 text-blue-100">
                  <p>Kelas Basic: Rp 299.000</p>
                  <p>Produk Tools: Rp 175.000</p>
                  <p className="border-t pt-2 font-bold text-white">Total: Rp 474.000</p>
                </div>
              </div>
              
              <div className="bg-yellow-500 text-blue-900 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                  HEMAT!
                </div>
                <h3 className="text-xl font-bold mb-4">Paket Bundling</h3>
                <div className="space-y-2">
                  <p>Kelas Basic + Tools</p>
                  <p className="text-2xl font-bold">Rp 299.000</p>
                  <p className="text-sm">Hemat Rp 175.000!</p>
                </div>
              </div>
            </div>
            
            <Link
              to="/courses"
              className="inline-block bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              Ambil Paket Bundling Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;