import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import Profile from "./_components/Profile";
import SideBar from "./_components/SideBar";

interface Props {
  children: React.ReactNode;
}

function layout({ children }:Props) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end p-2">
          <Profile />
        </div>
        <div className="flex flex-col items-start gap-1 lg:flex-row lg:gap-0">
          <div className="flex flex-1 justify-center items-center w-full">
            {children}
          </div>
          <div className="flex place-self-center w-72 xl:w-80 lg:place-self-start">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
// All routes and sub-routes Protection
// <AuthProvider>
//   <ProtectedRoute></ProtectedRoute>
// </AuthProvider>
export default layout;
