import React, { useState } from 'react';
import { Upload, CheckCircle, MapPin, Phone } from 'lucide-react';

const Service: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    itemType: '',
    complaint: '',
    location: '',
    photos: [] as File[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const itemTypes = [
    'Sepatu Leather/Kulit',
    'Sepatu Suede/Nubuck', 
    'Sepatu Canvas/Kain',
    'Sneakers/Kets',
    'Sepatu Formal',
    'Tas Kulit',
    'Tas Canvas',
    'Backpack/Ransel',
    'Topi/Cap',
    'Helm',
    'Stroller/Kereta Bayi'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5) // Max 5 photos
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Terima Kasih!
          </h1>
          <p className="text-gray-600 mb-6">
            Permintaan servis Anda telah diterima. Tim kami akan menghubungi Anda dalam 1x24 jam 
            melalui WhatsApp untuk konfirmasi dan jadwal pickup.
          </p>
          <div className="space-y-3">
            <a
              href="https://wa.me/6287726648461?text=Halo%20admin%20Goodlook%20Shoes,%20saya%20sudah%20submit%20form%20servis"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Chat WhatsApp Sekarang
            </a>
            <button
              onClick={() => window.location.href = '/'}
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Layanan Servis Premium</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Serahkan perawatan barang berharga Anda kepada ahlinya. 
            Kami melayani berbagai jenis sepatu, tas, topi, helm, dan stroller.
          </p>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Jenis Layanan Kami</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Sepatu', icon: '👞' },
              { name: 'Tas', icon: '👜' },
              { name: 'Topi', icon: '🧢' },
              { name: 'Helm', icon: '⛑️' },
              { name: 'Stroller', icon: '🚼' },
              { name: 'Lainnya', icon: '🛍️' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8">
              <h2 className="text-3xl font-bold mb-4">Form Permintaan Servis</h2>
              <p className="text-blue-100">
                Isi form di bawah ini dan tim kami akan menghubungi Anda untuk proses selanjutnya
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Barang *
                </label>
                <select
                  name="itemType"
                  value={formData.itemType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih jenis barang...</option>
                  {itemTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keluhan/Deskripsi Kondisi *
                </label>
                <textarea
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Jelaskan kondisi barang, masalah yang dialami, atau hasil yang diinginkan..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Kecamatan/Kelurahan, Kota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Barang (Opsional, Max 5 foto)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      Pilih Foto
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Format: JPG, PNG, HEIC (Max 10MB per foto)
                    </p>
                  </div>
                  
                  {formData.photos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Foto terpilih:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-100 p-2 rounded text-xs text-center">
                              {photo.name}
                            </div>
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Informasi Layanan</span>
                </h3>
                <div className="text-blue-800 text-sm space-y-2">
                  <p>✅ Pickup gratis untuk area Jakarta, Depok, Tangerang, Bekasi</p>
                  <p>✅ Estimasi pengerjaan: 3-7 hari kerja</p>
                  <p>✅ Garansi kepuasan 100%</p>
                  <p>✅ Konsultasi gratis via WhatsApp</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Kirim Permintaan Servis</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Butuh Konsultasi Dulu?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Tim ahli kami siap membantu Anda menentukan treatment terbaik untuk barang kesayangan
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20admin%20Goodlook%20Shoes,%20saya%20mau%20konsultasi%20tentang%20servis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Service;