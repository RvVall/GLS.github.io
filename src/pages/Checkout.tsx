import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, purchaseItem } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState('bca');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string>('');

  // Get item details from URL params
  const type = searchParams.get('type') || '';
  const id = searchParams.get('id') || '';
  const name = searchParams.get('name') || '';
  const price = parseInt(searchParams.get('price') || '0');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!type || !id || !name || !price) {
      navigate('/courses');
      return;
    }
  }, [user, navigate, type, id, name, price]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert('Silakan upload bukti transfer terlebih dahulu');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const newInvoiceId = purchaseItem(type, id, name, price);
      setInvoiceId(newInvoiceId);
      setIsProcessing(false);
    }, 2000);
  };

  if (invoiceId) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600">Terima kasih atas pembelian Anda</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Kode Invoice:</p>
            <p className="font-mono font-bold text-lg text-blue-900">{invoiceId}</p>
          </div>
          
          <p className="text-gray-600 mb-6 text-sm">
            Akses akan diberikan setelah konfirmasi manual oleh admin. 
            Biasanya memerlukan waktu 1-24 jam pada hari kerja.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Lihat Status di Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Memproses Pembayaran...</h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-blue-900 text-white p-6">
            <h1 className="text-2xl font-bold">Konfirmasi Pembayaran</h1>
            <p className="text-blue-100">Selesaikan pembayaran untuk mengakses konten</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Detail Pesanan</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {type === 'course' ? 'Kelas Lengkap' : 'Bab Individual'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        Rp {price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  {type === 'course' && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-green-600 font-semibold">
                        ✅ Termasuk bonus paket alat senilai Rp 150.000
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Kode Invoice:</strong> Akan digenerate otomatis setelah konfirmasi pembayaran
                  </p>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pilih Metode Pembayaran:
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          value="bca"
                          checked={paymentMethod === 'bca'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-blue-600"
                        />
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-semibold">Transfer Bank BCA</p>
                          <p className="text-sm text-gray-600">1234567890 a.n. Goodlook Shoes</p>
                        </div>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          value="qris"
                          checked={paymentMethod === 'qris'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-blue-600"
                        />
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs">QR</span>
                        </div>
                        <div>
                          <p className="font-semibold">QRIS</p>
                          <p className="text-sm text-gray-600">Scan QR Code untuk pembayaran</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'bca' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Instruksi Transfer BCA:</h3>
                      <ol className="text-sm text-gray-600 space-y-1">
                        <li>1. Transfer ke rekening BCA: <strong>1234567890</strong></li>
                        <li>2. Atas nama: <strong>Goodlook Shoes</strong></li>
                        <li>3. Nominal: <strong>Rp {price.toLocaleString('id-ID')}</strong></li>
                        <li>4. Upload bukti transfer di bawah ini</li>
                      </ol>
                    </div>
                  )}

                  {paymentMethod === 'qris' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <div className="bg-white p-4 inline-block rounded-lg shadow">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded">
                          <p className="text-gray-500 text-center">
                            QR Code<br />
                            Rp {price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Scan QR code dengan aplikasi pembayaran Anda
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload Bukti Transfer: *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        Pilih File
                      </label>
                      {uploadedFile && (
                        <p className="mt-2 text-sm text-green-600">
                          ✅ File terpilih: {uploadedFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Catatan:</strong> Akses akan diberikan setelah konfirmasi manual oleh admin. 
                      Proses biasanya memakan waktu 1-24 jam pada hari kerja.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!uploadedFile}
                    className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                      uploadedFile
                        ? 'bg-blue-900 text-white hover:bg-blue-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Konfirmasi Pembayaran
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;