import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";

interface Props {
  children: React.ReactNode;
}

function layout({ children }:Props) {
  return (
    // All routes and sub-routes Protected
    <AuthProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AuthProvider>
  );
}

export default layout;
