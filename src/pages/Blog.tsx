import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Kesalahan Umum dalam Merawat Sepatu Kulit',
      excerpt: 'Pelajari kesalahan yang sering dilakukan dan cara menghindarinya untuk menjaga sepatu kulit tetap awet dan berkilau.',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      author: 'Tim Goodlook',
      date: '2025-01-15',
      readTime: '5 min',
      category: 'Tips'
    },
    {
      id: 2,
      title: 'Perbedaan Material Sepatu: Leather vs Suede vs Canvas',
      excerpt: 'Memahami karakteristik berbagai material sepatu akan membantu Anda memberikan perawatan yang tepat.',
      image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
      author: 'Ahmad Shoe Expert',
      date: '2025-01-12',
      readTime: '7 min',
      category: 'Edukasi'
    },
    {
      id: 3,
      title: 'Cara Menghilangkan Noda Membandel pada Sepatu Putih',
      excerpt: 'Tutorial lengkap mengatasi berbagai jenis noda pada sepatu putih dengan bahan-bahan sederhana yang mudah didapat.',
      image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
      author: 'Sarah Cleaning Pro',
      date: '2025-01-10',
      readTime: '6 min',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'Peluang Bisnis Shoe Care di Era Digital',
      excerpt: 'Analisis lengkap tentang potensi bisnis shoe care dan bagaimana memanfaatkan digital marketing untuk kesuksesan.',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      author: 'Business Team',
      date: '2025-01-08',
      readTime: '10 min',
      category: 'Bisnis'
    },
    {
      id: 5,
      title: 'Tools Wajib untuk Shoe Care Professional',
      excerpt: 'Daftar lengkap peralatan yang harus dimiliki setiap profesional shoe care, dari basic hingga advanced level.',
      image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
      author: 'Equipment Expert',
      date: '2025-01-05',
      readTime: '8 min',
      category: 'Tools'
    },
    {
      id: 6,
      title: 'Tren Sepatu 2025 dan Cara Merawatnya',
      excerpt: 'Update terbaru tentang tren sepatu tahun ini dan tips khusus untuk merawat model-model terkini.',
      image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
      author: 'Fashion Team',
      date: '2025-01-03',
      readTime: '9 min',
      category: 'Trend'
    }
  ];

  const categories = ['Semua', 'Tips', 'Edukasi', 'Tutorial', 'Bisnis', 'Tools', 'Trend'];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog Goodlook Shoes</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Artikel, tips, dan panduan lengkap seputar dunia shoe care dari para ahli. 
            Tingkatkan pengetahuan dan skill Anda dengan konten berkualitas.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-900"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <div className="flex items-center space-x-2 text-yellow-400 mb-4">
                  <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                    FEATURED
                  </span>
                  <span className="text-sm">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {blogPosts[0].title}
                </h2>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center space-x-6 text-blue-200 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(blogPosts[0].date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <button className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center space-x-2">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Terbaru</h2>
            <p className="text-xl text-gray-600">Dapatkan tips dan insight terbaru dari para ahli</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-900 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span>
                      {new Date(post.date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  
                  <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2">
                    <span>Baca Artikel</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Jangan Lewatkan Update Terbaru</h2>
            <p className="text-xl text-blue-100">
              Dapatkan artikel dan tips terbaru langsung di inbox Anda
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              Gratis dan bisa unsubscribe kapan saja
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;