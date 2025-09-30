import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Master <span className="text-yellow-400">Shoe Care</span> Skills
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Platform edukasi dan layanan premium untuk perawatan sepatu. Dari basic hingga advanced, 
                  pelajari teknik profesional dan mulai bisnis Anda sendiri.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 text-center"
                >
                  Daftar Kelas Sekarang
                </Link>
                <Link
                  to="/products"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 text-center"
                >
                  Lihat Produk
                </Link>
                <Link
                  to="/service"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 text-center"
                >
                  Servis Sepatu
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-blue-100">Alumni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">4.9</div>
                  <div className="text-blue-100">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">95%</div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 p-1 rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                  alt="Professional shoe care"
                  className="w-full rounded-xl object-cover h-96"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20 rounded-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="bg-white bg-opacity-90 text-blue-900 p-4 rounded-full hover:bg-opacity-100 transition-all duration-300 hover:scale-110">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Kenapa Memilih Goodlook Shoes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform all-in-one untuk semua kebutuhan perawatan sepatu Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Kelas Profesional</h3>
              <p className="text-gray-600">
                Kurikulum terstruktur dari basic hingga advanced dengan mentor berpengalaman
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Layanan Lengkap</h3>
              <p className="text-gray-600">
                Dari edukasi, produk, hingga layanan servis premium untuk berbagai jenis barang
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Peluang Bisnis</h3>
              <p className="text-gray-600">
                Belajar skill yang profitable dan mulai bisnis shoe care dengan modal minim
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Manfaat Belajar di Goodlook Shoes
                </h2>
                <p className="text-xl text-gray-600">
                  Raih berbagai keuntungan dengan bergabung dalam program edukasi kami
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Skill yang Profitable</h3>
                    <p className="text-gray-600">Pelajari keahlian yang bisa langsung menghasilkan uang</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Modal Bisnis Minim</h3>
                    <p className="text-gray-600">Mulai bisnis shoe care dengan modal di bawah 1 juta</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Komunitas Supportive</h3>
                    <p className="text-gray-600">Bergabung dengan komunitas shoe care professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Sertifikasi Resmi</h3>
                    <p className="text-gray-600">Dapatkan sertifikat yang diakui industri</p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/courses"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300"
              >
                Mulai Belajar Sekarang
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg"
                alt="Learning benefits"
                className="w-full rounded-xl object-cover h-96 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Kata Alumni Kami</h2>
            <p className="text-xl text-blue-100">Dengarkan pengalaman mereka yang sudah berhasil</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-800 p-8 rounded-xl hover:bg-blue-700 transition-colors">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">"{testimonial.message}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-blue-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-blue-900">Lokasi Toko Kami</h2>
            <p className="text-xl text-blue-800">Kunjungi langsung toko fisik kami di 3 lokasi strategis</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Graha Kota Sidoarjo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2!2d112.7!3d-7.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjcnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Graha Kota Sidoarjo</h3>
                <p className="text-gray-600 mb-4">Jl. Ahmad Yani, Sidoarjo, Jawa Timur</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 Lantai Dasar, Dekat Food Court</p>
                  <p>🕒 Senin - Minggu: 09:00 - 21:00</p>
                  <p>📞 089663344222</p>
                </div>
              </div>
            </div>

            {/* Sukodono Sidoarjo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.5!2d112.72!3d-7.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjgnNDguMCJTIDExMsKwNDMnMTIuMCJF!5e0!3m2!1sen!2sid!4v1234567891"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Sukodono Sidoarjo</h3>
                <p className="text-gray-600 mb-4">Jl. Raya Sukodono, Sidoarjo, Jawa Timur</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 Ruko Sukodono Square</p>
                  <p>🕒 Senin - Minggu: 08:00 - 20:00</p>
                  <p>📞 089663344222</p>
                </div>
              </div>
            </div>

            {/* Graha Pena Surabaya */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2!2d112.75!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDAuMCJTIDExMsKwNDUnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567892"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Graha Pena Surabaya</h3>
                <p className="text-gray-600 mb-4">Jl. Ahmad Yani No.88, Surabaya, Jawa Timur</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 Lantai 1, Wing A</p>
                  <p>🕒 Senin - Minggu: 10:00 - 22:00</p>
                  <p>📞 089663344222</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-blue-900">
              Siap Memulai Perjalanan Anda?
            </h2>
            <p className="text-xl text-blue-800">
              Bergabunglah dengan ribuan orang yang sudah merasakan manfaat program kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all duration-300"
              >
                Daftar Kelas
              </Link>
              <Link
                to="/service"
                className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 hover:text-white transition-all duration-300"
              >
                Servis Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;