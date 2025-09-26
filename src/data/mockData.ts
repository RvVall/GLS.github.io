export interface Course {
  id: string;
  title: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  description: string;
  benefits: string[];
  price: number;
  duration: string;
  chapters: number;
  image: string;
  requirements?: string[];
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  order: number;
  isLocked: boolean;
  videoUrl?: string;
  materials: Material[];
  tools: string[]; // Product IDs yang dibutuhkan untuk bab ini
}

export interface Material {
  id: string;
  type: 'video' | 'pdf' | 'text' | 'quiz';
  title: string;
  content: string; // URL untuk video/pdf, atau text content
  duration?: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inBasicPackage?: boolean;
}

export const courses: Course[] = [
  {
    id: 'basic',
    title: 'Kelas Basic - Dasar Perawatan Sepatu',
    level: 'Basic',
    description: 'Pelajari fundamental perawatan sepatu dari nol hingga mahir. Cocok untuk pemula yang ingin memulai bisnis atau merawat koleksi pribadi.',
    benefits: [
      'Teknik pembersihan dasar untuk semua jenis sepatu',
      'Pemilihan alat dan bahan yang tepat',
      'Cara menyimpan sepatu dengan benar',
      'Mengatasi noda membandel',
      'Bonus: Paket alat cuci senilai 150rb'
    ],
    price: 299000,
    duration: '4 minggu',
    chapters: 8,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
  },
  {
    id: 'intermediate',
    title: 'Kelas Intermediate - Teknik Lanjutan',
    level: 'Intermediate',
    description: 'Tingkatkan skill dengan teknik profesional untuk berbagai jenis material dan warna sepatu.',
    benefits: [
      'Teknik deep cleaning untuk material premium',
      'Restorasi warna dan coating',
      'Perawatan khusus leather, suede, canvas',
      'Tips bisnis dan pricing strategy',
      'Sertifikat kelulusan'
    ],
    price: 499000,
    duration: '6 minggu',
    chapters: 12,
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
    requirements: ['Menyelesaikan Kelas Basic']
  },
  {
    id: 'advanced',
    title: 'Kelas Advanced - Master Shoe Care',
    level: 'Advanced',
    description: 'Level tertinggi untuk menjadi expert shoe care professional dengan teknik rahasia industri.',
    benefits: [
      'Teknik restorasi ekstrem dan repair',
      'Customization dan pewarnaan ulang',
      'Manajemen bisnis dan marketing',
      'Akses grup ekslusif alumni',
      'Mentoring 1-on-1 dengan founder'
    ],
    price: 799000,
    duration: '8 minggu',
    chapters: 16,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    requirements: ['Menyelesaikan Kelas Intermediate']
  }
];

export const chapters: Chapter[] = [
  // Basic Course Chapters
  { id: 'b1', courseId: 'basic', title: 'Pengenalan Dunia Shoe Care', description: 'Sejarah dan perkembangan industri perawatan sepatu', duration: '15 menit', price: 49000, order: 1, isLocked: false },
  { id: 'b2', courseId: 'basic', title: 'Mengenal Jenis-Jenis Material Sepatu', description: 'Leather, suede, canvas, synthetic - karakteristik dan perawatannya', duration: '25 menit', price: 49000, order: 2, isLocked: true },
  { id: 'b3', courseId: 'basic', title: 'Tools & Equipment Wajib', description: 'Panduan lengkap memilih alat yang tepat dan berkualitas', duration: '20 menit', price: 49000, order: 3, isLocked: true },
  { id: 'b4', courseId: 'basic', title: 'Teknik Pembersihan Basic', description: 'Step by step membersihkan sepatu dengan benar', duration: '30 menit', price: 49000, order: 4, isLocked: true },
  { id: 'b5', courseId: 'basic', title: 'Mengatasi Noda Membandel', description: 'Solusi untuk berbagai jenis noda yang sulit dihilangkan', duration: '35 menit', price: 49000, order: 5, isLocked: true },
  { id: 'b6', courseId: 'basic', title: 'Teknik Pengeringan & Storage', description: 'Cara mengeringkan dan menyimpan sepatu yang benar', duration: '20 menit', price: 49000, order: 6, isLocked: true },
  { id: 'b7', courseId: 'basic', title: 'Quality Control & Finishing', description: 'Standar kualitas hasil dan teknik finishing profesional', duration: '25 menit', price: 49000, order: 7, isLocked: true },
  { id: 'b8', courseId: 'basic', title: 'Practice Session & Tips Bisnis', description: 'Latihan langsung dan tips memulai usaha shoe care', duration: '40 menit', price: 49000, order: 8, isLocked: true },
];

export const products: Product[] = [
  {
    id: 'brush-premium',
    name: 'Premium Horsehair Brush',
    description: 'Sikat bulu kuda premium untuk pembersihan gentle pada semua jenis sepatu',
    price: 85000,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    category: 'Tools',
    inBasicPackage: true
  },
  {
    id: 'cleaner-solution',
    name: 'Professional Cleaner Solution',
    description: 'Formula khusus pembersih sepatu yang aman dan efektif untuk semua material',
    price: 65000,
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
    category: 'Chemicals',
    inBasicPackage: true
  },
  {
    id: 'microfiber-cloth',
    name: 'Microfiber Cleaning Cloth Set',
    description: 'Set 3 kain microfiber berkualitas tinggi untuk hasil pembersihan maksimal',
    price: 45000,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    category: 'Tools',
    inBasicPackage: true
  },
  {
    id: 'leather-conditioner',
    name: 'Premium Leather Conditioner',
    description: 'Pelembab dan pelindung kulit sepatu untuk menjaga kelenturan dan kilau',
    price: 75000,
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
    category: 'Care'
  },
  {
    id: 'suede-protector',
    name: 'Suede & Nubuck Protector',
    description: 'Spray pelindung khusus untuk sepatu berbahan suede dan nubuck',
    price: 95000,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    category: 'Care'
  },
  {
    id: 'polish-kit',
    name: 'Complete Polish Kit',
    description: 'Kit lengkap semir sepatu dengan berbagai warna dan aplikator',
    price: 120000,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    category: 'Care'
  }
];

export const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Entrepreneur',
    message: 'Setelah mengikuti kelas Basic, saya bisa buka usaha shoe care sendiri. Sekarang omzet bulanan sudah 15 juta!',
    rating: 5
  },
  {
    name: 'Sari Dewi',
    role: 'Sneaker Collector',
    message: 'Koleksi sneaker saya jadi awet dan selalu bersih. Teknik yang diajarkan sangat praktis dan mudah diikuti.',
    rating: 5
  },
  {
    name: 'Andi Kurniawan',
    role: 'Shoe Care Professional',
    message: 'Kelas Advanced benar-benar mengubah level skill saya. Sekarang bisa handle kasus yang paling sulit sekalipun.',
    rating: 5
  }
];