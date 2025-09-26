import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  courses: string[];
  chapters: string[];
  purchases: Purchase[];
}

interface Purchase {
  id: string;
  type: 'course' | 'chapter' | 'product';
  itemId: string;
  itemName: string;
  price: number;
  date: string;
  status: 'pending' | 'confirmed' | 'active';
  invoiceId: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  purchaseItem: (type: string, itemId: string, itemName: string, price: number) => string;
  hasAccess: (itemId: string) => boolean;
  updatePurchaseStatus: (invoiceId: string, status: 'confirmed' | 'active') => void;
  getAllUsers: () => User[];
  getAllPurchases: () => Purchase[];
  // Admin CRUD functions
  updateUserAccess: (userId: string, courseIds: string[], chapterIds: string[]) => void;
  deleteUser: (userId: string) => void;
  updateUserRole: (userId: string, role: 'user' | 'admin') => void;
  addCourse: (course: Omit<Course, 'id'>) => string;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  addChapter: (chapter: Omit<Chapter, 'id'>) => string;
  updateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  deleteChapter: (chapterId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => string;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('goodlook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would be an API call
    
    // Admin login
    if (email === 'admin@goodlookshoes.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-001',
        name: 'Admin Goodlook',
        email: 'admin@goodlookshoes.com',
        role: 'admin',
        courses: [],
        chapters: [],
        purchases: []
      };
      setUser(adminUser);
      localStorage.setItem('goodlook_user', JSON.stringify(adminUser));
      return true;
    }
    
    // Regular user login
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'user',
        courses: [],
        chapters: [],
        purchases: []
      };
      setUser(newUser);
      localStorage.setItem('goodlook_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate registration
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
        courses: [],
        chapters: [],
        purchases: []
      };
      setUser(newUser);
      localStorage.setItem('goodlook_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('goodlook_user');
  };

  const purchaseItem = (type: string, itemId: string, itemName: string, price: number): string => {
    if (!user) return '';
    
    const invoiceId = `INV-GLS-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(Date.now()).slice(-3)}`;
    
    const purchase: Purchase = {
      id: Date.now().toString(),
      type: type as 'course' | 'chapter' | 'product',
      itemId,
      itemName,
      price,
      date: new Date().toISOString(),
      status: 'pending',
      invoiceId
    };

    const updatedUser = {
      ...user,
      purchases: [...user.purchases, purchase]
    };

    setUser(updatedUser);
    localStorage.setItem('goodlook_user', JSON.stringify(updatedUser));
    
    return invoiceId;
  };

  const hasAccess = (itemId: string): boolean => {
    if (!user) return false;
    return user.courses.includes(itemId) || user.chapters.includes(itemId) ||
           user.purchases.some(p => p.itemId === itemId && p.status === 'active');
  };

  const updatePurchaseStatus = (invoiceId: string, status: 'confirmed' | 'active') => {
    if (!user) return;
    
    const updatedPurchases = user.purchases.map(purchase => {
      if (purchase.invoiceId === invoiceId) {
        return { ...purchase, status };
      }
      return purchase;
    });

    const updatedUser = {
      ...user,
      purchases: updatedPurchases
    };

    // If confirmed/active, add to user's access
    const purchase = user.purchases.find(p => p.invoiceId === invoiceId);
    if (purchase && status === 'active') {
      if (purchase.type === 'course') {
        updatedUser.courses = [...user.courses, purchase.itemId];
      } else if (purchase.type === 'chapter') {
        updatedUser.chapters = [...user.chapters, purchase.itemId];
      }
    }

    setUser(updatedUser);
    localStorage.setItem('goodlook_user', JSON.stringify(updatedUser));
  };

  const getAllUsers = (): User[] => {
    // In real app, this would fetch from API
    const allUsers = localStorage.getItem('goodlook_all_users');
    return allUsers ? JSON.parse(allUsers) : [];
  };

  const getAllPurchases = (): Purchase[] => {
    const allUsers = getAllUsers();
    return allUsers.flatMap(user => user.purchases || []);
  };

  // Admin CRUD Functions
  const updateUserAccess = (userId: string, courseIds: string[], chapterIds: string[]) => {
    const allUsers = getAllUsers();
    const updatedUsers = allUsers.map(user => {
      if (user.id === userId) {
        return { ...user, courses: courseIds, chapters: chapterIds };
      }
      return user;
    });
    localStorage.setItem('goodlook_all_users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId: string) => {
    const allUsers = getAllUsers();
    const filteredUsers = allUsers.filter(user => user.id !== userId);
    localStorage.setItem('goodlook_all_users', JSON.stringify(filteredUsers));
  };

  const updateUserRole = (userId: string, role: 'user' | 'admin') => {
    const allUsers = getAllUsers();
    const updatedUsers = allUsers.map(user => {
      if (user.id === userId) {
        return { ...user, role };
      }
      return user;
    });
    localStorage.setItem('goodlook_all_users', JSON.stringify(updatedUsers));
  };

  const addCourse = (courseData: Omit<Course, 'id'>): string => {
    const newId = `course-${Date.now()}`;
    const newCourse = { ...courseData, id: newId };
    const currentCourses = JSON.parse(localStorage.getItem('goodlook_courses') || '[]');
    const updatedCourses = [...currentCourses, newCourse];
    localStorage.setItem('goodlook_courses', JSON.stringify(updatedCourses));
    return newId;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    const currentCourses = JSON.parse(localStorage.getItem('goodlook_courses') || '[]');
    const updatedCourses = currentCourses.map((course: Course) => {
      if (course.id === courseId) {
        return { ...course, ...updates };
      }
      return course;
    });
    localStorage.setItem('goodlook_courses', JSON.stringify(updatedCourses));
  };

  const deleteCourse = (courseId: string) => {
    const currentCourses = JSON.parse(localStorage.getItem('goodlook_courses') || '[]');
    const filteredCourses = currentCourses.filter((course: Course) => course.id !== courseId);
    localStorage.setItem('goodlook_courses', JSON.stringify(filteredCourses));
  };

  const addChapter = (chapterData: Omit<Chapter, 'id'>): string => {
    const newId = `chapter-${Date.now()}`;
    const newChapter = { ...chapterData, id: newId };
    const currentChapters = JSON.parse(localStorage.getItem('goodlook_chapters') || '[]');
    const updatedChapters = [...currentChapters, newChapter];
    localStorage.setItem('goodlook_chapters', JSON.stringify(updatedChapters));
    return newId;
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    const currentChapters = JSON.parse(localStorage.getItem('goodlook_chapters') || '[]');
    const updatedChapters = currentChapters.map((chapter: Chapter) => {
      if (chapter.id === chapterId) {
        return { ...chapter, ...updates };
      }
      return chapter;
    });
    localStorage.setItem('goodlook_chapters', JSON.stringify(updatedChapters));
  };

  const deleteChapter = (chapterId: string) => {
    const currentChapters = JSON.parse(localStorage.getItem('goodlook_chapters') || '[]');
    const filteredChapters = currentChapters.filter((chapter: Chapter) => chapter.id !== chapterId);
    localStorage.setItem('goodlook_chapters', JSON.stringify(filteredChapters));
  };

  const addProduct = (productData: Omit<Product, 'id'>): string => {
    const newId = `product-${Date.now()}`;
    const newProduct = { ...productData, id: newId };
    const currentProducts = JSON.parse(localStorage.getItem('goodlook_products') || '[]');
    const updatedProducts = [...currentProducts, newProduct];
    localStorage.setItem('goodlook_products', JSON.stringify(updatedProducts));
    return newId;
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    const currentProducts = JSON.parse(localStorage.getItem('goodlook_products') || '[]');
    const updatedProducts = currentProducts.map((product: Product) => {
      if (product.id === productId) {
        return { ...product, ...updates };
      }
      return product;
    });
    localStorage.setItem('goodlook_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId: string) => {
    const currentProducts = JSON.parse(localStorage.getItem('goodlook_products') || '[]');
    const filteredProducts = currentProducts.filter((product: Product) => product.id !== productId);
    localStorage.setItem('goodlook_products', JSON.stringify(filteredProducts));
  };

  const value: AuthContextType = {
    user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    purchaseItem,
    hasAccess,
    updatePurchaseStatus,
    getAllUsers,
    getAllPurchases,
    updateUserAccess,
    deleteUser,
    updateUserRole,
    addCourse,
    updateCourse,
    deleteCourse,
    addChapter,
    updateChapter,
    deleteChapter,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};