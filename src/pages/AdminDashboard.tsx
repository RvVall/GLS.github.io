import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Users, ShoppingBag, Clock, CheckCircle, AlertCircle, DollarSign, 
  TrendingUp, Plus, Edit, Trash2, Save, X, Upload, BookOpen, Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { courses, chapters, products } from '../data/mockData';
import type { Course, Chapter, Product, Material } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { 
    user, isAdmin, getAllUsers, getAllPurchases, updatePurchaseStatus,
    updateUserAccess, deleteUser, updateUserRole, addCourse, updateCourse, deleteCourse,
    addChapter, updateChapter, deleteChapter, addProduct, updateProduct, deleteProduct
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Yakin ingin menghapus user ini?')) {
      deleteUser(userId);
    }
  };

  const handleUpdateUserAccess = (userId: string, courses: string[], chapters: string[]) => {
    updateUserAccess(userId, courses, chapters);
    setSelectedUser(null);
  };

  const handleSaveEdit = (type: 'course' | 'chapter' | 'product', data: any) => {
    if (editingItem.id) {
      // Update existing
      if (type === 'course') updateCourse(editingItem.id, data);
      else if (type === 'chapter') updateChapter(editingItem.id, data);
      else if (type === 'product') updateProduct(editingItem.id, data);
    } else {
      // Add new
      if (type === 'course') addCourse(data);
      else if (type === 'chapter') addChapter(data);
      else if (type === 'product') addProduct(data);
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDelete = (type: 'course' | 'chapter' | 'product', id: string) => {
    if (window.confirm('Yakin ingin menghapus item ini?')) {
      if (type === 'course') deleteCourse(id);
      else if (type === 'chapter') deleteChapter(id);
      else if (type === 'product') deleteProduct(id);
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
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'purchases', name: `Transaksi (${pendingPurchases.length})`, icon: ShoppingBag },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'courses', name: 'Kelas', icon: BookOpen },
                { id: 'chapters', name: 'Bab', icon: BookOpen },
                { id: 'products', name: 'Produk', icon: Package }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Kelola Users</h2>
                </div>
                
                {allUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada user terdaftar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allUsers.map((user) => (
                      <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                              <span className="text-xs text-gray-500">
                                {user.courses.length} kelas • {user.purchases?.length || 0} transaksi
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                            >
                              Edit Access
                            </button>
                            <button
                              onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                              className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700"
                            >
                              Toggle Admin
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Akses Kelas:</p>
                            <p className="text-gray-600">
                              {user.courses.length > 0 ? user.courses.join(', ') : 'Tidak ada'}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Total Spent:</p>
                            <p className="text-gray-600">
                              Rp {(user.purchases?.reduce((sum, p) => sum + p.price, 0) || 0).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* User Access Modal */}
                {selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                      <h3 className="text-lg font-bold mb-4">Edit Access - {selectedUser.name}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Kelas yang Bisa Diakses:</label>
                          <div className="space-y-2">
                            {courses.map(course => (
                              <label key={course.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={selectedUser.courses.includes(course.id)}
                                  className="mr-2"
                                />
                                <span className="text-sm">{course.title}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                              const selectedCourses = Array.from(checkboxes).map((cb: any) => 
                                courses[Array.from(cb.parentNode.parentNode.children).indexOf(cb.parentNode)].id
                              );
                              handleUpdateUserAccess(selectedUser.id, selectedCourses, []);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setSelectedUser(null)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Kelola Kelas</h2>
                  <button
                    onClick={() => {
                      setEditingItem({});
                      setShowAddForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Tambah Kelas</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{course.level}</span>
                        <span>Rp {course.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(course)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center space-x-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete('course', course.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chapters' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Kelola Bab</h2>
                  <button
                    onClick={() => {
                      setEditingItem({ materials: [], tools: [] });
                      setShowAddForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Tambah Bab</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {chapters.map((chapter) => (
                    <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{chapter.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Kelas: {chapter.courseId}</span>
                            <span>Durasi: {chapter.duration}</span>
                            <span>Harga: Rp {chapter.price.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingItem(chapter)}
                            className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete('chapter', chapter.id)}
                            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Kelola Produk</h2>
                  <button
                    onClick={() => {
                      setEditingItem({});
                      setShowAddForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Tambah Produk</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{product.category}</span>
                        <span>Rp {product.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(product)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center space-x-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete('product', product.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit/Add Modal */}
        {(editingItem || showAddForm) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {editingItem?.id ? 'Edit' : 'Tambah'} {
                    activeTab === 'courses' ? 'Kelas' : 
                    activeTab === 'chapters' ? 'Bab' : 'Produk'
                  }
                </h3>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddForm(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const data = Object.fromEntries(formData.entries());
                  
                  if (activeTab === 'courses') {
                    handleSaveEdit('course', {
                      ...data,
                      price: parseInt(data.price as string),
                      chapters: parseInt(data.chapters as string),
                      benefits: (data.benefits as string).split('\n').filter(b => b.trim())
                    });
                  } else if (activeTab === 'chapters') {
                    handleSaveEdit('chapter', {
                      ...data,
                      price: parseInt(data.price as string),
                      order: parseInt(data.order as string),
                      isLocked: data.isLocked === 'true',
                      materials: [],
                      tools: []
                    });
                  } else if (activeTab === 'products') {
                    handleSaveEdit('product', {
                      ...data,
                      price: parseInt(data.price as string),
                      inBasicPackage: data.inBasicPackage === 'true'
                    });
                  }
                }}
                className="space-y-4"
              >
                {activeTab === 'courses' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Judul Kelas</label>
                      <input
                        name="title"
                        defaultValue={editingItem?.title || ''}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <select
                        name="level"
                        defaultValue={editingItem?.level || 'Basic'}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Deskripsi</label>
                      <textarea
                        name="description"
                        defaultValue={editingItem?.description || ''}
                        required
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Manfaat (satu per baris)</label>
                      <textarea
                        name="benefits"
                        defaultValue={editingItem?.benefits?.join('\n') || ''}
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Harga</label>
                        <input
                          name="price"
                          type="number"
                          defaultValue={editingItem?.price || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Durasi</label>
                        <input
                          name="duration"
                          defaultValue={editingItem?.duration || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL Gambar</label>
                      <input
                        name="image"
                        defaultValue={editingItem?.image || ''}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'chapters' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Judul Bab</label>
                      <input
                        name="title"
                        defaultValue={editingItem?.title || ''}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Kelas</label>
                      <select
                        name="courseId"
                        defaultValue={editingItem?.courseId || 'basic'}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Deskripsi</label>
                      <textarea
                        name="description"
                        defaultValue={editingItem?.description || ''}
                        required
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Durasi</label>
                        <input
                          name="duration"
                          defaultValue={editingItem?.duration || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Harga</label>
                        <input
                          name="price"
                          type="number"
                          defaultValue={editingItem?.price || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Urutan</label>
                        <input
                          name="order"
                          type="number"
                          defaultValue={editingItem?.order || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL Video</label>
                      <input
                        name="videoUrl"
                        defaultValue={editingItem?.videoUrl || ''}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          name="isLocked"
                          type="checkbox"
                          value="true"
                          defaultChecked={editingItem?.isLocked || false}
                        />
                        <span className="text-sm font-medium">Terkunci (perlu akses Basic)</span>
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Produk</label>
                      <input
                        name="name"
                        defaultValue={editingItem?.name || ''}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Deskripsi</label>
                      <textarea
                        name="description"
                        defaultValue={editingItem?.description || ''}
                        required
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Harga</label>
                        <input
                          name="price"
                          type="number"
                          defaultValue={editingItem?.price || ''}
                          required
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Kategori</label>
                        <select
                          name="category"
                          defaultValue={editingItem?.category || 'Tools'}
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option value="Tools">Tools</option>
                          <option value="Chemicals">Chemicals</option>
                          <option value="Care">Care</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL Gambar</label>
                      <input
                        name="image"
                        defaultValue={editingItem?.image || ''}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          name="inBasicPackage"
                          type="checkbox"
                          value="true"
                          defaultChecked={editingItem?.inBasicPackage || false}
                        />
                        <span className="text-sm font-medium">Termasuk dalam Paket Basic</span>
                      </label>
                    </div>
                  </>
                )}

                <div className="flex space-x-2 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Simpan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setShowAddForm(false);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;