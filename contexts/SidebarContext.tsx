'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  userToggled: boolean;
  setUserToggled: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userToggled, setUserToggled] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    // Trigger custom event for other components to listen
    window.dispatchEvent(new CustomEvent('sidebar-state-changed', { detail: { isCollapsed, userToggled } }));
  }, [isCollapsed, userToggled]);

  // Keyboard shortcut handler (Cmd+B or Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    setUserToggled(true);
    setIsCollapsed(prev => !prev);
  };
  const collapseSidebar = () => {
    // Only auto-collapse if user hasn't manually toggled
    if (!userToggled) {
      setIsCollapsed(true);
    }
  };
  const expandSidebar = () => {
    setIsCollapsed(false);
    setUserToggled(false); // Reset when explicitly expanded
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        userToggled,
        setUserToggled,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

