"use client";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import Profile from "./_components/Profile";
import SideBar from "./_components/SideBar";
import PortalSwitcher from "./_components/PortalSwitcher";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1020;
      setShowSnackbar(isMobile && !showMobileSidebar);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [showMobileSidebar]);

  return (
    <AuthProvider>
      <ProtectedRoute>
    <>
      <div className="h-screen flex flex-col">
        <div className="flex justify-end p-2 flex-shrink-0">
          <PortalSwitcher />
          <Profile />
        </div>

        <div className="flex-1 flex lg:flex-row h-[calc(100vh-48px)] overflow-hidden">
          <div className="flex-1 overflow-hidden">{children}</div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 xl:w-80 h-full overflow-y-auto border-l">
            <SideBar />
          </div>

          {/* Mobile Sidebar */}
          {showSnackbar && (
            <div className="side-chat-container block lg:hidden">
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="absolute top-1 right-2 p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              ></button>
              <div className="pt-12">
                <SideBar />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
    </ProtectedRoute>
    </AuthProvider>
  );
}

export default Layout;
