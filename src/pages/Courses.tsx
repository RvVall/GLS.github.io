import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Star, CheckCircle, Lock } from 'lucide-react';
import { courses } from '../data/mockData';

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Kelas Shoe Care Professional</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Pilih level kelas yang sesuai dengan kebutuhan dan kemampuan Anda. 
            Dari basic hingga advanced, semua dirancang untuk kesuksesan Anda.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.level === 'Basic' 
                        ? 'bg-green-100 text-green-800'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  {course.requirements && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white p-2 rounded-full">
                        <Lock className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.chapters} Bab</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Star className="h-4 w-4" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">Manfaat:</h4>
                    {course.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {course.requirements && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-800 text-sm">
                        <strong>Persyaratan:</strong> {course.requirements.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      Rp {course.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-500">
                      /kelas lengkap
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to={`/checkout?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                        course.requirements
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-900 text-white hover:bg-blue-800 hover:scale-105'
                      }`}
                    >
                      {course.requirements ? 'Terkunci' : 'Beli Sekarang'}
                    </Link>
                    
                    <Link
                      to={`/chapters/${course.id}`}
                      className="w-full py-3 px-6 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold text-center hover:bg-blue-50 transition-colors block"
                    >
                      Lihat Detail Bab
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Catatan Penting</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                ✅ <strong>Kelas Basic</strong> dapat dibeli langsung dan cocok untuk pemula
              </p>
              <p>
                🔒 <strong>Kelas Intermediate</strong> hanya bisa dibuka setelah menyelesaikan Basic
              </p>
              <p>
                🔒 <strong>Kelas Advanced</strong> hanya bisa dibuka setelah menyelesaikan Intermediate
              </p>
              <p className="text-blue-900 font-semibold">
                Sistem ini dirancang untuk memastikan Anda menguasai fundamental sebelum lanjut ke level berikutnya
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;