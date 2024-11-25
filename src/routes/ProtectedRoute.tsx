import { ReactNode, FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { setAuthData } from "../store/authSlice";
import { SUPERADMIN_ROLE_ID, ADMIN_ROLE_ID } from "../constants/ROLES";
import axiosInstance from "../services/Interceptor/axiosInstance";
const API_URL = process.env.REACT_APP_API_URL;
interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
  guestOnly?: boolean;
}

const ProtectedRoute: FC<AuthGuardProps> = ({
  children,
  requiredRole,
  guestOnly,
}) => {
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && (!userRoleId || !userId)) {
      getUserByToken();
    }
  }, [token, userRoleId, userId, dispatch]);

  const getUserByToken = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/auth/getuserbytoken`
      );
      const { _id, role_id } = response.data.data;
      if (_id && role_id) {
        dispatch(setAuthData({ userRoleId: role_id, userId: _id }));
      }
    } catch (error) {
      console.error("Error fetching user by token:", error);
    }
  };

  // Redirect logic for guest-only routes
  if (guestOnly && token) {
    if (userRoleId === SUPERADMIN_ROLE_ID) {
      return <Navigate to="/superAdminDashboard" replace />;
    } else if (userRoleId === ADMIN_ROLE_ID) {
      return <Navigate to="/adminDashboard" replace />;
    }
  }

  // Redirect logic for protected routes
  if (!guestOnly && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!guestOnly && userRoleId && requiredRole && userRoleId !== requiredRole) {
    return <Navigate to="*" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
