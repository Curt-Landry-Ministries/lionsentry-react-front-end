// src/components/themeContext.tsx
"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SideBarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarContext = createContext<SideBarContextType | undefined>({
  isOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("sidebar-open");
    } else {
      document.documentElement.classList.remove("sidebar-open");
    }
  }, [pathname, isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
