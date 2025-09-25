import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { BookOpen, ShoppingBag, Clock, CheckCircle, AlertCircle, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, updatePurchaseStatus } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Simulate admin confirmation for demo
  const handleSimulateConfirmation = (invoiceId: string) => {
    if (window.confirm('Simulasi: Konfirmasi pembayaran sebagai admin?')) {
      updatePurchaseStatus(invoiceId, 'confirmed');
      setTimeout(() => {
        updatePurchaseStatus(invoiceId, 'active');
      }, 2000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            <CheckCircle className="h-4 w-4" />
            <span>Aktif</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            <Clock className="h-4 w-4" />
            <span>Dikonfirmasi</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
            <AlertCircle className="h-4 w-4" />
            <span>Menunggu Konfirmasi</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-blue-100">Selamat datang kembali, {user.name}!</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200">Member sejak</p>
              <p className="font-semibold">2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{user.courses.length}</span>
              </div>
              <p className="text-gray-600">Kelas Aktif</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{user.purchases.length}</span>
              </div>
              <p className="text-gray-600">Total Pembelian</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {Math.round((user.purchases.filter(p => p.status === 'active').length / Math.max(user.purchases.length, 1)) * 100)}%
                </span>
              </div>
              <p className="text-gray-600">Progress Belajar</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {user.courses.length > 0 ? user.courses.length : '0'}
                </span>
              </div>
              <p className="text-gray-600">Sertifikat</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pembelian</h2>
              
              {user.purchases.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">Belum ada pembelian</h3>
                  <p className="text-gray-400 mb-6">Mulai perjalanan belajar Anda dengan mengambil kelas pertama</p>
                  <Link
                    to="/courses"
                    className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Lihat Kelas
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.purchases
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{purchase.itemName}</h3>
                            <p className="text-sm text-gray-600 capitalize">{purchase.type}</p>
                          </div>
                          {getStatusBadge(purchase.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Tanggal</p>
                            <p>{new Date(purchase.date).toLocaleDateString('id-ID')}</p>
                          </div>
                          <div>
                            <p className="font-medium">Harga</p>
                            <p>Rp {purchase.price.toLocaleString('id-ID')}</p>
                          </div>
                          <div>
                            <p className="font-medium">Invoice</p>
                            <p className="font-mono text-xs">{purchase.invoiceId}</p>
                          </div>
                          <div className="flex items-end">
                            {purchase.status === 'pending' && (
                              <button
                                onClick={() => handleSimulateConfirmation(purchase.invoiceId)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                              >
                                [DEMO] Konfirmasi
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Menu Cepat</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="block w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center"
                >
                  Lihat Kelas
                </Link>
                <Link
                  to="/products"
                  className="block w-full border border-blue-900 text-blue-900 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Beli Produk
                </Link>
                <Link
                  to="/service"
                  className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  Servis Barang
                </Link>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Progress Belajar</h3>
              
              {user.courses.length > 0 ? (
                <div className="space-y-4">
                  {user.courses.map((courseId, index) => (
                    <div key={courseId} className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Kelas {courseId.charAt(0).toUpperCase() + courseId.slice(1)}</h4>
                      <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
                        <div 
                          className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(index + 1) * 30}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-blue-100">{(index + 1) * 30}% Selesai</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                  <p className="text-blue-100">Belum ada kelas aktif</p>
                </div>
              )}
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Achievement</h3>
              <div className="text-center">
                <Award className="h-12 w-12 mx-auto mb-3" />
                <p className="font-semibold">
                  {user.courses.length > 0 
                    ? `${user.courses.length} Kelas Diselesaikan`
                    : 'Siap Memulai Perjalanan'
                  }
                </p>
                <p className="text-sm opacity-80">
                  {user.courses.length > 0 
                    ? 'Terus belajar untuk unlock achievement berikutnya!'
                    : 'Ambil kelas pertama untuk mendapatkan achievement!'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;