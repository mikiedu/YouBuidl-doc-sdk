import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";
import { NavigationItem } from "@/types/docs";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useLocation();
  
  // Fetch navigation data
  const { data: navigation = [] } = useQuery<NavigationItem[]>({
    queryKey: ['/api/navigation'],
  });

  // Close sidebar when location changes (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar 
          navigation={navigation}
          isOpen={isSidebarOpen} 
          currentPath={location}
        />
        
        <main className="flex-1 lg:pl-64">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
