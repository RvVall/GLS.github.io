import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, ShoppingBag, Clock, CheckCircle, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, getAllUsers, getAllPurchases, updatePurchaseStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  const allUsers = getAllUsers();
  const allPurchases = getAllPurchases();
  const pendingPurchases = allPurchases.filter(p => p.status === 'pending');
  const totalRevenue = allPurchases
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.price, 0);

  const handleConfirmPayment = (invoiceId: string) => {
    if (window.confirm('Konfirmasi pembayaran ini?')) {
      updatePurchaseStatus(invoiceId, 'confirmed');
      setTimeout(() => {
        updatePurchaseStatus(invoiceId, 'active');
      }, 1000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircle className="h-3 w-3" />
            <span>Aktif</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            <Clock className="h-3 w-3" />
            <span>Dikonfirmasi</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
            <AlertCircle className="h-3 w-3" />
            <span>Pending</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Kelola platform Goodlook Shoes</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{allUsers.length}</span>
              </div>
              <p className="text-gray-600">Total Users</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{allPurchases.length}</span>
              </div>
              <p className="text-gray-600">Total Transaksi</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900">{pendingPurchases.length}</span>
              </div>
              <p className="text-gray-600">Pending Konfirmasi</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'purchases'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Transaksi ({pendingPurchases.length} pending)
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Platform Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Transaksi Hari Ini</h3>
                    <p className="text-3xl font-bold">
                      {allPurchases.filter(p => 
                        new Date(p.date).toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Revenue Hari Ini</h3>
                    <p className="text-3xl font-bold">
                      Rp {allPurchases
                        .filter(p => 
                          new Date(p.date).toDateString() === new Date().toDateString() &&
                          p.status === 'active'
                        )
                        .reduce((sum, p) => sum + p.price, 0)
                        .toLocaleString('id-ID')
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    ⚠️ Perlu Perhatian ({pendingPurchases.length} item)
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    Ada {pendingPurchases.length} transaksi yang menunggu konfirmasi pembayaran
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Kelola Transaksi</h2>
                
                {allPurchases.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada transaksi</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allPurchases
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((purchase) => (
                        <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{purchase.itemName}</h3>
                              <p className="text-sm text-gray-600 capitalize">{purchase.type}</p>
                            </div>
                            {getStatusBadge(purchase.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-3">
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
                            <div>
                              <p className="font-medium">User ID</p>
                              <p className="font-mono text-xs">{purchase.id.slice(0, 8)}...</p>
                            </div>
                            <div className="flex items-end">
                              {purchase.status === 'pending' && (
                                <button
                                  onClick={() => handleConfirmPayment(purchase.invoiceId)}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700"
                                >
                                  Konfirmasi
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
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Kelola Users</h2>
                
                {allUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada user terdaftar</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kelas
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaksi
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Spent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.courses.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.purchases?.length || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Rp {(user.purchases?.reduce((sum, p) => sum + p.price, 0) || 0).toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;