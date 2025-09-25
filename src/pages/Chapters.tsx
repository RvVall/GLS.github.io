import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { chapters, courses } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Chapters: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { hasAccess } = useAuth();
  
  const course = courses.find(c => c.id === courseId);
  const courseChapters = chapters.filter(c => c.courseId === courseId);

  if (!course) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kelas tidak ditemukan</h1>
          <Link to="/courses" className="text-blue-900 hover:underline">
            Kembali ke halaman kelas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link to="/courses" className="flex items-center space-x-2 text-blue-200 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke Kelas</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-blue-100">{course.description}</p>
        </div>
      </section>

      {/* Course Info */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {courseChapters.length}
              </div>
              <div className="text-gray-600">Total Bab</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                Rp {course.price.toLocaleString('id-ID')}
              </div>
              <div className="text-gray-600">Harga Paket Lengkap</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {course.duration}
              </div>
              <div className="text-gray-600">Durasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              <strong>Catatan:</strong> Bab-bab ini hanya bisa dibeli setelah memiliki akses Kelas Basic. 
              Atau Anda bisa langsung beli paket lengkap dengan harga lebih hemat.
            </p>
          </div>

          <div className="space-y-6">
            {courseChapters
              .sort((a, b) => a.order - b.order)
              .map((chapter, index) => (
                <div 
                  key={chapter.id}
                  className={`bg-white rounded-xl shadow-lg border-l-4 p-6 transition-all duration-300 hover:shadow-xl ${
                    hasAccess(chapter.id) 
                      ? 'border-l-green-500' 
                      : chapter.isLocked && !hasAccess('basic')
                      ? 'border-l-red-500 opacity-75' 
                      : 'border-l-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                          Bab {chapter.order}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{chapter.duration}</span>
                        </div>
                        {hasAccess(chapter.id) && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-semibold">Aktif</span>
                          </div>
                        )}
                        {chapter.isLocked && !hasAccess('basic') && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm font-semibold">Terkunci</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{chapter.title}</h3>
                      <p className="text-gray-600 mb-4">{chapter.description}</p>
                    </div>
                    
                    <div className="ml-6 text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        Rp {chapter.price.toLocaleString('id-ID')}
                      </div>
                      
                      {hasAccess(chapter.id) ? (
                        <button className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold cursor-default">
                          ✅ Sudah Dibeli
                        </button>
                      ) : chapter.isLocked && !hasAccess('basic') ? (
                        <div className="space-y-2">
                          <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-semibold cursor-not-allowed">
                            🔒 Terkunci
                          </button>
                          <p className="text-xs text-red-600">
                            Beli Kelas Basic dulu
                          </p>
                        </div>
                      ) : (
                        <Link
                          to={`/checkout?type=chapter&id=${chapter.id}&name=${encodeURIComponent(chapter.title)}&price=${chapter.price}`}
                          className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-block"
                        >
                          Beli Bab Ini
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Package Deal CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Hemat dengan Paket Lengkap!</h3>
            <p className="mb-6 text-blue-100">
              Daripada beli per bab (total: Rp {(courseChapters.length * 49000).toLocaleString('id-ID')}), 
              lebih hemat beli paket lengkap dengan bonus alat senilai 150rb
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-sm text-blue-200">Harga Satuan</div>
                <div className="text-xl line-through text-red-300">
                  Rp {(courseChapters.length * 49000).toLocaleString('id-ID')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-yellow-200">Harga Paket</div>
                <div className="text-3xl font-bold text-yellow-400">
                  Rp {course.price.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
            <Link
              to={`/checkout?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`}
              className="inline-block mt-6 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Beli Paket Lengkap Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chapters;