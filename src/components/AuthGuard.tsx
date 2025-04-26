import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "@contexts/AuthProvider";

function AuthGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useAuthContext();

  useEffect(() => {
    if (
      !loggedInUser &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    } else if (
      loggedInUser &&
      (location.pathname === "/login" || location.pathname !== "/register")
    ) {
      navigate("/");
    }
  }, [location.pathname, loggedInUser, navigate]);

  return <Outlet />;
}

export { AuthGuard };
