'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SideMenuContextType {
  isSideMenuOpen: boolean;
  toggleSideMenu: () => void;
}

const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);
interface SideMenuProviderProps {
    children: ReactNode;
  }

export const SideMenuProvider: React.FC<SideMenuProviderProps> = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(prevState => !prevState);
  };

  const value = { isSideMenuOpen, toggleSideMenu };

  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};