import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppRedirect = () => {
    const message = "Halo admin Goodlook Shoes, saya butuh bantuan.";
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border w-80 max-w-sm">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Live Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  👋 Halo! Selamat datang di Goodlook Shoes. Ada yang bisa kami bantu?
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-900">
                  Untuk respon lebih cepat, silakan chat langsung via WhatsApp kami.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat via WhatsApp</span>
              </button>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Tulis pesan..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                <button className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800" disabled>
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Chat simulasi - Gunakan WhatsApp untuk chat asli
              </p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;