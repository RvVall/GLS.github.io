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
    getAllPurchases
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};